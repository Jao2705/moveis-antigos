export declare class UpdateOrdemServicoDto {
    status: 'solicitado' | 'em_orcamento' | 'aprovado' | 'em_reparo' | 'concluido' | 'cancelado';
    descricao_problema: string;
    tipo_movel_informado?: string;
    data_previsao_entrega?: string | null;
    valor_orcamento?: number | null;
}
