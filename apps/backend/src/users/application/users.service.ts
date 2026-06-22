import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../domain/user';
import type { UserRepositoryPort } from './ports/user.repository.port';
import {
  EmailAlreadyExistsException,
  UserNotFoundException,
  LastAdminException,
} from '../domain/user.exceptions';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepositoryPort')
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async register(
    nome: string,
    email: string,
    senhaPlana: string,
  ): Promise<User> {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      throw new EmailAlreadyExistsException(
        'Este e-mail já está cadastrado. Faça login ou use outro e-mail.',
      );
    }

    const senha_hash = await bcrypt.hash(senhaPlana, 10);
    const user = new User(null, nome, email, senha_hash, 'user', false);
    return this.userRepo.create(user);
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  async setActive(id: number, ativo: boolean): Promise<User> {
    const user = await this.findById(id);

    if (user.role === 'admin' && !ativo) {
      const adminsCount = await this.userRepo.countAdmins();
      if (adminsCount <= 1) {
        throw new LastAdminException(
          'Não é possível desativar o único administrador do sistema.',
        );
      }
    }

    user.ativo = ativo;
    return this.userRepo.update(user);
  }

  async setRole(id: number, role: 'admin' | 'user'): Promise<User> {
    const user = await this.findById(id);

    if (user.role === 'admin' && role === 'user') {
      const adminsCount = await this.userRepo.countAdmins();
      if (adminsCount <= 1) {
        throw new LastAdminException(
          'Não é possível desativar a role de administrador do único administrador do sistema.',
        );
      }
    }

    user.role = role;
    return this.userRepo.update(user);
  }

  async updateProfile(
    id: number,
    nome: string,
    email: string,
    senhaPlana?: string,
  ): Promise<User> {
    const user = await this.findById(id);

    if (email !== user.email) {
      const existing = await this.userRepo.findByEmail(email);
      if (existing) {
        throw new EmailAlreadyExistsException();
      }
      user.email = email;
    }

    user.nome = nome;

    if (senhaPlana && senhaPlana.trim() !== '') {
      user.senha_hash = await bcrypt.hash(senhaPlana, 10);
    }

    return this.userRepo.update(user);
  }
}
