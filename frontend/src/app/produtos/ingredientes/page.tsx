import { NovoIngrediente } from '@/components/novo-ingrediente'
import { TableIngredientes } from '@/components/tabela-ingredientes'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export default function Ingredientes() {
  return (
    <main>
      <div>
        <h1>Ingredientes</h1>
      </div>
      <div className="flex gap-2 mb-10">
        <NovoIngrediente />
        <Button>
          <Search />
          Ingredientes
        </Button>
      </div>
      <TableIngredientes />
    </main>
  )
}
