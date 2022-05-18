import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authMechanism: 'DEFAULT',
        uri: `${configService.get('DATABASE_CONNECTION')}://${configService.get(
          'DATABASE_HOST',
        )}:${configService.get('DATABASE_PORT')}`,
        user: configService.get('DATABASE_USER'),
        pass: configService.get('DATABASE_PASS'),
        dbName: configService.get('DATABASE_NAME'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
