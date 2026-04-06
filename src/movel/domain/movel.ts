export class Movel {
    constructor(
        public readonly id: number | null,
        public tipoMovel: string,
        public dataInicioTrab: Date,
        public restaurado: boolean,
        public horasHomem: number,
        public atelieId: number,
    ) { }
}
