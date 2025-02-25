"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadastroMotorista() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    placa: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
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
          type="text"
          placeholder="CPF"
          value={form.cpf}
          onChange={(e) => setForm({ ...form, cpf: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Placa do Veículo"
          value={form.placa}
          onChange={(e) => setForm({ ...form, placa: e.target.value })}
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
  gridTemplateColumns: "1fr 1fr",
  flexDirection: "column",
  gap: "1.5rem",
};
