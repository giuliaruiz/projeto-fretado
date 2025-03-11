"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadastroTrajeto() {
    const router = useRouter();

    const [form, setForm] = useState({
        nome: "",
        inicio: "",
        final: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch("http://localhost:3002/admin/createItinerario", {
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

                <div style={titleStyle}>Nome do trajeto</div>
                <input
                    type="text"
                    placeholder="Nome do Trajeto"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    style={inputStyle}
                />

                <div style={titleStyle}>Início do trajeto</div>
                <input
                    type="text"
                    placeholder="Inicio do Trajeto"
                    value={form.inicio}
                    onChange={(e) => setForm({ ...form, inicio: e.target.value })}
                    style={inputStyle}
                />


                <div style={titleStyle}>Final do trajeto</div>
                <input
                    type="text"
                    placeholder="Final do Trajeto"
                    value={form.final}
                    onChange={(e) => setForm({ ...form, final: e.target.value })}
                    style={inputStyle}
                />


                <div style={buttonContainerStyle}>
                    <button type="submit" style={{width: "100%"}}>Cadastrar</button>
                    <button type="button" style={{width: "100%"}} onClick={() => router.push('/admin')}>Voltar</button>
                </div>
            </form>
        </div>
    );
}

// Estilos CSS
const containerStyle = {
    padding: "2rem",
    backgroundColor: "#333",
    borderRadius: "10px",
    width: "500px",
    margin: "30px 0px 0px 0px",
    textAlign: "center",
};

const formStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    textAlign: "center",
    width: "100%",
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
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "0.1rem",
    marginTop: "1rem",
};



