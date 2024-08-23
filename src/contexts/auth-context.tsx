"use client"
import { app } from "@/firebase/config/firebase"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import React, { createContext, useContext, useEffect, useState } from "react"

interface IAuthContext {
  user: User | null
  setUser: (user: User | null) => void
  isUserLoading: boolean
}

export const AuthContext = createContext({} as IAuthContext)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isUserLoading, setIsUserLoading] = useState(true)

  const auth = getAuth(app)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>{
      setUser(user)
      setIsUserLoading(false)
    })

    return () => unsubscribe()
  }, [auth])

  return (
    <AuthContext.Provider value={{ user, setUser, isUserLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
