import { Repository } from 'typeorm';
import { UserRepositoryPort } from "../../../application/ports/user.repository.port";
import { User } from "../../../domain/user";
import { UserOrmEntity } from './user.orm-entity';
export declare class UserTypeOrmRepository implements UserRepositoryPort {
    private readonly repo;
    constructor(repo: Repository<UserOrmEntity>);
    create(user: User): Promise<User>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(user: User): Promise<User>;
    delete(id: number): Promise<User>;
    countAdmins(): Promise<number>;
    private toDomain;
}
