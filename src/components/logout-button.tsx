"use client"
import { LogOut } from "lucide-react"
import Button from "./default/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { logOut } from "@/firebase/auth/log-out"

const LogoutButton = () => {
  const router = useRouter()

  async function signOut() {
    await logOut()

    toast.success("Desconectado.", {
      className: "bg-zinc-950 text-zinc-50 border-zinc-700"
    })

    router.push("/auth/login")
  }

  return (
    <Button type="button" onClick={signOut} variant="underline-destructive" width="sm">
      <LogOut className="size-5" /> Sair
    </Button>
  )
}

export default LogoutButton