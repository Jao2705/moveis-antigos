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
exports.OrdemServicoTypeOrmRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ordem_servico_1 = require("../../../domain/ordem-servico");
const ordem_servico_orm_entity_1 = require("./ordem-servico.orm-entity");
let OrdemServicoTypeOrmRepository = class OrdemServicoTypeOrmRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(ordem) {
        const orm = this.repo.create({
            cliente_id: ordem.cliente_id,
            atelie_id: ordem.atelie_id,
            movel_id: ordem.movel_id,
            descricao_problema: ordem.descricao_problema,
            tipo_movel_informado: ordem.tipo_movel_informado,
            status: ordem.status,
            data_previsao_entrega: ordem.data_previsao_entrega ?? null,
            valor_orcamento: ordem.valor_orcamento ?? null,
        });
        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }
    async findById(id) {
        const orm = await this.repo.findOneBy({ id });
        return orm ? this.toDomain(orm) : null;
    }
    async findAll() {
        const ordens = await this.repo.find({ order: { id: 'DESC' } });
        return ordens.map(this.toDomain);
    }
    async findByClienteId(clienteId) {
        const ordens = await this.repo.find({
            where: { cliente_id: clienteId },
            order: { id: 'DESC' },
        });
        return ordens.map(this.toDomain);
    }
    async update(ordem) {
        if (ordem.id === null) {
            throw new Error('Ordem de serviço sem ID não pode ser atualizada');
        }
        const orm = await this.repo.findOneBy({ id: ordem.id });
        if (!orm) {
            throw new Error('Ordem de serviço não encontrada para atualizar');
        }
        orm.descricao_problema = ordem.descricao_problema;
        orm.tipo_movel_informado = ordem.tipo_movel_informado;
        orm.status = ordem.status;
        orm.data_previsao_entrega = ordem.data_previsao_entrega ?? null;
        orm.valor_orcamento = ordem.valor_orcamento ?? null;
        orm.movel_id = ordem.movel_id;
        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }
    async delete(id) {
        const orm = await this.repo.findOneBy({ id });
        if (!orm) {
            throw new Error('Ordem de serviço não encontrada para remover');
        }
        const domain = this.toDomain(orm);
        await this.repo.delete({ id });
        return domain;
    }
    toDomain = (orm) => {
        return new ordem_servico_1.OrdemServico(orm.id, orm.cliente_id, orm.atelie_id, orm.movel_id, orm.descricao_problema, orm.tipo_movel_informado, orm.status, orm.data_solicitacao, orm.data_previsao_entrega, orm.valor_orcamento);
    };
};
exports.OrdemServicoTypeOrmRepository = OrdemServicoTypeOrmRepository;
exports.OrdemServicoTypeOrmRepository = OrdemServicoTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ordem_servico_orm_entity_1.OrdemServicoOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrdemServicoTypeOrmRepository);
//# sourceMappingURL=ordem-servico.typeorm.repository.js.map