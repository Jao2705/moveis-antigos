"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdemServicoAcessoNegadoException = exports.OrdemServicoCancelamentoNaoPermitidoException = exports.OrdemServicoNotFoundException = void 0;
class OrdemServicoNotFoundException extends Error {
    constructor(id) {
        super(id ? `Ordem de serviço com ID ${id} não encontrada` : 'Ordem de serviço não encontrada');
        this.name = 'OrdemServicoNotFoundException';
    }
}
exports.OrdemServicoNotFoundException = OrdemServicoNotFoundException;
class OrdemServicoCancelamentoNaoPermitidoException extends Error {
    constructor(message = 'Só é possível cancelar ordens com status "solicitado" ou "em_orcamento"') {
        super(message);
        this.name = 'OrdemServicoCancelamentoNaoPermitidoException';
    }
}
exports.OrdemServicoCancelamentoNaoPermitidoException = OrdemServicoCancelamentoNaoPermitidoException;
class OrdemServicoAcessoNegadoException extends Error {
    constructor(message = 'Você não tem permissão para acessar esta ordem de serviço') {
        super(message);
        this.name = 'OrdemServicoAcessoNegadoException';
    }
}
exports.OrdemServicoAcessoNegadoException = OrdemServicoAcessoNegadoException;
//# sourceMappingURL=ordem-servico.exceptions.js.map