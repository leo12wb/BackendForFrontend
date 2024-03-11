import { IsInt, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';

export class ProductServices {
  id: number;

  @IsNotEmpty()
  @MaxLength(150)
  productId: string;

  @IsInt()
  microServiceId: number;

  @IsInt()
  @IsOptional()
  isActive = 1;

  createdAt: Date;
}
