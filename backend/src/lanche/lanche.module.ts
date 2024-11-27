import { Module } from '@nestjs/common';
import { LancheService } from './lanche.service';
import { LancheController } from './lanche.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [LancheController],
  providers: [LancheService],
})
export class LancheModule {}
