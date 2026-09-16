import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TiposPessoasService } from './tipos-pessoas.service';
import { CreateTipoPessoaDto } from './dto/create-tipo-pessoa.dto';
import { UpdateTipoPessoaDto } from './dto/update-tipo-pessoa.dto';
import { TipoPessoa } from './entities/tipo-pessoa.entity';

@ApiTags('tipos-pessoas')
@Controller('tipos-pessoas')
export class TiposPessoasController {
  constructor(private readonly tiposPessoasService: TiposPessoasService) {}

  @ApiOperation({ summary: 'Cadastra um tipo de pessoa' })
  @ApiCreatedResponse({ type: TipoPessoa })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @Post()
  create(@Body() createTipoPessoaDto: CreateTipoPessoaDto) {
    return this.tiposPessoasService.create(createTipoPessoaDto);
  }

  @ApiOperation({ summary: 'Lista os tipos de pessoa em ordem alfabética' })
  @ApiOkResponse({ type: [TipoPessoa] })
  @Get()
  findAll() {
    return this.tiposPessoasService.findAll();
  }

  @ApiOperation({ summary: 'Busca um tipo de pessoa pelo id' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: TipoPessoa })
  @ApiBadRequestResponse({ description: 'id não é um número inteiro' })
  @ApiNotFoundResponse({ description: 'Tipo de pessoa não encontrado' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tiposPessoasService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualiza parcialmente um tipo de pessoa' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: TipoPessoa })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiNotFoundResponse({ description: 'Tipo de pessoa não encontrado' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTipoPessoaDto: UpdateTipoPessoaDto,
  ) {
    return this.tiposPessoasService.update(id, updateTipoPessoaDto);
  }

  @ApiOperation({ summary: 'Remove um tipo de pessoa' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiNoContentResponse({ description: 'Tipo de pessoa removido' })
  @ApiBadRequestResponse({ description: 'id não é um número inteiro' })
  @ApiNotFoundResponse({ description: 'Tipo de pessoa não encontrado' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.tiposPessoasService.remove(id);
  }
}
