"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadastroAluno() {
  const [form, setForm] = useState({
    nome: "",
    faculdade: "",
    cpf: "",
    email: "",
    cep: "",
    rua: "",
    bairro: "",
    numero: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const resp = await fetch("http://localhost:3002/admin/createStudent ", {
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
      <h1>Cadastro de Aluno</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
          {/* Informações Pessoais */}
          <input
            type="text"
            placeholder="Nome completo"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Faculdade"
            value={form.faculdade}
            onChange={(e) => setForm({ ...form, faculdade: e.target.value })}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="CPF"
            value={form.cpf}
            onChange={(e) => setForm({ ...form, cpf: e.target.value })}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
          />

          {/* Endereço */}
          <input
            type="text"
            placeholder="CEP"
            value={form.cep}
            onChange={(e) => setForm({ ...form, cep: e.target.value })}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Rua"
            value={form.rua}
            onChange={(e) => setForm({ ...form, rua: e.target.value })}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Bairro"
            value={form.bairro}
            onChange={(e) => setForm({ ...form, bairro: e.target.value })}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Número"
            value={form.numero}
            onChange={(e) => setForm({ ...form, numero: e.target.value })}
            style={inputStyle}
          />

        <button type="submit">Cadastrar</button> 
        <button onClick={() => router.push('/admin')}>Voltar</button>

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
  maxWidth: "800px", // Aumentei para evitar que os inputs fiquem muito apertados
  margin: "2rem auto",
  textAlign: "center",
};

const formStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  flexDirection: "column",
  gap: "1.5rem",
};

const inputContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  justifyContent: "space-between",
};

const inputStyle = {
  flex: "1 1 48%", // Faz com que cada input ocupe 48% do espaço disponível (duas colunas)
  minWidth: "280px", // Evita inputs muito pequenos
  padding: "0.8rem",
  backgroundColor: "#222",
  color: "#fff",
  border: "2px solid #333",
  borderRadius: "5px",
  fontSize: "1rem",
};

