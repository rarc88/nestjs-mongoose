import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandModule } from './modules/brand/brand.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { UserModule } from './modules/user/user.module';
import { CustomerModule } from './modules/customer/customer.module';
import { OrderModule } from './modules/order/order.module';
import { DatabaseModule } from './common/modules/database/database.module';
import { environments } from 'environments';
import { APIConfigModule } from './common/modules/api-config/api-config.module';
import apiConfig from './common/modules/api-config/api-config';
import * as Joi from 'joi';
import apiConfigSchema from './common/modules/api-config/api-config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [apiConfig],
      validationSchema: Joi.object(apiConfigSchema),
    }),
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
