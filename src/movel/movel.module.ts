import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AtelieModule } from "src/atelie/atelie.module";
import { MovelService } from "./application/movel.service";
import { MovelOrmEntity } from "./infrastructure/persistence/typeorm/movel.orm-entity";
import { MovelTypeOrmRepository } from "./infrastructure/persistence/typeorm/movel.typeorm.repository";
import { MovelController } from "./presentation/movel.controller";

@Module({
    imports: [TypeOrmModule.forFeature([MovelOrmEntity]), AtelieModule],
    controllers: [MovelController],
    providers: [
        MovelService,
        {
            provide: "MovelRepositoryPort",
            useClass: MovelTypeOrmRepository,
        },
    ],
})
export class MovelModule { }
