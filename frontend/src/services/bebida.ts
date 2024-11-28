import { AxiosResponse } from 'axios'
import { api } from './api'
import { createBebidaReq, listBebidaReq } from '@/types/bebida'

export const createBebida = async (data: createBebidaReq) => {
  await api.post('/bebidas', data)
}

export const listBebida = async (): Promise<listBebidaReq[]> => {
  const response: AxiosResponse<listBebidaReq[]> = await api.get('/bebidas')
  return response.data
}

// Requisição para buscar por ID
export const findBebidaById = async (id: number): Promise<listBebidaReq> => {
  const response: AxiosResponse<listBebidaReq> = await api.get(
    `/bebidas/id/${id}`
  )
  return response.data
}

// Requisição para buscar por Descrição
export const findBebidaByDescricao = async (
  descricao: string
): Promise<listBebidaReq> => {
  const response: AxiosResponse<listBebidaReq> = await api.get(
    `/bebidas/descricao/${descricao}`
  )
  return response.data
}
