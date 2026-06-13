import { Inject, Injectable } from '@nestjs/common';
import { OrdemServico, OrdemServicoStatus } from '../domain/ordem-servico';
import type { OrdemServicoRepositoryPort } from './ports/ordem-servico.repository.port';
import {
  OrdemServicoNotFoundException,
  OrdemServicoCancelamentoNaoPermitidoException,
  OrdemServicoAcessoNegadoException,
} from '../domain/ordem-servico.exceptions';

@Injectable()
export class OrdemServicoService {
  constructor(
    @Inject('OrdemServicoRepositoryPort')
    private readonly ordemRepo: OrdemServicoRepositoryPort,
  ) {}

  async create(
    clienteId: number,
    atelieId: number,
    movelId: number | null,
    descricaoProblema: string,
    tipoMovelInformado: string,
  ): Promise<OrdemServico> {
    const ordem = new OrdemServico(
      null,
      clienteId,
      atelieId,
      movelId,
      descricaoProblema,
      tipoMovelInformado,
      'solicitado',
    );
    return this.ordemRepo.create(ordem);
  }

  async findAll(): Promise<OrdemServico[]> {
    return this.ordemRepo.findAll();
  }

  async findByClienteId(clienteId: number): Promise<OrdemServico[]> {
    return this.ordemRepo.findByClienteId(clienteId);
  }

  async findById(id: number): Promise<OrdemServico> {
    const ordem = await this.ordemRepo.findById(id);
    if (!ordem) {
      throw new OrdemServicoNotFoundException(id);
    }
    return ordem;
  }

  async findByIdForUser(id: number, userId: number): Promise<OrdemServico> {
    const ordem = await this.findById(id);
    if (ordem.cliente_id !== userId) {
      throw new OrdemServicoAcessoNegadoException();
    }
    return ordem;
  }

  async updateByAdmin(
    id: number,
    status: OrdemServicoStatus,
    descricaoProblema: string,
    tipoMovelInformado: string,
    dataPrevisaoEntrega: Date | null,
    valorOrcamento: number | null,
  ): Promise<OrdemServico> {
    const ordem = await this.findById(id);
    ordem.status = status;
    ordem.descricao_problema = descricaoProblema;
    ordem.tipo_movel_informado = tipoMovelInformado;
    ordem.data_previsao_entrega = dataPrevisaoEntrega;
    ordem.valor_orcamento = valorOrcamento;
    return this.ordemRepo.update(ordem);
  }

  async cancelByUser(id: number, userId: number): Promise<OrdemServico> {
    const ordem = await this.findById(id);
    if (ordem.cliente_id !== userId) {
      throw new OrdemServicoAcessoNegadoException();
    }
    if (ordem.status !== 'solicitado' && ordem.status !== 'em_orcamento') {
      throw new OrdemServicoCancelamentoNaoPermitidoException();
    }
    ordem.status = 'cancelado';
    return this.ordemRepo.update(ordem);
  }

  async delete(id: number): Promise<OrdemServico> {
    const ordem = await this.findById(id);
    return this.ordemRepo.delete(ordem.id!);
  }
}
