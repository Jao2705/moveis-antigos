"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const atelie_orm_entity_1 = require("../../atelie/infrastructure/persistence/typeorm/atelie.orm-entity");
const movel_orm_entity_1 = require("../../movel/infrastructure/persistence/typeorm/movel.orm-entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: 'data/moveis-antigos.db',
    entities: [atelie_orm_entity_1.AtelieOrmEntity, movel_orm_entity_1.MovelOrmEntity],
    synchronize: true,
});
//# sourceMappingURL=typeorm.datasource.js.map