import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GenerosModule } from './generos/generos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmesModule } from './filmes/filmes.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { TiposPessoasModule } from './tipos-pessoas/tipos-pessoas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'banco-dados/crud-filmes.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GenerosModule,
    FilmesModule,
    PessoasModule,
    TiposPessoasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
