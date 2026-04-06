import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AtelieOrmEntity } from "./infrastructure/persistence/typeorm/atelie.orm-entity";
import { AtelieController } from "./presentation/atelie.controller";
import { AtelieTypeOrmRepository } from "./infrastructure/persistence/typeorm/atelie.typeorm.repository";
import { AtelieService } from "./application/atelie.service";

@Module({
    imports: [TypeOrmModule.forFeature([AtelieOrmEntity])],
    controllers: [AtelieController],
    providers: [
        AtelieService,
        {
            provide: 'AtelieRepositoryPort',
            useClass: AtelieTypeOrmRepository,
        },
    ],
    exports: ['AtelieRepositoryPort'],

})
export class AtelieModule { }
