import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { RoleController } from './controllers/role.controller';
import { APIConfigService } from 'src/common/modules/api-config/api-config.service';
import { AuthService } from './services/auth.service';
import { RoleService } from './services/role.service';
import { PermissionService } from './services/permission.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { PermissionsAuthGuard } from './guards/permissions-auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './entities/role.entity';
import { PermissionsRunner } from './commands/permissions-runner.command';
import { Permission, PermissionSchema } from './entities/permission.entity';
import { RolesRunner } from './commands/roles-runner.command';

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (apiConfigService: APIConfigService) => ({
        secret: apiConfigService.env.auth.secret,
        signOptions: { expiresIn: apiConfigService.env.auth.expire },
      }),
      inject: [APIConfigService],
    }),
    // MongooseModule.forFeature([
    //   { name: Role.name, schema: RoleSchema },
    //   { name: Permission.name, schema: PermissionSchema },
    // ]),
    MongooseModule.forFeatureAsync([
      {
        name: Role.name,
        useFactory: () => {
          const schema = RoleSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Permission.name,
        useFactory: () => {
          const schema = PermissionSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [AuthController, RoleController],
  providers: [
    AuthService,
    PermissionService,
    RoleService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JWTAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsAuthGuard,
    },
    PermissionsRunner,
    RolesRunner,
  ],
  exports: [RoleService],
})
export class AuthModule {}
