import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './common/modules/database/database.module';
import { APIConfigModule } from './common/modules/api-config/api-config.module';

import { BrandModule } from './modules/brand/brand.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { UserModule } from './modules/user/user.module';
import { CustomerModule } from './modules/customer/customer.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    BrandModule,
    ProductModule,
    CategoryModule,
    UserModule,
    CustomerModule,
    OrderModule,
    DatabaseModule,
    APIConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
