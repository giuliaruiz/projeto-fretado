"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CadastroTrajeto() {
  const router = useRouter();

  const [form, setForm] = useState({
    itinerario: "",
    inicioCep: "",
    inicioRua: "",
    inicioBairro: "",
    inicioNumero: "",
    inicioComplemento: "",
    inicioCidade: "",
    inicioEstado: "",
    inicioPais: "",
    finalCep: "",
    finalRua: "",
    finalBairro: "",
    finalNumero: "",
    finalComplemento: "",
    finalCidade: "",
    finalEstado: "",
    finalPais: "",
  });

  const [itinerarios, setItinerarios] = useState([]);

  useEffect(() => {
    async function fetchItinerarios() {
      try {
        const response = await fetch("http://localhost:3002/admin/getItinerarios");
        if (!response.ok) throw new Error("Erro ao buscar itinerários");

        const data = await response.json();
        setItinerarios(data);
      } catch (error) {
        console.error("Erro ao carregar itinerários:", error);
      }
    }
    fetchItinerarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("http://localhost:3002/admin/createRoute", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });

      if (resp.status !== 201) {
        throw new Error("Erro ao cadastrar trajeto");
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
      <h1>Cadastro de Trajeto</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={titleStyle}>Selecionar Itinerário</div>
        <select
          value={form.itinerario}
          onChange={(e) => setForm({ ...form, itinerario: e.target.value })}
          style={selectStyle}
        >
          <option value="">Selecione um itinerário</option>
          <option value="Itinerário 1">Itinerário 1</option>
          <option value="Itinerário 2">Itinerário 2</option>
          {itinerarios.map((itinerario) => (
            <option key={itinerario.id} value={itinerario.id}>
              {itinerario.nome}
            </option>
          ))}
        </select>

        <div style={titleStyle}>Início do trajeto</div>
        {renderInputFields("inicio")}

        <div style={titleStyle}>Final do trajeto</div>
        {renderInputFields("final")}

        <div style={buttonContainerStyle}>
        <button type="submit">Cadastrar</button> 
        <button type="button" onClick={() => router.push('/admin')}>Voltar</button>
        </div>
      </form>
    </div>
  );

  function renderInputFields(prefix) {
    return (
      <div style={{ display: "contents" }}>
        <input type="text" placeholder="CEP" value={form[`${prefix}Cep`]} onChange={(e) => setForm({ ...form, [`${prefix}Cep`]: e.target.value })} style={inputStyle} />
        <input type="text" placeholder="Rua" value={form[`${prefix}Rua`]} onChange={(e) => setForm({ ...form, [`${prefix}Rua`]: e.target.value })} style={inputStyle} />
        <input type="text" placeholder="Bairro" value={form[`${prefix}Bairro`]} onChange={(e) => setForm({ ...form, [`${prefix}Bairro`]: e.target.value })} style={inputStyle} />
        <input type="text" placeholder="Número" value={form[`${prefix}Numero`]} onChange={(e) => setForm({ ...form, [`${prefix}Numero`]: e.target.value })} style={inputStyle} />
        <input type="text" placeholder="Complemento" value={form[`${prefix}Complemento`]} onChange={(e) => setForm({ ...form, [`${prefix}Complemento`]: e.target.value })} style={inputStyle} />
        <input type="text" placeholder="Cidade" value={form[`${prefix}Cidade`]} onChange={(e) => setForm({ ...form, [`${prefix}Cidade`]: e.target.value })} style={inputStyle} />
        <input type="text" placeholder="Estado" value={form[`${prefix}Estado`]} onChange={(e) => setForm({ ...form, [`${prefix}Estado`]: e.target.value })} style={inputStyle} />
        <input type="text" placeholder="País" value={form[`${prefix}Pais`]} onChange={(e) => setForm({ ...form, [`${prefix}Pais`]: e.target.value })} style={inputStyle} />
      </div>
    );
  }
}

// Estilos CSS
const containerStyle = {
  padding: "2rem",
  backgroundColor: "#333",
  borderRadius: "10px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
  maxWidth: "900px",
  margin: "2rem auto",
  textAlign: "center",
};

const formStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "1.5rem",
  textAlign: "center",
};

const titleStyle = {
  gridColumn: "span 3",
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "1rem",
  textAlign: "center",
  color: "#fff",
};

const inputStyle = {
  padding: "0.9rem",
  backgroundColor: "#222",
  color: "#fff",
  border: "2px solid #222",
  borderRadius: "5px",
  fontSize: "1rem",
  width: "100%",
  boxSizing: "border-box",
};

const selectStyle = {
  gridColumn: "span 3",
  padding: "0.9rem",
  backgroundColor: "#222",
  color: "#fff",
  border: "2px solid #222",
  borderRadius: "5px",
  fontSize: "1rem",
  width: "100%",
  boxSizing: "border-box",
};

const buttonContainerStyle = {
    gridColumn: "span 3",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "1.5rem",
  };
  

  
