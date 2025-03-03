"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadastroVan() {
  const [form, setForm] = useState({
    nome: "",
    placa: "",
    capacidade: "",
    telefone: "",
    itinerario: "", // Novo campo do select
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch("http://localhost:3002/admin/createVan", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });

      if (resp.status !== 201) {
        throw new Error("Erro ao cadastrar a van");
      }

      alert("Cadastro realizado com sucesso!");
      router.push("/admin");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Falha ao cadastrar. Verifique os dados.");
    }
  };

  return (
    <div style={containerStyle}>
      <h1>Cadastro de Van</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Placa"
          value={form.placa}
          onChange={(e) => setForm({ ...form, placa: e.target.value })}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Capacidade"
          value={form.capacidade}
          onChange={(e) => setForm({ ...form, capacidade: e.target.value })}
          style={inputStyle}
        />

        <select
          value={form.itinerario}
          onChange={(e) => setForm({ ...form, itinerario: e.target.value })}
          style={selectStyle} // Mantém o tamanho igual aos inputs
        >
          <option value="">Selecione um itinerário</option>
          <option value="Itinerário 1">Itinerário 1</option>
          <option value="Itinerário 2">Itinerário 2</option>
          
        </select>

        <button type="submit">Cadastrar</button>
        <button type="button" onClick={() => router.push("/admin")}>Voltar</button>
      </form>
    </div>
  );
}

// Estilos CSS
const containerStyle = {
  padding: "2rem",
  backgroundColor: "#333",
  borderRadius: "10px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
  maxWidth: "800px",
  margin: "2rem auto",
  textAlign: "center",
};

const formStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1.5rem",
};

const inputStyle = {
  width: "100%",
  minWidth: "280px",
  padding: "0.8rem",
  backgroundColor: "#222",
  color: "#fff",
  border: "2px solid #333",
  borderRadius: "5px",
  fontSize: "1rem",
};

const selectStyle = {
  ...inputStyle, // Copia o estilo dos inputs
  height: "49px", // Garante que a altura seja igual à dos inputs
  padding: "0.6rem", // Mantém a consistência do preenchimento interno
  width: "100%", // Faz com que ocupe o mesmo espaço que os inputs
  boxSizing: "border-box", // Garante que padding e border não alterem o tamanho
};

