/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../packages/utils/src/index.ts"
/*!*****************************************!*\
  !*** ../../packages/utils/src/index.ts ***!
  \*****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isCommonMovelType = exports.commonMovelTypeExamples = exports.COMMON_MOVEL_TYPES = void 0;
var movel_1 = __webpack_require__(/*! ./movel */ "../../packages/utils/src/movel.ts");
Object.defineProperty(exports, "COMMON_MOVEL_TYPES", ({ enumerable: true, get: function () { return movel_1.COMMON_MOVEL_TYPES; } }));
Object.defineProperty(exports, "commonMovelTypeExamples", ({ enumerable: true, get: function () { return movel_1.commonMovelTypeExamples; } }));
Object.defineProperty(exports, "isCommonMovelType", ({ enumerable: true, get: function () { return movel_1.isCommonMovelType; } }));


/***/ },

/***/ "../../packages/utils/src/movel.ts"
/*!*****************************************!*\
  !*** ../../packages/utils/src/movel.ts ***!
  \*****************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.COMMON_MOVEL_TYPES = void 0;
exports.isCommonMovelType = isCommonMovelType;
exports.commonMovelTypeExamples = commonMovelTypeExamples;
exports.COMMON_MOVEL_TYPES = [
    'Sofá',
    'Mesa de centro',
    'Rack',
    'Estante',
    'Prateleira',
    'Poltrona',
    'Armário',
    'Mesa',
    'Suporte',
    'Cama',
    'Guarda roupa',
    'Espelho',
    'Cômoda',
    'Escrivaninha',
    'Banco',
    'Puff',
    'Painel',
    'Varal',
];
const NON_ALPHANUMERIC = /[^a-z0-9]+/g;
function normalizeMovelType(value) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(NON_ALPHANUMERIC, ' ')
        .replace(/\s+/g, ' ');
}
function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function isCommonMovelType(value) {
    const normalizedValue = normalizeMovelType(value);
    if (!normalizedValue) {
        return false;
    }
    return exports.COMMON_MOVEL_TYPES.some((item) => {
        const normalizedItem = normalizeMovelType(item);
        const pattern = new RegExp(`(^|[^a-z0-9])${escapeRegExp(normalizedItem)}([^a-z0-9]|$)`);
        return pattern.test(normalizedValue);
    });
}
function commonMovelTypeExamples() {
    return exports.COMMON_MOVEL_TYPES.slice(0, 4).join(', ');
}


/***/ },

/***/ "./src/app.controller.ts"
/*!*******************************!*\
  !*** ./src/app.controller.ts ***!
  \*******************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app.service.ts");
let AppController = class AppController {
    appService;
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ },

/***/ "./src/app.module.ts"
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./src/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app.service.ts");
const typeorm_module_1 = __webpack_require__(/*! ./shared/database/typeorm.module */ "./src/shared/database/typeorm.module.ts");
const atelie_module_1 = __webpack_require__(/*! ./atelie/atelie.module */ "./src/atelie/atelie.module.ts");
const movel_module_1 = __webpack_require__(/*! ./movel/movel.module */ "./src/movel/movel.module.ts");
const auth_module_1 = __webpack_require__(/*! ./auth/auth.module */ "./src/auth/auth.module.ts");
const users_module_1 = __webpack_require__(/*! ./users/users.module */ "./src/users/users.module.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_module_1.DatabaseModule, auth_module_1.AuthModule, users_module_1.UsersModule, atelie_module_1.AtelieModule, movel_module_1.MovelModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ },

/***/ "./src/app.service.ts"
/*!****************************!*\
  !*** ./src/app.service.ts ***!
  \****************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AppService = class AppService {
    getHello() {
        return 'Pindamonhangaba';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ },

/***/ "./src/atelie/application/atelie.service.ts"
/*!**************************************************!*\
  !*** ./src/atelie/application/atelie.service.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AtelieService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const atelie_1 = __webpack_require__(/*! ../domain/atelie */ "./src/atelie/domain/atelie.ts");
const area_exception_1 = __webpack_require__(/*! ../domain/area.exception */ "./src/atelie/domain/area.exception.ts");
const atelie_not_found_exception_1 = __webpack_require__(/*! ../domain/atelie.not.found.exception */ "./src/atelie/domain/atelie.not.found.exception.ts");
const data_exception_1 = __webpack_require__(/*! ../domain/data.exception */ "./src/atelie/domain/data.exception.ts");
const equipado_exception_1 = __webpack_require__(/*! ../domain/equipado.exception */ "./src/atelie/domain/equipado.exception.ts");
const especiladade_exists_exception_1 = __webpack_require__(/*! ../domain/especiladade-exists.exception */ "./src/atelie/domain/especiladade-exists.exception.ts");
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


/***/ },

/***/ "./src/atelie/atelie.module.ts"
/*!*************************************!*\
  !*** ./src/atelie/atelie.module.ts ***!
  \*************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AtelieModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const atelie_orm_entity_1 = __webpack_require__(/*! ./infrastructure/persistence/typeorm/atelie.orm-entity */ "./src/atelie/infrastructure/persistence/typeorm/atelie.orm-entity.ts");
const atelie_controller_1 = __webpack_require__(/*! ./presentation/atelie.controller */ "./src/atelie/presentation/atelie.controller.ts");
const atelie_typeorm_repository_1 = __webpack_require__(/*! ./infrastructure/persistence/typeorm/atelie.typeorm.repository */ "./src/atelie/infrastructure/persistence/typeorm/atelie.typeorm.repository.ts");
const atelie_service_1 = __webpack_require__(/*! ./application/atelie.service */ "./src/atelie/application/atelie.service.ts");
let AtelieModule = class AtelieModule {
};
exports.AtelieModule = AtelieModule;
exports.AtelieModule = AtelieModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([atelie_orm_entity_1.AtelieOrmEntity])],
        controllers: [atelie_controller_1.AtelieController],
        providers: [
            atelie_service_1.AtelieService,
            {
                provide: 'AtelieRepositoryPort',
                useClass: atelie_typeorm_repository_1.AtelieTypeOrmRepository,
            },
        ],
        exports: ['AtelieRepositoryPort'],
    })
], AtelieModule);


/***/ },

/***/ "./src/atelie/domain/area.exception.ts"
/*!*********************************************!*\
  !*** ./src/atelie/domain/area.exception.ts ***!
  \*********************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AreaExistsException = void 0;
class AreaExistsException extends Error {
    getResponse;
    constructor() {
        super('Área inválida');
    }
}
exports.AreaExistsException = AreaExistsException;


/***/ },

/***/ "./src/atelie/domain/atelie.not.found.exception.ts"
/*!*********************************************************!*\
  !*** ./src/atelie/domain/atelie.not.found.exception.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AtelieNotFoundException = void 0;
class AtelieNotFoundException extends Error {
    constructor(id) {
        super(`Atelie com id ${id} nao encontrado`);
    }
}
exports.AtelieNotFoundException = AtelieNotFoundException;


/***/ },

/***/ "./src/atelie/domain/atelie.ts"
/*!*************************************!*\
  !*** ./src/atelie/domain/atelie.ts ***!
  \*************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Atelie = void 0;
class Atelie {
    id;
    especialidadeEra;
    equipadoCompleto;
    areaOficinaM2;
    dataFundacao;
    constructor(id, especialidadeEra, equipadoCompleto, areaOficinaM2, dataFundacao) {
        this.id = id;
        this.especialidadeEra = especialidadeEra;
        this.equipadoCompleto = equipadoCompleto;
        this.areaOficinaM2 = areaOficinaM2;
        this.dataFundacao = dataFundacao;
    }
}
exports.Atelie = Atelie;


/***/ },

/***/ "./src/atelie/domain/data.exception.ts"
/*!*********************************************!*\
  !*** ./src/atelie/domain/data.exception.ts ***!
  \*********************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataException = void 0;
class DataException extends Error {
    getResponse;
    constructor(data) {
        super(`A data ${data.toISOString()} é inválida`);
    }
}
exports.DataException = DataException;


/***/ },

