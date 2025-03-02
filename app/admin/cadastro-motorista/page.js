"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadastroMotorista() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    habilitacao: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const resp = await fetch("http://localhost:3002/admin/createDriver", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
  
      if (resp.status != 201) {
        throw new Error(data.message || "Erro ao cadastrar usuário");
      }
  
      alert("Cadastro realizado com sucesso!");
      router.push("/admin");
  
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Falha ao cadastrar. Verifique os dados.");
    }
  };

  const router = useRouter();

  return (
    <div style={containerStyle}>
      <h1>Cadastro de Motorista</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Nome completo"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nº Habilitação"
          value={form.habilitacao}
          onChange={(e) => setForm({ ...form, habilitacao: e.target.value })}
        />
        <button onClick={() => router.push('/admin')}>Voltar</button>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

const containerStyle = {
  padding: "2rem",
  backgroundColor: "#333",
  borderRadius: "10px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
  maxWidth: "600px",
  margin: "2rem auto",
};

const formStyle = {
  display: "grid",
  gridTemplateColumns: "1fr",
  flexDirection: "column",
  gap: "1.5rem",
};
