import { api } from './api'

import { calcularPedidoReq, createPedidoReq } from '@/types/pedido'

export const createPedido = async (data: createPedidoReq) => {
  await api.post('/pedidos', data)
}

export const calcularPedido = async (data: calcularPedidoReq) => {
  await api.post('/calculate_pedido', data)
}
