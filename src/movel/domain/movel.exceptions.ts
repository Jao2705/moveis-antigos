import { BadRequestException, ConflictException, NotFoundException } from "@nestjs/common";

export class MovelCampoObrigatorioException extends Error {
    constructor(campo: string) {
        super(`${campo} e obrigatorio`);
    }
}

export class MovelDataInicioInvalidaException extends Error {
    constructor() {
        super("Data de início do trabalho inválida");
    }
}

export class MovelHorasHomemInvalidaException extends Error {
    constructor() {
        super("horasHomem deve estar entre 10 e 1000");
    }
}

export class MovelRestauradoInconsistenteException extends Error {
    constructor() {
        super("se restaurado for true, horasHomem deve ser >= 40");
    }
}

export class MovelEmProcessoHorasInvalidaException extends Error {
    constructor() {
        super("se restaurado for false, horasHomem nao pode ser 0");
    }
}

export class AtelieNaoEncontradoParaMovelException extends Error {
    constructor(atelieId: number) {
        super(`Atelie com id ${atelieId} nao encontrado`);
    }
}

export class MovelDataAnteriorFundacaoException extends Error {
    constructor() {
        super("dataInicioTrab nao pode ser anterior a dataFundacao do atelie");
    }
}

export class MovelDuplicadoEmRestauracaoException extends Error {
    constructor() {
        super("Ja existe movel desse tipo em restauracao para esse atelie");
    }
}

export class MovelNotFoundException extends Error {
    constructor(id: number) {
        super(`Movel com id ${id} nao encontrado`);
    }
}
