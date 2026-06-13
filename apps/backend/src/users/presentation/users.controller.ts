import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from '../application/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
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
  async getProfile(@Request() req: any) {
    const user = await this.usersService.findById(req.user.id);
    return this.toResponse(user);
  }

  @Put('me')
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Atualiza o próprio perfil' })
  async updateProfile(@Request() req: any, @Body() dto: UpdateProfileDto) {
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
  @ApiOperation({ summary: 'Lista todos os usuários (Apenas Admin)' })
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map(this.toResponse);
  }

  @Post('users')
  @Roles('admin')
  @ApiOperation({ summary: 'Cria um novo usuário (Apenas Admin)' })
  async create(@Body() dto: CreateUserDto) {
    const user = await this.usersService.create(
      dto.nome,
      dto.email,
      dto.senha,
      dto.role,
    );
    return this.toResponse(user);
  }

  @Put('users/:id/role')
  @Roles('admin')
  @ApiOperation({ summary: 'Altera o perfil de um usuário (Apenas Admin)' })
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoleDto,
  ) {
    const user = await this.usersService.updateRole(id, dto.role);
    return this.toResponse(user);
  }

  private toResponse(user: User) {
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
