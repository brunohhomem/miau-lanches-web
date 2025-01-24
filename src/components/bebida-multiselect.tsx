/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { MultiSelect } from '@/components/multi-select'
import { listBebida } from '@/services/bebida'
import { useEffect, useState } from 'react'

interface BebidaMultiselectProps {
  onBebidaChange: (bebidas: string[]) => void
}

export default function BebidaMultiselect({
  onBebidaChange
}: BebidaMultiselectProps) {
  const [bebidas, setBebidas] = useState<any[]>([])
  const [selectedBebidas, setSelectedBebidas] = useState<string[]>([])

  useEffect(() => {
    const fetchIngredientes = async () => {
      try {
        const data = await listBebida()
        const formattedData = data.map((item: any) => ({
          value: item.id,
          label: item.descricao
        }))
        setBebidas(formattedData)
      } catch (error) {
        console.error('Erro ao buscar ingredientes:', error)
      }
    }

    fetchIngredientes()
  }, [])

  const handleValueChange = (selected: string[]) => {
    setSelectedBebidas(selected)
    onBebidaChange(selected)
  }

  return (
    <div className="w-96">
      <MultiSelect
        options={bebidas}
        onValueChange={handleValueChange}
        defaultValue={selectedBebidas}
        placeholder="Selecione as bebidas"
        variant="inverted"
        maxCount={3}
      />
    </div>
  )
}
