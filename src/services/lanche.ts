import { api } from './api'
import { AxiosResponse } from 'axios'
import { createLancheReq, listLancheReq } from '@/types/lanche'

export const createLanche = async (data: createLancheReq) => {
  await api.post('/lanches', data)
}

export const listLanche = async (): Promise<listLancheReq[]> => {
  const response: AxiosResponse<listLancheReq[]> = await api.get('/lanches')
  return response.data
}
