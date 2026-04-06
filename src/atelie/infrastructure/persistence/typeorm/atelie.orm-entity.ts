import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MovelOrmEntity } from "src/movel/infrastructure/persistence/typeorm/movel.orm-entity";

@Entity('atelie')
export class AtelieOrmEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    especialidadeEra: string;

    @Column({ default: false })
    equipadoCompleto: boolean;

    @Column()
    areaOficinaM2: number;

    @Column()
    dataFundacao: Date;

    @OneToMany(() => MovelOrmEntity, (movel) => movel.atelie)
    moveis: MovelOrmEntity[];
}
