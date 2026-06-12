import { MovelService } from "../application/movel.service";
import { CreateMovelDto } from "./dto/create-movel.dto";
import { UpdateMovelDto } from "./dto/update-movel.dto";
export declare class MovelController {
    private readonly movelService;
    constructor(movelService: MovelService);
    create(dto: CreateMovelDto): Promise<import("../domain/movel").Movel>;
    findAll(): Promise<import("../domain/movel").Movel[]>;
    findById(id: string): Promise<import("../domain/movel").Movel>;
    update(id: string, dto: UpdateMovelDto): Promise<import("../domain/movel").Movel>;
    delete(id: string): Promise<import("../domain/movel").Movel>;
}
