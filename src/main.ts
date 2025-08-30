import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // opcional, todos los endpoints bajo /api
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,               // elimina propiedades no declaradas en DTO
    forbidNonWhitelisted: true,    // lanza error si llegan propiedades extra
    transform: true,               // transforma tipos (p.ej. string->number)
    transformOptions: { enableImplicitConversion: true },
  }));

  await app.listen(3000);
  console.log(`🚀 API lista en http://localhost:3000/api`);
}
bootstrap();
