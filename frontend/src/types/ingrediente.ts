export interface createIngredienteReq {
  descricao: string
  preco: number
  isAdicional: boolean
}

export interface findIngrediente extends createIngredienteReq {
  id: number
}
