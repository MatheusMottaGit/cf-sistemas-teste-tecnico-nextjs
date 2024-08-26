"use client"
import { useAuthContext } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

const PrivateRouteMiddleware = ({ children }: { children: React.ReactNode }) => { // middleware to handle login
  const router = useRouter()
  const { user, isUserLoading } = useAuthContext()

  useEffect(() => {
    if(user) {
      router.push("/")
    }else{
      router.push("/auth/login")
    }
  }, [user, router, isUserLoading])

  if (isUserLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center bg-zinc-950 justify-center">
        <Loader2 className="size-20 animate-spin text-zinc-50" />
      </main>
    )
  }

  return (
    <>
      {children}
    </>
  )
}

export default PrivateRouteMiddleware