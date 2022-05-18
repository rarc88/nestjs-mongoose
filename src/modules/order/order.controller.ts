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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterOrderDto } from './dto/filter-order.dto';
import { AddProductsToOrderDto } from './dto/add-products-to-order.dto';

@ApiTags('orders')
@Controller({
  path: 'orders',
  version: '1',
})
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @Get()
  async findAll(@Query() params: FilterOrderDto) {
    return await this.orderService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(id);
  }

  @Delete(':id/product/:productId')
  async removeProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return await this.orderService.removeProduct(id, productId);
  }

  @Patch(':id/products')
  async addProducts(
    @Param('id') id: string,
    @Body('products') products: AddProductsToOrderDto,
  ) {
    return await this.orderService.addProducts(id, products);
  }
}
