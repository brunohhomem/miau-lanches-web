import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { CalculateTotalDto } from './dto/calculate-total.dto';
// import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidoService.create(createPedidoDto);
  }

  @Post('calcular')
  async calculateTotalPedido(@Body() body: CalculateTotalDto) {
    const { lanches, adicionais, bebidas } = body;
    return this.pedidoService.calcularPedido({
      lanches,
      adicionais,
      bebidas,
    });
  }

  @Get()
  findAll() {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidoService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
  //   return this.pedidoService.update(+id, updatePedidoDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidoService.remove(+id);
  }
}
