import { OrdemServico, OrdemServicoStatus } from '../domain/ordem-servico';
import type { OrdemServicoRepositoryPort } from './ports/ordem-servico.repository.port';
export declare class OrdemServicoService {
    private readonly ordemRepo;
    constructor(ordemRepo: OrdemServicoRepositoryPort);
    create(clienteId: number, atelieId: number, movelId: number | null, descricaoProblema: string, tipoMovelInformado: string): Promise<OrdemServico>;
    findAll(): Promise<OrdemServico[]>;
    findByClienteId(clienteId: number): Promise<OrdemServico[]>;
    findById(id: number): Promise<OrdemServico>;
    findByIdForUser(id: number, userId: number): Promise<OrdemServico>;
    updateByAdmin(id: number, status: OrdemServicoStatus, descricaoProblema: string, tipoMovelInformado: string, dataPrevisaoEntrega: Date | null, valorOrcamento: number | null): Promise<OrdemServico>;
    cancelByUser(id: number, userId: number): Promise<OrdemServico>;
    delete(id: number): Promise<OrdemServico>;
}
