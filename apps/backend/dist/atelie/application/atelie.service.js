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
exports.AtelieService = void 0;
const common_1 = require("@nestjs/common");
const atelie_1 = require("../domain/atelie");
const area_exception_1 = require("../domain/area.exception");
const atelie_not_found_exception_1 = require("../domain/atelie.not.found.exception");
const data_exception_1 = require("../domain/data.exception");
const equipado_exception_1 = require("../domain/equipado.exception");
const especiladade_exists_exception_1 = require("../domain/especiladade-exists.exception");
let AtelieService = class AtelieService {
    atelieRepo;
    constructor(atelieRepo) {
        this.atelieRepo = atelieRepo;
    }
    async create(especialidadeEra, equipadoCompleto, areaOficinaM2, dataFundacao) {
        this.validarAtelie(especialidadeEra, equipadoCompleto, areaOficinaM2, dataFundacao);
        const atelie = new atelie_1.Atelie(null, especialidadeEra.trim(), equipadoCompleto, areaOficinaM2, new Date(dataFundacao));
        return this.atelieRepo.create(atelie);
    }
    async findById(id) {
        const atelie = await this.atelieRepo.findById(id);
        if (!atelie) {
            throw new atelie_not_found_exception_1.AtelieNotFoundException(id);
        }
        return atelie;
    }
    async findAll() {
        return this.atelieRepo.findAll();
    }
    async findByIdWithMoveis(id) {
        const atelie = await this.atelieRepo.findByIdWithMoveis(id);
        if (!atelie) {
            throw new atelie_not_found_exception_1.AtelieNotFoundException(id);
        }
        return atelie;
    }
    async update(id, equipamento, area) {
        const Atelie = await this.atelieRepo.findById(id);
        if (!Atelie) {
            throw new atelie_not_found_exception_1.AtelieNotFoundException(id);
        }
        if (typeof equipamento !== 'boolean') {
            throw new equipado_exception_1.EquipadoExistsExcepiton();
        }
        if (typeof area !== 'number' || Number.isNaN(area)) {
            throw new area_exception_1.AreaExistsException();
        }
        if (area < 50) {
            throw new area_exception_1.AreaExistsException();
        }
        Atelie.equipadoCompleto = equipamento;
        Atelie.areaOficinaM2 = area;
        return this.atelieRepo.update(Atelie);
    }
    async delete(id) {
        const atelie = await this.atelieRepo.findById(id);
        if (!atelie) {
            throw new atelie_not_found_exception_1.AtelieNotFoundException(id);
        }
        return this.atelieRepo.delete(id);
    }
    validarAtelie(especialidadeEra, equipadoCompleto, areaOficinaM2, dataFundacao) {
        if (!especialidadeEra || especialidadeEra.trim() === '') {
            throw new especiladade_exists_exception_1.EspecialidadeExistsException();
        }
        if (especialidadeEra.trim().length > 100) {
            throw new especiladade_exists_exception_1.EspecialidadeExistsException();
        }
        if (typeof equipadoCompleto !== 'boolean') {
            throw new equipado_exception_1.EquipadoExistsExcepiton();
        }
        if (typeof areaOficinaM2 !== 'number' || Number.isNaN(areaOficinaM2)) {
            throw new area_exception_1.AreaExistsException();
        }
        if (areaOficinaM2 < 50) {
            throw new area_exception_1.AreaExistsException();
        }
        const data = new Date(dataFundacao);
        if (Number.isNaN(data.getTime())) {
            throw new data_exception_1.DataException(data);
        }
        const hoje = new Date();
        if (data.getTime() > hoje.getTime()) {
            throw new data_exception_1.DataException(data);
        }
    }
};
exports.AtelieService = AtelieService;
exports.AtelieService = AtelieService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AtelieRepositoryPort')),
    __metadata("design:paramtypes", [Object])
], AtelieService);
//# sourceMappingURL=atelie.service.js.map