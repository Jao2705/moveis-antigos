"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtelieModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const atelie_orm_entity_1 = require("./infrastructure/persistence/typeorm/atelie.orm-entity");
const atelie_controller_1 = require("./presentation/atelie.controller");
const atelie_typeorm_repository_1 = require("./infrastructure/persistence/typeorm/atelie.typeorm.repository");
const atelie_service_1 = require("./application/atelie.service");
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
//# sourceMappingURL=atelie.module.js.map