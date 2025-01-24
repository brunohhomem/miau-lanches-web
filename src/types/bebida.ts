export interface createBebidaReq {
  descricao: string
  preco: number
  hasAcucar: boolean
}

export interface findBebidaReq {
  id?: number
  descricao?: string
}

export interface listBebidaReq {
  id: number
  descricao: string
  preco: number
  hasAcucar: boolean
}
