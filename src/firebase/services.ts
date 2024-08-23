import { addDoc, deleteDoc, doc, updateDoc } from "@firebase/firestore"
import { CreateProductRequest, UpdateProductRequest } from "@/types/product"
import { Product } from "@/types/product"
import { collection, getDocs } from "@firebase/firestore"
import { db } from "./config/firebase"

export async function createProduct(request: CreateProductRequest) {
  const { name, price, category, description, isAvailable } = request

  try {
    const result = await addDoc(collection(db, "products"), {
      name,
      price,
      category,
      description,
      isAvailable
    })

    return result
  } catch (error) {
    throw new Error(error as any)
  }
}

export async function readProducts(): Promise<(Product & { id: string })[]> {
  const productsCollection = collection(db, "products")
  const productsDocs = await getDocs(productsCollection)

  const products: (Product & { id: string })[] = productsDocs.docs.map((doc) => {
    const data = doc.data() as Product
    return {
      id: doc.id,
      name: data.name,
      price: data.price,
      category: data.category,
      description: data.description,
      isAvailable: data.isAvailable
    }
  })

  return products
}

export async function updateProduct(id: string, updateRequest: UpdateProductRequest): Promise<void> {
  const docRef = doc(db, "products", id)
  
  await updateDoc(docRef, {
    ...updateRequest
  })
}

export async function deleteProduct(id: string): Promise<void> {
  const docRef = doc(db, "products", id) 
  await deleteDoc(docRef)
}