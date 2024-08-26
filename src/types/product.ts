export type Categories = "starter" | "main" | "dessert" | "drink"

export type Product = {
  id: string
  name: string
  category: Categories
  price: number
  description: string
  isAvailable: boolean
}

export type ProductFirebaseDoc = (Product & { id: string })[]
export interface CreateProductRequest extends Omit<Product, 'id'> {}
export interface UpdateProductRequest extends Partial<Product> {}