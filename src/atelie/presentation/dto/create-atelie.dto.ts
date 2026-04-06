import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";

export class CreateAtelieDto {
    @ApiProperty({ example: "Barroco" })
    @IsNotEmpty()
    @MaxLength(100)
    especialidadeEra: string;

    @ApiProperty({ example: "2000-04-20" })
    dataFundacao: string;

    @ApiProperty({ example: false })
    equipadoCompleto: boolean;

    @ApiProperty({ example: 100 })
    areaOficinaM2: number;
}
