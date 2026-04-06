import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateAtelieDto {
    @ApiPropertyOptional({ example: "Luis XV" })
    especialidadeEra?: string;

    @ApiPropertyOptional({ example: "2000-04-20" })
    dataFundacao?: string;

    @ApiPropertyOptional({ example: true })
    equipadoCompleto: boolean;

    @ApiPropertyOptional({ example: 120 })
    areaOficinaM2: number;
}
