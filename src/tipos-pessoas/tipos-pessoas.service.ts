import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoPessoaDto } from './dto/create-tipo-pessoa.dto';
import { UpdateTipoPessoaDto } from './dto/update-tipo-pessoa.dto';
import { TipoPessoa } from './entities/tipo-pessoa.entity';

@Injectable()
export class TiposPessoasService {
  constructor(
    @InjectRepository(TipoPessoa)
    private readonly tipoPessoaRepository: Repository<TipoPessoa>,
  ) {}

  async create(createTipoPessoaDto: CreateTipoPessoaDto): Promise<TipoPessoa> {
    const tipoPessoa = this.tipoPessoaRepository.create(createTipoPessoaDto);
    return this.tipoPessoaRepository.save(tipoPessoa);
  }

  async findAll(): Promise<TipoPessoa[]> {
    return this.tipoPessoaRepository.find({ order: { nome: 'ASC' } });
  }

  async findOne(id: number): Promise<TipoPessoa> {
    const tipoPessoa = await this.tipoPessoaRepository.findOneBy({ id });

    if (!tipoPessoa) {
      throw new NotFoundException(`Tipo de pessoa #${id} não encontrado`);
    }

    return tipoPessoa;
  }

  async update(
    id: number,
    updateTipoPessoaDto: UpdateTipoPessoaDto,
  ): Promise<TipoPessoa> {
    const tipoPessoa = await this.tipoPessoaRepository.preload({
      id,
      ...updateTipoPessoaDto,
    });

    if (!tipoPessoa) {
      throw new NotFoundException(`Tipo de pessoa #${id} não encontrado`);
    }

    return this.tipoPessoaRepository.save(tipoPessoa);
  }

  async remove(id: number): Promise<void> {
    const tipoPessoa = await this.findOne(id);
    await this.tipoPessoaRepository.remove(tipoPessoa);
  }
}
