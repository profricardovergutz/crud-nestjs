import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { Genero } from './entities/genero.entity';
import { Filme } from '../filmes/entities/filme.entity';

@Injectable()
export class GenerosService {
  constructor(
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
    @InjectRepository(Filme)
    private readonly filmeRepository: Repository<Filme>,
  ) {}

  async create(createGeneroDto: CreateGeneroDto): Promise<Genero> {
    const genero = this.generoRepository.create(createGeneroDto);
    return this.generoRepository.save(genero);
  }

  async findAll(): Promise<Genero[]> {
    return this.generoRepository.find({ order: { nome: 'ASC' } });
  }

  async findOne(id: number): Promise<Genero> {
    const genero = await this.generoRepository.findOneBy({ id });

    if (!genero) {
      throw new NotFoundException(`Gênero #${id} não encontrado`);
    }

    return genero;
  }

  async update(id: number, updateGeneroDto: UpdateGeneroDto): Promise<Genero> {
    const genero = await this.generoRepository.preload({
      id,
      ...updateGeneroDto,
    });

    if (!genero) {
      throw new NotFoundException(`Gênero #${id} não encontrado`);
    }

    return this.generoRepository.save(genero);
  }

  async remove(id: number): Promise<void> {
    const genero = await this.findOne(id);

    // A FK e RESTRICT: sem esta checagem o banco devolveria um erro 500.
    const emUso = await this.filmeRepository.existsBy({ generoId: id });

    if (emUso) {
      throw new ConflictException(
        `Gênero #${id} não pode ser removido porque está vinculado a filmes`,
      );
    }

    await this.generoRepository.remove(genero);
  }
}
