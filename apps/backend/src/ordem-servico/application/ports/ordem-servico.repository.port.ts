import { OrdemServico, OrdemServicoStatus } from '../../domain/ordem-servico';

export interface OrdemServicoRepositoryPort {
  create(ordem: OrdemServico): Promise<OrdemServico>;
  findById(id: number): Promise<OrdemServico | null>;
  findAll(): Promise<OrdemServico[]>;
  findByClienteId(clienteId: number): Promise<OrdemServico[]>;
  update(ordem: OrdemServico): Promise<OrdemServico>;
  delete(id: number): Promise<OrdemServico>;
}
