"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovelModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const atelie_module_1 = require("../atelie/atelie.module");
const movel_service_1 = require("./application/movel.service");
const movel_orm_entity_1 = require("./infrastructure/persistence/typeorm/movel.orm-entity");
const movel_typeorm_repository_1 = require("./infrastructure/persistence/typeorm/movel.typeorm.repository");
const movel_controller_1 = require("./presentation/movel.controller");
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
//# sourceMappingURL=movel.module.js.map