/***/ "./src/atelie/domain/equipado.exception.ts"
/*!*************************************************!*\
  !*** ./src/atelie/domain/equipado.exception.ts ***!
  \*************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EquipadoExistsExcepiton = void 0;
class EquipadoExistsExcepiton extends Error {
    getResponse;
    constructor() {
        super('Campo equipado inválido');
    }
}
exports.EquipadoExistsExcepiton = EquipadoExistsExcepiton;


/***/ },

/***/ "./src/atelie/domain/especiladade-exists.exception.ts"
/*!************************************************************!*\
  !*** ./src/atelie/domain/especiladade-exists.exception.ts ***!
  \************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EspecialidadeExistsException = void 0;
class EspecialidadeExistsException extends Error {
    getResponse;
    constructor() {
        super('Especialidade inválida ou excede o limite de caracteres');
    }
}
exports.EspecialidadeExistsException = EspecialidadeExistsException;


/***/ },

/***/ "./src/atelie/infrastructure/persistence/typeorm/atelie.orm-entity.ts"
/*!****************************************************************************!*\
  !*** ./src/atelie/infrastructure/persistence/typeorm/atelie.orm-entity.ts ***!
  \****************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AtelieOrmEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const movel_orm_entity_1 = __webpack_require__(/*! src/movel/infrastructure/persistence/typeorm/movel.orm-entity */ "./src/movel/infrastructure/persistence/typeorm/movel.orm-entity.ts");
let AtelieOrmEntity = class AtelieOrmEntity {
    id;
    especialidadeEra;
    equipadoCompleto;
    areaOficinaM2;
    dataFundacao;
    moveis;
};
exports.AtelieOrmEntity = AtelieOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AtelieOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], AtelieOrmEntity.prototype, "especialidadeEra", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], AtelieOrmEntity.prototype, "equipadoCompleto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AtelieOrmEntity.prototype, "areaOficinaM2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], AtelieOrmEntity.prototype, "dataFundacao", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => movel_orm_entity_1.MovelOrmEntity, (movel) => movel.atelie),
    __metadata("design:type", Array)
], AtelieOrmEntity.prototype, "moveis", void 0);
exports.AtelieOrmEntity = AtelieOrmEntity = __decorate([
    (0, typeorm_1.Entity)('atelie')
], AtelieOrmEntity);


/***/ },

/***/ "./src/atelie/infrastructure/persistence/typeorm/atelie.typeorm.repository.ts"
/*!************************************************************************************!*\
  !*** ./src/atelie/infrastructure/persistence/typeorm/atelie.typeorm.repository.ts ***!
  \************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AtelieTypeOrmRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const atelie_1 = __webpack_require__(/*! src/atelie/domain/atelie */ "./src/atelie/domain/atelie.ts");
const atelie_orm_entity_1 = __webpack_require__(/*! ./atelie.orm-entity */ "./src/atelie/infrastructure/persistence/typeorm/atelie.orm-entity.ts");
let AtelieTypeOrmRepository = class AtelieTypeOrmRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(atelie) {
        const orm = this.repo.create({
            especialidadeEra: atelie.especialidadeEra,
            equipadoCompleto: atelie.equipadoCompleto,
            areaOficinaM2: atelie.areaOficinaM2,
            dataFundacao: atelie.dataFundacao,
        });
        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }
    async findById(id) {
        const atelie = await this.repo.findOneBy({ id });
        return atelie ? this.toDomain(atelie) : null;
    }
    async findAll() {
        const atelies = await this.repo.find({ order: { id: 'ASC' } });
        return atelies.map(this.toDomain);
    }
    async findByIdWithMoveis(id) {
        const atelie = await this.repo.findOne({
            where: { id },
            relations: ['moveis'],
            order: { moveis: { id: 'ASC' } },
        });
        if (!atelie) {
            return null;
        }
        return {
            id: atelie.id,
            especialidadeEra: atelie.especialidadeEra,
            equipadoCompleto: atelie.equipadoCompleto,
            areaOficinaM2: atelie.areaOficinaM2,
            dataFundacao: atelie.dataFundacao,
            moveis: (atelie.moveis ?? []).map((movel) => ({
                id: movel.id,
                tipoMovel: movel.tipoMovel,
                dataInicioTrab: movel.dataInicioTrab,
                restaurado: movel.restaurado,
                horasHomem: movel.horasHomem,
                atelieId: movel.atelieId,
                ownerUserId: movel.ownerUserId,
            })),
        };
    }
    async update(atelie) {
        if (atelie.id === null) {
            throw new Error('Atelie sem ID nao pode ser atualizado');
        }
        const orm = await this.repo.findOneBy({ id: atelie.id });
        if (!orm) {
            throw new Error('Atelie nao encontrado para atualizar');
        }
        orm.especialidadeEra = atelie.especialidadeEra;
        orm.equipadoCompleto = atelie.equipadoCompleto;
        orm.areaOficinaM2 = atelie.areaOficinaM2;
        orm.dataFundacao = atelie.dataFundacao;
        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }
    async delete(id) {
        const orm = await this.repo.findOneBy({ id });
        if (!orm) {
            throw new Error('Atelie nao encontrado para remover');
        }
        const removido = this.toDomain(orm);
        await this.repo.delete({ id });
        return removido;
    }
    toDomain = (orm) => {
        return new atelie_1.Atelie(orm.id, orm.especialidadeEra, orm.equipadoCompleto, orm.areaOficinaM2, orm.dataFundacao);
    };
};
exports.AtelieTypeOrmRepository = AtelieTypeOrmRepository;
exports.AtelieTypeOrmRepository = AtelieTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(atelie_orm_entity_1.AtelieOrmEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], AtelieTypeOrmRepository);


/***/ },

/***/ "./src/atelie/presentation/atelie.controller.ts"
/*!******************************************************!*\
  !*** ./src/atelie/presentation/atelie.controller.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AtelieController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const atelie_service_1 = __webpack_require__(/*! ../application/atelie.service */ "./src/atelie/application/atelie.service.ts");
const create_atelie_dto_1 = __webpack_require__(/*! ./dto/create-atelie.dto */ "./src/atelie/presentation/dto/create-atelie.dto.ts");
const update_atelie_dto_1 = __webpack_require__(/*! ./dto/update-atelie.dto */ "./src/atelie/presentation/dto/update-atelie.dto.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! src/auth/infrastructure/guards/jwt-auth.guard */ "./src/auth/infrastructure/guards/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! src/auth/infrastructure/guards/roles.guard */ "./src/auth/infrastructure/guards/roles.guard.ts");
const roles_decorator_1 = __webpack_require__(/*! src/auth/infrastructure/decorators/roles.decorator */ "./src/auth/infrastructure/decorators/roles.decorator.ts");
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
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Cria um atelie (Admin)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_atelie_dto_1.CreateAtelieDto !== "undefined" && create_atelie_dto_1.CreateAtelieDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], AtelieController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'user'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista de atelies' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AtelieController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id/com-moveis'),
    (0, roles_decorator_1.Roles)('admin', 'user'),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiOperation)({ summary: 'Busca um atelie com seus moveis' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AtelieController.prototype, "findByIdComMoveis", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'user'),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiOperation)({ summary: 'Busca um atelie por id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AtelieController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza os dados de um atelie (Admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_atelie_dto_1.UpdateAtelieDto !== "undefined" && update_atelie_dto_1.UpdateAtelieDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], AtelieController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiOperation)({ summary: 'Remove um atelie (Admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AtelieController.prototype, "delete", null);
exports.AtelieController = AtelieController = __decorate([
    (0, swagger_1.ApiTags)('atelie'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('atelie'),
    __metadata("design:paramtypes", [typeof (_a = typeof atelie_service_1.AtelieService !== "undefined" && atelie_service_1.AtelieService) === "function" ? _a : Object])
], AtelieController);


/***/ },

/***/ "./src/atelie/presentation/dto/create-atelie.dto.ts"
/*!**********************************************************!*\
  !*** ./src/atelie/presentation/dto/create-atelie.dto.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAtelieDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateAtelieDto {
    especialidadeEra;
    dataFundacao;
    equipadoCompleto;
    areaOficinaM2;
}
exports.CreateAtelieDto = CreateAtelieDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Barroco' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateAtelieDto.prototype, "especialidadeEra", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2000-04-20' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateAtelieDto.prototype, "dataFundacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAtelieDto.prototype, "equipadoCompleto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(50),
    __metadata("design:type", Number)
], CreateAtelieDto.prototype, "areaOficinaM2", void 0);


/***/ },

/***/ "./src/atelie/presentation/dto/update-atelie.dto.ts"
/*!**********************************************************!*\
  !*** ./src/atelie/presentation/dto/update-atelie.dto.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAtelieDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateAtelieDto {
    especialidadeEra;
    dataFundacao;
    equipadoCompleto;
    areaOficinaM2;
}
exports.UpdateAtelieDto = UpdateAtelieDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Luis XV' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateAtelieDto.prototype, "especialidadeEra", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2000-04-20' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateAtelieDto.prototype, "dataFundacao", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateAtelieDto.prototype, "equipadoCompleto", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 120 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(50),
    __metadata("design:type", Number)
], UpdateAtelieDto.prototype, "areaOficinaM2", void 0);


/***/ },

