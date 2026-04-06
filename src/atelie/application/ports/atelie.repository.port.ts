import { Atelie } from "../../domain/atelie";
import { AtelieComMoveis } from "../../domain/atelie-com-moveis";

export interface AtelieRepositoryPort {
    create(atelie: Atelie): Promise<Atelie>;
    findById(id: number): Promise<Atelie | null>;
    findAll(): Promise<Atelie[]>;
    findByIdWithMoveis(id: number): Promise<AtelieComMoveis | null>;
    update(atelie: Atelie): Promise<Atelie>;
    delete(id: number): Promise<Atelie>;
}
