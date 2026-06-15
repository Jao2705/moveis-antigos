export declare class UserOrmEntity {
    id: number;
    nome: string;
    email: string;
    senha_hash: string;
    role: 'admin' | 'user';
    ativo: boolean;
    created_at: Date;
    updated_at: Date;
}
