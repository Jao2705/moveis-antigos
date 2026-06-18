export class MovelCampoObrigatorioException extends Error {
  constructor(campo: string) {
    super(`${campo} e obrigatorio`);
  }
}

export class MovelDataInicioInvalidaException extends Error {
  constructor() {
    super('Data de início do trabalho inválida');
  }
}

export class MovelHorasHomemInvalidaException extends Error {
  constructor() {
    super('Horas-homem deve estar entre 10 e 1000');
  }
}

export class MovelRestauradoInconsistenteException extends Error {
  constructor() {
    super('Se restaurado for true, horasHomem deve ser >= 40');
  }
}

export class MovelEmProcessoHorasInvalidaException extends Error {
  constructor() {
    super('Se restaurado for false, horasHomem nao pode ser 0');
  }
}

export class AtelieNaoEncontradoParaMovelException extends Error {
  constructor(atelieId: number) {
    super(`Ateliê com id ${atelieId} não encontrado`);
  }
}

export class MovelDataAnteriorFundacaoException extends Error {
  constructor() {
    super('Data de início do trabalho não pode ser anterior à data de fundação do ateliê.');
  }
}

export class MovelDuplicadoEmRestauracaoException extends Error {
  constructor() {
    super('Já existe um móvel desse tipo em restauração para esse ateliê.');
  }
}

export class MovelNotFoundException extends Error {
  constructor(id: number) {
    super(`Móvel com id ${id} não encontrado`);
  }
}
