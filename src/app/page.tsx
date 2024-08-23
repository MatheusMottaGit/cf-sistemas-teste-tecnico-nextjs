import CreateProductFormModal from "@/components/create-product-form-modal"
import LogoutButton from "@/components/logout-button"
import ProductsTable from "@/components/products-table"
import { readProducts } from "@/firebase/services"
import { Product } from "@/types/product"
import { Soup } from "lucide-react"

export default async function Home() {
  const products: (Product & { id: string })[] = await readProducts()

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <header className="w-full px-16 h-14 flex items-center justify-between">
        <div className="bg-teal-500 p-1 shadow text-zinc-900 rounded-md">
          <Soup className="size-5" />
        </div>

        <LogoutButton />
      </header>

      <main className="flex-1 py-6 px-16 space-y-6">
        <div className="relative flex items-center gap-3">
          <h1 className="text-2xl text-zinc-50 font-semibold">Produtos</h1>

          <CreateProductFormModal />
        </div>

        <div className="flex-1">
          <ProductsTable products={products}/>
        </div>
      </main>
    </div>
  )
}
