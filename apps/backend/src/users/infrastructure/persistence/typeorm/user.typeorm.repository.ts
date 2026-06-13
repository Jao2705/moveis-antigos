import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepositoryPort } from 'src/users/application/ports/user.repository.port';
import { User } from 'src/users/domain/user';
import { UserOrmEntity } from './user.orm-entity';

@Injectable()
export class UserTypeOrmRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>,
  ) {}

  async create(user: User): Promise<User> {
    const orm = this.repo.create({
      nome: user.nome,
      email: user.email,
      senha_hash: user.senha_hash,
      role: user.role,
    });
    const saved = await this.repo.save(orm);
    return this.toDomain(saved);
  }

  async findById(id: number): Promise<User | null> {
    const orm = await this.repo.findOneBy({ id });
    return orm ? this.toDomain(orm) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const orm = await this.repo.findOneBy({ email });
    return orm ? this.toDomain(orm) : null;
  }

  async findAll(): Promise<User[]> {
    const users = await this.repo.find({ order: { id: 'ASC' } });
    return users.map(this.toDomain);
  }

  async update(user: User): Promise<User> {
    if (user.id === null) {
      throw new Error('Usuário sem ID não pode ser atualizado');
    }
    const orm = await this.repo.findOneBy({ id: user.id });
    if (!orm) {
      throw new Error('Usuário não encontrado para atualizar');
    }
    orm.nome = user.nome;
    orm.email = user.email;
    orm.senha_hash = user.senha_hash;
    orm.role = user.role;
    const saved = await this.repo.save(orm);
    return this.toDomain(saved);
  }

  async delete(id: number): Promise<User> {
    const orm = await this.repo.findOneBy({ id });
    if (!orm) {
      throw new Error('Usuário não encontrado para remover');
    }
    const domain = this.toDomain(orm);
    await this.repo.delete({ id });
    return domain;
  }

  async countAdmins(): Promise<number> {
    return this.repo.count({ where: { role: 'admin' } });
  }

  private toDomain = (orm: UserOrmEntity): User => {
    return new User(
      orm.id,
      orm.nome,
      orm.email,
      orm.senha_hash,
      orm.role,
      orm.created_at,
      orm.updated_at,
    );
  };
}
