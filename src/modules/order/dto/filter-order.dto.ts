import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class FilterOrderDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly limit: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly offset: number;
}
