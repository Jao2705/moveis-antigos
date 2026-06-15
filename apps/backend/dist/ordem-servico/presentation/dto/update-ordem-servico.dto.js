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
exports.UpdateOrdemServicoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateOrdemServicoDto {
    status;
    descricao_problema;
    tipo_movel_informado;
    data_previsao_entrega;
    valor_orcamento;
}
exports.UpdateOrdemServicoDto = UpdateOrdemServicoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'em_orcamento',
        enum: ['solicitado', 'em_orcamento', 'aprovado', 'em_reparo', 'concluido', 'cancelado'],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(['solicitado', 'em_orcamento', 'aprovado', 'em_reparo', 'concluido', 'cancelado']),
    __metadata("design:type", String)
], UpdateOrdemServicoDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cadeira com perna quebrada' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOrdemServicoDto.prototype, "descricao_problema", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'cadeira' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOrdemServicoDto.prototype, "tipo_movel_informado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-07-15', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateOrdemServicoDto.prototype, "data_previsao_entrega", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 350.0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], UpdateOrdemServicoDto.prototype, "valor_orcamento", void 0);
//# sourceMappingURL=update-ordem-servico.dto.js.map