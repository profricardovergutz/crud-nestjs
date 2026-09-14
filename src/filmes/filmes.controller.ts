import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
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
import { FilmesService } from './filmes.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { Filme } from './entities/filme.entity';

@ApiTags('filmes')
@Controller('filmes')
export class FilmesController {
  constructor(private readonly filmesService: FilmesService) {}

  @ApiOperation({ summary: 'Cadastra um filme' })
  @ApiCreatedResponse({ type: Filme })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @Post()
  create(@Body() createFilmeDto: CreateFilmeDto) {
    return this.filmesService.create(createFilmeDto);
  }

  @ApiOperation({ summary: 'Lista os filmes em ordem alfabética' })
  @ApiOkResponse({ type: [Filme] })
  @Get()
  findAll() {
    return this.filmesService.findAll();
  }

  @ApiOperation({ summary: 'Busca um filme pelo id' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: Filme })
  @ApiBadRequestResponse({ description: 'id não é um número inteiro' })
  @ApiNotFoundResponse({ description: 'Filme não encontrado' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.filmesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Atualiza parcialmente um filme' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: Filme })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiNotFoundResponse({ description: 'Filme não encontrado' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFilmeDto: UpdateFilmeDto,
  ) {
    return this.filmesService.update(id, updateFilmeDto);
  }

  @ApiOperation({ summary: 'Remove um filme' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiNoContentResponse({ description: 'Filme removido' })
  @ApiBadRequestResponse({ description: 'id não é um número inteiro' })
  @ApiNotFoundResponse({ description: 'Filme não encontrado' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.filmesService.remove(id);
  }
}
