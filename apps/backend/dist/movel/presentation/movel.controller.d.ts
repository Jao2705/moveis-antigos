import { MovelService } from '../application/movel.service';
import { CreateMovelDto } from './dto/create-movel.dto';
import { UpdateMovelDto } from './dto/update-movel.dto';
export declare class MovelController {
    private readonly movelService;
    constructor(movelService: MovelService);
    create(dto: CreateMovelDto, req: {
        user: {
            id: number;
            role: 'admin' | 'user';
        };
    }): Promise<import("../domain/movel").Movel>;
    findAll(): Promise<import("../domain/movel").Movel[]>;
    findById(id: string): Promise<import("../domain/movel").Movel>;
    update(id: string, dto: UpdateMovelDto, req: {
        user: {
            id: number;
            role: 'admin' | 'user';
        };
    }): Promise<import("../domain/movel").Movel>;
    delete(id: string, req: {
        user: {
            id: number;
            role: 'admin' | 'user';
        };
    }): Promise<import("../domain/movel").Movel>;
}
