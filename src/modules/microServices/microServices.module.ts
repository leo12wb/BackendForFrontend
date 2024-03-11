import { DatabaseService } from 'src/core/database.service';
import { PrismaService } from '../../core/prisma.service';
import { MicroServicesController } from './microServices.controller';
import { Module } from '@nestjs/common';
import { MicroServices } from 'src/dtos/microServices.dto';

@Module({
  controllers: [MicroServicesController],
  providers: [
    {
      useFactory: () =>
        new DatabaseService<MicroServices>(
          new PrismaService(),
          'microServices',
        ),
      provide: DatabaseService,
    },
  ],
})
export class MicroServicesModule {}
