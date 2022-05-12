import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Producto 1',
      description: null,
      price: 100.0,
      stock: 10,
      image: null,
    },
    {
      id: 2,
      name: 'Producto 2',
      description: null,
      price: 100.0,
      stock: 10,
      image: null,
    },
    {
      id: 3,
      name: 'Producto 3',
      description: null,
      price: 100.0,
      stock: 10,
      image: null,
    },
    {
      id: 4,
      name: 'Producto 4',
      description: null,
      price: 100.0,
      stock: 10,
      image: null,
    },
    {
      id: 5,
      name: 'Producto 5',
      description: null,
      price: 100.0,
      stock: 10,
      image: null,
    },
  ];

  create(createProductDto: CreateProductDto): Product {
    const product: Product = {
      id: this.products.length + 1,
      ...createProductDto,
    };
    this.products.push(product);
    return product;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((element) => element.id == id);

    if (product == null) {
      throw new NotFoundException(`Product ${id}not found`);
    }

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const index = this.products.findIndex((element) => element.id == id);

    if (index < 0) {
      throw new NotFoundException(`Product ${id}not found`);
    }

    const product = { ...this.products[index], ...updateProductDto };
    this.products[index] = product;

    return product;
  }

  remove(id: number) {
    const product = this.findOne(id);

    this.products = this.products.map((element) => {
      if (element.id != id) {
        return element;
      }
    });

    return product;
  }
}
