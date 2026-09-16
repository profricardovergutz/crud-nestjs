import { Test, TestingModule } from '@nestjs/testing';
import { TiposPessoasController } from './tipos-pessoas.controller';
import { TiposPessoasService } from './tipos-pessoas.service';

describe('TiposPessoasController', () => {
  let controller: TiposPessoasController;

  const tiposPessoasService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiposPessoasController],
      providers: [
        { provide: TiposPessoasService, useValue: tiposPessoasService },
      ],
    }).compile();

    controller = module.get<TiposPessoasController>(TiposPessoasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
