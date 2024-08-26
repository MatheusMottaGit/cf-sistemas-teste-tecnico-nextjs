import { Trash2, X } from "lucide-react"
import { useState } from "react"
import { Product } from "@/types/product"
import Button from "./default/button"
import { deleteProduct } from "@/firebase/services"

interface DeleteProductFormModalProps {
  product: Product
}

const DeleteProductFormModal = ({ product }: DeleteProductFormModalProps) => {
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false)
  
  function openDeleteProductModal() {
    setIsDeleteProductModalOpen(true)
  }

  function closeDeleteProductModal() {
    setIsDeleteProductModalOpen(false)
  }

  async function removeProduct() {
    await deleteProduct(product.id)
    setIsDeleteProductModalOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={openDeleteProductModal}
        type="button"
        className="mt-2 text-red-800 rounded-md p-1 ring-1 my-1 transition-colors ring-red-800 hover:bg-red-500 hover:text-white"
      >
        <X className="size-4" />
      </button>

      {isDeleteProductModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-zinc-950 shadow-md rounded-lg p-6 w-full max-w-md space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h1 className="text-xl text-zinc-50 font-semibold">Quer excluir esse produto?</h1>
                <p className='text-zinc-400'>Produto a ser removido: <span className="font-medium">{product.name}.</span>
                </p>
              </div>

              <button onClick={closeDeleteProductModal}>
                <X className="w-6 h-6 text-zinc-600 hover:text-zinc-800" />
              </button>
            </div>

            <Button variant="destructive" type="button" onClick={removeProduct}>
              Excluir <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteProductFormModal
