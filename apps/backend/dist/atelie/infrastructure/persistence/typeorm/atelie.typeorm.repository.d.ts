import { Repository } from 'typeorm';
import { AtelieRepositoryPort } from "../../../application/ports/atelie.repository.port";
import { AtelieComMoveis } from "../../../domain/atelie-com-moveis";
import { Atelie } from "../../../domain/atelie";
import { AtelieOrmEntity } from './atelie.orm-entity';
export declare class AtelieTypeOrmRepository implements AtelieRepositoryPort {
    private readonly repo;
    constructor(repo: Repository<AtelieOrmEntity>);
    create(atelie: Atelie): Promise<Atelie>;
    findById(id: number): Promise<Atelie | null>;
    findAll(): Promise<Atelie[]>;
    findByIdWithMoveis(id: number): Promise<AtelieComMoveis | null>;
    update(atelie: Atelie): Promise<Atelie>;
    delete(id: number): Promise<Atelie>;
    private toDomain;
}
