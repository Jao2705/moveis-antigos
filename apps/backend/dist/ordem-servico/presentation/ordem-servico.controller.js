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
exports.OrdemServicoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ordem_servico_service_1 = require("../application/ordem-servico.service");
const create_ordem_servico_dto_1 = require("./dto/create-ordem-servico.dto");
const update_ordem_servico_dto_1 = require("./dto/update-ordem-servico.dto");
const jwt_auth_guard_1 = require("../../auth/infrastructure/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/infrastructure/guards/roles.guard");
const roles_decorator_1 = require("../../auth/infrastructure/decorators/roles.decorator");
let OrdemServicoController = class OrdemServicoController {
    ordemService;
    constructor(ordemService) {
        this.ordemService = ordemService;
    }
    async findAll(req) {
        if (req.user.role === 'admin') {
            return this.ordemService.findAll();
        }
        return this.ordemService.findByClienteId(req.user.id);
    }
    async create(req, dto) {
        return this.ordemService.create(req.user.id, dto.atelie_id, dto.movel_id ?? null, dto.descricao_problema, dto.tipo_movel_informado ?? '');
    }
    async findById(id, req) {
        if (req.user.role === 'admin') {
            return this.ordemService.findById(id);
        }
        return this.ordemService.findByIdForUser(id, req.user.id);
    }
    async update(id, req, dto) {
        if (req.user.role === 'admin') {
            return this.ordemService.updateByAdmin(id, dto.status, dto.descricao_problema, dto.tipo_movel_informado ?? '', dto.data_previsao_entrega ? new Date(dto.data_previsao_entrega) : null, dto.valor_orcamento ?? null);
        }
        return this.ordemService.cancelByUser(id, req.user.id);
    }
    async delete(id) {
        return this.ordemService.delete(id);
    }
};
exports.OrdemServicoController = OrdemServicoController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'user'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista ordens (Admin: todas, User: apenas suas)' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdemServicoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('user'),
    (0, swagger_1.ApiOperation)({ summary: 'Cria uma nova ordem de serviço (User)' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_ordem_servico_dto_1.CreateOrdemServicoDto]),
    __metadata("design:returntype", Promise)
], OrdemServicoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'user'),
    (0, swagger_1.ApiOperation)({ summary: 'Busca ordem por ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrdemServicoController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'user'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza ordem (Admin: full, User: apenas cancelar)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, update_ordem_servico_dto_1.UpdateOrdemServicoDto]),
    __metadata("design:returntype", Promise)
], OrdemServicoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove uma ordem de serviço (Admin)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrdemServicoController.prototype, "delete", null);
exports.OrdemServicoController = OrdemServicoController = __decorate([
    (0, swagger_1.ApiTags)('Ordens de Serviço'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('ordens'),
    __metadata("design:paramtypes", [ordem_servico_service_1.OrdemServicoService])
], OrdemServicoController);
//# sourceMappingURL=ordem-servico.controller.js.map