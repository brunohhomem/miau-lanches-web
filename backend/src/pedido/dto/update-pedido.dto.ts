import { CreatePedidoDto } from './create-pedido.dto';

export interface UpdatePedidoDto extends Partial<CreatePedidoDto> {
  id: number;
}
