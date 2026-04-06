import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtelieOrmEntity } from 'src/atelie/infrastructure/persistence/typeorm/atelie.orm-entity';
import { MovelOrmEntity } from 'src/movel/infrastructure/persistence/typeorm/movel.orm-entity';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'data/moveis-antigos.db',
            entities: [AtelieOrmEntity, MovelOrmEntity],
            synchronize: true,
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }
