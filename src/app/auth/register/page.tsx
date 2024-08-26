"use client"
import Button from "@/components/default/button"
import Input from "@/components/default/input"
import { signUp } from "@/firebase/auth/sign-up"
import { RegisterUserRequest } from "@/types/user"
import { FileText, CheckCircle, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { FormEvent, useState } from "react"

const RegisterPage = () => {
  const [isRegistering, setIsRegistering] = useState(false)

  const router = useRouter()

  function navigateToLoginPage() {
    router.push("/auth/login")
  }

  async function registerUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsRegistering(true)

    const formData = new FormData(event.currentTarget)

    const name = formData.get('name')?.toString() || ""
    const email = formData.get('email')?.toString() || ""
    const password = formData.get('password')?.toString() || ""
    const phone = formData.get('phone')?.toString() || ""
    const cpf = formData.get('cpf')?.toString() || ""

    const registerUserRequest: RegisterUserRequest = {
      name,
      email,
      password,
      phone,
      cpf
    }
    
    // console.log(registerUserRequest)

    await signUp(registerUserRequest)

    setIsRegistering(false)
    
    router.push("/auth/login")
  }

  return (
    <div className="shadow-md rounded-lg p-5 border border-zinc-700 w-[520px] space-y-8">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-zinc-50">Registre-se na Noveau</h1>
          <FileText className="text-teal-600 size-6"/>
        </div>
        
        <span className="text-zinc-400">Se atente às informações abaixo.</span>
      </div>

      <form onSubmit={registerUser} className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-2">
            <Input 
              type="text"
              label="Nome"
              name="name"
              id="name"
            />
          </div>
          
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

          <Input
            type="tel"
            label="Telefone"
            name="phone"
            id="phone"
            placeholder="Ex: '(24) 9999-9999'"
          />

          <Input
            type="text"
            label="CPF"
            name="cpf"
            id="cpf"
            placeholder="Ex: '000.000.000-00'"
          />
        </div>

        <Button type="submit" isLoading={isRegistering}>
          Cadastrar <CheckCircle className="size-5"/>
        </Button>

        <Button onClick={navigateToLoginPage} type="button" variant='outline'>
          Já tenho conta <ExternalLink className='size-4'/>
        </Button>
      </form>
    </div>
  )
}

export default RegisterPage