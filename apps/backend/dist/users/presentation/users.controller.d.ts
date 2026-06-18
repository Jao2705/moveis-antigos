import { UsersService } from '../application/users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: {
        user: {
            id: number;
        };
    }): Promise<{
        id: number | null;
        nome: string;
        email: string;
        role: "user" | "admin";
        ativo: boolean;
        created_at: Date | undefined;
        updated_at: Date | undefined;
    }>;
    updateProfile(req: {
        user: {
            id: number;
        };
    }, dto: UpdateProfileDto): Promise<{
        id: number | null;
        nome: string;
        email: string;
        role: "user" | "admin";
        ativo: boolean;
        created_at: Date | undefined;
        updated_at: Date | undefined;
    }>;
    findAll(): Promise<{
        id: number | null;
        nome: string;
        email: string;
        role: "user" | "admin";
        ativo: boolean;
        created_at: Date | undefined;
        updated_at: Date | undefined;
    }[]>;
    activate(id: number, dto: ActivateUserDto): Promise<{
        id: number | null;
        nome: string;
        email: string;
        role: "user" | "admin";
        ativo: boolean;
        created_at: Date | undefined;
        updated_at: Date | undefined;
    }>;
    private toResponse;
}
