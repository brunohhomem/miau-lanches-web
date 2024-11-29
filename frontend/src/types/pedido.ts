export interface createPedidoReq {
  descricao: string
  preco: number
  lanches: number[]
  adicionais: number[]
  bebidas: number[]
  observacoes: string
  cliente: { nome: string; endereco: string; telefone: string }
}

export interface calcularPedidoReq {
  preco: number
  lanches: number[]
  adicionais: number[]
  bebidas: number[]
}
