import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/pipes/mongo-id-pipe.pipe';
import { FilterUserDto } from './dto/filter-user.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Permissions } from '../auth/decorators/permission.decorator';
import { Permission } from '../auth/enums/permission.enum';

@ApiTags('users')
@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Permissions(Permission.CREATE_USER)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Permissions(Permission.READ_USER)
  @Get()
  async findAll(@Query() params: FilterUserDto) {
    return await this.userService.findAll(params);
  }

  @Permissions(Permission.READ_USER)
  @Get(':id')
  async findOne(@Param('id', MongoIdPipe) id: string) {
    return await this.userService.findOne(id, null);
  }

  @Permissions(Permission.UPDATE_USER)
  @Patch(':id')
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  @Permissions(Permission.DELETE_USER)
  @Delete(':id')
  async remove(@Param('id', MongoIdPipe) id: string) {
    return await this.userService.remove(id);
  }
}
