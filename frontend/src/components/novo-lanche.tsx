'use client'

import { useState } from 'react'
import IngredienteMultiselect from './ingrediente-multiselect'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { createLanche } from '@/services/lanche'

export default function NovoLanche() {
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState<
    string[]
  >([])

  const handleIngredientesChange = (ingredientes: string[]) => {
    setIngredientesSelecionados(ingredientes)
  }

  const [lanche, setLanche] = useState({
    descricao: '',
    preco: 0,
    ingredientes: [] as number[] // Inicializa com um array de números
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target

    setLanche(prev => ({
      ...prev,
      [id]: type === 'number' ? parseFloat(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      // Converter os ingredientes selecionados para um array de números
      const ingredientes = ingredientesSelecionados.map(Number)

      // Criar o lanche com o array de números
      await createLanche({
        ...lanche,
        ingredientes: ingredientes // Atualiza o campo com os valores numéricos
      })
    } catch (error) {
      console.error('Erro ao criar lanche:', error)
    }
  }

  return (
    <main className="flex flex-row">
      <form onSubmit={handleSubmit} className="grid gap-2 py-2">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="descricao" className="text-right">
            Descricao
          </Label>
          <Input
            id="descricao"
            type="text"
            placeholder="McBruno Feliz"
            value={lanche.descricao}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="preco" className="text-right">
            Preço
          </Label>
          <Input
            id="preco"
            type="number"
            value={lanche.preco}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className=" items-center gap-4">
          <Label htmlFor="preco" className="text-right">
            Preço
          </Label>
          <IngredienteMultiselect
            onIngredientesChange={handleIngredientesChange}
          />
        </div>

        <Button type="submit">Cadastrar</Button>
      </form>
    </main>
  )
}
