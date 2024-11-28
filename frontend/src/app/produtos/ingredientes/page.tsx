'use client'

import { BuscarIngrediente } from '@/components/buscar-ingrediente'
import { CardIngrediente } from '@/components/card-ingrediente'
import { NovoIngrediente } from '@/components/novo-ingrediente'
import { useState } from 'react'

export default function Ingredientes() {
  const [ingrediente, setIngrediente] = useState<{
    id: number
    descricao: string
    preco: number
    isAdicional: boolean
  } | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleIngredienteFind = (ingrediente: any) => {
    setIngrediente(ingrediente)
  }

  return (
    <main>
      <div>
        <h1>Ingredientes</h1>
      </div>
      <div className="flex gap-2 mb-10">
        <NovoIngrediente />
        <BuscarIngrediente onIngredienteFind={handleIngredienteFind} />
      </div>
      <div>
        {ingrediente && (
          <CardIngrediente
            id={ingrediente.id}
            descricao={ingrediente.descricao}
            preco={ingrediente.preco}
            isAdicional={ingrediente.isAdicional}
          />
        )}
      </div>
    </main>
  )
}
