"use client"
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react"

export default function EditarItinerario() {
    const [itinerarios, setItinerarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [itinerarioSelecionado, setItinerarioSelecionado] = useState(null);

    const [vans, setVans] = useState({});
    const [motoristas, setMotoristas] = useState({});
    const [allMotorista, setAllMotorista] = useState([]);
    const [allVan, setAllVan] = useState([]);

    const [form, setForm] = useState({
        nome: itinerarioSelecionado?.nome || "",
        inicio: itinerarioSelecionado?.inicio || "",
        final: itinerarioSelecionado?.final || "",
        motorista: itinerarioSelecionado?.motorista || 0,
        van: itinerarioSelecionado?.van || 0,
    });


    useEffect(() => {
        fetchItinerarios()
    }, [])

    useEffect(() => {
        setForm({
            nome: itinerarioSelecionado?.nome || "",
            inicio: itinerarioSelecionado?.inicio || "",
            final: itinerarioSelecionado?.final || "",
            motorista: itinerarioSelecionado?.motorista || 0,
            van: itinerarioSelecionado?.van || 0,
        });
        fetchMotoristaAll()
        fetchVanAll()
    }, [modalOpen])

    const fetchItinerarios = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:3002/itinerario");
            if (!response.ok) throw new Error("Erro ao buscar itineraios");

            const data = await response.json();
            setItinerarios(data);
            fetchVan(data)
            fetchMotorista(data)

        } catch (err) {
            setError("Erro ao carregar itinerario.");
        } finally {
            setLoading(false);
        }
    };

    const fetchVan = async (itineraios) => {
        const vanMap = {};

        await Promise.all(
            itineraios.map(async (itinerario) => {
                if (itinerario.van) {
                    try {
                        const response = await fetch(`http://localhost:3002/van/${itinerario.van}`);
                        if (!response.ok) throw new Error("Erro ao buscar van");
                        const data = await response.json();
                        vanMap[itinerario.van] = data.placa;
                    } catch (err) {
                        vanMap[itinerario.van] = "Erro ao carregar";
                    }
                }
            })
        );

        setVans(vanMap);
    }

    const fetchMotorista = async (itineraios) => {
        const motoristaMap = {};

        await Promise.all(
            itineraios.map(async (itinerario) => {
                if (itinerario.motorista) {
                    try {
                        const response = await fetch(`http://localhost:3002/driver/${itinerario.motorista}`);
                        if (!response.ok) throw new Error("Erro ao buscar motorista");
                        const data = await response.json();
                        motoristaMap[itinerario.motorista] = data.nome;
                    } catch (err) {
                        motoristaMap[itinerario.motorista] = "Erro ao carregar";
                    }
                }
            })
        );

        setMotoristas(motoristaMap);
    }

    const fetchMotoristaAll = async () => {
        try {
            const response = await fetch("http://localhost:3002/driver");
            if (!response.ok) throw new Error("Erro ao buscar motoristas");

            const data = await response.json();
            setAllMotorista(data);

        } catch (err) {
            setError("Erro ao carregar motoristas.");
        }
    };

    const fetchVanAll = async () => {
        try {
            const response = await fetch("http://localhost:3002/van");
            if (!response.ok) throw new Error("Erro ao buscar van");

            const data = await response.json();
            setAllVan(data);

        } catch (err) {
            setError("Erro ao carregar vans.");
        }
    };

    const excluirItinerario = async (itinerario) => {
        if (!confirm("Tem certeza que deseja excluir este itinerario?")) return;

        try {
            if (itinerario.van) {
                const response = await fetch(`http://localhost:3002/van/${itinerario.van}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ itinerario: null }),
                });
                if (!response.ok) throw new Error("Erro ao mudar Van")
            }
        } catch (err) { console.error(err) }

        try {
            if (itinerario.motorista) {
                const response = await fetch(`http://localhost:3002/driver/${itinerario.motorista}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ itinerario: null }),
                });
                if (!response.ok) throw new Error("Erro ao mudar Motorista")
            }
        } catch (err) { console.error(err) }

        try {
            const response = await fetch(`http://localhost:3002/itinerario/${itinerario.id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Erro ao excluir itinerario");

            setItinerarios(itinerarios.filter(it => it.id !== itinerario.id));
        } catch (err) {
            setError("Erro ao excluir itinerario.");
        }
    };

    const abrirModal = (itinerario) => {
        setItinerarioSelecionado(itinerario);
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
        setItinerarioSelecionado(null);
    };

    const handleSave = async (id) => {
        
        try {
            const response = await fetch(`http://localhost:3002/driver/${form.motorista}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({itinerario: id}),
            });

            if (!response.ok) throw new Error("Erro ao salvar");

        } catch (err) {
            console.error(err);
        }

        try {
            const response = await fetch(`http://localhost:3002/van/${form.van}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({itinerario: id}),
            });

            if (!response.ok) throw new Error("Erro ao salvar");

        } catch (err) {
            console.error(err);
        }

        try {
            const response = await fetch(`http://localhost:3002/itinerario/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!response.ok) throw new Error("Erro ao salvar perfil");

            setItinerarios(itinerarios.map(it =>
                it.id === itinerarioSelecionado.id
                    ? { ...it }
                    : it
            ));

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-[700px] p-5 bg-[#333] rounded-lg text-center text-white">
            <h1 className="text-3xl mb-5">
                Editar Itinerario
            </h1>

            {loading && <p>Carregando...</p>}
            {error && <p className="text-red-600 text-base mb-3">{error}</p>}

            <ul className="w-full">
                {itinerarios.map((itinerario) => (
                    <li
                        key={itinerario.id}
                        className="flex justify-between items-center bg-[#222] px-4 py-2 rounded-lg text-lg mb-3"
                    >
                        <div className="flex flex-col w-full justify-start items-start">
                            <span className="text-lg">{itinerario.nome}</span>
                            <div className="grid grid-cols-2 w-full text-sm text-slate-300">
                                <span className="flex justify-start">Inicio: {itinerario.inicio}</span>
                                <span className="flex justify-start">Motorista: {motoristas[itinerario.motorista] || "Nenhum motorista"}</span>
                                <span className="flex justify-start">Fim: {itinerario.final}</span>
                                <span className="flex justify-start">Van: {vans[itinerario.van] || "Nenhuma van"}</span>
                            </div>
                        </div>
                        <div className="flex flex-row gap-5 justify-center">
                            <Pencil
                                onClick={() => abrirModal(itinerario)}
                                cursor={"pointer"}
                                color="#1e0bff"
                            />
                            <Trash2
                                onClick={() => excluirItinerario(itinerario)}
                                color="#ff3421"
                                cursor={"pointer"}
                            />
                        </div>
                    </li>
                ))}
            </ul>

            {itinerarios.length === 0 && !loading && <p>Nenhum itinerario encontrado.</p>}

            {modalOpen && itinerarioSelecionado && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-[#333] p-5 rounded-lg w-[500px]">

                        <h2 className="text-2xl mb-3">
                            Editar Itinerario
                        </h2>

                        <p className="mb-2">Nome do Itinerario: <strong>{itinerarioSelecionado.nome}</strong></p>
                        <form
                            className="grid grid-cols-2  gap-5 w-full"
                        >
                            <input
                                type="text"
                                placeholder="Nome do Itinerario"
                                value={form.nome || itinerarioSelecionado.nome}
                                required
                                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                                className="bg-[#222] col-span-2 text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                            />

                            <input
                                type="text"
                                placeholder="Inicio do Itinerario"
                                value={form.inicio || itinerarioSelecionado.inicio}
                                required
                                onChange={(e) => setForm({ ...form, inicio: e.target.value })}
                                className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                            />

                            <input
                                type="text"
                                placeholder="Final do Itinerario"
                                value={form.final || itinerarioSelecionado.final}
                                required
                                onChange={(e) => setForm({ ...form, final: e.target.value })}
                                className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                            />

                            <select
                                value={form.motorista || itinerarioSelecionado.motorista || 0}
                                className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                                onChange={(e) => setForm({ ...form, motorista: Number(e.target.value) })}
                            >
                                <option value={0}>Selecione um motorista</option>
                                {allMotorista
                                    .filter((motorista) => motorista.itinerario === null || motorista.id === itinerarioSelecionado.motorista)
                                    .map((motorista) => (
                                        <option key={motorista.id} value={motorista.id}>
                                            {motorista.nome}
                                        </option>
                                    ))
                                }
                            </select>

                            <select
                                value={form.van || itinerarioSelecionado.van || 0}
                                className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                                onChange={(e) => setForm({ ...form, van: Number(e.target.value) })}
                            >
                                <option value={0}>Selecione uma van</option>
                                {allVan
                                    .filter((van) => van.itinerario === null || van.id === itinerarioSelecionado.van)
                                    .map((van) => (
                                        <option key={van.id} value={van.id}>
                                            {van.placa}
                                        </option>
                                    ))
                                }
                            </select>

                            <button
                                type="submit"
                                onClick={() => handleSave(itinerarioSelecionado.id)}
                            >
                                Editar
                            </button>

                            <button
                                type="button"
                                onClick={fecharModal}
                            >
                                Voltar
                            </button>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}