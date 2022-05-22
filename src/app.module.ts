import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './common/modules/database/database.module';
import { APIConfigModule } from './common/modules/api-config/api-config.module';

import { UserModule } from './common/modules/user/user.module';
import { AuthModule } from './common/modules/auth/auth.module';

@Module({
  imports: [UserModule, DatabaseModule, APIConfigModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
