"use client"
import { Search, X } from "lucide-react"
import Button from "./default/button"
import Input from "./default/input"
import { useRouter, useSearchParams } from "next/navigation"
import { FormEvent } from "react"

const SearchProductsForm = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const prodParam = searchParams.get("prod")
  const params = new URLSearchParams(searchParams.toString())

  function onHandleFilter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const product = formData.get("product")?.toString() || ""

    if (product) {
      params.set("prod", product)
    }else{
      params.delete("prod")
    }

    router.replace(`?${params.toString()}`)
  }

  function onRemoveFilter() {
    params.delete("prod")

    router.replace(`?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <form onSubmit={onHandleFilter} className="flex items-center gap-2">
        <Input name="product" placeholder="Pesquisar produto..." />
        
        <Button type="submit" variant="outline">
          <Search className="size-4" />
        </Button>
      </form>

      {prodParam && 
        <Button onClick={onRemoveFilter} variant="outline" width="xs">
          <X className="size-4" />
        </Button>  
      }
    </div>
  )
}

export default SearchProductsForm