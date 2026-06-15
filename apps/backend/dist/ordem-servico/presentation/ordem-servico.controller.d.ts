import { OrdemServicoService } from '../application/ordem-servico.service';
import { CreateOrdemServicoDto } from './dto/create-ordem-servico.dto';
import { UpdateOrdemServicoDto } from './dto/update-ordem-servico.dto';
export declare class OrdemServicoController {
    private readonly ordemService;
    constructor(ordemService: OrdemServicoService);
    findAll(req: any): Promise<import("../domain/ordem-servico").OrdemServico[]>;
    create(req: any, dto: CreateOrdemServicoDto): Promise<import("../domain/ordem-servico").OrdemServico>;
    findById(id: number, req: any): Promise<import("../domain/ordem-servico").OrdemServico>;
    update(id: number, req: any, dto: UpdateOrdemServicoDto): Promise<import("../domain/ordem-servico").OrdemServico>;
    delete(id: number): Promise<import("../domain/ordem-servico").OrdemServico>;
}
