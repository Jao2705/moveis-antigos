import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { AtelieService } from "../application/atelie.service";
import { CreateAtelieDto } from "./dto/create-atelie.dto";
import { UpdateAtelieDto } from "./dto/update-atelie.dto";

@ApiTags("atelie")
@Controller("atelie")
export class AtelieController {
    constructor(
        private readonly atelieService: AtelieService,
    ) { }

    @Post()
    @ApiOperation({ summary: "Cria um atelie" })
    create(@Body() dto: CreateAtelieDto) {
        return this.atelieService.create(
            dto.especialidadeEra,
            dto.equipadoCompleto,
            dto.areaOficinaM2,
            dto.dataFundacao
        );
    }

    @Get()
    @ApiOperation({ summary: "Lista de atelies" })
    findAll() {
        return this.atelieService.findAll();
    }

    @Get(":id/com-moveis")
    @ApiParam({ name: "id", example: 1 })
    @ApiOperation({ summary: "Busca um atelie com seus moveis" })
    findByIdComMoveis(@Param("id") id: string) {
        return this.atelieService.findByIdWithMoveis(Number(id));
    }

    @Get(":id")
    @ApiParam({ name: "id", example: 1 })
    @ApiOperation({ summary: "Busca um atelie por id" })
    findById(@Param("id") id: string) {
        return this.atelieService.findById(Number(id));
    }

    @Put(":id")
    @ApiParam({ name: "id", example: 1 })
    @ApiOperation({ summary: "Atualiza os dados de um atelie" })
    update(@Param("id") id: string, @Body() dto: UpdateAtelieDto) {
        return this.atelieService.update(
            Number(id),
            dto.equipadoCompleto,
            dto.areaOficinaM2
        );
    }

    @Delete(":id")
    @ApiParam({ name: "id", example: 1 })
    @ApiOperation({ summary: "Remove um atelie" })
    delete(@Param("id") id: string) {
        return this.atelieService.delete(Number(id));
    }
}
