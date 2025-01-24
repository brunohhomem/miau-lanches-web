export interface createIngredienteReq {
  descricao: string
  preco: number
  isAdicional: boolean
}

export interface findIngredienteReq {
  id?: number
  descricao?: string
}

export interface listIngredienteReq {
  id: number
  descricao: string
  preco: number
  isAdicional: boolean
}