/***/ "./src/auth/application/auth.service.ts"
/*!**********************************************!*\
  !*** ./src/auth/application/auth.service.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const users_service_1 = __webpack_require__(/*! src/users/application/users.service */ "./src/users/application/users.service.ts");
const user_exceptions_1 = __webpack_require__(/*! src/users/domain/user.exceptions */ "./src/users/domain/user.exceptions.ts");
const bcrypt = __importStar(__webpack_require__(/*! bcrypt */ "bcrypt"));
let AuthService = class AuthService {
    usersService;
    jwtService;
    invalidCredentialsMessage = 'E-mail ou senha incorretos.';
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register(nome, email, senha) {
        try {
            const user = await this.usersService.register(nome, email, senha);
            return {
                message: 'Cadastro realizado com sucesso. Aguarde a liberação do administrador para acessar o sistema.',
                user: {
                    id: user.id,
                    nome: user.nome,
                    email: user.email,
                    ativo: user.ativo,
                },
            };
        }
        catch (error) {
            if (error instanceof user_exceptions_1.EmailAlreadyExistsException) {
                throw new common_1.ConflictException(error.message);
            }
            throw error;
        }
    }
    async login(email, pass) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException(this.invalidCredentialsMessage);
        }
        const isMatch = await bcrypt.compare(pass, user.senha_hash);
        if (!isMatch) {
            throw new common_1.UnauthorizedException(this.invalidCredentialsMessage);
        }
        if (!user.ativo) {
            throw new common_1.UnauthorizedException(this.invalidCredentialsMessage);
        }
        const payload = {
            sub: user.id,
            id: user.id,
            email: user.email,
            nome: user.nome,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                role: user.role,
                ativo: user.ativo,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);


/***/ },

/***/ "./src/auth/auth.module.ts"
/*!*********************************!*\
  !*** ./src/auth/auth.module.ts ***!
  \*********************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const users_module_1 = __webpack_require__(/*! src/users/users.module */ "./src/users/users.module.ts");
const auth_service_1 = __webpack_require__(/*! ./application/auth.service */ "./src/auth/application/auth.service.ts");
const auth_controller_1 = __webpack_require__(/*! ./presentation/auth.controller */ "./src/auth/presentation/auth.controller.ts");
const jwt_strategy_1 = __webpack_require__(/*! ./infrastructure/strategies/jwt.strategy */ "./src/auth/infrastructure/strategies/jwt.strategy.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'secretKey123',
                signOptions: {
                    expiresIn: (process.env.JWT_EXPIRES_IN ||
                        '60m'),
                },
            }),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService, jwt_1.JwtModule, passport_1.PassportModule],
    })
], AuthModule);


/***/ },

/***/ "./src/auth/infrastructure/decorators/roles.decorator.ts"
/*!***************************************************************!*\
  !*** ./src/auth/infrastructure/decorators/roles.decorator.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ },

/***/ "./src/auth/infrastructure/guards/jwt-auth.guard.ts"
/*!**********************************************************!*\
  !*** ./src/auth/infrastructure/guards/jwt-auth.guard.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ },

/***/ "./src/auth/infrastructure/guards/roles.guard.ts"
/*!*******************************************************!*\
  !*** ./src/auth/infrastructure/guards/roles.guard.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const roles_decorator_1 = __webpack_require__(/*! ../decorators/roles.decorator */ "./src/auth/infrastructure/decorators/roles.decorator.ts");
let RolesGuard = class RolesGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles) {
            return true;
        }
        const request = context
            .switchToHttp()
            .getRequest();
        const user = request.user;
        if (!user) {
            return false;
        }
        return requiredRoles.includes(user.role);
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ },

/***/ "./src/auth/infrastructure/strategies/jwt.strategy.ts"
/*!************************************************************!*\
  !*** ./src/auth/infrastructure/strategies/jwt.strategy.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'secretKey123',
        });
    }
    validate(payload) {
        return {
            id: payload.sub,
            email: payload.email,
            nome: payload.nome,
            role: payload.role,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], JwtStrategy);


/***/ },

/***/ "./src/auth/presentation/auth.controller.ts"
/*!**************************************************!*\
  !*** ./src/auth/presentation/auth.controller.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const auth_service_1 = __webpack_require__(/*! ../application/auth.service */ "./src/auth/application/auth.service.ts");
const login_dto_1 = __webpack_require__(/*! ./dto/login.dto */ "./src/auth/presentation/dto/login.dto.ts");
const register_dto_1 = __webpack_require__(/*! ./dto/register.dto */ "./src/auth/presentation/dto/register.dto.ts");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(dto) {
        return this.authService.register(dto.nome, dto.email, dto.senha);
    }
    async login(loginDto) {
        return this.authService.login(loginDto.email, loginDto.senha);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Cadastra um novo usuário (aguarda ativação)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Usuário cadastrado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'E-mail já cadastrado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof register_dto_1.RegisterDto !== "undefined" && register_dto_1.RegisterDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Realiza login e retorna token JWT' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login efetuado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'E-mail ou senha incorretos' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ },

/***/ "./src/auth/presentation/dto/login.dto.ts"
/*!************************************************!*\
  !*** ./src/auth/presentation/dto/login.dto.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class LoginDto {
    email;
    senha;
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'joao@email.com' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "senha", void 0);


/***/ },

/***/ "./src/auth/presentation/dto/register.dto.ts"
/*!***************************************************!*\
  !*** ./src/auth/presentation/dto/register.dto.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class RegisterDto {
    nome;
    email;
    senha;
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'João Silva' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O nome é obrigatório.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'joao@email.com' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O e-mail é obrigatório.' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Informe um e-mail válido.' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A senha é obrigatória.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "senha", void 0);


/***/ },

/***/ "./src/movel/application/movel.service.ts"
/*!************************************************!*\
  !*** ./src/movel/application/movel.service.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MovelService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const utils_1 = __webpack_require__(/*! @moveisantigos/utils */ "../../packages/utils/src/index.ts");
