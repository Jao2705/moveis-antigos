export class User {
  constructor(
    public readonly id: number | null,
    public nome: string,
    public email: string,
    public senha_hash: string,
    public role: 'admin' | 'user',
    public readonly created_at?: Date,
    public readonly updated_at?: Date,
  ) {}
}
