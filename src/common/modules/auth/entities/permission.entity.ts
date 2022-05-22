import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PermissionDocument = Permission & Document;

@Schema()
export class Permission {
  @Prop({ required: true, type: String })
  group: string;

  @Prop({ required: true, unique: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  description: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
