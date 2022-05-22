import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permission.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Permission } from '../enums/permission.enum';

@Injectable()
export class PermissionsAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (user && user.isAdmin) {
      return true;
    }

    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    } else if (!user) {
      throw new ForbiddenException();
    }

    const hasPermission = requiredPermissions.some((permission) => {
      for (const role of user.roles) {
        const count = role.permissions.filter(
          (item) => item.name === permission,
        ).length;
        if (count > 0) return true;
      }
      return false;
    });

    if (!hasPermission) {
      throw new ForbiddenException();
    }

    return hasPermission;
  }
}
