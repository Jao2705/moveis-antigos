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
exports.CreateMovelDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateMovelDto {
    tipoMovel;
    dataInicioTrab;
    restaurado;
    horasHomem;
    atelieId;
}
exports.CreateMovelDto = CreateMovelDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Comoda Luis XV' }),
    __metadata("design:type", String)
], CreateMovelDto.prototype, "tipoMovel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2021-08-15' }),
    __metadata("design:type", String)
], CreateMovelDto.prototype, "dataInicioTrab", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], CreateMovelDto.prototype, "restaurado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 80 }),
    __metadata("design:type", Number)
], CreateMovelDto.prototype, "horasHomem", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CreateMovelDto.prototype, "atelieId", void 0);
//# sourceMappingURL=create-movel.dto.js.map