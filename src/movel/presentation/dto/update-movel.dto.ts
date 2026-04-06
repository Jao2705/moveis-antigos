import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class UpdateMovelDto {
    @ApiPropertyOptional({ example: "Mesa Vitoriana" })
    @IsOptional()
    @IsString()
    tipoMovel?: string;

    @ApiPropertyOptional({ example: "2022-10-01" })
    @IsOptional()
    @IsDateString()
    dataInicioTrab?: string;

    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    restaurado?: boolean;

    @ApiPropertyOptional({ example: 200 })
    @IsOptional()
    @IsNumber()
    @Min(10)
    horasHomem?: number;

    @ApiPropertyOptional({ example: 1 })
    @IsOptional()
    @IsInt()
    @Min(1)
    atelieId?: number;
}
