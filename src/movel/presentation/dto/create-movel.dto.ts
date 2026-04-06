import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateMovelDto {
    @ApiProperty({ example: "Comoda Luis XV" })
    @IsString()
    @IsNotEmpty()
    tipoMovel: string;

    @ApiProperty({ example: "2021-08-15" })
    @IsDateString()
    dataInicioTrab: string;

    @ApiProperty({ example: false })
    @IsBoolean()
    restaurado: boolean;

    @ApiProperty({ example: 80 })
    @IsNumber()
    @Min(10)
    horasHomem: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    @Min(1)
    atelieId: number;
}
