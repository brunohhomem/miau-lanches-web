/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { MultiSelect } from '@/components/multi-select'
import { listIngrediente } from '@/services/ingrediente'
import { useEffect, useState } from 'react'

interface IngredienteMultiselectProps {
  onIngredientesChange: (ingredientes: string[]) => void
}

export default function IngredienteMultiselect({
  onIngredientesChange
}: IngredienteMultiselectProps) {
  const [ingredientes, setIngredientes] = useState<any[]>([])
  const [selectedIngredientes, setSelectedIngredientes] = useState<string[]>([])

  useEffect(() => {
    const fetchIngredientes = async () => {
      try {
        const data = await listIngrediente()
        const formattedData = data.map((item: any) => ({
          value: item.id,
          label: item.descricao
        }))
        setIngredientes(formattedData)
      } catch (error) {
        console.error('Erro ao buscar ingredientes:', error)
      }
    }

    fetchIngredientes()
  }, [])

  const handleValueChange = (selected: string[]) => {
    setSelectedIngredientes(selected)
    onIngredientesChange(selected)
  }

  return (
    <div className="w-96">
      <MultiSelect
        options={ingredientes}
        onValueChange={handleValueChange}
        defaultValue={selectedIngredientes}
        placeholder="Selecione os ingredientes"
        variant="inverted"
        maxCount={3}
      />
    </div>
  )
}
