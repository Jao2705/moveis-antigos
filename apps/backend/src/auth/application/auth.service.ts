import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/application/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      const isMatch = await bcrypt.compare(pass, user.senha_hash);
      if (!isMatch) {
        throw new UnauthorizedException('E-mail ou senha inválidos');
      }
      const payload = { email: user.email, sub: user.id, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }
  }
}
