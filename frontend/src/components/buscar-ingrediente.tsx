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
import { findIngredienteByDescricao, findIngredienteById } from '@/services/api'
import { Search } from 'lucide-react'

export function BuscarIngrediente() {
  const [isOpen, setIsOpen] = useState(false)

  const [ingrediente, setIngrediente] = useState({
    id: '',
    descricao: ''
  })

  const [resultado, setResultado] = useState(null)

  // Função para lidar com a mudança nos campos de input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setIngrediente(prev => ({
      ...prev,
      [id]: value
    }))
  }

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      let response

      // Verifica se o campo id está preenchido, se sim, chama a função para buscar por id
      if (ingrediente.id && !ingrediente.descricao) {
        response = await findIngredienteById(+ingrediente.id)
      }
      // Verifica se o campo descricao está preenchido, se sim, chama a função para buscar por descricao
      else if (ingrediente.descricao && !ingrediente.id) {
        response = await findIngredienteByDescricao(ingrediente.descricao)
      }
      // Caso ambos os campos estejam preenchidos, prioriza a busca por id
      else if (ingrediente.id && ingrediente.descricao) {
        response = await findIngredienteById(+ingrediente.id)
      }

      console.log('Ingrediente encontrado:', response)
      setResultado(response)
      setIsOpen(false)
    } catch (error) {
      console.error('Erro ao buscar ingrediente:', error)
    }
  }

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
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
