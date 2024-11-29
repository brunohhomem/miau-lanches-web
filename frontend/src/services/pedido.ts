import { api } from './api'

import { createPedidoReq } from '@/types/pedido'

export const createPedido = async (data: createPedidoReq) => {
  await api.post('/pedidos', data)
}
