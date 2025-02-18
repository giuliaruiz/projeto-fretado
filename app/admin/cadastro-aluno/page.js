"use client";
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

  const handleSubmit = () => {
    console.log(form); // Lógica de envio de dados
  };

  return (
    <div>
      <h1>Cadastro de Aluno</h1>
      <form>
        {/* Informações Pessoais */}
        <div>
          <input
            type="text"
            placeholder="Nome completo"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
          <input
            type="text"
            placeholder="Faculdade"
            value={form.faculdade}
            onChange={(e) => setForm({ ...form, faculdade: e.target.value })}
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
        </div>

        {/* Endereço */}
        <div>
          <input
            type="text"
            placeholder="CEP"
            value={form.cep}
            onChange={(e) => setForm({ ...form, cep: e.target.value })}
          />
          <input
            type="text"
            placeholder="Rua"
            value={form.rua}
            onChange={(e) => setForm({ ...form, rua: e.target.value })}
          />
          <input
            type="text"
            placeholder="Bairro"
            value={form.bairro}
            onChange={(e) => setForm({ ...form, bairro: e.target.value })}
          />
          <input
            type="text"
            placeholder="Número"
            value={form.numero}
            onChange={(e) => setForm({ ...form, numero: e.target.value })}
          />
        </div>

        <button onClick={handleSubmit}>Cadastrar</button>
      </form>
    </div>
  );
}

