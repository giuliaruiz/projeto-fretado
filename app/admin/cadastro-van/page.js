"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadastroVan() {
  const [form, setForm] = useState({
    modelo: "",
    placa: "",
    ano: "",
    cor: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const resp = await fetch("http://localhost:3002/admin/createVan", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
  
      if (resp.status != 201) {
        throw new Error(data.message || "Erro ao cadastrar van");
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
    <div className="aluno" style={containerStyle}>
      <h1>Cadastro de Van</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Modelo"
          value={form.modelo}
          onChange={(e) => setForm({ ...form, modelo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Placa"
          value={form.placa}
          onChange={(e) => setForm({ ...form, placa: e.target.value })}
        />
        <input
          type="number"
          placeholder="Ano"
          value={form.ano}
          onChange={(e) => setForm({ ...form, ano: e.target.value })}
        />
        <input
          type="text"
          placeholder="Cor"
          value={form.cor}
          onChange={(e) => setForm({ ...form, cor: e.target.value })}
        />
        <button onClick={() => router.push('/admin')}>Voltar</button>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

// Estilos inline opcionais para centralizar o formulário
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
    gridTemplateColumns: "1fr 1fr",
    flexDirection: "column",
    gap: "1.5rem",
  };