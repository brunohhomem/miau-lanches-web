'use client'

import { useState } from 'react'
import { BuscarBebidas } from '@/components/buscar-bebida'
import { CardBebida } from '@/components/card-bebida'
import { NovaBebida } from '@/components/nova-bebida'

export default function Bebidas() {
  const [bebida, setBebida] = useState<{
    id: number
    descricao: string
    preco: number
    hasAcucar: boolean
  } | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleBebidaFind = (bebida: any) => {
    setBebida(bebida)
  }

  return (
    <main>
      <div className="flex gap-2 mb-10">
        <NovaBebida />
        <BuscarBebidas onBebidaFind={handleBebidaFind} />
      </div>
      <div>
        {bebida && (
          <CardBebida
            id={bebida.id}
            descricao={bebida.descricao}
            preco={bebida.preco}
            hasAcucar={bebida.hasAcucar}
          />
        )}
      </div>
    </main>
  )
}
