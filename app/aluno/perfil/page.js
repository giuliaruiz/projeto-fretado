"use client";
import React from "react";

const perfilContainerStyle = {
  padding: "2rem",
  backgroundColor: "#333",
  borderRadius: "10px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
  maxWidth: "800px",
  margin: "2rem auto",
  textAlign: "center",
};

const perfilInfoStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
  textAlign: "left",
};

const perfilItemStyle = {
  backgroundColor: "#222",
  padding: "1rem",
  borderRadius: "5px",
  border: "2px solid #333",
  color: "#fff",
};

const perfilTituloStyle = {
  fontSize: "1.8rem",
  marginBottom: "1rem",
};

const perfilBotaoStyle = {
  backgroundColor: "#2ecc71",
  color: "#111",
  border: "none",
  padding: "1rem 2rem",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1rem",
  marginTop: "1.5rem",
  transition: "background-color 0.3s ease",
};

const perfilBotaoHoverStyle = {
  backgroundColor: "#27ae60",
};

const VerPerfilAluno = () => {
  const perfil = {
    nomeCompleto: "Aluno Exemplo",
    cpf: "123.456.789-00",
    email: "aluno@email.com",
    faculdade: "Universidade Exemplo",
    cep: "12345-678",
    rua: "Rua ABC",
    bairro: "Centro",
    numero: "123",
  };

  return (
    <div style={perfilContainerStyle}>
      <h1 style={perfilTituloStyle}>Perfil de {perfil.nomeCompleto}</h1>
      <div style={perfilInfoStyle}>
        <div style={perfilItemStyle}><strong>CPF:</strong> {perfil.cpf}</div>
        <div style={perfilItemStyle}><strong>Email:</strong> {perfil.email}</div>
        <div style={perfilItemStyle}><strong>Faculdade:</strong> {perfil.faculdade}</div>
        <div style={perfilItemStyle}><strong>CEP:</strong> {perfil.cep}</div>
        <div style={perfilItemStyle}><strong>Rua:</strong> {perfil.rua}</div>
        <div style={perfilItemStyle}><strong>Bairro:</strong> {perfil.bairro}</div>
        <div style={perfilItemStyle}><strong>Número:</strong> {perfil.numero}</div>
      </div>
      <button
        style={perfilBotaoStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = perfilBotaoHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = perfilBotaoStyle.backgroundColor)}
      >
        Editar Perfil
      </button>
    </div>
  );
};

export default VerPerfilAluno;
