import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { APIConfigService } from 'src/common/modules/api-config/api-config.service';
import { RoleService } from '../auth/services/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private apiConfigService: APIConfigService,
    private readonly roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const defaultRole = await this.roleService.findOne(null, {
      isDefault: true,
    });
    if (!defaultRole) {
      throw new NotFoundException('No default role found');
    }

    const hash = await bcrypt.hash(
      createUserDto.password,
      this.apiConfigService.env.hash.salt,
    );
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hash,
    });
    createdUser.roles.push(defaultRole.id);
    const user = await createdUser.save();
    user.password = null;
    return user;
  }

  async findAll(params: FilterUserDto): Promise<UserDocument[]> {
    const filter: FilterQuery<User> = {};
    if (params.name != null) {
      filter.name = params.name;
    }

    const query = this.userModel.find(filter);

    if (params.offset != null && params.limit != null) {
      query.skip(params.offset * params.limit).limit(params.limit);
    }

    const users = await query.exec();
    return users;
  }

  async findOne(id: string, conditions: object): Promise<UserDocument> {
    const user = id
      ? await this.userModel.findById(id).exec()
      : await this.userModel.findOne(conditions).exec();
    return user;
  }

  async findByUsername(username: string): Promise<UserDocument> {
    const user = await this.userModel
      .findOne({ username })
      .select('+password')
      .exec();
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { $set: updateUserDto }, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    user.password = null;
    return user;
  }

  async remove(id: string): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    user.password = null;
    return user;
  }
}
