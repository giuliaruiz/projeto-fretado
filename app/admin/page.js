"use client";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();

  return (
    <div>
      <h1>Painel do Administrador</h1>
      <button onClick={() => router.push("/admin/cadastro-aluno")}>Cadastro de Aluno</button>
      <button onClick={() => router.push("/admin/cadastro-motorista")}>Cadastro de Motorista</button>
    </div>
  );
}
