import { Atelie } from "../domain/atelie";
import type { AtelieRepositoryPort } from "./ports/atelie.repository.port";
import { AtelieComMoveis } from "../domain/atelie-com-moveis";
export declare class AtelieService {
    private readonly atelieRepo;
    constructor(atelieRepo: AtelieRepositoryPort);
    create(especialidadeEra: string, equipadoCompleto: boolean, areaOficinaM2: number, dataFundacao: Date | string): Promise<Atelie>;
    findById(id: number): Promise<Atelie | null>;
    findAll(): Promise<Atelie[]>;
    findByIdWithMoveis(id: number): Promise<AtelieComMoveis>;
    update(id: number, equipamento: boolean, area: number): Promise<Atelie>;
    delete(id: number): Promise<Atelie>;
    private validarAtelie;
}
