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
exports.MovelTypeOrmRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const movel_1 = require("../../../domain/movel");
const movel_orm_entity_1 = require("./movel.orm-entity");
let MovelTypeOrmRepository = class MovelTypeOrmRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(movel) {
        const orm = this.repo.create({
            tipoMovel: movel.tipoMovel,
            dataInicioTrab: movel.dataInicioTrab,
            restaurado: movel.restaurado,
            horasHomem: movel.horasHomem,
            atelieId: movel.atelieId,
        });
        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }
    async findById(id) {
        const movel = await this.repo.findOneBy({ id });
        return movel ? this.toDomain(movel) : null;
    }
    async findAll() {
        const moveis = await this.repo.find({ order: { id: "ASC" } });
        return moveis.map(this.toDomain);
    }
    async update(movel) {
        if (movel.id === null) {
            throw new Error("Movel sem ID nao pode ser atualizado");
        }
        const orm = await this.repo.findOneBy({ id: movel.id });
        if (!orm) {
            throw new Error("Movel nao encontrado para atualizar");
        }
        orm.tipoMovel = movel.tipoMovel;
        orm.dataInicioTrab = movel.dataInicioTrab;
        orm.restaurado = movel.restaurado;
        orm.horasHomem = movel.horasHomem;
        orm.atelieId = movel.atelieId;
        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }
    async delete(id) {
        const orm = await this.repo.findOneBy({ id });
        if (!orm) {
            throw new Error("Movel nao encontrado para remover");
        }
        const removido = this.toDomain(orm);
        await this.repo.delete({ id });
        return removido;
    }
    async existsOpenByAtelieAndTipo(atelieId, tipoMovel, ignoreId) {
        const query = this.repo
            .createQueryBuilder("movel")
            .where("movel.atelieId = :atelieId", { atelieId })
            .andWhere("LOWER(movel.tipoMovel) = LOWER(:tipoMovel)", { tipoMovel: tipoMovel.trim() })
            .andWhere("movel.restaurado = :restaurado", { restaurado: false });
        if (ignoreId) {
            query.andWhere("movel.id != :ignoreId", { ignoreId });
        }
        const total = await query.getCount();
        return total > 0;
    }
    toDomain = (orm) => {
        return new movel_1.Movel(orm.id, orm.tipoMovel, orm.dataInicioTrab, orm.restaurado, orm.horasHomem, orm.atelieId);
    };
};
exports.MovelTypeOrmRepository = MovelTypeOrmRepository;
exports.MovelTypeOrmRepository = MovelTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movel_orm_entity_1.MovelOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MovelTypeOrmRepository);
//# sourceMappingURL=movel.typeorm.repository.js.map