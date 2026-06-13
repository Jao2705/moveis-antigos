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
exports.CreateAtelieDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAtelieDto {
    especialidadeEra;
    dataFundacao;
    equipadoCompleto;
    areaOficinaM2;
}
exports.CreateAtelieDto = CreateAtelieDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Barroco' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateAtelieDto.prototype, "especialidadeEra", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2000-04-20' }),
    __metadata("design:type", String)
], CreateAtelieDto.prototype, "dataFundacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], CreateAtelieDto.prototype, "equipadoCompleto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    __metadata("design:type", Number)
], CreateAtelieDto.prototype, "areaOficinaM2", void 0);
//# sourceMappingURL=create-atelie.dto.js.map