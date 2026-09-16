import { Module } from '@nestjs/common';
import { GenerosService } from './generos.service';
import { GenerosController } from './generos.controller';
import { Genero } from './entities/genero.entity';
import { Filme } from '../filmes/entities/filme.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Genero, Filme])],
  controllers: [GenerosController],
  providers: [GenerosService],
})
export class GenerosModule {}
