import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { AppService } from './app.service';
import ApiConfig from './common/modules/api-config/api-config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    @Inject(ApiConfig.KEY) private apiConfig: ConfigType<typeof ApiConfig>,
  ) {}

  @Get()
  getHello(): string {
    console.log(this.configService.get('database.name'));
    console.log(this.apiConfig.database.name);
    return this.appService.getHello();
  }

  @Get('status')
  getStatus(): string {
    return 'OK';
  }
}
