"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const user_1 = require("../domain/user");
const user_exceptions_1 = require("../domain/user.exceptions");
let UsersService = class UsersService {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async register(nome, email, senhaPlana) {
        const existing = await this.userRepo.findByEmail(email);
        if (existing) {
            throw new user_exceptions_1.EmailAlreadyExistsException('Este e-mail já está cadastrado. Faça login ou use outro e-mail.');
        }
        const senha_hash = await bcrypt.hash(senhaPlana, 10);
        const user = new user_1.User(null, nome, email, senha_hash, 'user', false);
        return this.userRepo.create(user);
    }
    async findById(id) {
        const user = await this.userRepo.findById(id);
        if (!user) {
            throw new user_exceptions_1.UserNotFoundException();
        }
        return user;
    }
    async findByEmail(email) {
        return this.userRepo.findByEmail(email);
    }
    async findAll() {
        return this.userRepo.findAll();
    }
    async setActive(id, ativo) {
        const user = await this.findById(id);
        if (user.role === 'admin' && !ativo) {
            const adminsCount = await this.userRepo.countAdmins();
            if (adminsCount <= 1) {
                throw new user_exceptions_1.LastAdminException('Não é possível desativar o único administrador do sistema.');
            }
        }
        user.ativo = ativo;
        return this.userRepo.update(user);
    }
    async updateProfile(id, nome, email, senhaPlana) {
        const user = await this.findById(id);
        if (email !== user.email) {
            const existing = await this.userRepo.findByEmail(email);
            if (existing) {
                throw new user_exceptions_1.EmailAlreadyExistsException();
            }
            user.email = email;
        }
        user.nome = nome;
        if (senhaPlana && senhaPlana.trim() !== '') {
            user.senha_hash = await bcrypt.hash(senhaPlana, 10);
        }
        return this.userRepo.update(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UserRepositoryPort')),
    __metadata("design:paramtypes", [Object])
], UsersService);
//# sourceMappingURL=users.service.js.map