import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { MovelService } from "../application/movel.service";
import { CreateMovelDto } from "./dto/create-movel.dto";
import { UpdateMovelDto } from "./dto/update-movel.dto";

@ApiTags("movel")
@Controller("movel")
export class MovelController {
    constructor(private readonly movelService: MovelService) { }

    @Post()
    @ApiOperation({ summary: "Cria um movel" })
    create(@Body() dto: CreateMovelDto) {
        return this.movelService.create(
            dto.tipoMovel,
            dto.dataInicioTrab,
            dto.restaurado,
            dto.horasHomem,
            dto.atelieId
        );
    }

    @Get()
    @ApiOperation({ summary: "Lista todos os moveis" })
    findAll() {
        return this.movelService.findAll();
    }

    @Get(":id")
    @ApiParam({ name: "id", example: 1 })
    @ApiOperation({ summary: "Busca movel por id" })
    findById(@Param("id") id: string) {
        return this.movelService.findById(Number(id));
    }

    @Put(":id")
    @ApiParam({ name: "id", example: 1 })
    @ApiOperation({ summary: "Atualiza movel" })
    update(@Param("id") id: string, @Body() dto: UpdateMovelDto) {
        return this.movelService.update(
            Number(id),
            dto.restaurado,
            dto.horasHomem,
        );
    }

    @Delete(":id")
    @ApiParam({ name: "id", example: 1 })
    @ApiOperation({ summary: "Remove movel" })
    delete(@Param("id") id: string) {
        return this.movelService.delete(Number(id));
    }
}
