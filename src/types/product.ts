export type Categories = "starter" | "main" | "dessert" | "drink"

export type Product = {
  id: string
  name: string
  category: Categories
  price: number
  description: string
  isAvailable: boolean
}

export interface CreateProductRequest extends Product {}
export interface UpdateProductRequest extends Partial<Product> {}