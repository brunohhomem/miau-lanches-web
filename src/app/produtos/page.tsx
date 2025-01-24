import { Button } from '@/components/ui/button'

export default function Produtos() {
  return (
    <main>
      <div className="flex gap-4">
        <a href="/produtos/ingredientes">
          <Button variant="default" className="bg-slate-500 text-md">
            Ingredientes
          </Button>
        </a>
        <a href="/produtos/bebidas">
          <Button variant="default" className="bg-slate-500 text-md">
            Bebidas
          </Button>
        </a>
      </div>
    </main>
  )
}
