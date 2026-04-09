import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateMovelDto {
    @ApiPropertyOptional({ example: true })
    restaurado: boolean;

    @ApiPropertyOptional({ example: 200 })
    horasHomem: number;
}
