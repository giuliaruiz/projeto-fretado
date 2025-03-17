"use client"
import { Pencil, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react"

export default function ListaAlunos() {
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [alunoSelecionado, setAlunoSelecionado] = useState(null);
    const [itinerarios, setItinerarios] = useState([])
    const [novoItinerario, setNovoItinerario] = useState(0);

    const [itinerarioGet, setItinerarioGet] = useState({});

    useEffect(() => { fetchAlunos() }, [])


    useEffect(() => {
        fetch("http://localhost:3002/itinerario")
            .then((response) => response.json())
            .then((data) => setItinerarios(data))
            .catch((error) => console.error("Erro ao buscar itinerários:", error));
    }, [modalOpen]);

    const fetchAlunos = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:3002/student");
            if (!response.ok) throw new Error("Erro ao buscar alunos");

            const data = await response.json();
            setAlunos(data);
            fetchItinerarios(data)
        } catch (err) {
            setError("Erro ao carregar alunos.");
        } finally {
            setLoading(false);
        }
    };

    const fetchItinerarios = async (alunos) => {
        const itinerarioMap = {};

        await Promise.all(
            alunos.map(async (aluno) => {
                if (aluno.itinerario) {
                    try {
                        const response = await fetch(`http://localhost:3002/itinerario/${aluno.itinerario}`);
                        if (!response.ok) throw new Error("Erro ao buscar itinerario");
                        const data = await response.json();
                        itinerarioMap[aluno.itinerario] = data.nome;
                    } catch (err) {
                        itinerarioMap[aluno.itinerario] = "Erro ao carregar";
                    }
                }
            })
        );

        setItinerarioGet(itinerarioMap);
    };

    const excluirAluno = async (id) => {
        if (!confirm("Tem certeza que deseja excluir este aluno?")) return;

        try {
            const response = await fetch(`http://localhost:3002/student/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Erro ao excluir aluno");

            setAlunos(alunos.filter(aluno => aluno.id !== id));
        } catch (err) {
            setError("Erro ao excluir aluno.");
        }
    };

    const abrirModal = (aluno) => {
        setAlunoSelecionado(aluno);
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
        setAlunoSelecionado(null);
    };

    const handleSave = async (id) => {
        try {
            const response = await fetch(`http://localhost:3002/student/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ itinerario: Number(novoItinerario) }),
            });

            if (!response.ok) throw new Error("Erro ao salvar perfil");

            setAlunos(alunos.map(aluno =>
                aluno.id === alunoSelecionado.id
                    ? { ...aluno, itinerario: Number(novoItinerario) }
                    : aluno
            ));

            fetchAlunos()
            fecharModal();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-[700px] p-5 bg-[#333] rounded-lg text-center text-white">
            <h1 className="text-3xl mb-5">
                Listar Alunos
            </h1>

            {loading && <p>Carregando...</p>}
            {error && <p className="text-red-600 text-base mb-3">{error}</p>}

            <ul className="w-full">
                {alunos.map((aluno) => (
                    <li
                        key={aluno.id}
                        className="flex justify-between items-center bg-[#222] px-4 py-2 rounded-lg text-lg mb-3"
                    >
                        <div className="flex flex-col justify-start items-start">
                            <span className="text-lg">{aluno.nome}</span>
                            <span className="text-sm text-slate-300">{aluno.rua}, {aluno.bairro} - {aluno.numero}</span>
                            <span className="text-sm text-slate-300">Itinerario: {itinerarioGet[aluno.itinerario] || "Nenhum Itinerario"}</span>
                        </div>
                        <div className="flex flex-row gap-5 justify-center">
                            <Pencil
                                onClick={() => abrirModal(aluno)}
                                cursor={"pointer"}
                                color="#1e0bff"
                            />
                            <Trash2
                                onClick={() => excluirAluno(aluno.id)}
                                color="#ff3421"
                                cursor={"pointer"}
                            />
                        </div>
                    </li>
                ))}
            </ul>

            {alunos.length === 0 && !loading && <p>Nenhum aluno encontrado.</p>}

            {modalOpen && alunoSelecionado && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-[#333] p-5 rounded-lg w-[400px]">

                        <h2 className="text-2xl mb-3">
                            Editar Itinerario
                        </h2>

                        <p className="mb-2">Aluno: <strong>{alunoSelecionado.nome}</strong></p>

                        <select
                            value={novoItinerario}
                            className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                            onChange={(e) => setNovoItinerario(e.target.value)}
                        >
                            <option value="">Selecione um itinerário</option>
                            {itinerarios.map((itinerario) => (
                                <option key={itinerario.id} value={itinerario.id}>
                                    {itinerario.nome}
                                </option>
                            ))}
                        </select>

                        <div className="grid grid-cols-2 justify-between w-full gap-4">
                            <button
                                type="button"
                                onClick={() => handleSave(alunoSelecionado.id)}
                            >
                                Editar
                            </button>

                            <button
                                type="button"
                                onClick={fecharModal}
                            >
                                Voltar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}