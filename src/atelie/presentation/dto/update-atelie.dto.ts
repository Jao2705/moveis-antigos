import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class UpdateAtelieDto {
    @ApiPropertyOptional({ example: "Luis XV" })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    especialidadeEra?: string;

    @ApiPropertyOptional({ example: "2000-04-20" })
    @IsOptional()
    @IsDateString()
    dataFundacao?: string;

    @ApiPropertyOptional({ example: true })
    @IsBoolean()
    equipadoCompleto: boolean;

    @ApiPropertyOptional({ example: 120 })
    @IsNumber()
    @Min(50)
    areaOficinaM2: number;
}
