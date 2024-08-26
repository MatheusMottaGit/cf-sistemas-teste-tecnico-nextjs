"use client"
import { useEffect, useState } from "react"
import CreateProductFormModal from "@/components/create-product-form-modal"
import ProductsTable from "@/components/products-table"
import SearchProductsForm from "@/components/search-products-form"
import UserHeader from "@/components/user-header"
import { readProducts } from "@/firebase/services"
import { ProductFirebaseDoc } from "@/types/product"

export default function Home() {
  const [products, setProducts] = useState<ProductFirebaseDoc>([])

  useEffect(() => {
    const unsubscribe = readProducts(setProducts)

    return () => unsubscribe()
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <UserHeader />

      <main className="flex-1 py-10 px-16 space-y-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl text-zinc-50 font-semibold">Produtos</h1>

          <CreateProductFormModal />

          <SearchProductsForm />
        </div>

        <div className="flex-1">
          <ProductsTable products={products} />
        </div>
      </main>
    </div>
  )
}
