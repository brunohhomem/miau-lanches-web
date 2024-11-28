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
import { createBebida } from '@/services/bebida'

export function NovaBebida() {
  const [isOpen, setIsOpen] = useState(false)

  const [bebida, setBebida] = useState({
    descricao: '',
    preco: 0,
    hasAcucar: false
  })

  // Função para lidar com a mudança nos campos de input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target

    setBebida(prev => ({
      ...prev,
      [id]: type === 'number' ? parseFloat(value) : value
    }))
  }

  // Função para lidar com a mudança do checkbox
  const handleCheckboxChange = (checked: boolean | false) => {
    setBebida(prev => ({
      ...prev,
      hasAcucar: checked ?? false // Garantindo um valor booleano
    }))
  }

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await createBebida(bebida)
      console.log('Ingrediente criado:', bebida)
      setIsOpen(false)
    } catch (error) {
      console.error('Erro ao criar ingrediente:', error)
    }
  }

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        <Plus />
        Bebida
      </Button>
      {isOpen && (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Nova Bebida</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-2 py-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="descricao" className="text-right">
                  Descricao
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="preco" className="text-right">
                  Preço
                </Label>
                <Input
                  id="preco"
                  type="number"
                  value={bebida.preco}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hasAcucar" className="text-right">
                  Açucar
                </Label>
                <Checkbox
                  checked={bebida.hasAcucar}
                  onCheckedChange={handleCheckboxChange}
                  className="col-span-3"
                />
              </div>
              <DialogFooter>
                <Button type="submit">Cadastrar</Button>
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
