import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class FilterUserDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly limit: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly offset: number;

  @IsOptional()
  @IsString()
  readonly name: string;
}
