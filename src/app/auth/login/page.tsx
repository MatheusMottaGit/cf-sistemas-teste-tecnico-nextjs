'use client'
import Button from '@/components/default/button'
import Input from '@/components/default/input'
import { signIn } from '@/firebase/sign-in'
import { CheckCircle, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import { toast } from 'sonner'

const LoginPage = () => {
  const [isLogging, setIsLogging] = useState(false)

  const router = useRouter()
  
  async function loginUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsLogging(true)

    const formData = new FormData(event.currentTarget)

    const email = formData.get('email')?.toString() || ""
    const password = formData.get('password')?.toString() || ""
    
    await signIn(email, password)

    setIsLogging(false)

    toast.success("Conectado!.", {
      className: "bg-zinc-950 text-zinc-50 border-zinc-700"
    })
    
    router.push("/")
  }
  
  return (
    <div className="shadow-md rounded-lg p-5 border border-zinc-700 w-[420px] space-y-8">
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-semibold text-zinc-50'>Faça seu login na Noveau</h1>
          <LogIn className='text-teal-600 size-6'/>
        </div>
        
        <span className='text-zinc-400'>Lorem ipsum dolor, sit amet consectetur.</span>
      </div>

      <form onSubmit={loginUser} className='space-y-5'>
        <Input
          type="email"
          label="E-mail"
          name="email"
          id="email"
        />

        <Input
          type="password"
          label="Senha"
          name="password"
          id="password"
        />

        <Button type="submit" isLoading={isLogging}>
          Entrar <CheckCircle className='size-5'/>
        </Button>
      </form>
    </div>
  )
}

export default LoginPage