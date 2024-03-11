import { DatabaseService } from 'src/core/database.service';
import { PrismaService } from '../../core/prisma.service';
import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';
import { Product } from 'src/dtos/product.dto';

@Module({
  controllers: [ProductController],
  providers: [
    {
      useFactory: () =>
        new DatabaseService<Product>(new PrismaService(), 'product'),
      provide: DatabaseService,
    },
  ],
})
export class ProductModule {}
