import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './infrastructure/persistence/typeorm/user.orm-entity';
import { UserTypeOrmRepository } from './infrastructure/persistence/typeorm/user.typeorm.repository';
import { UsersService } from './application/users.service';
import { UsersController } from './presentation/users.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserRepositoryPort',
      useClass: UserTypeOrmRepository,
    },
  ],
  exports: [UsersService, 'UserRepositoryPort'],
})
export class UsersModule {}
