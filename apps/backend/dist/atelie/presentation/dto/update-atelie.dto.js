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
exports.UpdateAtelieDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateAtelieDto {
    especialidadeEra;
    dataFundacao;
    equipadoCompleto;
    areaOficinaM2;
}
exports.UpdateAtelieDto = UpdateAtelieDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Luis XV" }),
    __metadata("design:type", String)
], UpdateAtelieDto.prototype, "especialidadeEra", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2000-04-20" }),
    __metadata("design:type", String)
], UpdateAtelieDto.prototype, "dataFundacao", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    __metadata("design:type", Boolean)
], UpdateAtelieDto.prototype, "equipadoCompleto", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 120 }),
    __metadata("design:type", Number)
], UpdateAtelieDto.prototype, "areaOficinaM2", void 0);
//# sourceMappingURL=update-atelie.dto.js.map