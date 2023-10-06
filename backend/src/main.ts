import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { join } from 'path';

config();

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  const port = process.env.PORT || 3000;
  const cors = process.env.FRONTEND_URL || 'http://localhost:5173/';
  app.use(cookieParser());
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  // Activer CORS

  app.enableCors({
    origin: cors, // Remplacez par l'URL de votre frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(port);
}

bootstrap();
