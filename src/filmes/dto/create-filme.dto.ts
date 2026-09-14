import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { trim } from '../../common/trim';

export class CreateFilmeDto {
  @ApiProperty({ description: 'Título do filme', example: 'O Poderoso Chefão' })
  @Transform(trim)
  @IsString({ message: 'nome deve ser um texto' })
  @IsNotEmpty({ message: 'nome é obrigatório' })
  nome: string;

  @ApiProperty({ description: 'Classificação indicativa', example: '14 anos' })
  @Transform(trim)
  @IsString({ message: 'faixaEtaria deve ser um texto' })
  @IsNotEmpty({ message: 'faixaEtaria é obrigatória' })
  faixaEtaria: string;

  @ApiProperty({
    description: 'Ano de lançamento',
    type: 'integer',
    minimum: 1850,
    example: 1972,
  })
  @Min(1850, { message: 'anoLancamento deve ser no mínimo 1850' })
  @IsInt({ message: 'anoLancamento deve ser um número inteiro' })
  @IsNotEmpty({ message: 'anoLancamento é obrigatório' })
  anoLancamento: number;

  @ApiPropertyOptional({
    description: 'Resumo do enredo',
    example:
      'O patriarca de uma família mafiosa transfere o controle ao filho.',
  })
  @Transform(trim)
  @IsString({ message: 'sinopse deve ser um texto' })
  @IsOptional()
  sinopse?: string;

  @ApiProperty({
    description: 'Duração em minutos',
    type: 'integer',
    minimum: 1,
    example: 175,
  })
  @IsPositive({ message: 'duracao deve ser maior que 0' })
  @IsInt({ message: 'duracao deve ser um número inteiro' })
  @IsNotEmpty({ message: 'duracao é obrigatória' })
  duracao: number;
}
