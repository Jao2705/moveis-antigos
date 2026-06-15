"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdemServicoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ordem_servico_orm_entity_1 = require("./infrastructure/persistence/typeorm/ordem-servico.orm-entity");
const ordem_servico_typeorm_repository_1 = require("./infrastructure/persistence/typeorm/ordem-servico.typeorm.repository");
const ordem_servico_service_1 = require("./application/ordem-servico.service");
const ordem_servico_controller_1 = require("./presentation/ordem-servico.controller");
const auth_module_1 = require("../auth/auth.module");
let OrdemServicoModule = class OrdemServicoModule {
};
exports.OrdemServicoModule = OrdemServicoModule;
exports.OrdemServicoModule = OrdemServicoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([ordem_servico_orm_entity_1.OrdemServicoOrmEntity]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
        ],
        controllers: [ordem_servico_controller_1.OrdemServicoController],
        providers: [
            ordem_servico_service_1.OrdemServicoService,
            {
                provide: 'OrdemServicoRepositoryPort',
                useClass: ordem_servico_typeorm_repository_1.OrdemServicoTypeOrmRepository,
            },
        ],
        exports: [ordem_servico_service_1.OrdemServicoService],
    })
], OrdemServicoModule);
//# sourceMappingURL=ordem-servico.module.js.map