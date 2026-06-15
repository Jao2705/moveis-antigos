import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserOrmEntity } from 'src/users/infrastructure/persistence/typeorm/user.orm-entity';

@Injectable()
export class SeederService implements OnModuleInit {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepo: Repository<UserOrmEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@moveisantigos.com';
    const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin123';
    const adminName = process.env.ADMIN_NAME ?? 'Administrador';

    const existingAdmin = await this.userRepo.findOneBy({ role: 'admin' });
    if (existingAdmin) {
      return;
    }

    const senha_hash = await bcrypt.hash(adminPassword, 10);
    await this.userRepo.save(
      this.userRepo.create({
        nome: adminName,
        email: adminEmail,
        senha_hash,
        role: 'admin',
        ativo: true,
      }),
    );

    this.logger.log(`Administrador inicial criado: ${adminEmail}`);
  }
}
