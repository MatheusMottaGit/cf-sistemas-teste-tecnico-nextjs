import { getAuth, signOut } from "firebase/auth"
import { app } from "../config/firebase"

export async function logOut() {
  const auth = getAuth(app)
  await signOut(auth)
}