import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import type { MovelRepositoryPort } from "src/movel/application/ports/movel.repository.port";
import { Movel } from "src/movel/domain/movel";
import { MovelOrmEntity } from "./movel.orm-entity";

@Injectable()
export class MovelTypeOrmRepository implements MovelRepositoryPort {
    constructor(
        @InjectRepository(MovelOrmEntity)
        private readonly repo: Repository<MovelOrmEntity>,
    ) { }

    async create(movel: Movel): Promise<Movel> {
        const orm = this.repo.create({
            tipoMovel: movel.tipoMovel,
            dataInicioTrab: movel.dataInicioTrab,
            restaurado: movel.restaurado,
            horasHomem: movel.horasHomem,
            atelieId: movel.atelieId,
        });

        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }

    async findById(id: number): Promise<Movel | null> {
        const movel = await this.repo.findOneBy({ id });
        return movel ? this.toDomain(movel) : null;
    }

    async findAll(): Promise<Movel[]> {
        const moveis = await this.repo.find({ order: { id: "ASC" } });
        return moveis.map(this.toDomain);
    }

    async update(movel: Movel): Promise<Movel> {
        if (movel.id === null) {
            throw new Error("Movel sem ID nao pode ser atualizado");
        }

        const orm = await this.repo.findOneBy({ id: movel.id });
        if (!orm) {
            throw new Error("Movel nao encontrado para atualizar");
        }

        orm.tipoMovel = movel.tipoMovel;
        orm.dataInicioTrab = movel.dataInicioTrab;
        orm.restaurado = movel.restaurado;
        orm.horasHomem = movel.horasHomem;
        orm.atelieId = movel.atelieId;

        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }

    async delete(id: number): Promise<Movel> {
        const orm = await this.repo.findOneBy({ id });
        if (!orm) {
            throw new Error("Movel nao encontrado para remover");
        }

        const removido = this.toDomain(orm);
        await this.repo.delete({ id });
        return removido;
    }

    async existsOpenByAtelieAndTipo(atelieId: number, tipoMovel: string, ignoreId?: number): Promise<boolean> {
        const query = this.repo
            .createQueryBuilder("movel")
            .where("movel.atelieId = :atelieId", { atelieId })
            .andWhere("LOWER(movel.tipoMovel) = LOWER(:tipoMovel)", { tipoMovel: tipoMovel.trim() })
            .andWhere("movel.restaurado = :restaurado", { restaurado: false });

        if (ignoreId) {
            query.andWhere("movel.id != :ignoreId", { ignoreId });
        }

        const total = await query.getCount();
        return total > 0;
    }

    private toDomain = (orm: MovelOrmEntity): Movel => {
        return new Movel(
            orm.id,
            orm.tipoMovel,
            orm.dataInicioTrab,
            orm.restaurado,
            orm.horasHomem,
            orm.atelieId
        );
    };
}
