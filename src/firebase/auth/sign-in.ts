import { app } from "@/firebase/config/firebase"
import { signInWithEmailAndPassword, getAuth, UserCredential } from "firebase/auth"

const auth = getAuth(app)

export async function signIn(email: string, password: string): Promise<UserCredential> {
  let result = null

  try {
    result = await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    throw new Error(error as any)
  }

  return result
}