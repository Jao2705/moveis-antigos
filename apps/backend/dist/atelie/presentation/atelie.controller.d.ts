import { AtelieService } from '../application/atelie.service';
import { CreateAtelieDto } from './dto/create-atelie.dto';
import { UpdateAtelieDto } from './dto/update-atelie.dto';
export declare class AtelieController {
    private readonly atelieService;
    constructor(atelieService: AtelieService);
    create(dto: CreateAtelieDto): Promise<import("../domain/atelie").Atelie>;
    findAll(): Promise<import("../domain/atelie").Atelie[]>;
    findByIdComMoveis(id: string): Promise<import("../domain/atelie-com-moveis").AtelieComMoveis>;
    findById(id: string): Promise<import("../domain/atelie").Atelie | null>;
    update(id: string, dto: UpdateAtelieDto): Promise<import("../domain/atelie").Atelie>;
    delete(id: string): Promise<import("../domain/atelie").Atelie>;
}
