import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserOrmEntity } from "../../users/infrastructure/persistence/typeorm/user.orm-entity";
export declare class SeederService implements OnModuleInit {
    private readonly userRepo;
    private readonly logger;
    constructor(userRepo: Repository<UserOrmEntity>);
    onModuleInit(): Promise<void>;
}
