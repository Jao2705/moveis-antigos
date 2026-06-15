export declare class OrdemServico {
    readonly id: number | null;
    cliente_id: number;
    atelie_id: number;
    movel_id: number | null;
    descricao_problema: string;
    tipo_movel_informado: string;
    status: OrdemServicoStatus;
    readonly data_solicitacao?: Date | undefined;
    data_previsao_entrega?: (Date | null) | undefined;
    valor_orcamento?: number | null | undefined;
    constructor(id: number | null, cliente_id: number, atelie_id: number, movel_id: number | null, descricao_problema: string, tipo_movel_informado: string, status: OrdemServicoStatus, data_solicitacao?: Date | undefined, data_previsao_entrega?: (Date | null) | undefined, valor_orcamento?: number | null | undefined);
}
export type OrdemServicoStatus = 'solicitado' | 'em_orcamento' | 'aprovado' | 'em_reparo' | 'concluido' | 'cancelado';
