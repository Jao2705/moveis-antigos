import { ApiProperty } from "@nestjs/swagger";

export class CreateMovelDto {
    @ApiProperty({ example: "Comoda Luis XV" })
    tipoMovel: string;

    @ApiProperty({ example: "2021-08-15" })
    dataInicioTrab: string;

    @ApiProperty({ example: false })
    restaurado: boolean;

    @ApiProperty({ example: 80 })
    horasHomem: number;

    @ApiProperty({ example: 1 })
    atelieId: number;
}
