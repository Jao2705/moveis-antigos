export declare class Movel {
    readonly id: number | null;
    tipoMovel: string;
    dataInicioTrab: Date;
    restaurado: boolean;
    horasHomem: number;
    atelieId: number;
    constructor(id: number | null, tipoMovel: string, dataInicioTrab: Date, restaurado: boolean, horasHomem: number, atelieId: number);
}
