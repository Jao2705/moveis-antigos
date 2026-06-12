import { MovelOrmEntity } from "../../../../movel/infrastructure/persistence/typeorm/movel.orm-entity";
export declare class AtelieOrmEntity {
    id: number;
    especialidadeEra: string;
    equipadoCompleto: boolean;
    areaOficinaM2: number;
    dataFundacao: Date;
    moveis: MovelOrmEntity[];
}
