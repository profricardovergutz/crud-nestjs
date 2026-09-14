import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { Genero } from './entities/genero.entity';

@Injectable()
export class GenerosService {
  constructor(
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
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
    await this.generoRepository.remove(genero);
  }
}
