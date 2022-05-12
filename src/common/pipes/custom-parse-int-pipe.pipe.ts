import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CustomParseIntPipePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const number = parseInt(value, 10);
    if (isNaN(number)) {
      throw new BadRequestException(`${value} is not an number`);
    }
    return number;
  }
}
