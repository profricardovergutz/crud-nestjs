import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Collection } from 'typeorm/driver/mongodb/typings.js';

@Entity('filmes')
export class Filme {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'O Poderoso Chefão' })
  @Column()
  nome: string;

  @ApiProperty({ example: '14 anos' })
  @Column({ name: 'faixa_etaria' })
  faixaEtaria: string;

  @ApiProperty({ example: 1972 })
  @Column({ name: 'ano_lancamento', type: 'int' })
  anoLancamento: number;

  @ApiProperty({
    type: String,
    nullable: true,
    example:
      'O patriarca de uma família mafiosa transfere o controle ao filho.',
  })
  @Column({ nullable: true })
  sinopse: string;

  @ApiProperty({ description: 'Duração em minutos', example: 175 })
  @Column()
  duracao: number;
}
