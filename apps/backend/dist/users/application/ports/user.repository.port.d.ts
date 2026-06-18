import { User } from '../../domain/user';
export interface UserRepositoryPort {
    create(user: User): Promise<User>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(user: User): Promise<User>;
    delete(id: number): Promise<User>;
    countAdmins(): Promise<number>;
}
