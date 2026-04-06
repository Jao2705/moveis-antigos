import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AtelieOrmEntity } from "src/atelie/infrastructure/persistence/typeorm/atelie.orm-entity";

@Entity("movel")
export class MovelOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  tipoMovel: string;

  @Column()
  dataInicioTrab: Date;

  @Column({ default: false })
  restaurado: boolean;

  @Column()
  horasHomem: number;

  @Column()
  atelieId: number;

  @ManyToOne(() => AtelieOrmEntity, (atelie) => atelie.moveis, { onDelete: "CASCADE" })
  @JoinColumn({ name: "atelieId" })
  atelie: AtelieOrmEntity;
}
