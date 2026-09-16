import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FilmesService } from './filmes.service';
import { Filme } from './entities/filme.entity';
import { Genero } from '../generos/entities/genero.entity';

describe('FilmesService', () => {
  let service: FilmesService;

  const filmeRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    preload: jest.fn(),
    remove: jest.fn(),
  };

  const generoRepository = {
    existsBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmesService,
        { provide: getRepositoryToken(Filme), useValue: filmeRepository },
        { provide: getRepositoryToken(Genero), useValue: generoRepository },
      ],
    }).compile();

    service = module.get<FilmesService>(FilmesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
