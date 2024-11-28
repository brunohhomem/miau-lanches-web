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
import { Search } from 'lucide-react'
import { findBebidaByDescricao, findBebidaById } from '@/services/bebida'

interface Bebida {
  descricao: string
  preco: number
  hasAcucar: boolean
}

interface BuscarBebidasProps {
  onBebidaFind: (bebida: Bebida | null) => void
}

export function BuscarBebidas({ onBebidaFind }: BuscarBebidasProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [bebida, setBebida] = useState({ id: '', descricao: '' })
  const [resultado, setResultado] = useState<Bebida | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setBebida(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      let response: Bebida | null = null

      if (bebida.id && !bebida.descricao) {
        response = await findBebidaById(+bebida.id)
      } else if (bebida.descricao && !bebida.id) {
        response = await findBebidaByDescricao(bebida.descricao)
      } else if (bebida.id && bebida.descricao) {
        response = await findBebidaById(+bebida.id)
      }

      setResultado(response)
      onBebidaFind(response)
      setIsOpen(false)
    } catch (error) {
      console.error('Erro ao buscar bebida:', error)
    }
  }

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        <Search />
        Buscar Bebida
      </Button>
      {isOpen && (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Buscar Bebida</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-2 py-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  Código
                </Label>
                <Input
                  id="id"
                  type="number"
                  value={bebida.id}
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
                  placeholder="Suco de Laranja"
                  value={bebida.descricao}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>

              <DialogFooter>
                <Button type="submit">Buscar</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
