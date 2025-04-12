"use client";
import { useLogin } from "./hooks/useLogin"
import { useState } from "react"

export default function FormLogin() {

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    const { login } = useLogin()

    const handleSubmit = (e: any) => {
        e.preventDefault()
        login({ email, senha })
    }

    return (
        <div>
            <h1 className="text-3xl mb-5">Login</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-96 gap-3"
            >
                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    required
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                />
                <button type="submit">
                    Entrar
                </button>
            </form>
        </div>
    );
}