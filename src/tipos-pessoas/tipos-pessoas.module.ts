import { Module } from '@nestjs/common';
import { TiposPessoasService } from './tipos-pessoas.service';
import { TiposPessoasController } from './tipos-pessoas.controller';
import { TipoPessoa } from './entities/tipo-pessoa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TipoPessoa])],
  controllers: [TiposPessoasController],
  providers: [TiposPessoasService],
})
export class TiposPessoasModule {}
