import { AtelieOrmEntity } from "../../../../atelie/infrastructure/persistence/typeorm/atelie.orm-entity";
import { UserOrmEntity } from "../../../../users/infrastructure/persistence/typeorm/user.orm-entity";
export declare class MovelOrmEntity {
    id: number;
    tipoMovel: string;
    dataInicioTrab: Date;
    restaurado: boolean;
    horasHomem: number;
    atelieId: number;
    ownerUserId: number | null;
    atelie: AtelieOrmEntity;
    owner?: UserOrmEntity | null;
}
