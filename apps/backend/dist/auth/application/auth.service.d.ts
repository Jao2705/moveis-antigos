import { JwtService } from '@nestjs/jwt';
import { UsersService } from "../../users/application/users.service";
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly invalidCredentialsMessage;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(nome: string, email: string, senha: string): Promise<{
        message: string;
        user: {
            id: number | null;
            nome: string;
            email: string;
            ativo: boolean;
        };
    }>;
    login(email: string, pass: string): Promise<{
        access_token: string;
        user: {
            id: number | null;
            nome: string;
            email: string;
            role: "user" | "admin";
            ativo: true;
        };
    }>;
}
