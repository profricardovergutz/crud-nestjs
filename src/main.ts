import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove propriedades que nao estao no DTO
      forbidNonWhitelisted: true, // e devolve 400 se alguma for enviada
      transform: true,
      stopAtFirstError: true, // uma mensagem por campo, em vez de todas
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
