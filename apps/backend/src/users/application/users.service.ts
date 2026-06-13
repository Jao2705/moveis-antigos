import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../domain/user';
import type { UserRepositoryPort } from './ports/user.repository.port';
import {
  EmailAlreadyExistsException,
  UserNotFoundException,
  LastAdminException,
  InvalidUserRoleException,
} from '../domain/user.exceptions';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepositoryPort')
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async create(
    nome: string,
    email: string,
    senhaPlana: string,
    role: 'admin' | 'user',
  ): Promise<User> {
    if (role !== 'admin' && role !== 'user') {
      throw new InvalidUserRoleException();
    }

    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      throw new EmailAlreadyExistsException();
    }

    const senha_hash = await bcrypt.hash(senhaPlana, 10);
    const user = new User(null, nome, email, senha_hash, role);
    return this.userRepo.create(user);
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.findAll();
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

  async updateRole(
    id: number,
    newRole: 'admin' | 'user',
  ): Promise<User> {
    if (newRole !== 'admin' && newRole !== 'user') {
      throw new InvalidUserRoleException();
    }

    const user = await this.findById(id);

    if (user.role === newRole) {
      return user;
    }

    if (user.role === 'admin' && newRole === 'user') {
      const adminsCount = await this.userRepo.countAdmins();
      if (adminsCount <= 1) {
        throw new LastAdminException();
      }
    }

    user.role = newRole;
    return this.userRepo.update(user);
  }

  async delete(id: number): Promise<User> {
    const user = await this.findById(id);
    if (user.role === 'admin') {
      const adminsCount = await this.userRepo.countAdmins();
      if (adminsCount <= 1) {
        throw new LastAdminException();
      }
    }
    return this.userRepo.delete(id);
  }
}
