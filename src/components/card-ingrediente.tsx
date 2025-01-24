import * as React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CircleCheck, CircleX } from 'lucide-react'
import { listIngredienteReq } from '@/types/ingrediente'

export function CardIngrediente({
  id,
  descricao,
  preco,
  isAdicional
}: listIngredienteReq) {
  const precoFormatado = !isNaN(preco) ? preco.toFixed(2) : '0.00'

  return (
    <Card className="w-[250px]" key={id}>
      <CardHeader>
        <CardTitle>{descricao}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <p>Preço: R$ {precoFormatado}</p>
            <p className="flex gap-1 items-center">
              Adicional?{' '}
              {isAdicional ? (
                <CircleCheck className="text-emerald-500" />
              ) : (
                <CircleX className="text-red-500" />
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
