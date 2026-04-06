import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateMovelDto {
    @ApiPropertyOptional({ example: "Mesa Vitoriana" })
    tipoMovel?: string;

    @ApiPropertyOptional({ example: "2022-10-01" })
    dataInicioTrab?: string;

    @ApiPropertyOptional({ example: true })
    restaurado?: boolean;

    @ApiPropertyOptional({ example: 200 })
    horasHomem?: number;

    @ApiPropertyOptional({ example: 1 })

    atelieId?: number;
}
