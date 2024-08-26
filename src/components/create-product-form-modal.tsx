"use client"
import { CheckCircle, Plus } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import Button from "./default/button"
import Input from "./default/input"
import { Categories, CreateProductRequest } from "@/types/product"
import { createProduct } from "@/firebase/services"
import Modal from "./default/modal"

const CreateProductFormModal = () => {
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Categories>("starter")
  const [isAvailable, setIsAvailable] = useState<boolean>(true)
  const [isCreating, setIsCreating] = useState(false)

  function openCreateProductModal() {
    setIsCreateProductModalOpen(true)
  }

  function closeCreateProductModal() {
    setIsCreateProductModalOpen(false)
  }

  function handleSelectCategory(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCategory(event.target.value as Categories)
  }

  function handleSelectAvailability(event: ChangeEvent<HTMLSelectElement>) {
    setIsAvailable(event.target.value === "true")
  }

  async function createNewProduct(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    setIsCreating(true)

    const formData = new FormData(event.currentTarget)

    const name = formData.get("name")?.toString().trim() || ""
    const price = parseFloat(formData.get("price") as string) || 0
    const description = formData.get("description")?.toString().trim() || ""

    const createProductRequest: CreateProductRequest = {
      name,
      price,
      description,
      category: selectedCategory,
      isAvailable,
    }

    await createProduct(createProductRequest)

    setIsCreating(false)

    window.location.reload()
  }

  return (
    <div className="relative">
      <button onClick={openCreateProductModal} className="bg-teal-500 p-1 px-4 flex items-center font-medium hover:bg-teal-600 justify-center text-xs gap-1 text-zinc-900 rounded-full">
        <Plus className="size-4" /> Novo produto
      </button>

      {isCreateProductModalOpen && (
        <Modal 
          title="Registrar novo produto" 
          description="Preencha os campos abaixo."
          onCloseModal={closeCreateProductModal}
        >
          <form onSubmit={createNewProduct} className="space-y-4">
            <Input type="text" label="Nome" name="name" id="name" required />

            <div className="flex flex-col gap-1">
              <label className="font-medium mb-1 text-zinc-300">Categoria</label>
              
              <select
                value={selectedCategory}
                onChange={handleSelectCategory}
                className="border border-zinc-700 rounded-lg text-zinc-300 p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option className="bg-zinc-950" value="starter">Entrada</option>
                <option className="bg-zinc-950" value="main">Prato principal</option>
                <option className="bg-zinc-950" value="dessert">Sobremesa</option>
                <option className="bg-zinc-950" value="drink">Bebida</option>
              </select>
            </div>

            <Input
              type="number"
              label="Preço"
              name="price"
              id="price"
              step="0.01"
              min="0"
              required
            />

            <Input
              type="text"
              label="Descrição"
              name="description"
              id="description"
              required
            />

            <div className="flex flex-col gap-1">
              <label className="font-medium mb-1 text-zinc-300">Disponibilidade</label>
              
              <select
                value={isAvailable.toString()}
                onChange={handleSelectAvailability}
                className="border border-zinc-700 bg-transparent text-zinc-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option className="bg-zinc-950" value="true">Disponível</option>
                <option className="bg-zinc-950" value="false">Indisponível</option>
              </select>
            </div>

            <div className="flex justify-end">
              <Button isLoading={isCreating} type="submit">
                Criar <CheckCircle className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default CreateProductFormModal