const movel_1 = __webpack_require__(/*! ../domain/movel */ "./src/movel/domain/movel.ts");
const movel_exceptions_1 = __webpack_require__(/*! ../domain/movel.exceptions */ "./src/movel/domain/movel.exceptions.ts");
const movel_type_exceptions_1 = __webpack_require__(/*! ../domain/movel-type.exceptions */ "./src/movel/domain/movel-type.exceptions.ts");
let MovelService = class MovelService {
    movelRepo;
    atelieRepo;
    constructor(movelRepo, atelieRepo) {
        this.movelRepo = movelRepo;
        this.atelieRepo = atelieRepo;
    }
    async create(tipoMovel, dataInicioTrab, restaurado, horasHomem, atelieId, ownerUserId) {
        const movel = new movel_1.Movel(null, tipoMovel?.trim(), new Date(dataInicioTrab), restaurado, horasHomem, atelieId, ownerUserId);
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
    async update(id, restaurado, horasHomem, requester) {
        const movel = await this.movelRepo.findById(id);
        if (!movel) {
            throw new movel_exceptions_1.MovelNotFoundException(id);
        }
        this.validarPermissaoDeAcesso(movel, requester);
        movel.restaurado = restaurado;
        movel.horasHomem = horasHomem;
        await this.validarRegrasNegocio(movel, id);
        return this.movelRepo.update(movel);
    }
    async delete(id, requester) {
        const movel = await this.movelRepo.findById(id);
        if (!movel) {
            throw new movel_exceptions_1.MovelNotFoundException(id);
        }
        this.validarPermissaoDeAcesso(movel, requester);
        return this.movelRepo.delete(id);
    }
    validarPermissaoDeAcesso(movel, requester) {
        if (requester.role === 'admin') {
            return;
        }
        if (movel.ownerUserId !== requester.id) {
            throw new common_1.ForbiddenException('Você só pode editar ou remover móveis cadastrados por você.');
        }
    }
    async validarRegrasNegocio(movel, ignoreId) {
        if (!movel.tipoMovel || movel.tipoMovel === '') {
            throw new movel_exceptions_1.MovelCampoObrigatorioException('tipoMovel');
        }
        if (!(0, utils_1.isCommonMovelType)(movel.tipoMovel)) {
            throw new movel_type_exceptions_1.MovelTipoMovelInvalidoException(`O tipo do móvel precisa conter um nome comum válido, como ${(0, utils_1.commonMovelTypeExamples)()}.`);
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


/***/ },

/***/ "./src/movel/domain/movel-type.exceptions.ts"
/*!***************************************************!*\
  !*** ./src/movel/domain/movel-type.exceptions.ts ***!
  \***************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MovelTipoMovelInvalidoException = void 0;
class MovelTipoMovelInvalidoException extends Error {
    constructor(message = 'O tipo do móvel deve conter um nome comum válido.') {
        super(message);
        this.name = 'MovelTipoMovelInvalidoException';
    }
}
exports.MovelTipoMovelInvalidoException = MovelTipoMovelInvalidoException;


/***/ },

/***/ "./src/movel/domain/movel.exceptions.ts"
/*!**********************************************!*\
  !*** ./src/movel/domain/movel.exceptions.ts ***!
  \**********************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MovelNotFoundException = exports.MovelDuplicadoEmRestauracaoException = exports.MovelDataAnteriorFundacaoException = exports.AtelieNaoEncontradoParaMovelException = exports.MovelEmProcessoHorasInvalidaException = exports.MovelRestauradoInconsistenteException = exports.MovelHorasHomemInvalidaException = exports.MovelDataInicioInvalidaException = exports.MovelCampoObrigatorioException = void 0;
class MovelCampoObrigatorioException extends Error {
    constructor(campo) {
        super(`${campo} e obrigatorio`);
    }
}
exports.MovelCampoObrigatorioException = MovelCampoObrigatorioException;
class MovelDataInicioInvalidaException extends Error {
    constructor() {
        super('Data de início do trabalho inválida');
    }
}
exports.MovelDataInicioInvalidaException = MovelDataInicioInvalidaException;
class MovelHorasHomemInvalidaException extends Error {
    constructor() {
        super('Horas-homem deve estar entre 10 e 1000');
    }
}
exports.MovelHorasHomemInvalidaException = MovelHorasHomemInvalidaException;
class MovelRestauradoInconsistenteException extends Error {
    constructor() {
        super('Se restaurado for true, horasHomem deve ser >= 40');
    }
}
exports.MovelRestauradoInconsistenteException = MovelRestauradoInconsistenteException;
class MovelEmProcessoHorasInvalidaException extends Error {
    constructor() {
        super('Se restaurado for false, horasHomem nao pode ser 0');
    }
}
exports.MovelEmProcessoHorasInvalidaException = MovelEmProcessoHorasInvalidaException;
class AtelieNaoEncontradoParaMovelException extends Error {
    constructor(atelieId) {
        super(`Ateliê com id ${atelieId} não encontrado`);
    }
}
exports.AtelieNaoEncontradoParaMovelException = AtelieNaoEncontradoParaMovelException;
class MovelDataAnteriorFundacaoException extends Error {
    constructor() {
        super('Data de início do trabalho não pode ser anterior à data de fundação do ateliê.');
    }
}
exports.MovelDataAnteriorFundacaoException = MovelDataAnteriorFundacaoException;
class MovelDuplicadoEmRestauracaoException extends Error {
    constructor() {
        super('Já existe um móvel desse tipo em restauração para esse ateliê.');
    }
}
exports.MovelDuplicadoEmRestauracaoException = MovelDuplicadoEmRestauracaoException;
class MovelNotFoundException extends Error {
    constructor(id) {
        super(`Móvel com id ${id} não encontrado`);
    }
}
exports.MovelNotFoundException = MovelNotFoundException;


/***/ },

/***/ "./src/movel/domain/movel.ts"
/*!***********************************!*\
  !*** ./src/movel/domain/movel.ts ***!
  \***********************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Movel = void 0;
class Movel {
    id;
    tipoMovel;
    dataInicioTrab;
    restaurado;
    horasHomem;
    atelieId;
    ownerUserId;
    constructor(id, tipoMovel, dataInicioTrab, restaurado, horasHomem, atelieId, ownerUserId) {
        this.id = id;
        this.tipoMovel = tipoMovel;
        this.dataInicioTrab = dataInicioTrab;
        this.restaurado = restaurado;
        this.horasHomem = horasHomem;
        this.atelieId = atelieId;
        this.ownerUserId = ownerUserId;
    }
}
exports.Movel = Movel;


/***/ },

/***/ "./src/movel/infrastructure/persistence/typeorm/movel.orm-entity.ts"
/*!**************************************************************************!*\
  !*** ./src/movel/infrastructure/persistence/typeorm/movel.orm-entity.ts ***!
  \**************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MovelOrmEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const atelie_orm_entity_1 = __webpack_require__(/*! src/atelie/infrastructure/persistence/typeorm/atelie.orm-entity */ "./src/atelie/infrastructure/persistence/typeorm/atelie.orm-entity.ts");
const user_orm_entity_1 = __webpack_require__(/*! src/users/infrastructure/persistence/typeorm/user.orm-entity */ "./src/users/infrastructure/persistence/typeorm/user.orm-entity.ts");
let MovelOrmEntity = class MovelOrmEntity {
    id;
    tipoMovel;
    dataInicioTrab;
    restaurado;
    horasHomem;
    atelieId;
    ownerUserId;
    atelie;
    owner;
};
exports.MovelOrmEntity = MovelOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MovelOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], MovelOrmEntity.prototype, "tipoMovel", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], MovelOrmEntity.prototype, "dataInicioTrab", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], MovelOrmEntity.prototype, "restaurado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MovelOrmEntity.prototype, "horasHomem", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MovelOrmEntity.prototype, "atelieId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], MovelOrmEntity.prototype, "ownerUserId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => atelie_orm_entity_1.AtelieOrmEntity, (atelie) => atelie.moveis, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'atelieId' }),
    __metadata("design:type", typeof (_b = typeof atelie_orm_entity_1.AtelieOrmEntity !== "undefined" && atelie_orm_entity_1.AtelieOrmEntity) === "function" ? _b : Object)
], MovelOrmEntity.prototype, "atelie", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_orm_entity_1.UserOrmEntity, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'ownerUserId' }),
    __metadata("design:type", Object)
], MovelOrmEntity.prototype, "owner", void 0);
exports.MovelOrmEntity = MovelOrmEntity = __decorate([
    (0, typeorm_1.Entity)('movel')
], MovelOrmEntity);


/***/ },

/***/ "./src/movel/infrastructure/persistence/typeorm/movel.typeorm.repository.ts"
/*!**********************************************************************************!*\
  !*** ./src/movel/infrastructure/persistence/typeorm/movel.typeorm.repository.ts ***!
  \**********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MovelTypeOrmRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const movel_1 = __webpack_require__(/*! src/movel/domain/movel */ "./src/movel/domain/movel.ts");
