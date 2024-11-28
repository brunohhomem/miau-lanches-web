'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { listIngrediente } from '@/services/ingrediente'

export function TableIngredientes() {
  const [ingredientes, setIngredientes] = useState([]) // Estado para armazenar os ingredientes
  const [loading, setLoading] = useState(true) // Estado para gerenciar o carregamento

  // Função para buscar os dados dos ingredientes
  const fetchIngredientes = async () => {
    setLoading(true)
    try {
      const data = await listIngrediente()
      setIngredientes(data)
    } catch (error) {
      console.error('Erro ao carregar ingredientes:', error)
    } finally {
      setLoading(false)
    }
  }

  // Busca os ingredientes quando o componente é montado
  useEffect(() => {
    fetchIngredientes()
  }, [])

  return (
    <div>
      {loading ? (
        <p>Carregando...</p> // Exibe um indicador de carregamento enquanto busca os dados
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Código</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="text-right">Adicional</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ingredientes.map(ingrediente => (
              <TableRow key={ingrediente.id}>
                <TableCell>{ingrediente.id}</TableCell>
                <TableCell className="font-medium">
                  {ingrediente.descricao}
                </TableCell>
                <TableCell>{ingrediente.preco}</TableCell>
                <TableCell className="text-right">
                  {ingrediente.isAdicional ? 'Sim' : 'Não'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
