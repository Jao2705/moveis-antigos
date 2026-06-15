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
exports.OrdemServicoService = void 0;
const common_1 = require("@nestjs/common");
const ordem_servico_1 = require("../domain/ordem-servico");
const ordem_servico_exceptions_1 = require("../domain/ordem-servico.exceptions");
let OrdemServicoService = class OrdemServicoService {
    ordemRepo;
    constructor(ordemRepo) {
        this.ordemRepo = ordemRepo;
    }
    async create(clienteId, atelieId, movelId, descricaoProblema, tipoMovelInformado) {
        const ordem = new ordem_servico_1.OrdemServico(null, clienteId, atelieId, movelId, descricaoProblema, tipoMovelInformado, 'solicitado');
        return this.ordemRepo.create(ordem);
    }
    async findAll() {
        return this.ordemRepo.findAll();
    }
    async findByClienteId(clienteId) {
        return this.ordemRepo.findByClienteId(clienteId);
    }
    async findById(id) {
        const ordem = await this.ordemRepo.findById(id);
        if (!ordem) {
            throw new ordem_servico_exceptions_1.OrdemServicoNotFoundException(id);
        }
        return ordem;
    }
    async findByIdForUser(id, userId) {
        const ordem = await this.findById(id);
        if (ordem.cliente_id !== userId) {
            throw new ordem_servico_exceptions_1.OrdemServicoAcessoNegadoException();
        }
        return ordem;
    }
    async updateByAdmin(id, status, descricaoProblema, tipoMovelInformado, dataPrevisaoEntrega, valorOrcamento) {
        const ordem = await this.findById(id);
        ordem.status = status;
        ordem.descricao_problema = descricaoProblema;
        ordem.tipo_movel_informado = tipoMovelInformado;
        ordem.data_previsao_entrega = dataPrevisaoEntrega;
        ordem.valor_orcamento = valorOrcamento;
        return this.ordemRepo.update(ordem);
    }
    async cancelByUser(id, userId) {
        const ordem = await this.findById(id);
        if (ordem.cliente_id !== userId) {
            throw new ordem_servico_exceptions_1.OrdemServicoAcessoNegadoException();
        }
        if (ordem.status !== 'solicitado' && ordem.status !== 'em_orcamento') {
            throw new ordem_servico_exceptions_1.OrdemServicoCancelamentoNaoPermitidoException();
        }
        ordem.status = 'cancelado';
        return this.ordemRepo.update(ordem);
    }
    async delete(id) {
        const ordem = await this.findById(id);
        return this.ordemRepo.delete(ordem.id);
    }
};
exports.OrdemServicoService = OrdemServicoService;
exports.OrdemServicoService = OrdemServicoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('OrdemServicoRepositoryPort')),
    __metadata("design:paramtypes", [Object])
], OrdemServicoService);
//# sourceMappingURL=ordem-servico.service.js.map