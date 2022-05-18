import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { Product } from 'src/modules/product/entities/product.entity';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true, type: String })
  documentNo: string;

  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: true, type: Types.ObjectId, ref: Customer.name })
  customer: Customer | Types.ObjectId;

  @Prop({
    required: true,
    type: [{ type: Types.ObjectId, ref: Product.name }],
  })
  products: Types.Array<Product>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
