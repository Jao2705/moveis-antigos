import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AtelieService } from '../application/atelie.service';
import { CreateAtelieDto } from './dto/create-atelie.dto';
import { UpdateAtelieDto } from './dto/update-atelie.dto';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/infrastructure/guards/roles.guard';
import { Roles } from 'src/auth/infrastructure/decorators/roles.decorator';

@ApiTags('atelie')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('atelie')
export class AtelieController {
  constructor(private readonly atelieService: AtelieService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Cria um atelie (Admin)' })
  create(@Body() dto: CreateAtelieDto) {
    return this.atelieService.create(
      dto.especialidadeEra,
      dto.equipadoCompleto,
      dto.areaOficinaM2,
      dto.dataFundacao,
    );
  }

  @Get()
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Lista de atelies' })
  findAll() {
    return this.atelieService.findAll();
  }

  @Get(':id/com-moveis')
  @Roles('admin', 'user')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ summary: 'Busca um atelie com seus moveis' })
  findByIdComMoveis(@Param('id') id: string) {
    return this.atelieService.findByIdWithMoveis(Number(id));
  }

  @Get(':id')
  @Roles('admin', 'user')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ summary: 'Busca um atelie por id' })
  findById(@Param('id') id: string) {
    return this.atelieService.findById(Number(id));
  }

  @Put(':id')
  @Roles('admin')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ summary: 'Atualiza os dados de um atelie (Admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateAtelieDto) {
    return this.atelieService.update(
      Number(id),
      dto.equipadoCompleto,
      dto.areaOficinaM2,
    );
  }

  @Delete(':id')
  @Roles('admin')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ summary: 'Remove um atelie (Admin)' })
  delete(@Param('id') id: string) {
    return this.atelieService.delete(Number(id));
  }
}
