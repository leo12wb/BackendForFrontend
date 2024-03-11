import { IsInt, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';

export class MicroServices {
  id: number;

  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsNotEmpty()
  @MaxLength(150)
  method: string;

  @IsNotEmpty()
  @MaxLength(10)
  version: string;

  @IsNotEmpty()
  @MaxLength(200)
  url: string;

  @IsInt()
  @IsOptional()
  isActive = 1;

  createdAt: Date;
}
