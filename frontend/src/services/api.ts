import { createIngredienteReq } from '@/types/ingrediente'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/'
})

export const createIngrediente = async (data: createIngredienteReq) => {
  await api.post('/ingredientes', data)
}