const movel_orm_entity_1 = __webpack_require__(/*! ./movel.orm-entity */ "./src/movel/infrastructure/persistence/typeorm/movel.orm-entity.ts");
let MovelTypeOrmRepository = class MovelTypeOrmRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(movel) {
        const orm = this.repo.create({
            tipoMovel: movel.tipoMovel,
            dataInicioTrab: movel.dataInicioTrab,
            restaurado: movel.restaurado,
            horasHomem: movel.horasHomem,
            atelieId: movel.atelieId,
            ownerUserId: movel.ownerUserId,
        });
        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }
    async findById(id) {
        const movel = await this.repo.findOneBy({ id });
        return movel ? this.toDomain(movel) : null;
    }
    async findAll() {
        const moveis = await this.repo.find({ order: { id: 'ASC' } });
        return moveis.map(this.toDomain);
    }
    async update(movel) {
        if (movel.id === null) {
            throw new Error('Movel sem ID nao pode ser atualizado');
        }
        const orm = await this.repo.findOneBy({ id: movel.id });
        if (!orm) {
            throw new Error('Movel nao encontrado para atualizar');
        }
        orm.tipoMovel = movel.tipoMovel;
        orm.dataInicioTrab = movel.dataInicioTrab;
        orm.restaurado = movel.restaurado;
        orm.horasHomem = movel.horasHomem;
        orm.atelieId = movel.atelieId;
        orm.ownerUserId = movel.ownerUserId;
        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }
    async delete(id) {
        const orm = await this.repo.findOneBy({ id });
        if (!orm) {
            throw new Error('Movel nao encontrado para remover');
        }
        const removido = this.toDomain(orm);
        await this.repo.delete({ id });
        return removido;
    }
    async existsOpenByAtelieAndTipo(atelieId, tipoMovel, ignoreId) {
        const query = this.repo
            .createQueryBuilder('movel')
            .where('movel.atelieId = :atelieId', { atelieId })
            .andWhere('LOWER(movel.tipoMovel) = LOWER(:tipoMovel)', {
            tipoMovel: tipoMovel.trim(),
        })
            .andWhere('movel.restaurado = :restaurado', { restaurado: false });
        if (ignoreId) {
            query.andWhere('movel.id != :ignoreId', { ignoreId });
        }
        const total = await query.getCount();
        return total > 0;
    }
    toDomain = (orm) => {
        return new movel_1.Movel(orm.id, orm.tipoMovel, orm.dataInicioTrab, orm.restaurado, orm.horasHomem, orm.atelieId, orm.ownerUserId ?? null);
    };
};
exports.MovelTypeOrmRepository = MovelTypeOrmRepository;
exports.MovelTypeOrmRepository = MovelTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movel_orm_entity_1.MovelOrmEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], MovelTypeOrmRepository);


/***/ },

/***/ "./src/movel/movel.module.ts"
/*!***********************************!*\
  !*** ./src/movel/movel.module.ts ***!
  \***********************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MovelModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const atelie_module_1 = __webpack_require__(/*! src/atelie/atelie.module */ "./src/atelie/atelie.module.ts");
const movel_service_1 = __webpack_require__(/*! ./application/movel.service */ "./src/movel/application/movel.service.ts");
const movel_orm_entity_1 = __webpack_require__(/*! ./infrastructure/persistence/typeorm/movel.orm-entity */ "./src/movel/infrastructure/persistence/typeorm/movel.orm-entity.ts");
const movel_typeorm_repository_1 = __webpack_require__(/*! ./infrastructure/persistence/typeorm/movel.typeorm.repository */ "./src/movel/infrastructure/persistence/typeorm/movel.typeorm.repository.ts");
const movel_controller_1 = __webpack_require__(/*! ./presentation/movel.controller */ "./src/movel/presentation/movel.controller.ts");
let MovelModule = class MovelModule {
};
exports.MovelModule = MovelModule;
exports.MovelModule = MovelModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([movel_orm_entity_1.MovelOrmEntity]), atelie_module_1.AtelieModule],
        controllers: [movel_controller_1.MovelController],
        providers: [
            movel_service_1.MovelService,
            {
                provide: 'MovelRepositoryPort',
                useClass: movel_typeorm_repository_1.MovelTypeOrmRepository,
            },
        ],
    })
], MovelModule);


/***/ },

/***/ "./src/movel/presentation/dto/create-movel.dto.ts"
/*!********************************************************!*\
  !*** ./src/movel/presentation/dto/create-movel.dto.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateMovelDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMovelDto.prototype, "tipoMovel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2021-08-15' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateMovelDto.prototype, "dataInicioTrab", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateMovelDto.prototype, "restaurado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 80 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(10),
    __metadata("design:type", Number)
], CreateMovelDto.prototype, "horasHomem", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateMovelDto.prototype, "atelieId", void 0);


/***/ },

/***/ "./src/movel/presentation/dto/update-movel.dto.ts"
/*!********************************************************!*\
  !*** ./src/movel/presentation/dto/update-movel.dto.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateMovelDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateMovelDto {
    restaurado;
    horasHomem;
}
exports.UpdateMovelDto = UpdateMovelDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateMovelDto.prototype, "restaurado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 200 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(10),
    __metadata("design:type", Number)
], UpdateMovelDto.prototype, "horasHomem", void 0);


/***/ },

/***/ "./src/movel/presentation/movel.controller.ts"
/*!****************************************************!*\
  !*** ./src/movel/presentation/movel.controller.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MovelController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const movel_service_1 = __webpack_require__(/*! ../application/movel.service */ "./src/movel/application/movel.service.ts");
const create_movel_dto_1 = __webpack_require__(/*! ./dto/create-movel.dto */ "./src/movel/presentation/dto/create-movel.dto.ts");
const update_movel_dto_1 = __webpack_require__(/*! ./dto/update-movel.dto */ "./src/movel/presentation/dto/update-movel.dto.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! src/auth/infrastructure/guards/jwt-auth.guard */ "./src/auth/infrastructure/guards/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! src/auth/infrastructure/guards/roles.guard */ "./src/auth/infrastructure/guards/roles.guard.ts");
const roles_decorator_1 = __webpack_require__(/*! src/auth/infrastructure/decorators/roles.decorator */ "./src/auth/infrastructure/decorators/roles.decorator.ts");
let MovelController = class MovelController {
    movelService;
    constructor(movelService) {
        this.movelService = movelService;
    }
    create(dto, req) {
        return this.movelService.create(dto.tipoMovel, dto.dataInicioTrab, dto.restaurado, dto.horasHomem, dto.atelieId, req.user.id);
    }
    findAll() {
        return this.movelService.findAll();
    }
    findById(id) {
        return this.movelService.findById(Number(id));
    }
    update(id, dto, req) {
        return this.movelService.update(Number(id), dto.restaurado, dto.horasHomem, req.user);
    }
    delete(id, req) {
        return this.movelService.delete(Number(id), req.user);
    }
};
exports.MovelController = MovelController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'user'),
    (0, swagger_1.ApiOperation)({ summary: 'Cria um movel (Admin ou usuário)' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_movel_dto_1.CreateMovelDto !== "undefined" && create_movel_dto_1.CreateMovelDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], MovelController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'user'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todos os moveis' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MovelController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'user'),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiOperation)({ summary: 'Busca movel por id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MovelController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'user'),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza movel (Admin ou proprietário)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_movel_dto_1.UpdateMovelDto !== "undefined" && update_movel_dto_1.UpdateMovelDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], MovelController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'user'),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiOperation)({ summary: 'Remove movel (Admin ou proprietário)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MovelController.prototype, "delete", null);
exports.MovelController = MovelController = __decorate([
    (0, swagger_1.ApiTags)('movel'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('movel'),
    __metadata("design:paramtypes", [typeof (_a = typeof movel_service_1.MovelService !== "undefined" && movel_service_1.MovelService) === "function" ? _a : Object])
], MovelController);


/***/ },

/***/ "./src/shared/database/seeder.service.ts"
/*!***********************************************!*\
  !*** ./src/shared/database/seeder.service.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SeederService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeederService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const bcrypt = __importStar(__webpack_require__(/*! bcrypt */ "bcrypt"));
