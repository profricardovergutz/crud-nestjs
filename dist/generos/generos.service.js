"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const genero_entity_1 = require("./entities/genero.entity");
let GenerosService = class GenerosService {
    generoRepository;
    constructor(generoRepository) {
        this.generoRepository = generoRepository;
    }
    async create(createGeneroDto) {
        const genero = this.generoRepository.create(createGeneroDto);
        return this.generoRepository.save(genero);
    }
    async findAll() {
        return this.generoRepository.find({ order: { nome: 'ASC' } });
    }
    async findOne(id) {
        const genero = await this.generoRepository.findOneBy({ id });
        if (!genero) {
            throw new common_1.NotFoundException(`Gênero #${id} não encontrado`);
        }
        return genero;
    }
    async update(id, updateGeneroDto) {
        const genero = await this.generoRepository.preload({
            id,
            ...updateGeneroDto,
        });
        if (!genero) {
            throw new common_1.NotFoundException(`Gênero #${id} não encontrado`);
        }
        return this.generoRepository.save(genero);
    }
    async remove(id) {
        const genero = await this.findOne(id);
        const removido = { ...genero };
        await this.generoRepository.remove(genero);
        return removido;
    }
};
exports.GenerosService = GenerosService;
exports.GenerosService = GenerosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(genero_entity_1.Genero)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GenerosService);
//# sourceMappingURL=generos.service.js.map