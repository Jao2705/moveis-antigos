export declare class User {
    readonly id: number | null;
    nome: string;
    email: string;
    senha_hash: string;
    role: 'admin' | 'user';
    ativo: boolean;
    readonly created_at?: Date | undefined;
    readonly updated_at?: Date | undefined;
    constructor(id: number | null, nome: string, email: string, senha_hash: string, role: 'admin' | 'user', ativo: boolean, created_at?: Date | undefined, updated_at?: Date | undefined);
}
