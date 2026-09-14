import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { trim } from '../../common/trim';

export class CreateGeneroDto {
  @ApiProperty({
    description: 'Nome do gênero',
    maxLength: 100,
    example: 'Drama',
  })
  @Transform(trim)
  @MaxLength(100, { message: 'nome deve ter no máximo 100 caracteres' })
  @IsString({ message: 'nome deve ser um texto' })
  @IsNotEmpty({ message: 'nome é obrigatório' })
  nome: string;
}
