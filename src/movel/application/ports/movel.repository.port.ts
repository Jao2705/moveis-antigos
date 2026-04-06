import { Movel } from "../../domain/movel";

export interface MovelRepositoryPort {
    create(movel: Movel): Promise<Movel>;
    findById(id: number): Promise<Movel | null>;
    findAll(): Promise<Movel[]>;
    update(movel: Movel): Promise<Movel>;
    delete(id: number): Promise<Movel>;
    existsOpenByAtelieAndTipo(atelieId: number, tipoMovel: string, ignoreId?: number): Promise<boolean>;
}
