"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTypeOrmRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_1 = require("../../../domain/user");
const user_orm_entity_1 = require("./user.orm-entity");
let UserTypeOrmRepository = class UserTypeOrmRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(user) {
        const orm = this.repo.create({
            nome: user.nome,
            email: user.email,
            senha_hash: user.senha_hash,
            role: user.role,
            ativo: user.ativo,
        });
        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }
    async findById(id) {
        const orm = await this.repo.findOneBy({ id });
        return orm ? this.toDomain(orm) : null;
    }
    async findByEmail(email) {
        const orm = await this.repo.findOneBy({ email });
        return orm ? this.toDomain(orm) : null;
    }
    async findAll() {
        const users = await this.repo.find({ order: { id: 'ASC' } });
        return users.map(this.toDomain);
    }
    async update(user) {
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
        orm.ativo = user.ativo;
        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }
    async delete(id) {
        const orm = await this.repo.findOneBy({ id });
        if (!orm) {
            throw new Error('Usuário não encontrado para remover');
        }
        const domain = this.toDomain(orm);
        await this.repo.delete({ id });
        return domain;
    }
    async countAdmins() {
        return this.repo.count({ where: { role: 'admin' } });
    }
    toDomain = (orm) => {
        return new user_1.User(orm.id, orm.nome, orm.email, orm.senha_hash, orm.role, orm.ativo, orm.created_at, orm.updated_at);
    };
};
exports.UserTypeOrmRepository = UserTypeOrmRepository;
exports.UserTypeOrmRepository = UserTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_orm_entity_1.UserOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserTypeOrmRepository);
//# sourceMappingURL=user.typeorm.repository.js.map