import { BffController } from './bff.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [BffController],
  providers: [],
})
export class BffModule {}
