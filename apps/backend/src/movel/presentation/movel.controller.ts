import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
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
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Cria um movel (Admin ou usuário)' })
  create(
    @Body() dto: CreateMovelDto,
    @Request() req: { user: { id: number; role: 'admin' | 'user' } },
  ) {
    return this.movelService.create(
      dto.tipoMovel,
      dto.dataInicioTrab,
      dto.restaurado,
      dto.horasHomem,
      dto.atelieId,
      req.user.id,
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
  @Roles('admin', 'user')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ summary: 'Atualiza movel (Admin ou proprietário)' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMovelDto,
    @Request() req: { user: { id: number; role: 'admin' | 'user' } },
  ) {
    return this.movelService.update(
      Number(id),
      dto.restaurado,
      dto.horasHomem,
      req.user,
    );
  }

  @Delete(':id')
  @Roles('admin', 'user')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ summary: 'Remove movel (Admin ou proprietário)' })
  delete(
    @Param('id') id: string,
    @Request() req: { user: { id: number; role: 'admin' | 'user' } },
  ) {
    return this.movelService.delete(Number(id), req.user);
  }
}
