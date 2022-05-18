import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Category } from 'src/modules/category/entities/category.entity';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description?: string;

  @Prop({ required: true, index: true })
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ type: URL, required: true })
  image?: string;

  @Prop({ type: Category, required: true })
  category: Category;

  @Prop({ type: Types.ObjectId, ref: Brand.name })
  brand: Brand;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Indexación compuesta
// ProductSchema.index({ price: 1, stock: -1 });
