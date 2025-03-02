"use client";
import { useState } from "react";
import { useLogin } from "./hooks/useLogin";

export default function FormLogin() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const { login } = useLogin()


    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, senha)
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input
                    type="email"
                    placeholder="Email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    required
                    autoComplete="current-password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button type="submit">
                    Entrar
                </button>
            </form>
        </div>
    );
}