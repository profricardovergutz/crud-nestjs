import { Type } from '@nestjs/common';
import { PartialType as BasePartialType } from '@nestjs/swagger';

// O PartialType padrao usa @IsOptional, que aceita null e deixa { "nome": null }
// chegar ao banco. Aqui o campo so e opcional quando ausente (undefined).
// Vem do @nestjs/swagger (e nao do mapped-types) para herdar os @ApiProperty.
export function PartialType<T>(classRef: Type<T>): Type<Partial<T>> {
  return BasePartialType(classRef, { skipNullProperties: false });
}
