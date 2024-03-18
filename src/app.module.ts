import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './core/prisma.service';
import { ProductModule } from './modules/product/product.module';
import { ProductServicesModule } from './modules/productServices/productServices.module';
import { MicroServicesModule } from './modules/microServices/microServices.module';
import { BffModule } from './modules/bff/bff.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ProductModule,
    ProductServicesModule,
    MicroServicesModule,
    BffModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
