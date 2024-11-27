import { Module } from '@nestjs/common';
import { IngredienteService } from './ingrediente.service';
import { IngredienteController } from './ingrediente.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [IngredienteController],
  providers: [IngredienteService],
})
export class IngredienteModule {}
