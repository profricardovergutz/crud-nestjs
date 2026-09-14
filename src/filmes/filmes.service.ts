import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Filme } from './entities/filme.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmesService {
  constructor(
    @InjectRepository(Filme)
    private readonly filmeRepository: Repository<Filme>,
  ) {}

  async create(createFilmeDto: CreateFilmeDto) {
    const filme = this.filmeRepository.create(createFilmeDto);
    return await this.filmeRepository.save(filme);
  }

  async findAll() {
    return await this.filmeRepository.find({ order: { nome: 'ASC' } });
  }

  async findOne(id: number) {
    const filme = await this.filmeRepository.findOneBy({ id });

    if (!filme) {
      throw new NotFoundException(`Filme #${id} não encontrado`);
    }

    return filme;
  }

  async update(id: number, updateFilmeDto: UpdateFilmeDto) {
    const filme = await this.filmeRepository.preload({
      id,
      ...updateFilmeDto,
    });

    if (!filme) {
      throw new NotFoundException(`Filme #${id} não encontrado`);
    }

    return this.filmeRepository.save(filme);
  }

  async remove(id: number): Promise<void> {
    const filme = await this.findOne(id);

    await this.filmeRepository.remove(filme);
  }
}
