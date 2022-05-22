import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/modules/auth/decorators/public.decorator';

@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('status')
  getStatus(): string {
    return this.appService.getStatus();
  }
}
