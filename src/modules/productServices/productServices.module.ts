import { DatabaseService } from 'src/core/database.service';
import { PrismaService } from '../../core/prisma.service';
import { ProductServicesController } from './productServices.controller';
import { Module } from '@nestjs/common';
import { ProductServices } from 'src/dtos/productServices.dto';

@Module({
  controllers: [ProductServicesController],
  providers: [
    {
      useFactory: () =>
        new DatabaseService<ProductServices>(
          new PrismaService(),
          'productServices',
        ),
      provide: DatabaseService,
    },
  ],
})
export class ProductServicesModule {}
