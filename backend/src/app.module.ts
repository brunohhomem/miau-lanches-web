import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { BebidaModule } from './bebida/bebida.module';

@Module({
  imports: [DbModule, BebidaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
