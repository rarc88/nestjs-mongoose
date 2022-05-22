import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/pipes/mongo-id-pipe.pipe';
import { Permissions } from '../decorators/permission.decorator';
import { CreateRoleDto } from '../dto/role/create-role.dto';
import { FilterRoleDto } from '../dto/role/filter-role.dto';
import { UpdateRoleDto } from '../dto/role/update-role.dto';
import { Role } from '../entities/role.entity';
import { Permission } from '../enums/permission.enum';
import { RoleService } from '../services/role.service';

@ApiTags('roles')
@Controller({
  path: 'auth/roles',
  version: '1',
})
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Permissions(Permission.CREATE_ROLE)
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.roleService.create(createRoleDto);
  }

  @Permissions(Permission.READ_ROLE)
  @Get()
  async findAll(@Query() params: FilterRoleDto): Promise<Role[]> {
    return await this.roleService.findAll(params);
  }

  @Permissions(Permission.READ_ROLE)
  @Get(':id')
  async findOne(@Param('id', MongoIdPipe) id: string): Promise<Role> {
    return await this.roleService.findOne(id, null);
  }

  @Permissions(Permission.UPDATE_ROLE)
  @Patch(':id')
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    return await this.roleService.update(id, updateRoleDto);
  }

  @Permissions(Permission.DELETE_ROLE)
  @Delete(':id')
  async remove(@Param('id', MongoIdPipe) id: string): Promise<Role> {
    return await this.roleService.remove(id);
  }

  @Patch(':id/permissions/:permissionId')
  async addPermission(
    @Param('id') id: string,
    @Param('permissionId') permissionId: string,
  ) {
    return await this.roleService.addPermission(id, permissionId);
  }

  @Delete(':id/permissions/:permissionId')
  async removePermission(
    @Param('id') id: string,
    @Param('permissionId') permissionId: string,
  ) {
    return await this.roleService.removePermission(id, permissionId);
  }
}
