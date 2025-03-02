"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { CreateCookie } from "./actions/cookie";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role"); // Obtemos o valor do parâmetro 'role'

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    if (!role) {
      router.push("/"); // Se não houver parâmetro, volta para a página inicial
    }
  }, [role, router]);

  const handleLogin = async () => {
    const resp = await fetch("http://localhost:3002/user/login",
      {
        method: "POST",
        body: JSON.stringify({ email, senha }),
        headers: { "content-type": "application/json" }
      })
    const data = await resp.json()
    await CreateCookie(data)
    if (data.cargo == "admin") {
      router.push("/admin");
    } else if (data.cargo == "aluno") {
      router.push("/aluno");
    } else if (data.cargo == "motorista") {
      router.push("/motorista");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <p>Você está tentando acessar como: {role}</p>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}