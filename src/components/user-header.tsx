"use client"
import { useAuthContext } from '@/contexts/auth-context'
import { logOut } from '@/firebase/auth/log-out'
import { LogOut, Soup } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const UserHeader = () => {
  const router = useRouter()
  const { user } = useAuthContext()

  async function signOut() {
    await logOut()

    toast.success("Desconectado.", {
      className: "bg-zinc-950 text-zinc-50 border-zinc-700"
    })

    router.push("/auth/login")
  }

  return (
    <header className="w-full px-16 h-14 flex items-end justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-teal-500 p-1 shadow text-zinc-900 rounded-md">
          <Soup className="size-5" />
        </div>

        {user && <span className="text-zinc-400 font-semibold text-xl">Olá, {user.email}</span>}
      </div>

      <button type="button" onClick={signOut} className="flex gap-1 items-center text-red-800 text-sm underline">
        Sair
        <LogOut className="size-4" />
      </button>
    </header>
  )
}

export default UserHeader