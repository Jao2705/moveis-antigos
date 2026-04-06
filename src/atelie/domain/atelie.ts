export class Atelie {
    constructor(
        public readonly id: number | null,
        public especialidadeEra: string,
        public equipadoCompleto: boolean,
        public areaOficinaM2: number,
        public readonly dataFundacao?: Date,
    ) { }
}