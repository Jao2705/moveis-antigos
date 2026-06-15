"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdemServico = void 0;
class OrdemServico {
    id;
    cliente_id;
    atelie_id;
    movel_id;
    descricao_problema;
    tipo_movel_informado;
    status;
    data_solicitacao;
    data_previsao_entrega;
    valor_orcamento;
    constructor(id, cliente_id, atelie_id, movel_id, descricao_problema, tipo_movel_informado, status, data_solicitacao, data_previsao_entrega, valor_orcamento) {
        this.id = id;
        this.cliente_id = cliente_id;
        this.atelie_id = atelie_id;
        this.movel_id = movel_id;
        this.descricao_problema = descricao_problema;
        this.tipo_movel_informado = tipo_movel_informado;
        this.status = status;
        this.data_solicitacao = data_solicitacao;
        this.data_previsao_entrega = data_previsao_entrega;
        this.valor_orcamento = valor_orcamento;
    }
}
exports.OrdemServico = OrdemServico;
//# sourceMappingURL=ordem-servico.js.map