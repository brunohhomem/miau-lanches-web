import { Button } from '@/components/ui/button'

export default function Produtos() {
  return (
    <main>
      <div className="flex gap-5">
        <a href="/produtos/ingredientes">
          <Button variant="default">Ingredientes</Button>
        </a>
        <a href="/produtos/bebidas">
          <Button variant="destructive">Bebidas</Button>
        </a>
      </div>
    </main>
  )
}
