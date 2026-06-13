import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdemServicoRepositoryPort } from 'src/ordem-servico/application/ports/ordem-servico.repository.port';
import { OrdemServico, OrdemServicoStatus } from 'src/ordem-servico/domain/ordem-servico';
import { OrdemServicoOrmEntity } from './ordem-servico.orm-entity';

@Injectable()
export class OrdemServicoTypeOrmRepository implements OrdemServicoRepositoryPort {
  constructor(
    @InjectRepository(OrdemServicoOrmEntity)
    private readonly repo: Repository<OrdemServicoOrmEntity>,
  ) {}

  async create(ordem: OrdemServico): Promise<OrdemServico> {
    const orm = this.repo.create({
      cliente_id: ordem.cliente_id,
      atelie_id: ordem.atelie_id,
      movel_id: ordem.movel_id,
      descricao_problema: ordem.descricao_problema,
      tipo_movel_informado: ordem.tipo_movel_informado,
      status: ordem.status,
      data_previsao_entrega: ordem.data_previsao_entrega ?? null,
      valor_orcamento: ordem.valor_orcamento ?? null,
    });
    const saved = await this.repo.save(orm);
    return this.toDomain(saved);
  }

  async findById(id: number): Promise<OrdemServico | null> {
    const orm = await this.repo.findOneBy({ id });
    return orm ? this.toDomain(orm) : null;
  }

  async findAll(): Promise<OrdemServico[]> {
    const ordens = await this.repo.find({ order: { id: 'DESC' } });
    return ordens.map(this.toDomain);
  }

  async findByClienteId(clienteId: number): Promise<OrdemServico[]> {
    const ordens = await this.repo.find({
      where: { cliente_id: clienteId },
      order: { id: 'DESC' },
    });
    return ordens.map(this.toDomain);
  }

  async update(ordem: OrdemServico): Promise<OrdemServico> {
    if (ordem.id === null) {
      throw new Error('Ordem de serviço sem ID não pode ser atualizada');
    }
    const orm = await this.repo.findOneBy({ id: ordem.id });
    if (!orm) {
      throw new Error('Ordem de serviço não encontrada para atualizar');
    }
    orm.descricao_problema = ordem.descricao_problema;
    orm.tipo_movel_informado = ordem.tipo_movel_informado;
    orm.status = ordem.status;
    orm.data_previsao_entrega = ordem.data_previsao_entrega ?? null;
    orm.valor_orcamento = ordem.valor_orcamento ?? null;
    orm.movel_id = ordem.movel_id;
    const saved = await this.repo.save(orm);
    return this.toDomain(saved);
  }

  async delete(id: number): Promise<OrdemServico> {
    const orm = await this.repo.findOneBy({ id });
    if (!orm) {
      throw new Error('Ordem de serviço não encontrada para remover');
    }
    const domain = this.toDomain(orm);
    await this.repo.delete({ id });
    return domain;
  }

  private toDomain = (orm: OrdemServicoOrmEntity): OrdemServico => {
    return new OrdemServico(
      orm.id,
      orm.cliente_id,
      orm.atelie_id,
      orm.movel_id,
      orm.descricao_problema,
      orm.tipo_movel_informado,
      orm.status as OrdemServicoStatus,
      orm.data_solicitacao,
      orm.data_previsao_entrega,
      orm.valor_orcamento,
    );
  };
}
