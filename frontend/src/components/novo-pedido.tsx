'use client'

import { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import AdicionalMultiselect from './adicional-multiselect'
import LancheMultiselect from './lanche-multiselect'
import BebidaMultiselect from './bebida-multiselect'
import { createPedido } from '@/services/pedido'

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

    // Verificar se o campo pertence ao objeto cliente
    if (id.startsWith('cliente.')) {
      const field = id.split('.')[1] // Pega o campo após 'cliente.'
      setPedido(prev => ({
        ...prev,
        cliente: {
          ...prev.cliente,
          [field]: value // Atualiza apenas o campo dentro de cliente
        }
      }))
    } else {
      // Se não for um campo dentro de cliente, atualize diretamente no pedido
      setPedido(prev => ({
        ...prev,
        [id]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const preco = parseFloat(pedido.preco.toString())

      // Converter os arrays de string[] para number[]
      const lanches = lanchesSelecionados.map(Number)
      const adicionais = ingredientesSelecionados.map(Number)
      const bebidas = bebidasSelecionados.map(Number)

      // Criar o pedido
      await createPedido({
        ...pedido,
        preco,
        lanches,
        adicionais,
        bebidas
      })
    } catch (error) {
      console.error('Erro ao criar pedido:', error)
    }
  }

  return (
    <main className="flex flex-row">
      <h1>Pedidos</h1>
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

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="observacoes" className="text-right">
            Observações
          </Label>
          <Input
            id="observacoes"
            type="text"
            placeholder="Observações sobre o pedido"
            value={pedido.observacoes}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>

        {/* Campos para o Cliente */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="cliente.nome" className="text-right">
            Nome do Cliente
          </Label>
          <Input
            id="cliente.nome"
            type="text"
            placeholder="Nome do Cliente"
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
            placeholder="Endereço do Cliente"
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
            placeholder="Telefone do Cliente"
            value={pedido.cliente.telefone}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>

        {/* Seleção de Lanches, Adicionais e Bebidas */}
        <div className="items-center gap-4">
          <LancheMultiselect onLancheChange={handleLancheChange} />
          <AdicionalMultiselect
            onIngredientesChange={handleIngredientesChange}
          />
          <BebidaMultiselect onBebidaChange={handleBebidaChange} />
        </div>

        <Button type="submit">Fazer Pedido</Button>
      </form>
    </main>
  )
}
