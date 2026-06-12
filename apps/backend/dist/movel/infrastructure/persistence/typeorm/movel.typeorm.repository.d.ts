import { Repository } from "typeorm";
import type { MovelRepositoryPort } from "../../../application/ports/movel.repository.port";
import { Movel } from "../../../domain/movel";
import { MovelOrmEntity } from "./movel.orm-entity";
export declare class MovelTypeOrmRepository implements MovelRepositoryPort {
    private readonly repo;
    constructor(repo: Repository<MovelOrmEntity>);
    create(movel: Movel): Promise<Movel>;
    findById(id: number): Promise<Movel | null>;
    findAll(): Promise<Movel[]>;
    update(movel: Movel): Promise<Movel>;
    delete(id: number): Promise<Movel>;
    existsOpenByAtelieAndTipo(atelieId: number, tipoMovel: string, ignoreId?: number): Promise<boolean>;
    private toDomain;
}
