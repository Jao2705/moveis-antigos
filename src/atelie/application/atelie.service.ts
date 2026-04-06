import { Inject, Injectable } from "@nestjs/common";
import { Atelie } from "../domain/atelie";
import type { AtelieRepositoryPort } from "./ports/atelie.repository.port";
import { AtelieComMoveis } from "../domain/atelie-com-moveis";
import { AreaExistsException } from "../domain/area.exception";
import { AtelieNotFoundException } from "../domain/atelie.not.found.exception";
import { DataException } from "../domain/data.exception";
import { EquipadoExistsExcepiton } from "../domain/equipado.exception";
import { EspecialidadeExistsException } from "../domain/especiladade-exists.exception";

@Injectable()
export class AtelieService {
    constructor(
        @Inject('AtelieRepositoryPort')
        private readonly atelieRepo: AtelieRepositoryPort,

    ) { }

    async create(especialidadeEra: string, equipadoCompleto: boolean, areaOficinaM2: number, dataFundacao: Date | string): Promise<Atelie> {
        this.validarAtelie(especialidadeEra, equipadoCompleto, areaOficinaM2, dataFundacao);
        const atelie = new Atelie(null, especialidadeEra.trim(), equipadoCompleto, areaOficinaM2, new Date(dataFundacao));
        return this.atelieRepo.create(atelie);
    }

    async findById(id: number): Promise<Atelie | null> {
        const atelie = await this.atelieRepo.findById(id);
        if (!atelie) {
            throw new AtelieNotFoundException(id);
        }
        return atelie;
    }

    async findAll(): Promise<Atelie[]> {
        return this.atelieRepo.findAll();
    }

    async findByIdWithMoveis(id: number): Promise<AtelieComMoveis> {
        const atelie = await this.atelieRepo.findByIdWithMoveis(id);
        if (!atelie) {
            throw new AtelieNotFoundException(id);
        }

        return atelie;
    }

    async update(id: number, especialidadeEra?: string, equipadoCompleto?: boolean, areaOficinaM2?: number, dataFundacao?: Date | string): Promise<Atelie> {
        const atelie = await this.atelieRepo.findById(id);
        if (!atelie) {
            throw new AtelieNotFoundException(id);
        }

        const especialidadeAtualizada = especialidadeEra ?? atelie.especialidadeEra;
        const equipadoAtualizado = equipadoCompleto ?? atelie.equipadoCompleto;
        const areaAtualizada = areaOficinaM2 ?? atelie.areaOficinaM2;
        const dataAtualizada = dataFundacao ?? atelie.dataFundacao!;

        this.validarAtelie(especialidadeAtualizada, equipadoAtualizado, areaAtualizada, dataAtualizada);

        atelie.especialidadeEra = especialidadeAtualizada.trim();
        atelie.equipadoCompleto = equipadoAtualizado;
        atelie.areaOficinaM2 = areaAtualizada;

        return this.atelieRepo.update(new Atelie(
            atelie.id,
            atelie.especialidadeEra,
            atelie.equipadoCompleto,
            atelie.areaOficinaM2,
            new Date(dataAtualizada)
        ));
    }

    async delete(id: number): Promise<Atelie> {
        const atelie = await this.atelieRepo.findById(id);
        if (!atelie) {
            throw new AtelieNotFoundException(id);
        }
        return this.atelieRepo.delete(id);
    }

    private validarAtelie(especialidadeEra: string, equipadoCompleto: boolean, areaOficinaM2: number, dataFundacao: Date | string): void {
        if (!especialidadeEra || especialidadeEra.trim() === '') {
            throw new EspecialidadeExistsException();
        }

        if (especialidadeEra.trim().length > 100) {
            throw new EspecialidadeExistsException();
        }

        if (typeof equipadoCompleto !== 'boolean') {
            throw new EquipadoExistsExcepiton();
        }

        if (typeof areaOficinaM2 !== 'number' || Number.isNaN(areaOficinaM2)) {
            throw new AreaExistsException();
        }

        if (areaOficinaM2 < 50) {
            throw new AreaExistsException();
        }

        const data = new Date(dataFundacao);
        if (Number.isNaN(data.getTime())) {
            throw new DataException(data);
        }

        const hoje = new Date();
        if (data.getTime() > hoje.getTime()) {
            throw new DataException(data);
        }
    }
}
