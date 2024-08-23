import { app, db } from "@/firebase/config/firebase"
import { RegisterUserRequest } from "@/types/user"
import { createUserWithEmailAndPassword, getAuth, UserCredential } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

const auth = getAuth(app)

export async function signUp(request: RegisterUserRequest): Promise<UserCredential> {
  let result = null
  const { cpf, email, name, password, phone } = request

  try {
    result = await createUserWithEmailAndPassword(auth, email, password)
    const user = result.user

    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      password,
      phone,
      cpf,
    })
  } catch (error) {
    throw new Error(error as any)
  }

  return result
}