const user_orm_entity_1 = __webpack_require__(/*! src/users/infrastructure/persistence/typeorm/user.orm-entity */ "./src/users/infrastructure/persistence/typeorm/user.orm-entity.ts");
let SeederService = SeederService_1 = class SeederService {
    userRepo;
    logger = new common_1.Logger(SeederService_1.name);
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async onModuleInit() {
        const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@moveisantigos.com';
        const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin123';
        const adminName = process.env.ADMIN_NAME ?? 'Administrador';
        const existingAdmin = await this.userRepo.findOneBy({ role: 'admin' });
        if (existingAdmin) {
            return;
        }
        const senha_hash = await bcrypt.hash(adminPassword, 10);
        await this.userRepo.save(this.userRepo.create({
            nome: adminName,
            email: adminEmail,
            senha_hash,
            role: 'admin',
            ativo: true,
        }));
        this.logger.log(`Administrador inicial criado: ${adminEmail}`);
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = SeederService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_orm_entity_1.UserOrmEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], SeederService);


/***/ },

/***/ "./src/shared/database/typeorm.module.ts"
/*!***********************************************!*\
  !*** ./src/shared/database/typeorm.module.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const atelie_orm_entity_1 = __webpack_require__(/*! src/atelie/infrastructure/persistence/typeorm/atelie.orm-entity */ "./src/atelie/infrastructure/persistence/typeorm/atelie.orm-entity.ts");
const movel_orm_entity_1 = __webpack_require__(/*! src/movel/infrastructure/persistence/typeorm/movel.orm-entity */ "./src/movel/infrastructure/persistence/typeorm/movel.orm-entity.ts");
const user_orm_entity_1 = __webpack_require__(/*! src/users/infrastructure/persistence/typeorm/user.orm-entity */ "./src/users/infrastructure/persistence/typeorm/user.orm-entity.ts");
const seeder_service_1 = __webpack_require__(/*! ./seeder.service */ "./src/shared/database/seeder.service.ts");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'data/moveis-antigos.db',
                entities: [atelie_orm_entity_1.AtelieOrmEntity, movel_orm_entity_1.MovelOrmEntity, user_orm_entity_1.UserOrmEntity],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([user_orm_entity_1.UserOrmEntity]),
        ],
        providers: [seeder_service_1.SeederService],
        exports: [typeorm_1.TypeOrmModule],
    })
], DatabaseModule);


/***/ },

/***/ "./src/shared/filters/all-exceptions.filter.ts"
/*!*****************************************************!*\
  !*** ./src/shared/filters/all-exceptions.filter.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppExceptionFilter_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppExceptionFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const area_exception_1 = __webpack_require__(/*! src/atelie/domain/area.exception */ "./src/atelie/domain/area.exception.ts");
const atelie_not_found_exception_1 = __webpack_require__(/*! src/atelie/domain/atelie.not.found.exception */ "./src/atelie/domain/atelie.not.found.exception.ts");
const data_exception_1 = __webpack_require__(/*! src/atelie/domain/data.exception */ "./src/atelie/domain/data.exception.ts");
const equipado_exception_1 = __webpack_require__(/*! src/atelie/domain/equipado.exception */ "./src/atelie/domain/equipado.exception.ts");
const especiladade_exists_exception_1 = __webpack_require__(/*! src/atelie/domain/especiladade-exists.exception */ "./src/atelie/domain/especiladade-exists.exception.ts");
const movel_exceptions_1 = __webpack_require__(/*! src/movel/domain/movel.exceptions */ "./src/movel/domain/movel.exceptions.ts");
const movel_type_exceptions_1 = __webpack_require__(/*! src/movel/domain/movel-type.exceptions */ "./src/movel/domain/movel-type.exceptions.ts");
const user_exceptions_1 = __webpack_require__(/*! src/users/domain/user.exceptions */ "./src/users/domain/user.exceptions.ts");
let AppExceptionFilter = AppExceptionFilter_1 = class AppExceptionFilter {
    logger = new common_1.Logger(AppExceptionFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const errorResponse = this.resolveException(exception);
        this.logger.error(`${request.method} ${request.url} -> ${errorResponse.statusCode}`, exception instanceof Error ? exception.stack : String(exception));
        response.status(errorResponse.statusCode).json(errorResponse);
    }
    buildResponse(statusCode, message, errors) {
        const body = {
            statusCode,
            message,
            timestamp: new Date().toISOString(),
        };
        if (errors && Object.keys(errors).length > 0) {
            body.errors = errors;
        }
        return body;
    }
    handleValidationException(exception) {
        const response = exception.getResponse();
        if (response.errors) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'Existem campos inválidos no formulário.', response.errors);
        }
        const messages = Array.isArray(response.message)
            ? response.message
            : [response.message ?? 'Existem campos inválidos no formulário.'];
        const errors = {};
        for (const item of messages) {
            const match = item.match(/^(\w+)\s/);
            const field = match?.[1] ?? 'form';
            errors[field] = item;
        }
        return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'Existem campos inválidos no formulário.', errors);
    }
    handleHttpException(exception) {
        const statusCode = exception.getStatus();
        const response = exception.getResponse();
        if (typeof response === 'object' && response.errors) {
            const message = typeof response.message === 'string'
                ? response.message
                : 'Existem campos inválidos no formulário.';
            return this.buildResponse(statusCode, message, response.errors);
        }
        const message = typeof response === 'string'
            ? response
            : Array.isArray(response.message)
                ? response.message[0]
                : (response.message ?? exception.message);
        return this.buildResponse(statusCode, message);
    }
    resolveException(exception) {
        if (exception instanceof atelie_not_found_exception_1.AtelieNotFoundException) {
            return this.buildResponse(common_1.HttpStatus.NOT_FOUND, 'Ateliê não encontrado.');
        }
        if (exception instanceof especiladade_exists_exception_1.EspecialidadeExistsException) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'Especialidade inválida ou excede o limite de caracteres.', { especialidadeEra: exception.message });
        }
        if (exception instanceof equipado_exception_1.EquipadoExistsExcepiton) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'O campo equipado é obrigatório e deve ser um valor booleano.', { equipadoCompleto: exception.message });
        }
        if (exception instanceof area_exception_1.AreaExistsException) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'A área da oficina deve ser maior ou igual a 40m².', { areaOficinaM2: exception.message });
        }
        if (exception instanceof data_exception_1.DataException) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'A data de fundação é inválida.', { dataFundacao: exception.message });
        }
        if (exception instanceof movel_exceptions_1.MovelNotFoundException) {
            return this.buildResponse(common_1.HttpStatus.NOT_FOUND, 'Móvel não encontrado.');
        }
        if (exception instanceof movel_exceptions_1.MovelCampoObrigatorioException) {
            const field = exception.message.match(/^(\w+)\s+e obrigatorio/)?.[1] ?? 'form';
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, exception.message, {
                [field]: exception.message,
            });
        }
        if (exception instanceof movel_type_exceptions_1.MovelTipoMovelInvalidoException) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, exception.message, { tipoMovel: exception.message });
        }
        if (exception instanceof movel_exceptions_1.MovelDataInicioInvalidaException) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'Data de início do trabalho inválida.', { dataInicioTrab: exception.message });
        }
        if (exception instanceof movel_exceptions_1.MovelHorasHomemInvalidaException) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'Quantidade de horas-homem inválida.', { horasHomem: exception.message });
        }
        if (exception instanceof movel_exceptions_1.MovelRestauradoInconsistenteException) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'Inconsistência entre restaurado e horas-homem.', { restaurado: exception.message });
        }
        if (exception instanceof movel_exceptions_1.MovelEmProcessoHorasInvalidaException) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'Horas-homem inválidas para móvel em processo de restauração.', { horasHomem: exception.message });
        }
        if (exception instanceof movel_exceptions_1.AtelieNaoEncontradoParaMovelException) {
            return this.buildResponse(common_1.HttpStatus.NOT_FOUND, 'Ateliê não encontrado para o móvel informado.');
        }
        if (exception instanceof movel_exceptions_1.MovelDataAnteriorFundacaoException) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'A data de início do trabalho não pode ser anterior à data de fundação do ateliê.', { dataInicioTrab: exception.message });
        }
        if (exception instanceof movel_exceptions_1.MovelDuplicadoEmRestauracaoException) {
            return this.buildResponse(common_1.HttpStatus.CONFLICT, 'Já existe um móvel desse tipo em restauração para este ateliê.', { tipoMovel: exception.message });
        }
        if (exception instanceof user_exceptions_1.UserNotFoundException) {
            return this.buildResponse(common_1.HttpStatus.NOT_FOUND, 'Usuário não encontrado.');
        }
        if (exception instanceof user_exceptions_1.EmailAlreadyExistsException) {
            return this.buildResponse(common_1.HttpStatus.CONFLICT, exception.message || 'E-mail já cadastrado no sistema.', { email: exception.message });
        }
        if (exception instanceof user_exceptions_1.LastAdminException) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, exception.message);
        }
        if (exception instanceof common_1.HttpException) {
            const status = exception.getStatus();
            if (status === 400) {
                const response = exception.getResponse();
                if (typeof response === 'object' &&
                    response !== null &&
                    ('message' in response || 'errors' in response)) {
                    return this.handleValidationException(exception);
                }
            }
            return this.handleHttpException(exception);
        }
        return this.buildResponse(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Erro interno no servidor.');
    }
};
exports.AppExceptionFilter = AppExceptionFilter;
exports.AppExceptionFilter = AppExceptionFilter = AppExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], AppExceptionFilter);


