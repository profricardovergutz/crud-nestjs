import { Repository } from 'typeorm';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { Genero } from './entities/genero.entity';
export declare class GenerosService {
    private readonly generoRepository;
    constructor(generoRepository: Repository<Genero>);
    create(createGeneroDto: CreateGeneroDto): Promise<Genero>;
    findAll(): Promise<Genero[]>;
    findOne(id: number): Promise<Genero>;
    update(id: number, updateGeneroDto: UpdateGeneroDto): Promise<Genero>;
    remove(id: number): Promise<Genero>;
}
