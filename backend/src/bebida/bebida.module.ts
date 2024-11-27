import { Module } from '@nestjs/common';
import { BebidaService } from './bebida.service';
import { BebidaController } from './bebida.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [BebidaController],
  providers: [BebidaService],
})
export class BebidaModule {}
