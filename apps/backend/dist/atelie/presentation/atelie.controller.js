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
exports.AtelieController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const atelie_service_1 = require("../application/atelie.service");
const create_atelie_dto_1 = require("./dto/create-atelie.dto");
const update_atelie_dto_1 = require("./dto/update-atelie.dto");
let AtelieController = class AtelieController {
    atelieService;
    constructor(atelieService) {
        this.atelieService = atelieService;
    }
    create(dto) {
        return this.atelieService.create(dto.especialidadeEra, dto.equipadoCompleto, dto.areaOficinaM2, dto.dataFundacao);
    }
    findAll() {
        return this.atelieService.findAll();
    }
    findByIdComMoveis(id) {
        return this.atelieService.findByIdWithMoveis(Number(id));
    }
    findById(id) {
        return this.atelieService.findById(Number(id));
    }
    update(id, dto) {
        return this.atelieService.update(Number(id), dto.equipadoCompleto, dto.areaOficinaM2);
    }
    delete(id) {
        return this.atelieService.delete(Number(id));
    }
};
exports.AtelieController = AtelieController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cria um atelie' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_atelie_dto_1.CreateAtelieDto]),
    __metadata("design:returntype", void 0)
], AtelieController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista de atelies' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AtelieController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id/com-moveis'),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiOperation)({ summary: 'Busca um atelie com seus moveis' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AtelieController.prototype, "findByIdComMoveis", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiOperation)({ summary: 'Busca um atelie por id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AtelieController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza os dados de um atelie' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_atelie_dto_1.UpdateAtelieDto]),
    __metadata("design:returntype", void 0)
], AtelieController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiOperation)({ summary: 'Remove um atelie' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AtelieController.prototype, "delete", null);
exports.AtelieController = AtelieController = __decorate([
    (0, swagger_1.ApiTags)('atelie'),
    (0, common_1.Controller)('atelie'),
    __metadata("design:paramtypes", [atelie_service_1.AtelieService])
], AtelieController);
//# sourceMappingURL=atelie.controller.js.map