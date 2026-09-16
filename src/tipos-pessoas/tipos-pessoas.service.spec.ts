import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TiposPessoasService } from './tipos-pessoas.service';
import { TipoPessoa } from './entities/tipo-pessoa.entity';

describe('TiposPessoasService', () => {
  let service: TiposPessoasService;

  const tipoPessoaRepository = {
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
        TiposPessoasService,
        {
          provide: getRepositoryToken(TipoPessoa),
          useValue: tipoPessoaRepository,
        },
      ],
    }).compile();

    service = module.get<TiposPessoasService>(TiposPessoasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
