import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsArray()
  @IsOptional()
  readonly permissions: object;
}
