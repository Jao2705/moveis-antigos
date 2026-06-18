"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovelNotFoundException = exports.MovelDuplicadoEmRestauracaoException = exports.MovelDataAnteriorFundacaoException = exports.AtelieNaoEncontradoParaMovelException = exports.MovelEmProcessoHorasInvalidaException = exports.MovelRestauradoInconsistenteException = exports.MovelHorasHomemInvalidaException = exports.MovelDataInicioInvalidaException = exports.MovelCampoObrigatorioException = void 0;
class MovelCampoObrigatorioException extends Error {
    constructor(campo) {
        super(`${campo} e obrigatorio`);
    }
}
exports.MovelCampoObrigatorioException = MovelCampoObrigatorioException;
class MovelDataInicioInvalidaException extends Error {
    constructor() {
        super('Data de início do trabalho inválida');
    }
}
exports.MovelDataInicioInvalidaException = MovelDataInicioInvalidaException;
class MovelHorasHomemInvalidaException extends Error {
    constructor() {
        super('Horas-homem deve estar entre 10 e 1000');
    }
}
exports.MovelHorasHomemInvalidaException = MovelHorasHomemInvalidaException;
class MovelRestauradoInconsistenteException extends Error {
    constructor() {
        super('Se restaurado for true, horasHomem deve ser >= 40');
    }
}
exports.MovelRestauradoInconsistenteException = MovelRestauradoInconsistenteException;
class MovelEmProcessoHorasInvalidaException extends Error {
    constructor() {
        super('Se restaurado for false, horasHomem nao pode ser 0');
    }
}
exports.MovelEmProcessoHorasInvalidaException = MovelEmProcessoHorasInvalidaException;
class AtelieNaoEncontradoParaMovelException extends Error {
    constructor(atelieId) {
        super(`Ateliê com id ${atelieId} não encontrado`);
    }
}
exports.AtelieNaoEncontradoParaMovelException = AtelieNaoEncontradoParaMovelException;
class MovelDataAnteriorFundacaoException extends Error {
    constructor() {
        super('Data de início do trabalho não pode ser anterior à data de fundação do ateliê.');
    }
}
exports.MovelDataAnteriorFundacaoException = MovelDataAnteriorFundacaoException;
class MovelDuplicadoEmRestauracaoException extends Error {
    constructor() {
        super('Já existe um móvel desse tipo em restauração para esse ateliê.');
    }
}
exports.MovelDuplicadoEmRestauracaoException = MovelDuplicadoEmRestauracaoException;
class MovelNotFoundException extends Error {
    constructor(id) {
        super(`Móvel com id ${id} não encontrado`);
    }
}
exports.MovelNotFoundException = MovelNotFoundException;
//# sourceMappingURL=movel.exceptions.js.map