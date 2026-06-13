import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdemServicoOrmEntity } from './infrastructure/persistence/typeorm/ordem-servico.orm-entity';
import { OrdemServicoTypeOrmRepository } from './infrastructure/persistence/typeorm/ordem-servico.typeorm.repository';
import { OrdemServicoService } from './application/ordem-servico.service';
import { OrdemServicoController } from './presentation/ordem-servico.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdemServicoOrmEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [OrdemServicoController],
  providers: [
    OrdemServicoService,
    {
      provide: 'OrdemServicoRepositoryPort',
      useClass: OrdemServicoTypeOrmRepository,
    },
  ],
  exports: [OrdemServicoService],
})
export class OrdemServicoModule {}
