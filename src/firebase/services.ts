import { addDoc, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from "@firebase/firestore"
import { CreateProductRequest, ProductFirebaseDoc, UpdateProductRequest } from "@/types/product"
import { Product } from "@/types/product"
import { collection } from "@firebase/firestore"
import { db } from "./config/firebase"

export function readProducts(setProducts: (products: ProductFirebaseDoc) => void): () => void {
  const productsCollection = query(collection(db, "products"), orderBy("price"))

  return onSnapshot(productsCollection, (snapshot) => {
    const products: ProductFirebaseDoc = snapshot.docs.map((doc) => {
      const { name, price, category, description, isAvailable } = doc.data() as Product
      return {
        id: doc.id,
        name,
        price,
        category,
        description,
        isAvailable
      }
    })

    setProducts(products)
  })
}

export async function createProduct(request: CreateProductRequest): Promise<void> {
  const { name, price, category, description, isAvailable } = request

  try {
    await addDoc(collection(db, "products"), {
      name,
      price,
      category,
      description,
      isAvailable
    })
  } catch (error) {
    throw new Error(error as any)
  }
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