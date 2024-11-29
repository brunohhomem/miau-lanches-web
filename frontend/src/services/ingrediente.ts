import { AxiosResponse } from 'axios'
import { api } from './api'
import { createIngredienteReq, listIngredienteReq } from '@/types/ingrediente'

export const createIngrediente = async (data: createIngredienteReq) => {
  await api.post('/ingredientes', data)
}

export const listIngrediente = async (): Promise<listIngredienteReq[]> => {
  const response: AxiosResponse<listIngredienteReq[]> = await api.get(
    '/ingredientes'
  )
  return response.data
}

export const listIngredienteAdicionais = async (): Promise<
  listIngredienteReq[]
> => {
  const response: AxiosResponse<listIngredienteReq[]> = await api.get(
    '/ingredientes/adicionais'
  )
  return response.data
}

export const findIngredienteById = async (
  id: number
): Promise<listIngredienteReq> => {
  const response: AxiosResponse<listIngredienteReq> = await api.get(
    `/ingredientes/id/${id}`
  )
  return response.data
}

export const findIngredienteByDescricao = async (
  descricao: string
): Promise<listIngredienteReq> => {
  const response: AxiosResponse<listIngredienteReq> = await api.get(
    `/ingredientes/descricao/${descricao}`
  )
  return response.data
}
