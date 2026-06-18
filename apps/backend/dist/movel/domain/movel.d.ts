export declare class Movel {
    readonly id: number | null;
    tipoMovel: string;
    dataInicioTrab: Date;
    restaurado: boolean;
    horasHomem: number;
    atelieId: number;
    ownerUserId: number | null;
    constructor(id: number | null, tipoMovel: string, dataInicioTrab: Date, restaurado: boolean, horasHomem: number, atelieId: number, ownerUserId: number | null);
}
