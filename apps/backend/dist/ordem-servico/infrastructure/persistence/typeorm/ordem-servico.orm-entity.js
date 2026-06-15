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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdemServicoOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const user_orm_entity_1 = require("../../../../users/infrastructure/persistence/typeorm/user.orm-entity");
const atelie_orm_entity_1 = require("../../../../atelie/infrastructure/persistence/typeorm/atelie.orm-entity");
const movel_orm_entity_1 = require("../../../../movel/infrastructure/persistence/typeorm/movel.orm-entity");
let OrdemServicoOrmEntity = class OrdemServicoOrmEntity {
    id;
    cliente_id;
    cliente;
    atelie_id;
    atelie;
    movel_id;
    movel;
    descricao_problema;
    tipo_movel_informado;
    status;
    data_solicitacao;
    data_previsao_entrega;
    valor_orcamento;
};
exports.OrdemServicoOrmEntity = OrdemServicoOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrdemServicoOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrdemServicoOrmEntity.prototype, "cliente_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_orm_entity_1.UserOrmEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'cliente_id' }),
    __metadata("design:type", user_orm_entity_1.UserOrmEntity)
], OrdemServicoOrmEntity.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrdemServicoOrmEntity.prototype, "atelie_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => atelie_orm_entity_1.AtelieOrmEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'atelie_id' }),
    __metadata("design:type", atelie_orm_entity_1.AtelieOrmEntity)
], OrdemServicoOrmEntity.prototype, "atelie", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], OrdemServicoOrmEntity.prototype, "movel_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => movel_orm_entity_1.MovelOrmEntity, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'movel_id' }),
    __metadata("design:type", Object)
], OrdemServicoOrmEntity.prototype, "movel", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], OrdemServicoOrmEntity.prototype, "descricao_problema", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, default: '' }),
    __metadata("design:type", String)
], OrdemServicoOrmEntity.prototype, "tipo_movel_informado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: 'solicitado',
    }),
    __metadata("design:type", String)
], OrdemServicoOrmEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrdemServicoOrmEntity.prototype, "data_solicitacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Object)
], OrdemServicoOrmEntity.prototype, "data_previsao_entrega", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], OrdemServicoOrmEntity.prototype, "valor_orcamento", void 0);
exports.OrdemServicoOrmEntity = OrdemServicoOrmEntity = __decorate([
    (0, typeorm_1.Entity)('ordem_servico')
], OrdemServicoOrmEntity);
//# sourceMappingURL=ordem-servico.orm-entity.js.map