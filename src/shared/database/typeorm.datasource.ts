import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AtelieOrmEntity } from '../../atelie/infrastructure/persistence/typeorm/atelie.orm-entity';
import { MovelOrmEntity } from '../../movel/infrastructure/persistence/typeorm/movel.orm-entity';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'data/moveis-antigos.db',
    entities: [AtelieOrmEntity, MovelOrmEntity],
    synchronize: true,
});
