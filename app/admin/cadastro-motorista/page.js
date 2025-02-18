"use client";
import { useState } from "react";

export default function CadastroMotorista() {
  const [form, setForm] = useState({ nome: "", faculdade: "", cpf: "", email: "", placa: "" });

  return (
    <div>
      <h1>Cadastro de Motorista</h1>
      <input type="text" placeholder="Nome completo" onChange={(e) => setForm({ ...form, nome: e.target.value })} />
      <input type="text" placeholder="CPF" onChange={(e) => setForm({ ...form, cpf: e.target.value })} />
      <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="text" placeholder="Placa do Veículo" onChange={(e) => setForm({ ...form, placa: e.target.value })} />
      <button onClick={() => console.log(form)}>Cadastrar</button>
    </div>
  );
}
