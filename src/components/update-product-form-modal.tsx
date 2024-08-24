"use client"
import { CheckCircle, Edit } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import Button from "./default/button"
import Input from "./default/input"
import { Product, UpdateProductRequest } from "@/types/product"
import Modal from "./default/modal"
import { updateProduct } from "@/firebase/services"

interface UpdateProductFormModalProps {
  product: Product
}

const UpdateProductFormModal = ({ product }: UpdateProductFormModalProps) => {
  const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  
  const [name, setName] = useState(product.name)
  const [category, setCategory] = useState(product.category)
  const [price, setPrice] = useState(product.price)
  const [description, setDescription] = useState(product.description)
  const [isAvailable, setIsAvailable] = useState(product.isAvailable)

  function openUpdateProductModal() {
    setIsUpdateProductModalOpen(true)
  }

  function closeUpdateProductModal() {
    setIsUpdateProductModalOpen(false)
  }

  function handleSelectCategory(event: ChangeEvent<HTMLSelectElement>) {
    setCategory(event.target.value as Product['category'])
  }

  function handleSelectIsAvailable(event: ChangeEvent<HTMLSelectElement>) {
    setIsAvailable(event.target.value === "true")
  }

  async function editProduct(event: FormEvent) {
    event.preventDefault()

    setIsUpdating(true)

    const updateProductRequest: UpdateProductRequest = {
      name,
      price,
      category,
      description, 
      isAvailable
    }

    await updateProduct(product.id, {...updateProductRequest})

    setIsUpdating(false)

    window.location.reload()
  }

  return (
    <div className="relative">
      <button onClick={openUpdateProductModal} type="button" className="mt-2 text-orange-800 rounded-md p-1 my-1 ring-1 transition-colors ring-orange-800 hover:bg-orange-500 hover:text-white">
        <Edit className="size-4" />
      </button>

      {isUpdateProductModalOpen && (
        <Modal
          title="Atualizar produto"
          description={`Produto a ser alterado: ${product.name}`}
          onCloseModal={closeUpdateProductModal}
        >
          <form onSubmit={editProduct} className="space-y-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)} 
              type="text" 
              label="Nome" 
            />

            <div className="flex flex-col gap-1">
              <label htmlFor="category" className="font-medium mb-1 text-zinc-300">Categoria</label>
              
              <select 
                value={category} 
                onChange={handleSelectCategory}
                className="border border-zinc-700 rounded-lg text-zinc-300 p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="starter">Entrada</option>
                <option value="main">Prato principal</option>
                <option value="dessert">Sobremesa</option>
                <option value="drink">Bebida</option>
              </select>
            </div>

            <Input
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              type="number"
              label="Preço"
              step="0.01"
              min="0"
            />

            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              label="Descrição"
            />

            <div className="flex flex-col gap-1">
              <label className="font-medium mb-1 text-zinc-300">Disponibilidade</label>
              
              <select 
                value={isAvailable.toString()} 
                onChange={handleSelectIsAvailable}
                className="border border-zinc-700 bg-transparent text-zinc-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="true">Disponível</option>
                <option value="false">Indisponível</option>
              </select>
            </div>

            <div className="flex justify-end">
              <Button isLoading={isUpdating} type="submit">
                Criar <CheckCircle className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default UpdateProductFormModal
