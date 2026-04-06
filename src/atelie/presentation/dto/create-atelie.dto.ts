import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";

export class CreateAtelieDto {
    @ApiProperty({ example: "Barroco" })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    especialidadeEra: string;

    @ApiProperty({ example: "2000-04-20" })
    @IsDateString()
    dataFundacao: string;

    @ApiProperty({ example: false })
    @IsBoolean()
    equipadoCompleto: boolean;

    @ApiProperty({ example: 100 })
    @IsNumber()
    @Min(50)
    areaOficinaM2: number;
}
