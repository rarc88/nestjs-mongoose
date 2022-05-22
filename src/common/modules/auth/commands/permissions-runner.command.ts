import mongoose from 'mongoose';
import { Command, CommandRunner } from 'nest-commander';
import { APIConfigService } from '../../api-config/api-config.service';
import {
  Permission as PermissionEntity,
  PermissionSchema,
} from '../entities/permission.entity';
import { Permission } from '../enums/permission.enum';

@Command({
  name: 'permissions:seed',
  options: { isDefault: false },
})
export class PermissionsRunner implements CommandRunner {
  private readonly permissions = [
    // Roles
    {
      group: 'roles',
      name: Permission.CREATE_ROLE,
      description: 'Create roles',
    },
    { group: 'roles', name: Permission.READ_ROLE, description: 'Read roles' },
    {
      group: 'roles',
      name: Permission.UPDATE_ROLE,
      description: 'Update roles',
    },
    {
      group: 'roles',
      name: Permission.DELETE_ROLE,
      description: 'Delete roles',
    },
    {
      group: 'roles',
      name: Permission.ADD_PERMISSION_ROLE,
      description: 'Add permissions to roles',
    },
    {
      group: 'roles',
      name: Permission.REMOVE_PERMISSION_ROLE,
      description: 'Remove permissions to roles',
    },
    //Users
    {
      group: 'users',
      name: Permission.CREATE_USER,
      description: 'Create users',
    },
    { group: 'users', name: Permission.READ_USER, description: 'Read users' },
    {
      group: 'users',
      name: Permission.UPDATE_USER,
      description: 'Update users',
    },
    {
      group: 'users',
      name: Permission.DELETE_USER,
      description: 'Delete users',
    },
    {
      group: 'users',
      name: Permission.ADD_ROLE_USER,
      description: 'Add permissions to users',
    },
    {
      group: 'users',
      name: Permission.REMOVE_ROLE_USER,
      description: 'Remove permissions to users',
    },
  ];

  constructor(private apiConfigService: APIConfigService) {}

  async run(): Promise<void> {
    console.log('------------------------------------------------------------');
    console.log('Begin permission seeds');

    await mongoose.connect(
      `${this.apiConfigService.env.database.connection}://${this.apiConfigService.env.database.host}:${this.apiConfigService.env.database.port}`,
      {
        user: this.apiConfigService.env.database.user,
        pass: this.apiConfigService.env.database.pass,
        dbName: this.apiConfigService.env.database.name,
      },
    );

    for (const key in this.permissions) {
      const item = this.permissions[key];
      const permissionModel = mongoose.model(
        PermissionEntity.name,
        PermissionSchema,
      );
      const permission = await permissionModel
        .findOne({ name: item.name })
        .exec();
      if (!permission) {
        console.log(item);
        await permissionModel.create(item);
      }
    }

    await mongoose.disconnect();

    console.log('End permission seeds');
    console.log('------------------------------------------------------------');
  }
}
