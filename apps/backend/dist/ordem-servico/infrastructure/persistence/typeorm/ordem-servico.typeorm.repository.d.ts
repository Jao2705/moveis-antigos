import { Repository } from 'typeorm';
import { OrdemServicoRepositoryPort } from "../../../application/ports/ordem-servico.repository.port";
import { OrdemServico } from "../../../domain/ordem-servico";
import { OrdemServicoOrmEntity } from './ordem-servico.orm-entity';
export declare class OrdemServicoTypeOrmRepository implements OrdemServicoRepositoryPort {
    private readonly repo;
    constructor(repo: Repository<OrdemServicoOrmEntity>);
    create(ordem: OrdemServico): Promise<OrdemServico>;
    findById(id: number): Promise<OrdemServico | null>;
    findAll(): Promise<OrdemServico[]>;
    findByClienteId(clienteId: number): Promise<OrdemServico[]>;
    update(ordem: OrdemServico): Promise<OrdemServico>;
    delete(id: number): Promise<OrdemServico>;
    private toDomain;
}
