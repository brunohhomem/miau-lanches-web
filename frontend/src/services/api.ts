import { createIngredienteReq, listIngredienteReq } from '@/types/ingrediente'
import axios, { AxiosResponse } from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/'
})

export const createIngrediente = async (data: createIngredienteReq) => {
  await api.post('/ingredientes', data)
}

export const listIngrediente = async (): Promise<listIngredienteReq[]> => {
  const response: AxiosResponse<listIngredienteReq[]> = await api.get(
    '/ingredientes'
  )
  return response.data
}

// Requisição para buscar por ID
export const findIngredienteById = async (
  id: number
): Promise<listIngredienteReq> => {
  const response: AxiosResponse<listIngredienteReq> = await api.get(
    `/ingredientes/id/${id}`
  )
  return response.data
}

// Requisição para buscar por Descrição
export const findIngredienteByDescricao = async (
  descricao: string
): Promise<listIngredienteReq> => {
  const response: AxiosResponse<listIngredienteReq> = await api.get(
    `/ingredientes/descricao/${descricao}`
  )
  return response.data
}
