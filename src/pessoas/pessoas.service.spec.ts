import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PessoasService } from './pessoas.service';
import { Pessoa } from './entities/pessoa.entity';

describe('PessoasService', () => {
  let service: PessoasService;

  const pessoaRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    preload: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PessoasService,
        { provide: getRepositoryToken(Pessoa), useValue: pessoaRepository },
      ],
    }).compile();

    service = module.get<PessoasService>(PessoasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
