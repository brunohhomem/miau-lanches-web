'use client'

import { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import AdicionalMultiselect from './adicional-multiselect'
import LancheMultiselect from './lanche-multiselect'
import BebidaMultiselect from './bebida-multiselect'
import { createPedido } from '@/services/pedido'
import { api } from '@/services/api'

export default function NovoPedido() {
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState<
    string[]
  >([])
  const [lanchesSelecionados, setLanchesSelecionados] = useState<string[]>([])
  const [bebidasSelecionados, setBebidasSelecionados] = useState<string[]>([])

  const handleIngredientesChange = (ingredientes: string[]) => {
    setIngredientesSelecionados(ingredientes)
  }

  const handleLancheChange = (lanches: string[]) => {
    setLanchesSelecionados(lanches)
  }

  const handleBebidaChange = (bebidas: string[]) => {
    setBebidasSelecionados(bebidas)
  }

  const [pedido, setPedido] = useState({
    descricao: '',
    preco: 0,
    lanches: [] as number[],
    adicionais: [] as number[],
    bebidas: [] as number[],
    observacoes: '',
    cliente: {
      nome: '',
      endereco: '',
      telefone: ''
    }
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target

    if (id.startsWith('cliente.')) {
      const field = id.split('.')[1]
      setPedido(prev => ({
        ...prev,
        cliente: {
          ...prev.cliente,
          [field]: value
        }
      }))
    } else {
      setPedido(prev => ({
        ...prev,
        [id]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      // const preco = parseFloat(pedido.preco.toString())

      const lanches = lanchesSelecionados.map(Number)
      const adicionais = ingredientesSelecionados.map(Number)
      const bebidas = bebidasSelecionados.map(Number)

      const response = await api.post('/pedidos/calcular', {
        lanches,
        adicionais,
        bebidas
      })

      const { total } = response.data

      setPedido(prevPedido => ({
        ...prevPedido,
        preco: total
      }))

      const userConfirmed = window.confirm(
        `O total do pedido é R$${total}. Deseja confirmar?`
      )

      if (!userConfirmed) return

      await createPedido({
        ...pedido,
        preco: total,
        lanches,
        adicionais,
        bebidas
      })

      window.location.reload()
    } catch (error) {
      console.error('Erro ao criar pedido:', error)
    }
  }

  return (
    <main className="flex flex-row w-96">
      <form onSubmit={handleSubmit} className="grid gap-2 py-2">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="descricao" className="text-right">
            Descrição
          </Label>
          <Input
            id="descricao"
            type="text"
            placeholder="Pedido do Bruno"
            value={pedido.descricao}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="observacoes" className="text-right">
            Observações
          </Label>
          <Input
            id="observacoes"
            type="text"
            placeholder="Capricha no bacon"
            value={pedido.observacoes}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="cliente.nome" className="text-right">
            Cliente
          </Label>
          <Input
            id="cliente.nome"
            type="text"
            placeholder="Nome"
            value={pedido.cliente.nome}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="cliente.endereco" className="text-right">
            Endereço
          </Label>
          <Input
            id="cliente.endereco"
            type="text"
            placeholder="Endereço"
            value={pedido.cliente.endereco}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="cliente.telefone" className="text-right">
            Telefone
          </Label>
          <Input
            id="cliente.telefone"
            type="text"
            placeholder="Telefone"
            value={pedido.cliente.telefone}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>

        <div className="flex gap-4 flex-col w-fit">
          <LancheMultiselect onLancheChange={handleLancheChange} />
          <AdicionalMultiselect
            onIngredientesChange={handleIngredientesChange}
          />
          <BebidaMultiselect onBebidaChange={handleBebidaChange} />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="preco" className="text-right">
            Preço
          </Label>
          <Input
            id="preco"
            type="number"
            value={pedido.preco}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>

        <Button type="submit" className="bg-emerald-700">
          Cadastrar
        </Button>
      </form>
    </main>
  )
}
