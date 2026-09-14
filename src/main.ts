import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  const config = new DocumentBuilder()
    .setTitle('CRUD Filmes')
    .setDescription('API para cadastro de filmes e gêneros')
    .setVersion('1.0')
    .build();
  // interface em /api e especificacao OpenAPI em /api-json
  SwaggerModule.setup('api', app, () =>
    SwaggerModule.createDocument(app, config),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
