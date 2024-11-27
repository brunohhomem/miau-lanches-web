'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'
import { Checkbox } from './ui/checkbox'
import { useState } from 'react'
import { createIngrediente } from '@/services/api'

export function NovoIngrediente() {
  // Estado para armazenar os dados do ingrediente
  const [ingrediente, setIngrediente] = useState({
    descricao: '',
    preco: 0,
    isAdicional: false // Alterado para ser consistente com o modelo Prisma
  })

  // Função para lidar com a mudança nos campos de input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type, checked } = e.target

    setIngrediente(prev => ({
      ...prev,
      [id]:
        type === 'checkbox'
          ? checked
          : id === 'preco'
          ? parseFloat(value)
          : value // Converte o 'preco' para número
    }))
  }

  // Função para lidar com a mudança do checkbox 'adicional'
  const handleCheckboxChange = (checked: boolean) => {
    setIngrediente(prev => ({
      ...prev,
      isAdicional: checked // Usando 'isAdicional' para refletir no Prisma
    }))
  }

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Enviando os dados para a API ou exibindo no console
    createIngrediente(ingrediente)
    console.log(ingrediente)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          Ingrediente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Ingrediente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-2 py-2">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="descricao" className="text-right">
              Descricao
            </Label>
            <Input
              id="descricao"
              type="text"
              placeholder="Bacon"
              value={ingrediente.descricao}
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
              value={ingrediente.preco}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="adicional" className="text-right">
              Adicional
            </Label>
            <Checkbox
              checked={ingrediente.isAdicional}
              onCheckedChange={handleCheckboxChange} // Usando 'isAdicional' para refletir a mudança no checkbox
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Cadastrar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
