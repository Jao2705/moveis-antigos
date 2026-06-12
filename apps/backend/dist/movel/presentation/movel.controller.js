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
exports.MovelController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const movel_service_1 = require("../application/movel.service");
const create_movel_dto_1 = require("./dto/create-movel.dto");
const update_movel_dto_1 = require("./dto/update-movel.dto");
let MovelController = class MovelController {
    movelService;
    constructor(movelService) {
        this.movelService = movelService;
    }
    create(dto) {
        return this.movelService.create(dto.tipoMovel, dto.dataInicioTrab, dto.restaurado, dto.horasHomem, dto.atelieId);
    }
    findAll() {
        return this.movelService.findAll();
    }
    findById(id) {
        return this.movelService.findById(Number(id));
    }
    update(id, dto) {
        return this.movelService.update(Number(id), dto.restaurado, dto.horasHomem);
    }
    delete(id) {
        return this.movelService.delete(Number(id));
    }
};
exports.MovelController = MovelController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Cria um movel" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_movel_dto_1.CreateMovelDto]),
    __metadata("design:returntype", void 0)
], MovelController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Lista todos os moveis" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MovelController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiParam)({ name: "id", example: 1 }),
    (0, swagger_1.ApiOperation)({ summary: "Busca movel por id" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MovelController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, swagger_1.ApiParam)({ name: "id", example: 1 }),
    (0, swagger_1.ApiOperation)({ summary: "Atualiza movel" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_movel_dto_1.UpdateMovelDto]),
    __metadata("design:returntype", void 0)
], MovelController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiParam)({ name: "id", example: 1 }),
    (0, swagger_1.ApiOperation)({ summary: "Remove movel" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MovelController.prototype, "delete", null);
exports.MovelController = MovelController = __decorate([
    (0, swagger_1.ApiTags)("movel"),
    (0, common_1.Controller)("movel"),
    __metadata("design:paramtypes", [movel_service_1.MovelService])
], MovelController);
//# sourceMappingURL=movel.controller.js.map