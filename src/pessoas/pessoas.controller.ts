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
import { PessoasService } from './pessoas.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';

@ApiTags('pessoas')
@Controller('pessoas')
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) {}

  @ApiOperation({ summary: 'Cadastra uma pessoa' })
  @ApiCreatedResponse({ type: Pessoa })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @Post()
  create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoasService.create(createPessoaDto);
  }

  @ApiOperation({ summary: 'Lista as pessoas em ordem alfabética' })
  @ApiOkResponse({ type: [Pessoa] })
  @Get()
  findAll() {
    return this.pessoasService.findAll();
  }

  @ApiOperation({ summary: 'Busca uma pessoa pelo id' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: Pessoa })
  @ApiBadRequestResponse({ description: 'id não é um número inteiro' })
  @ApiNotFoundResponse({ description: 'Pessoa não encontrada' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pessoasService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualiza parcialmente uma pessoa' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: Pessoa })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiNotFoundResponse({ description: 'Pessoa não encontrada' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePessoaDto: UpdatePessoaDto,
  ) {
    return this.pessoasService.update(id, updatePessoaDto);
  }

  @ApiOperation({ summary: 'Remove uma pessoa' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiNoContentResponse({ description: 'Pessoa removida' })
  @ApiBadRequestResponse({ description: 'id não é um número inteiro' })
  @ApiNotFoundResponse({ description: 'Pessoa não encontrada' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.pessoasService.remove(id);
  }
}
