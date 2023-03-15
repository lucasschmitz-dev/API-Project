import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  if (
    fs.existsSync('./letsencrypt/live/schmitz.berlin/privkey.pem') &&
    fs.existsSync('./letsencrypt/live/schmitz.berlin/fullchain.pem')
  ) {
    console.log('starting with ssl certificate...');
    const httpsOptions = {
      key: fs.readFileSync('./letsencrypt/live/schmitz.berlin/privkey.pem'),
      cert: fs.readFileSync('./letsencrypt/live/schmitz.berlin/fullchain.pem'),
    };
    const app = await NestFactory.create(AppModule, {
      httpsOptions,
    });
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));

    await app.listen(3000);
  } else {
    console.log('starting without ssl certificate...');
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));

    await app.listen(3000);
  }
}
bootstrap();
