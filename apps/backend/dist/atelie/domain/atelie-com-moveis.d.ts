export interface AtelieComMoveis {
    id: number;
    especialidadeEra: string;
    equipadoCompleto: boolean;
    areaOficinaM2: number;
    dataFundacao: Date;
    moveis: {
        id: number;
        tipoMovel: string;
        dataInicioTrab: Date;
        restaurado: boolean;
        horasHomem: number;
        atelieId: number;
    }[];
}
