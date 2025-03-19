"use client";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();

  return (
    <div>
      <h1>Painel do Administrador</h1>
      <p>Bem-vindo ao painel de administração. Utilize a sidebar para navegar.</p>
    </div>
  );
}
