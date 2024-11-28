import { BuscarIngrediente } from '@/components/buscar-ingrediente'
import { NovoIngrediente } from '@/components/novo-ingrediente'
import { TableIngredientes } from '@/components/tabela-ingredientes'

export default function Ingredientes() {
  return (
    <main>
      <div>
        <h1>Ingredientes</h1>
      </div>
      <div className="flex gap-2 mb-10">
        <NovoIngrediente />
        <BuscarIngrediente />
      </div>
      <TableIngredientes />
    </main>
  )
}
