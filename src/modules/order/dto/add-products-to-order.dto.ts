import { IsArray, IsNotEmpty } from 'class-validator';

export class AddProductsToOrderDto {
  @IsNotEmpty()
  @IsArray()
  readonly ids: string[];
}
