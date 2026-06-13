import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrdemServicoService } from '../application/ordem-servico.service';
import { CreateOrdemServicoDto } from './dto/create-ordem-servico.dto';
import { UpdateOrdemServicoDto } from './dto/update-ordem-servico.dto';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/infrastructure/guards/roles.guard';
import { Roles } from 'src/auth/infrastructure/decorators/roles.decorator';

@ApiTags('Ordens de Serviço')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ordens')
export class OrdemServicoController {
  constructor(private readonly ordemService: OrdemServicoService) {}

  @Get()
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Lista ordens (Admin: todas, User: apenas suas)' })
  async findAll(@Request() req: any) {
    if (req.user.role === 'admin') {
      return this.ordemService.findAll();
    }
    return this.ordemService.findByClienteId(req.user.id);
  }

  @Post()
  @Roles('user')
  @ApiOperation({ summary: 'Cria uma nova ordem de serviço (User)' })
  async create(@Request() req: any, @Body() dto: CreateOrdemServicoDto) {
    return this.ordemService.create(
      req.user.id,
      dto.atelie_id,
      dto.movel_id ?? null,
      dto.descricao_problema,
      dto.tipo_movel_informado ?? '',
    );
  }

  @Get(':id')
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Busca ordem por ID' })
  async findById(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    if (req.user.role === 'admin') {
      return this.ordemService.findById(id);
    }
    return this.ordemService.findByIdForUser(id, req.user.id);
  }

  @Put(':id')
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Atualiza ordem (Admin: full, User: apenas cancelar)' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
    @Body() dto: UpdateOrdemServicoDto,
  ) {
    if (req.user.role === 'admin') {
      return this.ordemService.updateByAdmin(
        id,
        dto.status,
        dto.descricao_problema,
        dto.tipo_movel_informado ?? '',
        dto.data_previsao_entrega ? new Date(dto.data_previsao_entrega) : null,
        dto.valor_orcamento ?? null,
      );
    }
    return this.ordemService.cancelByUser(id, req.user.id);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Remove uma ordem de serviço (Admin)' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.ordemService.delete(id);
  }
}
