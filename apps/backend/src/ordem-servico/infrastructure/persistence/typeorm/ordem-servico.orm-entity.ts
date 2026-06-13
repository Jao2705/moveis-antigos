import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserOrmEntity } from 'src/users/infrastructure/persistence/typeorm/user.orm-entity';
import { AtelieOrmEntity } from 'src/atelie/infrastructure/persistence/typeorm/atelie.orm-entity';
import { MovelOrmEntity } from 'src/movel/infrastructure/persistence/typeorm/movel.orm-entity';

@Entity('ordem_servico')
export class OrdemServicoOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cliente_id: number;

  @ManyToOne(() => UserOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cliente_id' })
  cliente: UserOrmEntity;

  @Column()
  atelie_id: number;

  @ManyToOne(() => AtelieOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'atelie_id' })
  atelie: AtelieOrmEntity;

  @Column({ nullable: true })
  movel_id: number | null;

  @ManyToOne(() => MovelOrmEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'movel_id' })
  movel: MovelOrmEntity | null;

  @Column('text')
  descricao_problema: string;

  @Column({ length: 150, default: '' })
  tipo_movel_informado: string;

  @Column({
    type: 'text',
    default: 'solicitado',
  })
  status: string;

  @CreateDateColumn()
  data_solicitacao: Date;

  @Column({ type: 'date', nullable: true })
  data_previsao_entrega: Date | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  valor_orcamento: number | null;
}
