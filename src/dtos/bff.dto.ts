import { IsOptional, IsNotEmpty, MaxLength, IsObject } from 'class-validator';

// export class BffOne {
//   @IsNotEmpty()
//   @MaxLength(150)
//   produtoId: string;

//   @IsOptional()
//   @MaxLength(10)
//   version: string;

//   @IsObject()
//   @IsOptional()
//   payload: Record<string, any>;
// }

export class Bff {
  @IsObject()
  @IsOptional()
  payload: Record<string, any>;
}