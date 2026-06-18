import {
  Controller,
  Get,
  Put,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from '../application/users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/infrastructure/guards/roles.guard';
import { Roles } from 'src/auth/infrastructure/decorators/roles.decorator';
import { User } from '../domain/user';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Obtém dados do próprio perfil' })
  async getProfile(@Request() req: { user: { id: number } }) {
    const user = await this.usersService.findById(req.user.id);
    return this.toResponse(user);
  }

  @Put('me')
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Atualiza o próprio perfil' })
  async updateProfile(
    @Request() req: { user: { id: number } },
    @Body() dto: UpdateProfileDto,
  ) {
    const user = await this.usersService.updateProfile(
      req.user.id,
      dto.nome,
      dto.email,
      dto.senha,
    );
    return this.toResponse(user);
  }

  @Get('users')
  @Roles('admin')
  @ApiOperation({ summary: 'Lista todos os usuários (apenas administrador)' })
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => this.toResponse(user));
  }

  @Patch('users/:id/activate')
  @Roles('admin')
  @ApiOperation({
    summary: 'Ativa ou desativa um usuário (apenas administrador)',
  })
  async activate(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActivateUserDto,
  ) {
    const user = await this.usersService.setActive(id, dto.ativo);
    return this.toResponse(user);
  }

  private toResponse(user: User) {
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role,
      ativo: user.ativo,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
