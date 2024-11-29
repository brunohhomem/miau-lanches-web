/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useState } from 'react'
import {
  findIngredienteByDescricao,
  findIngredienteById
} from '@/services/ingrediente'
import { Search } from 'lucide-react'

interface Ingrediente {
  descricao: string
  preco: number
  isAdicional: boolean
}

interface BuscarIngredienteProps {
  onIngredienteFind: (ingrediente: Ingrediente | null) => void
}

export function BuscarIngrediente({
  onIngredienteFind
}: BuscarIngredienteProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [ingrediente, setIngrediente] = useState({ id: '', descricao: '' })
  const [resultado, setResultado] = useState<Ingrediente | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setIngrediente(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      let response: Ingrediente | null = null

      if (ingrediente.id && !ingrediente.descricao) {
        response = await findIngredienteById(+ingrediente.id)
      } else if (ingrediente.descricao && !ingrediente.id) {
        response = await findIngredienteByDescricao(ingrediente.descricao)
      } else if (ingrediente.id && ingrediente.descricao) {
        response = await findIngredienteById(+ingrediente.id)
      }

      setResultado(response)
      onIngredienteFind(response)
      limparCampos()
      setIsOpen(false)
    } catch (error) {
      console.error('Erro ao buscar ingrediente:', error)
    }
  }

  const limparCampos = () => {
    setIngrediente({
      id: '',
      descricao: ''
    })
  }

  return (
    <>
      <Button
        variant="default"
        className="bg-slate-500 text-md"
        onClick={() => {
          setIsOpen(true)
          limparCampos()
        }}
      >
        <Search />
        Ingredientes
      </Button>
      {isOpen && (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Buscar Ingrediente</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-2 py-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  Código
                </Label>
                <Input
                  id="id"
                  type="number"
                  value={ingrediente.id}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="descricao" className="text-right">
                  Descrição
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
              <DialogFooter>
                <Button type="submit" className="bg-emerald-700">
                  Buscar
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setIsOpen(false)}
                >
                  Fechar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
