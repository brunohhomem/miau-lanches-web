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
import { createIngrediente } from '@/services/ingrediente'

export function NovoIngrediente() {
  const [isOpen, setIsOpen] = useState(false)

  const [ingrediente, setIngrediente] = useState({
    descricao: '',
    preco: 0,
    isAdicional: false
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target

    setIngrediente(prev => ({
      ...prev,
      [id]: type === 'number' ? parseFloat(value) : value
    }))
  }

  const handleCheckboxChange = (checked: boolean | false) => {
    setIngrediente(prev => ({
      ...prev,
      isAdicional: checked ?? false
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await createIngrediente(ingrediente)
      limparCampos()
      setIsOpen(false)
    } catch (error) {
      console.error('Erro ao criar ingrediente:', error)
    }
  }

  const limparCampos = () => {
    setIngrediente({
      descricao: '',
      preco: 0,
      isAdicional: false
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
        <Plus />
        Cadastrar Ingrediente
      </Button>
      {isOpen && (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Ingrediente</DialogTitle>
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
                  onCheckedChange={handleCheckboxChange}
                  className="col-span-3"
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-emerald-700">
                  Cadastrar
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
