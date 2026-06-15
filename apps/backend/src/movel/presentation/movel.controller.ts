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
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { MovelService } from '../application/movel.service';
import { CreateMovelDto } from './dto/create-movel.dto';
import { UpdateMovelDto } from './dto/update-movel.dto';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/infrastructure/guards/roles.guard';
import { Roles } from 'src/auth/infrastructure/decorators/roles.decorator';

@ApiTags('movel')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('movel')
export class MovelController {
  constructor(private readonly movelService: MovelService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Cria um movel (Admin)' })
  create(@Body() dto: CreateMovelDto) {
    return this.movelService.create(
      dto.tipoMovel,
      dto.dataInicioTrab,
      dto.restaurado,
      dto.horasHomem,
      dto.atelieId,
    );
  }

  @Get()
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Lista todos os moveis' })
  findAll() {
    return this.movelService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ summary: 'Busca movel por id' })
  findById(@Param('id') id: string) {
    return this.movelService.findById(Number(id));
  }

  @Put(':id')
  @Roles('admin')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ summary: 'Atualiza movel (Admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateMovelDto) {
    return this.movelService.update(Number(id), dto.restaurado, dto.horasHomem);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ summary: 'Remove movel (Admin)' })
  delete(@Param('id') id: string) {
    return this.movelService.delete(Number(id));
  }
}
