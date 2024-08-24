import CreateProductFormModal from "@/components/create-product-form-modal"
import LogoutButton from "@/components/logout-button"
import ProductsTable from "@/components/products-table"
import SearchProductsForm from "@/components/search-products-form"
import { readProducts } from "@/firebase/services"
import { ProductFirebaseDoc } from "@/types/product"
import { Soup } from "lucide-react"

export default async function Home() {
  const products: ProductFirebaseDoc = await readProducts()

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <header className="w-full px-16 h-14 flex items-end justify-between">
        <div className="bg-teal-500 p-1 shadow text-zinc-900 rounded-md">
          <Soup className="size-5" />
        </div>

        <LogoutButton />
      </header>

      <main className="flex-1 py-10 px-16 space-y-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl text-zinc-50 font-semibold">Produtos</h1>

          <CreateProductFormModal />

          <SearchProductsForm />
        </div>

        <div className="flex-1">
          <ProductsTable products={products}/>
        </div>
      </main>
    </div>
  )
}
