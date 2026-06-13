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
exports.MovelService = void 0;
const common_1 = require("@nestjs/common");
const movel_1 = require("../domain/movel");
const movel_exceptions_1 = require("../domain/movel.exceptions");
let MovelService = class MovelService {
    movelRepo;
    atelieRepo;
    constructor(movelRepo, atelieRepo) {
        this.movelRepo = movelRepo;
        this.atelieRepo = atelieRepo;
    }
    async create(tipoMovel, dataInicioTrab, restaurado, horasHomem, atelieId) {
        const movel = new movel_1.Movel(null, tipoMovel?.trim(), new Date(dataInicioTrab), restaurado, horasHomem, atelieId);
        await this.validarRegrasNegocio(movel);
        return this.movelRepo.create(movel);
    }
    async findById(id) {
        const movel = await this.movelRepo.findById(id);
        if (!movel) {
            throw new movel_exceptions_1.MovelNotFoundException(id);
        }
        return movel;
    }
    async findAll() {
        return this.movelRepo.findAll();
    }
    async update(id, restaurado, horasHomem) {
        const movel = await this.movelRepo.findById(id);
        if (!movel) {
            throw new movel_exceptions_1.MovelNotFoundException(id);
        }
        movel.restaurado = restaurado;
        movel.horasHomem = horasHomem;
        await this.validarRegrasNegocio(movel, id);
        return this.movelRepo.update(movel);
    }
    async delete(id) {
        const movel = await this.movelRepo.findById(id);
        if (!movel) {
            throw new movel_exceptions_1.MovelNotFoundException(id);
        }
        return this.movelRepo.delete(id);
    }
    async validarRegrasNegocio(movel, ignoreId) {
        if (!movel.tipoMovel || movel.tipoMovel === '') {
            throw new movel_exceptions_1.MovelCampoObrigatorioException('tipoMovel');
        }
        if (!(movel.dataInicioTrab instanceof Date) ||
            Number.isNaN(movel.dataInicioTrab.getTime())) {
            throw new movel_exceptions_1.MovelDataInicioInvalidaException();
        }
        if (typeof movel.restaurado !== 'boolean') {
            throw new movel_exceptions_1.MovelCampoObrigatorioException('restaurado');
        }
        if (typeof movel.horasHomem !== 'number' ||
            Number.isNaN(movel.horasHomem)) {
            throw new movel_exceptions_1.MovelCampoObrigatorioException('horasHomem');
        }
        if (movel.horasHomem < 10 || movel.horasHomem > 1000) {
            throw new movel_exceptions_1.MovelHorasHomemInvalidaException();
        }
        if (movel.restaurado && movel.horasHomem < 40) {
            throw new movel_exceptions_1.MovelRestauradoInconsistenteException();
        }
        if (!movel.restaurado &&
            (movel.horasHomem < 10 || movel.horasHomem > 1000)) {
            throw new movel_exceptions_1.MovelEmProcessoHorasInvalidaException();
        }
        if (!Number.isInteger(movel.atelieId) || movel.atelieId <= 0) {
            throw new movel_exceptions_1.MovelCampoObrigatorioException('atelieId');
        }
        const atelie = await this.atelieRepo.findById(movel.atelieId);
        if (!atelie) {
            throw new movel_exceptions_1.AtelieNaoEncontradoParaMovelException(movel.atelieId);
        }
        const dataFundacao = new Date(atelie.dataFundacao);
        if (movel.dataInicioTrab.getTime() < dataFundacao.getTime()) {
            throw new movel_exceptions_1.MovelDataAnteriorFundacaoException();
        }
        if (!movel.restaurado) {
            const duplicado = await this.movelRepo.existsOpenByAtelieAndTipo(movel.atelieId, movel.tipoMovel, ignoreId);
            if (duplicado) {
                throw new movel_exceptions_1.MovelDuplicadoEmRestauracaoException();
            }
        }
    }
};
exports.MovelService = MovelService;
exports.MovelService = MovelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MovelRepositoryPort')),
    __param(1, (0, common_1.Inject)('AtelieRepositoryPort')),
    __metadata("design:paramtypes", [Object, Object])
], MovelService);
//# sourceMappingURL=movel.service.js.map