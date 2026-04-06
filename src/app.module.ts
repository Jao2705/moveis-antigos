import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/database/typeorm.module';
import { AtelieModule } from './atelie/atelie.module';
import { MovelModule } from './movel/movel.module';

@Module({
  imports: [DatabaseModule, AtelieModule, MovelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
