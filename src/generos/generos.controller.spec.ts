import { Test, TestingModule } from '@nestjs/testing';
import { GenerosController } from './generos.controller';
import { GenerosService } from './generos.service';

describe('GenerosController', () => {
  let controller: GenerosController;

  const generosService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenerosController],
      providers: [{ provide: GenerosService, useValue: generosService }],
    }).compile();

    controller = module.get<GenerosController>(GenerosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
