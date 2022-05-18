import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: [{ name: { type: String } }] })
  roles: Types.Array<Record<string, any>>;
}

export const UserSchema = SchemaFactory.createForClass(User);
