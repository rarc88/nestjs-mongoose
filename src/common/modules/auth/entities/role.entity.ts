import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { Permission } from './permission.entity';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop({ required: true, unique: true, type: String })
  name: string;

  @Prop({ required: true, type: Boolean, default: false })
  isDefault: boolean;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: Permission.name,
        unique: true,
        autopopulate: true,
      },
    ],
  })
  permissions: Types.Array<Permission>;

  @Prop({ required: true, type: Boolean, default: true })
  isActive: boolean;

  @Prop({ required: true, type: Date, default: Date.now() })
  created: Date;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  })
  createdBy: User | Types.ObjectId;

  @Prop({ required: true, type: Date, default: Date.now() })
  updated: Date;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  })
  updatedBy: User | Types.ObjectId;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
