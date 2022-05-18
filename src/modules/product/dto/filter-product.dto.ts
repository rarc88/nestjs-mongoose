import {
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
  ValidateIf,
} from 'class-validator';

export class FilterProductDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly limit: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly offset: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly minPrice: number;

  @IsNumber()
  @IsPositive()
  @ValidateIf((params) => params.minPrice)
  readonly maxPrice: number;
}
