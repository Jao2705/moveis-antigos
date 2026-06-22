import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/application/users.service';
import { EmailAlreadyExistsException } from 'src/users/domain/user.exceptions';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly invalidCredentialsMessage = 'E-mail ou senha incorretos.';

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(nome: string, email: string, senha: string) {
    try {
      const user = await this.usersService.register(nome, email, senha);
      return {
        message:
          'Cadastro realizado com sucesso. Aguarde a liberação do administrador para acessar o sistema.',
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          ativo: user.ativo,
        },
      };
    } catch (error) {
      if (error instanceof EmailAlreadyExistsException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  async login(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(this.invalidCredentialsMessage);
    }

    const isMatch = await bcrypt.compare(pass, user.senha_hash);
    if (!isMatch) {
      throw new UnauthorizedException(this.invalidCredentialsMessage);
    }

    if (!user.ativo) {
      throw new UnauthorizedException(this.invalidCredentialsMessage);
    }

    const payload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      nome: user.nome,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role,
        ativo: user.ativo,
      },
    };
  }
}
