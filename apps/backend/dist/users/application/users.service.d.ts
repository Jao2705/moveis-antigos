import { User } from '../domain/user';
import type { UserRepositoryPort } from './ports/user.repository.port';
export declare class UsersService {
    private readonly userRepo;
    constructor(userRepo: UserRepositoryPort);
    register(nome: string, email: string, senhaPlana: string): Promise<User>;
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    setActive(id: number, ativo: boolean): Promise<User>;
    updateProfile(id: number, nome: string, email: string, senhaPlana?: string): Promise<User>;
}
