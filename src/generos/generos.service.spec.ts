import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GenerosService } from './generos.service';
import { Genero } from './entities/genero.entity';

describe('GenerosService', () => {
  let service: GenerosService;

  const generoRepository = {
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
        GenerosService,
        { provide: getRepositoryToken(Genero), useValue: generoRepository },
      ],
    }).compile();

    service = module.get<GenerosService>(GenerosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
