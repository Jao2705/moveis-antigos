import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AtelieRepositoryPort } from "src/atelie/application/ports/atelie.repository.port";
import { AtelieComMoveis } from "src/atelie/domain/atelie-com-moveis";
import { Atelie } from "src/atelie/domain/atelie";
import { AtelieOrmEntity } from "./atelie.orm-entity";

@Injectable()
export class AtelieTypeOrmRepository implements AtelieRepositoryPort {
    constructor(
        @InjectRepository(AtelieOrmEntity)
        private readonly repo: Repository<AtelieOrmEntity>,
    ) { }

    async create(atelie: Atelie): Promise<Atelie> {
        const orm = this.repo.create({
            especialidadeEra: atelie.especialidadeEra,
            equipadoCompleto: atelie.equipadoCompleto,
            areaOficinaM2: atelie.areaOficinaM2,
            dataFundacao: atelie.dataFundacao,
        });

        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }

    async findById(id: number): Promise<Atelie | null> {
        const atelie = await this.repo.findOneBy({ id });
        return atelie ? this.toDomain(atelie) : null;
    }

    async findAll(): Promise<Atelie[]> {
        const atelies = await this.repo.find({ order: { id: "ASC" } });
        return atelies.map(this.toDomain);
    }

    async findByIdWithMoveis(id: number): Promise<AtelieComMoveis | null> {
        const atelie = await this.repo.findOne({
            where: { id },
            relations: ["moveis"],
            order: { moveis: { id: "ASC" } },
        });

        if (!atelie) {
            return null;
        }

        return {
            id: atelie.id,
            especialidadeEra: atelie.especialidadeEra,
            equipadoCompleto: atelie.equipadoCompleto,
            areaOficinaM2: atelie.areaOficinaM2,
            dataFundacao: atelie.dataFundacao,
            moveis: (atelie.moveis ?? []).map((movel) => ({
                id: movel.id,
                tipoMovel: movel.tipoMovel,
                dataInicioTrab: movel.dataInicioTrab,
                restaurado: movel.restaurado,
                horasHomem: movel.horasHomem,
                atelieId: movel.atelieId,
            })),
        };
    }

    async update(atelie: Atelie): Promise<Atelie> {
        if (atelie.id === null) {
            throw new Error("Atelie sem ID nao pode ser atualizado");
        }

        const orm = await this.repo.findOneBy({ id: atelie.id });
        if (!orm) {
            throw new Error("Atelie nao encontrado para atualizar");
        }

        orm.especialidadeEra = atelie.especialidadeEra;
        orm.equipadoCompleto = atelie.equipadoCompleto;
        orm.areaOficinaM2 = atelie.areaOficinaM2;
        orm.dataFundacao = atelie.dataFundacao!;

        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }

    async delete(id: number): Promise<Atelie> {
        const orm = await this.repo.findOneBy({ id });
        if (!orm) {
            throw new Error("Atelie nao encontrado para remover");
        }

        const removido = this.toDomain(orm);
        await this.repo.delete({ id });
        return removido;
    }

    private toDomain = (orm: AtelieOrmEntity): Atelie => {
        return new Atelie(
            orm.id,
            orm.especialidadeEra,
            orm.equipadoCompleto,
            orm.areaOficinaM2,
            orm.dataFundacao
        );
    };
}
