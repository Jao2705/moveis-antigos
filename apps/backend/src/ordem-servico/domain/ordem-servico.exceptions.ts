export class OrdemServicoNotFoundException extends Error {
  constructor(id?: number) {
    super(id ? `Ordem de serviço com ID ${id} não encontrada` : 'Ordem de serviço não encontrada');
    this.name = 'OrdemServicoNotFoundException';
  }
}

export class OrdemServicoCancelamentoNaoPermitidoException extends Error {
  constructor(message = 'Só é possível cancelar ordens com status "solicitado" ou "em_orcamento"') {
    super(message);
    this.name = 'OrdemServicoCancelamentoNaoPermitidoException';
  }
}

export class OrdemServicoAcessoNegadoException extends Error {
  constructor(message = 'Você não tem permissão para acessar esta ordem de serviço') {
    super(message);
    this.name = 'OrdemServicoAcessoNegadoException';
  }
}
