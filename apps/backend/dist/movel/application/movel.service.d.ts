import type { AtelieRepositoryPort } from "../../atelie/application/ports/atelie.repository.port";
import { Movel } from '../domain/movel';
import type { MovelRepositoryPort } from './ports/movel.repository.port';
export declare class MovelService {
    private readonly movelRepo;
    private readonly atelieRepo;
    constructor(movelRepo: MovelRepositoryPort, atelieRepo: AtelieRepositoryPort);
    create(tipoMovel: string, dataInicioTrab: Date | string, restaurado: boolean, horasHomem: number, atelieId: number): Promise<Movel>;
    findById(id: number): Promise<Movel>;
    findAll(): Promise<Movel[]>;
    update(id: number, restaurado: boolean, horasHomem: number): Promise<Movel>;
    delete(id: number): Promise<Movel>;
    private validarRegrasNegocio;
}
