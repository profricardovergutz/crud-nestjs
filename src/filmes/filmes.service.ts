import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Filme } from './entities/filme.entity';
import { Genero } from '../generos/entities/genero.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmesService {
  constructor(
    @InjectRepository(Filme)
    private readonly filmeRepository: Repository<Filme>,
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
  ) {}

  async create(createFilmeDto: CreateFilmeDto) {
    await this.validarGenero(createFilmeDto.generoId);

    const filme = this.filmeRepository.create(createFilmeDto);
    const salvo = await this.filmeRepository.save(filme);

    return await this.findOne(salvo.id);
  }

  async findAll() {
    return await this.filmeRepository.find({
      relations: { genero: true },
      order: { nome: 'ASC' },
    });
  }

  async findOne(id: number) {
    const filme = await this.filmeRepository.findOne({
      where: { id },
      relations: { genero: true },
    });

    if (!filme) {
      throw new NotFoundException(`Filme #${id} não encontrado`);
    }

    return filme;
  }

  async update(id: number, updateFilmeDto: UpdateFilmeDto) {
    await this.validarGenero(updateFilmeDto.generoId);

    const filme = await this.filmeRepository.preload({
      id,
      ...updateFilmeDto,
    });

    if (!filme) {
      throw new NotFoundException(`Filme #${id} não encontrado`);
    }

    await this.filmeRepository.save(filme);

    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const filme = await this.findOne(id);

    await this.filmeRepository.remove(filme);
  }

  // No update o generoId e opcional: so validamos quando ele vem no corpo.
  private async validarGenero(generoId?: number): Promise<void> {
    if (generoId === undefined) {
      return;
    }

    const existe = await this.generoRepository.existsBy({ id: generoId });

    if (!existe) {
      throw new NotFoundException(`Gênero #${generoId} não encontrado`);
    }
  }
}
