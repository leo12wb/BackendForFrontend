import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  // Configuração para servir arquivos estáticos
  app.use(express.static('public'));

  await app.listen(3001);
}
bootstrap();
