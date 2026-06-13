export class OrdemServico {
  constructor(
    public readonly id: number | null,
    public cliente_id: number,
    public atelie_id: number,
    public movel_id: number | null,
    public descricao_problema: string,
    public tipo_movel_informado: string,
    public status: OrdemServicoStatus,
    public readonly data_solicitacao?: Date,
    public data_previsao_entrega?: Date | null,
    public valor_orcamento?: number | null,
  ) {}
}

export type OrdemServicoStatus =
  | 'solicitado'
  | 'em_orcamento'
  | 'aprovado'
  | 'em_reparo'
  | 'concluido'
  | 'cancelado';
