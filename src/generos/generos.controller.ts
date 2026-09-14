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
import { GenerosService } from './generos.service';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { Genero } from './entities/genero.entity';

@ApiTags('generos')
@Controller('generos')
export class GenerosController {
  constructor(private readonly generosService: GenerosService) {}

  @ApiOperation({ summary: 'Cadastra um gênero' })
  @ApiCreatedResponse({ type: Genero })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @Post()
  create(@Body() createGeneroDto: CreateGeneroDto) {
    return this.generosService.create(createGeneroDto);
  }

  @ApiOperation({ summary: 'Lista os gêneros em ordem alfabética' })
  @ApiOkResponse({ type: [Genero] })
  @Get()
  findAll() {
    return this.generosService.findAll();
  }

  @ApiOperation({ summary: 'Busca um gênero pelo id' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: Genero })
  @ApiBadRequestResponse({ description: 'id não é um número inteiro' })
  @ApiNotFoundResponse({ description: 'Gênero não encontrado' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.generosService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualiza parcialmente um gênero' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: Genero })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiNotFoundResponse({ description: 'Gênero não encontrado' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGeneroDto: UpdateGeneroDto,
  ) {
    return this.generosService.update(id, updateGeneroDto);
  }

  @ApiOperation({ summary: 'Remove um gênero' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiNoContentResponse({ description: 'Gênero removido' })
  @ApiBadRequestResponse({ description: 'id não é um número inteiro' })
  @ApiNotFoundResponse({ description: 'Gênero não encontrado' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.generosService.remove(id);
  }
}
