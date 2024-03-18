import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './core/prisma.service';
import { ProductModule } from './modules/product/product.module';
import { ProductServicesModule } from './modules/productServices/productServices.module';
import { MicroServicesModule } from './modules/microServices/microServices.module';
import { BffModule } from './modules/bff/bff.module';

@Module({
  imports: [ProductModule, ProductServicesModule, MicroServicesModule, BffModule],
  controllers: [AppController],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
