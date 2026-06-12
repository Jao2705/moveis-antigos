import { AtelieOrmEntity } from "../../../../atelie/infrastructure/persistence/typeorm/atelie.orm-entity";
export declare class MovelOrmEntity {
    id: number;
    tipoMovel: string;
    dataInicioTrab: Date;
    restaurado: boolean;
    horasHomem: number;
    atelieId: number;
    atelie: AtelieOrmEntity;
}
