/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { MultiSelect } from '@/components/multi-select'
import { listLanche } from '@/services/lanche'
import { useEffect, useState } from 'react'

interface LancheMultiselectProps {
  onLancheChange: (lanches: string[]) => void
}

export default function LancheMultiselect({
  onLancheChange
}: LancheMultiselectProps) {
  const [lanches, setLanches] = useState<any[]>([])
  const [selectedLanches, setSelectedLanches] = useState<string[]>([])

  useEffect(() => {
    const fetchLanches = async () => {
      try {
        const data = await listLanche()
        const formattedData = data.map((item: any) => ({
          value: item.id,
          label: item.descricao
        }))
        setLanches(formattedData)
      } catch (error) {
        console.error('Erro ao buscar lanches:', error)
      }
    }

    fetchLanches()
  }, [])

  const handleValueChange = (selected: string[]) => {
    setSelectedLanches(selected)
    onLancheChange(selected)
  }

  return (
    <div className="w-96">
      <MultiSelect
        options={lanches}
        onValueChange={handleValueChange}
        defaultValue={selectedLanches}
        placeholder="Selecione os ingredientes"
        variant="inverted"
        maxCount={3}
      />
    </div>
  )
}
