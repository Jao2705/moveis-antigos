import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secretKey123',
    });
  }

  validate(payload: {
    sub: number;
    email: string;
    nome: string;
    role: 'admin' | 'user';
  }) {
    return {
      id: payload.sub,
      email: payload.email,
      nome: payload.nome,
      role: payload.role,
    };
  }
}
