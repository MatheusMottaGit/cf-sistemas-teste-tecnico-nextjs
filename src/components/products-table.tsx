import { Product } from '@/types/product'
import AvailabilityBadge from './availability-badge'
import UpdateProductFormModal from './update-product-form-modal'
import DeleteProductFormModal from './delete-product-modal'

interface ProductsTableProps {
  products: Product[]
}

const categories = {
  "main": "Principal",
  "starter": "Entrada",
  "dessert": "Sobremesa",
  "drink": "Bebida"
}

const ProductsTable = async ({ products }: ProductsTableProps) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="text-left border-b border-t border-zinc-800">
          <th className="py-3 text-zinc-300 font-medium">Nome</th>
          <th className="py-3 text-zinc-300 font-medium">Categoria</th>
          <th className="py-3 text-zinc-300 font-medium">Preço</th>
          <th className="py-3 text-zinc-300 font-medium">Disponibilidade</th>
          <th className="py-3 text-zinc-300 font-medium">Descrição</th>
          <th className="py-3 text-zinc-300 font-medium"></th>
        </tr>
      </thead>
      
      <tbody>
        {products.map((product) => {
          return (  
            <tr key={product.id} className="border-b border-zinc-800">
              <td className="py-1.5 text-sm text-zinc-500 font-medium">{product.name}</td>
              <td className="py-1.5 text-sm text-zinc-500 font-medium">{categories[product.category]}</td>
              <td className="py-1.5 text-sm text-zinc-500 font-medium">R${product.price.toFixed(2)}</td>
              <td className="py-1.5 text-sm text-zinc-500 font-medium">
                <AvailabilityBadge isAvailable={product.isAvailable} />
              </td>
              <td className="py-1.5 text-sm text-zinc-500 font-medium">{product.description}</td>
              <td>
                <div className="flex items-end justify-end gap-2 py-1 mb-1.5">
                  <UpdateProductFormModal product={product}/>

                  <DeleteProductFormModal product={product}/>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ProductsTable