/***/ },

/***/ "./src/users/application/users.service.ts"
/*!************************************************!*\
  !*** ./src/users/application/users.service.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const bcrypt = __importStar(__webpack_require__(/*! bcrypt */ "bcrypt"));
const user_1 = __webpack_require__(/*! ../domain/user */ "./src/users/domain/user.ts");
const user_exceptions_1 = __webpack_require__(/*! ../domain/user.exceptions */ "./src/users/domain/user.exceptions.ts");
let UsersService = class UsersService {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async register(nome, email, senhaPlana) {
        const existing = await this.userRepo.findByEmail(email);
        if (existing) {
            throw new user_exceptions_1.EmailAlreadyExistsException('Este e-mail já está cadastrado. Faça login ou use outro e-mail.');
        }
        const senha_hash = await bcrypt.hash(senhaPlana, 10);
        const user = new user_1.User(null, nome, email, senha_hash, 'user', false);
        return this.userRepo.create(user);
    }
    async findById(id) {
        const user = await this.userRepo.findById(id);
        if (!user) {
            throw new user_exceptions_1.UserNotFoundException();
        }
        return user;
    }
    async findByEmail(email) {
        return this.userRepo.findByEmail(email);
    }
    async findAll() {
        return this.userRepo.findAll();
    }
    async setActive(id, ativo) {
        const user = await this.findById(id);
        if (user.role === 'admin' && !ativo) {
            const adminsCount = await this.userRepo.countAdmins();
            if (adminsCount <= 1) {
                throw new user_exceptions_1.LastAdminException('Não é possível desativar o único administrador do sistema.');
            }
        }
        user.ativo = ativo;
        return this.userRepo.update(user);
    }
    async setRole(id, role) {
        const user = await this.findById(id);
        if (user.role === 'admin' && role === 'user') {
            const adminsCount = await this.userRepo.countAdmins();
            if (adminsCount <= 1) {
                throw new user_exceptions_1.LastAdminException('Não é possível desativar a role de administrador do único administrador do sistema.');
            }
        }
        user.role = role;
        return this.userRepo.update(user);
    }
    async updateProfile(id, nome, email, senhaPlana) {
        const user = await this.findById(id);
        if (email !== user.email) {
            const existing = await this.userRepo.findByEmail(email);
            if (existing) {
                throw new user_exceptions_1.EmailAlreadyExistsException();
            }
            user.email = email;
        }
        user.nome = nome;
        if (senhaPlana && senhaPlana.trim() !== '') {
            user.senha_hash = await bcrypt.hash(senhaPlana, 10);
        }
        return this.userRepo.update(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UserRepositoryPort')),
    __metadata("design:paramtypes", [Object])
], UsersService);


/***/ },

/***/ "./src/users/domain/user.exceptions.ts"
/*!*********************************************!*\
  !*** ./src/users/domain/user.exceptions.ts ***!
  \*********************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LastAdminException = exports.InvalidUserRoleException = exports.EmailAlreadyExistsException = exports.UserNotFoundException = void 0;
class UserNotFoundException extends Error {
    constructor(message = 'Usuário não encontrado') {
        super(message);
        this.name = 'UserNotFoundException';
    }
}
exports.UserNotFoundException = UserNotFoundException;
class EmailAlreadyExistsException extends Error {
    constructor(message = 'E-mail já cadastrado') {
        super(message);
        this.name = 'EmailAlreadyExistsException';
    }
}
exports.EmailAlreadyExistsException = EmailAlreadyExistsException;
class InvalidUserRoleException extends Error {
    constructor(message = 'Role inválida') {
        super(message);
        this.name = 'InvalidUserRoleException';
    }
}
exports.InvalidUserRoleException = InvalidUserRoleException;
class LastAdminException extends Error {
    constructor(message = 'Não é possível rebaixar ou remover o único administrador do sistema') {
        super(message);
        this.name = 'LastAdminException';
    }
}
exports.LastAdminException = LastAdminException;


/***/ },

/***/ "./src/users/domain/user.ts"
/*!**********************************!*\
  !*** ./src/users/domain/user.ts ***!
  \**********************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
class User {
    id;
    nome;
    email;
    senha_hash;
    role;
    ativo;
    created_at;
    updated_at;
    constructor(id, nome, email, senha_hash, role, ativo, created_at, updated_at) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha_hash = senha_hash;
        this.role = role;
        this.ativo = ativo;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.User = User;


/***/ },

/***/ "./src/users/infrastructure/persistence/typeorm/user.orm-entity.ts"
/*!*************************************************************************!*\
  !*** ./src/users/infrastructure/persistence/typeorm/user.orm-entity.ts ***!
  \*************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserOrmEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let UserOrmEntity = class UserOrmEntity {
    id;
    nome;
    email;
    senha_hash;
    role;
    ativo;
    created_at;
    updated_at;
};
exports.UserOrmEntity = UserOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], UserOrmEntity.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 150 }),
    __metadata("design:type", String)
], UserOrmEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserOrmEntity.prototype, "senha_hash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'user' }),
    __metadata("design:type", String)
], UserOrmEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserOrmEntity.prototype, "ativo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UserOrmEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserOrmEntity.prototype, "updated_at", void 0);
exports.UserOrmEntity = UserOrmEntity = __decorate([
    (0, typeorm_1.Entity)('user')
], UserOrmEntity);


/***/ },

/***/ "./src/users/infrastructure/persistence/typeorm/user.typeorm.repository.ts"
/*!*********************************************************************************!*\
  !*** ./src/users/infrastructure/persistence/typeorm/user.typeorm.repository.ts ***!
  \*********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserTypeOrmRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const user_1 = __webpack_require__(/*! src/users/domain/user */ "./src/users/domain/user.ts");
const user_orm_entity_1 = __webpack_require__(/*! ./user.orm-entity */ "./src/users/infrastructure/persistence/typeorm/user.orm-entity.ts");
let UserTypeOrmRepository = class UserTypeOrmRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(user) {
        const orm = this.repo.create({
            nome: user.nome,
            email: user.email,
            senha_hash: user.senha_hash,
            role: user.role,
            ativo: user.ativo,
        });
        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }
    async findById(id) {
        const orm = await this.repo.findOneBy({ id });
        return orm ? this.toDomain(orm) : null;
    }
    async findByEmail(email) {
        const orm = await this.repo.findOneBy({ email });
        return orm ? this.toDomain(orm) : null;
    }
    async findAll() {
        const users = await this.repo.find({ order: { id: 'ASC' } });
        return users.map(this.toDomain);
    }
    async update(user) {
        if (user.id === null) {
            throw new Error('Usuário sem ID não pode ser atualizado');
        }
        const orm = await this.repo.findOneBy({ id: user.id });
        if (!orm) {
            throw new Error('Usuário não encontrado para atualizar');
        }
        orm.nome = user.nome;
        orm.email = user.email;
        orm.senha_hash = user.senha_hash;
        orm.role = user.role;
        orm.ativo = user.ativo;
        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }
    async delete(id) {
        const orm = await this.repo.findOneBy({ id });
        if (!orm) {
            throw new Error('Usuário não encontrado para remover');
        }
        const domain = this.toDomain(orm);
        await this.repo.delete({ id });
        return domain;
    }
    async countAdmins() {
        return this.repo.count({ where: { role: 'admin' } });
    }
    toDomain = (orm) => {
        return new user_1.User(orm.id, orm.nome, orm.email, orm.senha_hash, orm.role, orm.ativo, orm.created_at, orm.updated_at);
    };
};
exports.UserTypeOrmRepository = UserTypeOrmRepository;
exports.UserTypeOrmRepository = UserTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_orm_entity_1.UserOrmEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UserTypeOrmRepository);


