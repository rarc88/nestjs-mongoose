import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateRoleDto } from '../dto/role/create-role.dto';
import { FilterRoleDto } from '../dto/role/filter-role.dto';
import { UpdateRoleDto } from '../dto/role/update-role.dto';
import { PermissionDocument } from '../entities/permission.entity';
import { Role, RoleDocument } from '../entities/role.entity';
import { PermissionService } from './permission.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    private readonly permissionService: PermissionService,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleDocument> {
    const createdRole = new this.roleModel(createRoleDto);
    const role = await createdRole.save();
    return role;
  }

  async findAll(params: FilterRoleDto): Promise<RoleDocument[]> {
    const filter: FilterQuery<Role> = {};
    if (params.name != null) {
      filter.name = params.name;
    }

    const query = this.roleModel.find(filter);

    if (params.offset != null && params.limit != null) {
      query.skip(params.offset * params.limit).limit(params.limit);
    }

    const roles = await query.exec();
    return roles;
  }

  async findOne(id: string, conditions: object): Promise<RoleDocument> {
    const role = id
      ? await this.roleModel.findById(id).exec()
      : await this.roleModel.findOne(conditions).exec();
    return role;
  }

  async update(
    id: string,
    updateRoleDto: UpdateRoleDto,
  ): Promise<RoleDocument> {
    const role = await this.roleModel
      .findByIdAndUpdate(id, { $set: updateRoleDto }, { new: true })
      .exec();
    return role;
  }

  async remove(id: string): Promise<Role> {
    const role = await this.roleModel.findByIdAndDelete(id).exec();
    return role;
  }

  async addPermission(id: string, permissionId: string): Promise<RoleDocument> {
    const role = await this.roleModel.findById(id).exec();
    if (!role) {
      throw new NotFoundException(`Role ${id} not found`);
    }

    const permission = await this.permissionService.findOne(permissionId, null);

    if (!permission) {
      throw new NotFoundException(`Permission ${permissionId} not found`);
    }

    const duplicate = role.permissions.some(
      (permission: PermissionDocument) => {
        return permission.id == permissionId;
      },
    );

    if (duplicate) {
      throw new BadRequestException(
        `Permission [${permission.name}] duplicate`,
      );
    }

    role.permissions.push(permissionId);
    role.save();
    return role;
  }

  async removePermission(
    id: string,
    permissionId: string,
  ): Promise<RoleDocument> {
    const role = await this.roleModel.findById(id).exec();
    if (!role) {
      throw new NotFoundException(`Role ${id} not found`);
    }
    role.permissions.pull(permissionId);
    role.save();
    return role;
  }
}
