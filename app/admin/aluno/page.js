"use client";
import { useEffect, useState } from "react";

export default function ListaAlunos() {
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAlunos();
    }, []);

    const fetchAlunos = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:3002/student");
            if (!response.ok) throw new Error("Erro ao buscar alunos");

            const data = await response.json();
            setAlunos(data);
        } catch (err) {
            setError("Erro ao carregar alunos.");
        } finally {
            setLoading(false);
        }
    };

    const excluirAluno = async (id) => {
        if (!confirm("Tem certeza que deseja excluir este aluno?")) return;

        try {
            const response = await fetch(`http://localhost:3002/student/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Erro ao excluir aluno");

            // Atualiza a lista removendo o aluno deletado
            setAlunos(alunos.filter(aluno => aluno.id !== id));
        } catch (err) {
            setError("Erro ao excluir aluno.");
        }
    };

    return (
        <div style={containerStyle}>
            <h1 style={tituloStyle}>Lista de Alunos</h1>

            {loading && <p>Carregando...</p>}
            {error && <p style={erroStyle}>{error}</p>}

            <ul style={listaStyle}>
                {alunos.map((aluno) => (
                    <li key={aluno.id} style={itemStyle}>
                        <span>{aluno.nome}</span>
                        <button onClick={() => excluirAluno(aluno.id)} style={botaoExcluirStyle}>X</button>
                    </li>
                ))}
            </ul>

            {alunos.length === 0 && !loading && <p>Nenhum aluno encontrado.</p>}
        </div>
    );
}

const containerStyle = {
    width: "500px",
    margin: "20px 0px 20px 0px",
    padding: "20px",
    backgroundColor: "#333",
    borderRadius: "10px",
    textAlign: "center",
    color: "#fff",
};

const tituloStyle = {
    fontSize: "1.8rem",
    marginBottom: "20px",
};

const listaStyle = {
    listStyle: "none",
    padding: 0,
    width: "100%"
};

const itemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#222",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
    width: "100%",
    fontSize: "1.2rem",
};

const botaoExcluirStyle = {
    backgroundColor: "#e74c3c",
    border: "none",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "10px",
    transition: "background 0.3s",
};

const erroStyle = {
    color: "red",
    fontSize: "1rem",
    marginBottom: "10px",
};