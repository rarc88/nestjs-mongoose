import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly customer: string;

  @IsNotEmpty()
  @IsArray()
  readonly products: string[];
}
