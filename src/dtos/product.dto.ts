import { IsInt, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';

export class Product {
  id: number;

  @IsOptional()
  @MaxLength(150)
  uuid: string;

  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsNotEmpty()
  @MaxLength(100)
  version: string;

  @IsInt()
  @IsOptional()
  isActive = 1;

  createdAt: Date;
}
