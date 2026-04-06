import { Inject, Injectable } from "@nestjs/common";
import type { AtelieRepositoryPort } from "src/atelie/application/ports/atelie.repository.port";
import { Movel } from "../domain/movel";
import {
    AtelieNaoEncontradoParaMovelException,
    MovelCampoObrigatorioException,
    MovelDataAnteriorFundacaoException,
    MovelDataInicioInvalidaException,
    MovelDuplicadoEmRestauracaoException,
    MovelEmProcessoHorasInvalidaException,
    MovelHorasHomemInvalidaException,
    MovelNotFoundException,
    MovelRestauradoInconsistenteException,
} from "../domain/movel.exceptions";
import type { MovelRepositoryPort } from "./ports/movel.repository.port";

@Injectable()
export class MovelService {
    constructor(
        @Inject("MovelRepositoryPort")
        private readonly movelRepo: MovelRepositoryPort,
        @Inject("AtelieRepositoryPort")
        private readonly atelieRepo: AtelieRepositoryPort,
    ) { }

    async create(tipoMovel: string, dataInicioTrab: Date | string, restaurado: boolean, horasHomem: number, atelieId: number): Promise<Movel> {
        const movel = new Movel(
            null,
            tipoMovel?.trim(),
            new Date(dataInicioTrab),
            restaurado,
            horasHomem,
            atelieId
        );

        await this.validarRegrasNegocio(movel);
        return this.movelRepo.create(movel);
    }

    async findById(id: number): Promise<Movel> {
        const movel = await this.movelRepo.findById(id);
        if (!movel) {
            throw new MovelNotFoundException(id);
        }
        return movel;
    }

    async findAll(): Promise<Movel[]> {
        return this.movelRepo.findAll();
    }

    async update(id: number, tipoMovel?: string, dataInicioTrab?: Date | string, restaurado?: boolean, horasHomem?: number, atelieId?: number): Promise<Movel> {
        const existente = await this.movelRepo.findById(id);
        if (!existente) {
            throw new MovelNotFoundException(id);
        }

        const atualizado = new Movel(
            id,
            (tipoMovel ?? existente.tipoMovel)?.trim(),
            dataInicioTrab ? new Date(dataInicioTrab) : existente.dataInicioTrab,
            restaurado ?? existente.restaurado,
            horasHomem ?? existente.horasHomem,
            atelieId ?? existente.atelieId
        );

        await this.validarRegrasNegocio(atualizado, id);
        return this.movelRepo.update(atualizado);
    }

    async delete(id: number): Promise<Movel> {
        const movel = await this.movelRepo.findById(id);
        if (!movel) {
            throw new MovelNotFoundException(id);
        }
        return this.movelRepo.delete(id);
    }

    private async validarRegrasNegocio(movel: Movel, ignoreId?: number): Promise<void> {
        if (!movel.tipoMovel || movel.tipoMovel === "") {
            throw new MovelCampoObrigatorioException("tipoMovel");
        }

        if (!(movel.dataInicioTrab instanceof Date) || Number.isNaN(movel.dataInicioTrab.getTime())) {
            throw new MovelDataInicioInvalidaException();
        }

        if (typeof movel.restaurado !== "boolean") {
            throw new MovelCampoObrigatorioException("restaurado");
        }

        if (typeof movel.horasHomem !== "number" || Number.isNaN(movel.horasHomem)) {
            throw new MovelCampoObrigatorioException("horasHomem");
        }

        if (movel.horasHomem < 10 || movel.horasHomem > 1000) {
            throw new MovelHorasHomemInvalidaException();
        }

        if (movel.restaurado && movel.horasHomem < 40) {
            throw new MovelRestauradoInconsistenteException();
        }

        if (!movel.restaurado && (movel.horasHomem < 10 || movel.horasHomem > 1000)) {
            throw new MovelEmProcessoHorasInvalidaException();
        }

        if (!Number.isInteger(movel.atelieId) || movel.atelieId <= 0) {
            throw new MovelCampoObrigatorioException("atelieId");
        }

        const atelie = await this.atelieRepo.findById(movel.atelieId);
        if (!atelie) {
            throw new AtelieNaoEncontradoParaMovelException(movel.atelieId);
        }

        const dataFundacao = new Date(atelie.dataFundacao!);
        if (movel.dataInicioTrab.getTime() < dataFundacao.getTime()) {
            throw new MovelDataAnteriorFundacaoException();
        }

        if (!movel.restaurado) {
            const duplicado = await this.movelRepo.existsOpenByAtelieAndTipo(
                movel.atelieId,
                movel.tipoMovel,
                ignoreId
            );

            if (duplicado) {
                throw new MovelDuplicadoEmRestauracaoException();
            }
        }
    }
}
