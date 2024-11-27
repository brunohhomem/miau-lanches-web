import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { BebidaModule } from './bebida/bebida.module';
import { ClienteModule } from './cliente/cliente.module';
import { IngredienteModule } from './ingrediente/ingrediente.module';
import { LancheModule } from './lanche/lanche.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [
    DbModule,
    ClienteModule,
    BebidaModule,
    IngredienteModule,
    LancheModule,
    PedidoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
