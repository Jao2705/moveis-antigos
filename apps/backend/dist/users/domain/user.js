"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    id;
    nome;
    email;
    senha_hash;
    role;
    ativo;
    created_at;
    updated_at;
    constructor(id, nome, email, senha_hash, role, ativo, created_at, updated_at) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha_hash = senha_hash;
        this.role = role;
        this.ativo = ativo;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map