import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { FilterPermissionDto } from '../dto/permission/filter-permission.dto';
import { Permission, PermissionDocument } from '../entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
  ) {}

  async findAll(params: FilterPermissionDto): Promise<PermissionDocument[]> {
    const filter: FilterQuery<Permission> = {};
    if (params.group != null) {
      filter.group = params.group;
    }

    if (params.name != null) {
      filter.name = params.name;
    }

    const query = this.permissionModel.find(filter);

    if (params.offset != null && params.limit != null) {
      query.skip(params.offset * params.limit).limit(params.limit);
    }

    const permissions = await query.exec();
    return permissions;
  }

  async findOne(id: string, conditions: object): Promise<PermissionDocument> {
    const permission = id
      ? await this.permissionModel.findById(id).exec()
      : await this.permissionModel.findOne(conditions).exec();
    return permission;
  }
}
