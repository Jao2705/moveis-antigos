import { UserOrmEntity } from "../../../../users/infrastructure/persistence/typeorm/user.orm-entity";
import { AtelieOrmEntity } from "../../../../atelie/infrastructure/persistence/typeorm/atelie.orm-entity";
import { MovelOrmEntity } from "../../../../movel/infrastructure/persistence/typeorm/movel.orm-entity";
export declare class OrdemServicoOrmEntity {
    id: number;
    cliente_id: number;
    cliente: UserOrmEntity;
    atelie_id: number;
    atelie: AtelieOrmEntity;
    movel_id: number | null;
    movel: MovelOrmEntity | null;
    descricao_problema: string;
    tipo_movel_informado: string;
    status: string;
    data_solicitacao: Date;
    data_previsao_entrega: Date | null;
    valor_orcamento: number | null;
}
