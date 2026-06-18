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
exports.MovelOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const atelie_orm_entity_1 = require("../../../../atelie/infrastructure/persistence/typeorm/atelie.orm-entity");
const user_orm_entity_1 = require("../../../../users/infrastructure/persistence/typeorm/user.orm-entity");
let MovelOrmEntity = class MovelOrmEntity {
    id;
    tipoMovel;
    dataInicioTrab;
    restaurado;
    horasHomem;
    atelieId;
    ownerUserId;
    atelie;
    owner;
};
exports.MovelOrmEntity = MovelOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MovelOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], MovelOrmEntity.prototype, "tipoMovel", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], MovelOrmEntity.prototype, "dataInicioTrab", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], MovelOrmEntity.prototype, "restaurado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MovelOrmEntity.prototype, "horasHomem", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MovelOrmEntity.prototype, "atelieId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], MovelOrmEntity.prototype, "ownerUserId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => atelie_orm_entity_1.AtelieOrmEntity, (atelie) => atelie.moveis, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'atelieId' }),
    __metadata("design:type", atelie_orm_entity_1.AtelieOrmEntity)
], MovelOrmEntity.prototype, "atelie", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_orm_entity_1.UserOrmEntity, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'ownerUserId' }),
    __metadata("design:type", Object)
], MovelOrmEntity.prototype, "owner", void 0);
exports.MovelOrmEntity = MovelOrmEntity = __decorate([
    (0, typeorm_1.Entity)('movel')
], MovelOrmEntity);
//# sourceMappingURL=movel.orm-entity.js.map