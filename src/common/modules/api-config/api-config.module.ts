import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from './api-config.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [ApiConfigService],
})
export class APIConfigModule {}
