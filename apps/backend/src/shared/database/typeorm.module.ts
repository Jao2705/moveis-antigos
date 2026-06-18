import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtelieOrmEntity } from 'src/atelie/infrastructure/persistence/typeorm/atelie.orm-entity';
import { MovelOrmEntity } from 'src/movel/infrastructure/persistence/typeorm/movel.orm-entity';
import { UserOrmEntity } from 'src/users/infrastructure/persistence/typeorm/user.orm-entity';
import { SeederService } from './seeder.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/moveis-antigos.db',
      // synchronize: true é aceitável neste projeto educacional.
      // Em produção, substituir por migrations versionadas.
      entities: [AtelieOrmEntity, MovelOrmEntity, UserOrmEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserOrmEntity]),
  ],
  providers: [SeederService],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
