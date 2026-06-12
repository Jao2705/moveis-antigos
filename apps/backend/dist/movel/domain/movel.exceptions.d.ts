export declare class MovelCampoObrigatorioException extends Error {
    constructor(campo: string);
}
export declare class MovelDataInicioInvalidaException extends Error {
    constructor();
}
export declare class MovelHorasHomemInvalidaException extends Error {
    constructor();
}
export declare class MovelRestauradoInconsistenteException extends Error {
    constructor();
}
export declare class MovelEmProcessoHorasInvalidaException extends Error {
    constructor();
}
export declare class AtelieNaoEncontradoParaMovelException extends Error {
    constructor(atelieId: number);
}
export declare class MovelDataAnteriorFundacaoException extends Error {
    constructor();
}
export declare class MovelDuplicadoEmRestauracaoException extends Error {
    constructor();
}
export declare class MovelNotFoundException extends Error {
    constructor(id: number);
}
