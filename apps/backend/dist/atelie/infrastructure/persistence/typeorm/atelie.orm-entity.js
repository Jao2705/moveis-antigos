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
exports.AtelieOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const movel_orm_entity_1 = require("../../../../movel/infrastructure/persistence/typeorm/movel.orm-entity");
let AtelieOrmEntity = class AtelieOrmEntity {
    id;
    especialidadeEra;
    equipadoCompleto;
    areaOficinaM2;
    dataFundacao;
    moveis;
};
exports.AtelieOrmEntity = AtelieOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AtelieOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], AtelieOrmEntity.prototype, "especialidadeEra", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], AtelieOrmEntity.prototype, "equipadoCompleto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AtelieOrmEntity.prototype, "areaOficinaM2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], AtelieOrmEntity.prototype, "dataFundacao", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => movel_orm_entity_1.MovelOrmEntity, (movel) => movel.atelie),
    __metadata("design:type", Array)
], AtelieOrmEntity.prototype, "moveis", void 0);
exports.AtelieOrmEntity = AtelieOrmEntity = __decorate([
    (0, typeorm_1.Entity)('atelie')
], AtelieOrmEntity);
//# sourceMappingURL=atelie.orm-entity.js.map