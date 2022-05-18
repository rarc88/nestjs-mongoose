import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { AddProductsToOrderDto } from './dto/add-products-to-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { FilterOrderDto } from './dto/filter-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel({
      ...createOrderDto,
      documentNo: 'O-000001',
      date: Date(),
    });
    const order = await createdOrder.save();
    return order;
  }

  async findAll(params: FilterOrderDto): Promise<Order[]> {
    const filter: FilterQuery<Order> = {};
    // if (params.name != null) {
    //   filter.name = params.name;
    // }

    const query = this.orderModel.find(filter);

    if (params.offset != null && params.limit != null) {
      query.skip(params.offset * params.limit).limit(params.limit);
    }

    const orders = await query.populate('customer').populate('products').exec();
    return orders;
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderModel
      .findByIdAndUpdate(id, { $set: updateOrderDto }, { new: true })
      .exec();
    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    return order;
  }

  async remove(id: string): Promise<Order> {
    const order = await this.orderModel.findByIdAndDelete(id).exec();
    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    return order;
  }

  async removeProduct(id: string, productId: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    order.products.pull(productId);
    order.save();
    return order;
  }

  async addProducts(
    id: string,
    product: AddProductsToOrderDto,
  ): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    product.ids.forEach((productId) => order.products.push(productId));
    order.save();
    return order;
  }
}
