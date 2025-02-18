"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <h1>Bem-vindo ao Sistema de Fretados</h1>
      <button onClick={() => router.push("/login?role=admin")}>Administrador</button>
      <button onClick={() => router.push("/login?role=aluno")}>Aluno</button>
      <button onClick={() => router.push("/login?role=motorista")}>Motorista</button>
    </div>
  );
}

