import { BffController, pageController } from './bff.controller';
import { Module } from '@nestjs/common';

import { DatabaseService } from 'src/core/database.service';
import { PrismaService } from '../../core/prisma.service';
import { MicroServices } from 'src/dtos/microServices.dto';

@Module({
  controllers: [BffController, pageController],
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
export class BffModule {}
