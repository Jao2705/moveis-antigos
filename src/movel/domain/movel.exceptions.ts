import { BadRequestException, ConflictException, NotFoundException } from "@nestjs/common";

export class MovelCampoObrigatorioException extends BadRequestException {
    constructor(campo: string) {
        super(`${campo} e obrigatorio`);
    }
}

export class MovelDataInicioInvalidaException extends BadRequestException {
    constructor() {
        super("Data de início do trabalho inválida");
    }
}

export class MovelHorasHomemInvalidaException extends BadRequestException {
    constructor() {
        super("horasHomem deve estar entre 10 e 1000");
    }
}

export class MovelRestauradoInconsistenteException extends BadRequestException {
    constructor() {
        super("se restaurado for true, horasHomem deve ser >= 40");
    }
}

export class MovelEmProcessoHorasInvalidaException extends BadRequestException {
    constructor() {
        super("se restaurado for false, horasHomem nao pode ser 0");
    }
}

export class AtelieNaoEncontradoParaMovelException extends NotFoundException {
    constructor(atelieId: number) {
        super(`Atelie com id ${atelieId} nao encontrado`);
    }
}

export class MovelDataAnteriorFundacaoException extends BadRequestException {
    constructor() {
        super("dataInicioTrab nao pode ser anterior a dataFundacao do atelie");
    }
}

export class MovelDuplicadoEmRestauracaoException extends ConflictException {
    constructor() {
        super("Ja existe movel desse tipo em restauracao para esse atelie");
    }
}

export class MovelNotFoundException extends NotFoundException {
    constructor(id: number) {
        super(`Movel com id ${id} nao encontrado`);
    }
}