/***/ },

/***/ "./src/users/presentation/dto/activate-user.dto.ts"
/*!*********************************************************!*\
  !*** ./src/users/presentation/dto/activate-user.dto.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivateUserDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class ActivateUserDto {
    ativo;
}
exports.ActivateUserDto = ActivateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)({ message: 'O campo ativo deve ser verdadeiro ou falso.' }),
    __metadata("design:type", Boolean)
], ActivateUserDto.prototype, "ativo", void 0);


/***/ },

/***/ "./src/users/presentation/dto/update-profile.dto.ts"
/*!**********************************************************!*\
  !*** ./src/users/presentation/dto/update-profile.dto.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProfileDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateProfileDto {
    nome;
    email;
    senha;
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'João Silva' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'joao@email.com' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "senha", void 0);


/***/ },

/***/ "./src/users/presentation/dto/update-role.dto.ts"
/*!*******************************************************!*\
  !*** ./src/users/presentation/dto/update-role.dto.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateRoleDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateRoleDto {
    role;
}
exports.UpdateRoleDto = UpdateRoleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin', enum: ['admin', 'user'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(['admin', 'user']),
    __metadata("design:type", String)
], UpdateRoleDto.prototype, "role", void 0);


/***/ },

/***/ "./src/users/presentation/users.controller.ts"
/*!****************************************************!*\
  !*** ./src/users/presentation/users.controller.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const users_service_1 = __webpack_require__(/*! ../application/users.service */ "./src/users/application/users.service.ts");
const update_profile_dto_1 = __webpack_require__(/*! ./dto/update-profile.dto */ "./src/users/presentation/dto/update-profile.dto.ts");
const activate_user_dto_1 = __webpack_require__(/*! ./dto/activate-user.dto */ "./src/users/presentation/dto/activate-user.dto.ts");
const update_role_dto_1 = __webpack_require__(/*! ./dto/update-role.dto */ "./src/users/presentation/dto/update-role.dto.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! src/auth/infrastructure/guards/jwt-auth.guard */ "./src/auth/infrastructure/guards/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! src/auth/infrastructure/guards/roles.guard */ "./src/auth/infrastructure/guards/roles.guard.ts");
const roles_decorator_1 = __webpack_require__(/*! src/auth/infrastructure/decorators/roles.decorator */ "./src/auth/infrastructure/decorators/roles.decorator.ts");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getProfile(req) {
        const user = await this.usersService.findById(req.user.id);
        return this.toResponse(user);
    }
    async updateProfile(req, dto) {
        const user = await this.usersService.updateProfile(req.user.id, dto.nome, dto.email, dto.senha);
        return this.toResponse(user);
    }
    async findAll() {
        const users = await this.usersService.findAll();
        return users.map((user) => this.toResponse(user));
    }
    async activate(id, dto) {
        const user = await this.usersService.setActive(id, dto.ativo);
        return this.toResponse(user);
    }
    async updateRole(req, id, dto) {
        if (req.user.id === id) {
            throw new common_1.BadRequestException('Você não pode alterar sua própria role de administrador.');
        }
        const user = await this.usersService.setRole(id, dto.role);
        return this.toResponse(user);
    }
    toResponse(user) {
        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
            role: user.role,
            ativo: user.ativo,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('me'),
    (0, roles_decorator_1.Roles)('admin', 'user'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtém dados do próprio perfil' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('me'),
    (0, roles_decorator_1.Roles)('admin', 'user'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza o próprio perfil' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof update_profile_dto_1.UpdateProfileDto !== "undefined" && update_profile_dto_1.UpdateProfileDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todos os usuários (apenas administrador)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)('users/:id/activate'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({
        summary: 'Ativa ou desativa um usuário (apenas administrador)',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_c = typeof activate_user_dto_1.ActivateUserDto !== "undefined" && activate_user_dto_1.ActivateUserDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "activate", null);
__decorate([
    (0, common_1.Patch)('users/:id/role'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({
        summary: 'Habilita ou desabilita a role de administrador (apenas administrador)',
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, typeof (_d = typeof update_role_dto_1.UpdateRoleDto !== "undefined" && update_role_dto_1.UpdateRoleDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateRole", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ },

/***/ "./src/users/users.module.ts"
/*!***********************************!*\
  !*** ./src/users/users.module.ts ***!
  \***********************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const user_orm_entity_1 = __webpack_require__(/*! ./infrastructure/persistence/typeorm/user.orm-entity */ "./src/users/infrastructure/persistence/typeorm/user.orm-entity.ts");
const user_typeorm_repository_1 = __webpack_require__(/*! ./infrastructure/persistence/typeorm/user.typeorm.repository */ "./src/users/infrastructure/persistence/typeorm/user.typeorm.repository.ts");
const users_service_1 = __webpack_require__(/*! ./application/users.service */ "./src/users/application/users.service.ts");
const users_controller_1 = __webpack_require__(/*! ./presentation/users.controller */ "./src/users/presentation/users.controller.ts");
const auth_module_1 = __webpack_require__(/*! src/auth/auth.module */ "./src/auth/auth.module.ts");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_orm_entity_1.UserOrmEntity]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [
            users_service_1.UsersService,
            {
                provide: 'UserRepositoryPort',
                useClass: user_typeorm_repository_1.UserTypeOrmRepository,
            },
        ],
        exports: [users_service_1.UsersService, 'UserRepositoryPort'],
    })
], UsersModule);


/***/ },

/***/ "@nestjs/common"
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/common");

/***/ },

/***/ "@nestjs/core"
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
(module) {

module.exports = require("@nestjs/core");

/***/ },

/***/ "@nestjs/jwt"
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
(module) {

module.exports = require("@nestjs/jwt");

/***/ },

/***/ "@nestjs/passport"
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
(module) {

module.exports = require("@nestjs/passport");

/***/ },

/***/ "@nestjs/swagger"
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
(module) {

module.exports = require("@nestjs/swagger");

/***/ },

/***/ "@nestjs/typeorm"
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
(module) {

module.exports = require("@nestjs/typeorm");

/***/ },

/***/ "bcrypt"
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
(module) {

module.exports = require("bcrypt");

/***/ },

/***/ "class-validator"
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
(module) {

module.exports = require("class-validator");

/***/ },

/***/ "passport-jwt"
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
(module) {

module.exports = require("passport-jwt");

/***/ },

/***/ "typeorm"
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
(module) {

module.exports = require("typeorm");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
const all_exceptions_filter_1 = __webpack_require__(/*! ./shared/filters/all-exceptions.filter */ "./src/shared/filters/all-exceptions.filter.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.CORS_ORIGIN ?? 'http://localhost:4200',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        exceptionFactory: (validationErrors) => {
            const errors = {};
            for (const error of validationErrors) {
                const messages = error.constraints
                    ? Object.values(error.constraints)
                    : ['Valor inválido.'];
                errors[error.property] = messages[0];
            }
            return new common_1.BadRequestException({
                message: 'Existem campos inválidos no formulário.',
                errors,
            });
        },
    }));
    app.useGlobalFilters(new all_exceptions_filter_1.AppExceptionFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Relicário System')
        .setDescription('API de gerenciamento de ateliês e móveis antigos')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Auth')
        .addTag('Users')
        .addTag('atelie')
        .addTag('movel')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger-ui', app, document, {
        jsonDocumentUrl: 'swagger/json',
    });
    await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

})();

/******/ })()
;