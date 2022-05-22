import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from '../../auth/entities/role.entity';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, type: Boolean, default: false })
  isAdmin: boolean;

  @Prop({
    type: [{ type: Types.ObjectId, ref: Role.name, autopopulate: true }],
  })
  roles: Role[];

  @Prop({ required: true, type: Boolean, default: true })
  isActive: boolean;

  @Prop({ required: true, type: Date, default: Date.now() })
  created: Date;

  @Prop({ type: Types.ObjectId, ref: User.name, autopopulate: true })
  createdBy: User | Types.ObjectId;

  @Prop({ required: true, type: Date, default: Date.now() })
  updated: Date;

  @Prop({ type: Types.ObjectId, ref: User.name, autopopulate: true })
  updatedBy: User | Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
