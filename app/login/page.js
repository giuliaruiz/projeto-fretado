"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role"); // Obtemos o valor do parâmetro 'role'
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!role) {
      router.push("/"); // Se não houver parâmetro, volta para a página inicial
    }
  }, [role, router]);

  const handleLogin = () => {
    if (role === "admin" && email === "admin@email.com" && password === "admin123") {
      router.push("/admin");
    } else if (role === "aluno" && email === "aluno@email.com" && password === "aluno123") {
      router.push("/aluno"); // Redireciona para a página do aluno
    } else if (role === "motorista" && email === "motorista@email.com" && password === "motorista123") {
      router.push("/motorista"); // Redireciona para a página do motorista
    } else {
      alert("Usuário ou senha inválidos!");
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
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
      <button onClick={() => router.push("/")}>Voltar</button>
    </div>
  );
}


