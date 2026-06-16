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
exports.AtelieTypeOrmRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const atelie_1 = require("../../../domain/atelie");
const atelie_orm_entity_1 = require("./atelie.orm-entity");
let AtelieTypeOrmRepository = class AtelieTypeOrmRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(atelie) {
        const orm = this.repo.create({
            especialidadeEra: atelie.especialidadeEra,
            equipadoCompleto: atelie.equipadoCompleto,
            areaOficinaM2: atelie.areaOficinaM2,
            dataFundacao: atelie.dataFundacao,
        });
        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }
    async findById(id) {
        const atelie = await this.repo.findOneBy({ id });
        return atelie ? this.toDomain(atelie) : null;
    }
    async findAll() {
        const atelies = await this.repo.find({ order: { id: 'ASC' } });
        return atelies.map(this.toDomain);
    }
    async findByIdWithMoveis(id) {
        const atelie = await this.repo.findOne({
            where: { id },
            relations: ['moveis'],
            order: { moveis: { id: 'ASC' } },
        });
        if (!atelie) {
            return null;
        }
        return {
            id: atelie.id,
            especialidadeEra: atelie.especialidadeEra,
            equipadoCompleto: atelie.equipadoCompleto,
            areaOficinaM2: atelie.areaOficinaM2,
            dataFundacao: atelie.dataFundacao,
            moveis: (atelie.moveis ?? []).map((movel) => ({
                id: movel.id,
                tipoMovel: movel.tipoMovel,
                dataInicioTrab: movel.dataInicioTrab,
                restaurado: movel.restaurado,
                horasHomem: movel.horasHomem,
                atelieId: movel.atelieId,
                ownerUserId: movel.ownerUserId,
            })),
        };
    }
    async update(atelie) {
        if (atelie.id === null) {
            throw new Error('Atelie sem ID nao pode ser atualizado');
        }
        const orm = await this.repo.findOneBy({ id: atelie.id });
        if (!orm) {
            throw new Error('Atelie nao encontrado para atualizar');
        }
        orm.especialidadeEra = atelie.especialidadeEra;
        orm.equipadoCompleto = atelie.equipadoCompleto;
        orm.areaOficinaM2 = atelie.areaOficinaM2;
        orm.dataFundacao = atelie.dataFundacao;
        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }
    async delete(id) {
        const orm = await this.repo.findOneBy({ id });
        if (!orm) {
            throw new Error('Atelie nao encontrado para remover');
        }
        const removido = this.toDomain(orm);
        await this.repo.delete({ id });
        return removido;
    }
    toDomain = (orm) => {
        return new atelie_1.Atelie(orm.id, orm.especialidadeEra, orm.equipadoCompleto, orm.areaOficinaM2, orm.dataFundacao);
    };
};
exports.AtelieTypeOrmRepository = AtelieTypeOrmRepository;
exports.AtelieTypeOrmRepository = AtelieTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(atelie_orm_entity_1.AtelieOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AtelieTypeOrmRepository);
//# sourceMappingURL=atelie.typeorm.repository.js.map