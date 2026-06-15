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
exports.CreateOrdemServicoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateOrdemServicoDto {
    atelie_id;
    movel_id;
    descricao_problema;
    tipo_movel_informado;
}
exports.CreateOrdemServicoDto = CreateOrdemServicoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID do ateliê' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrdemServicoDto.prototype, "atelie_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: null, required: false, description: 'ID do móvel (opcional)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], CreateOrdemServicoDto.prototype, "movel_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cadeira com perna quebrada', description: 'Descrição do problema' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrdemServicoDto.prototype, "descricao_problema", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'cadeira', description: 'Tipo do móvel informado pelo cliente' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrdemServicoDto.prototype, "tipo_movel_informado", void 0);
//# sourceMappingURL=create-ordem-servico.dto.js.map