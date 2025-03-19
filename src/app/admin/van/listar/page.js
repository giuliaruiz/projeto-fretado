"use client"
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react"

export default function ListaVan() {
    const [vans, setVans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [vanSelecionado, setVanSelecionado] = useState(null);
    const [itinerarios, setItinerarios] = useState({});
    const [form, setForm] = useState({
        placa: vanSelecionado?.placa || "",
        modelo: vanSelecionado?.modelo ||"",
        cor: vanSelecionado?.cor ||"",
        capacidade: vanSelecionado?.capacidade ||"",
        ano: vanSelecionado?.ano ||"",
    });

    useEffect(() => { fetchVan() }, [])

    useEffect(() => {
        setForm({
            placa: vanSelecionado?.placa || "",
            modelo: vanSelecionado?.modelo ||"",
            cor: vanSelecionado?.cor ||"",
            capacidade: vanSelecionado?.capacidade ||"",
            ano: vanSelecionado?.ano ||"",
        })
    }, [modalOpen])

    const fetchVan = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch("http://localhost:3002/van");
            if (!response.ok) throw new Error("Erro ao buscar van");

            const data = await response.json();
            setVans(data);

            fetchItinerarios(data);
        } catch (err) {
            setError("Erro ao carregar vans.");
        } finally {
            setLoading(false);
        }
    }

    const fetchItinerarios = async (vans) => {
        const itinerarioMap = {};

        await Promise.all(
            vans.map(async (van) => {
                if (van.itinerario) {
                    try {
                        const response = await fetch(`http://localhost:3002/itinerario/${van.itinerario}`);
                        if (!response.ok) throw new Error("Erro ao buscar itinerario");
                        const data = await response.json();
                        itinerarioMap[van.itinerario] = data.nome;
                    } catch (err) {
                        itinerarioMap[van.itinerario] = "Erro ao carregar";
                    }
                }
            })
        );

        setItinerarios(itinerarioMap);
    };

    const excluirVan = async (id, idItinerario) => {
        if (!confirm("Tem certeza que deseja excluir esta van?")) return;
        if (idItinerario) {
            try {
                const response = await fetch(`http://localhost:3002/itinerario/${idItinerario}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ van: null }),
                });

                if (!response.ok) throw new Error("Erro ao salvar");

            } catch (err) {
                console.error(err);
            }
        }

        try {
            const response = await fetch(`http://localhost:3002/van/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Erro ao excluir van");

            setVans(vans.filter(van => van.id !== id));
        } catch (err) {
            setError("Erro ao excluir van.");
        }
    }

    const abrirModal = (van) => {
        setVanSelecionado(van);
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
        setVanSelecionado(null);
    };

    const handleSave = async (id) => {
        try {
            const response = await fetch(`http://localhost:3002/van/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!response.ok) throw new Error("Erro ao salvar perfil");

            setVans(vans.map(van =>
                van.id === vanSelecionado.id
                    ? { ...van }
                    : van
            ));

            fecharModal();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-[700px] p-5 bg-[#333] rounded-lg text-center text-white">
            <h1 className="text-3xl mb-5">
                Listar Van
            </h1>

            {loading && <p>Carregando...</p>}
            {error && <p className="text-red-600 text-base mb-3">{error}</p>}

            <ul className="w-full">
                {vans.map((van) => (
                    <li
                        key={van.id}
                        className="flex justify-between items-center bg-[#222] px-4 py-2 rounded-lg text-lg mb-3"
                    >
                        <div className="flex flex-col justify-start items-start">
                            <span className="text-lg">{van.modelo} ({van.placa})</span>
                            <span className="text-sm text-slate-300">Capacidade: {van.capacidade}</span>
                            <span className="text-sm text-slate-300">Itinerario:  {itinerarios[van.itinerario] || "Nenhum trajeto"}</span>

                        </div>
                        <div className="flex flex-row gap-5 justify-center">
                            <Pencil
                                onClick={() => abrirModal(van)}
                                cursor={"pointer"}
                                color="#1e0bff"
                            />
                            <Trash2
                                onClick={() => excluirVan(van.id, van.itinerario)}
                                color="#ff3421"
                                cursor={"pointer"}
                            />
                        </div>
                    </li>
                ))}
            </ul>

            {vans.length === 0 && !loading && <p>Nenhuma van encontrada.</p>}

            {modalOpen && vanSelecionado && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-[#333] p-5 rounded-lg w-[500px]">

                        <h2 className="text-2xl mb-3">
                            Editar Van
                        </h2>

                        <p className="mb-2">Placa da Van: <strong>{vanSelecionado.placa}</strong></p>
                        <form
                            className="grid grid-cols-2  gap-5 w-full"
                        >
                            <input
                                type="text"
                                placeholder="Placa"
                                value={form.placa || vanSelecionado.placa}
                                required
                                onChange={(e) => setForm({ ...form, placa: e.target.value })}
                                className="bg-[#222] col-span-2 text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                            />

                            <input
                                type="text"
                                placeholder="Modelo"
                                value={form.modelo || vanSelecionado.modelo}
                                required
                                onChange={(e) => setForm({ ...form, modelo: e.target.value })}
                                className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                            />

                            <input
                                type="text"
                                placeholder="Cor"
                                value={form.cor || vanSelecionado.cor}
                                required
                                onChange={(e) => setForm({ ...form, cor: e.target.value })}
                                className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                            />

                            <input
                                type="text"
                                placeholder="Capacidade"
                                required
                                value={form.capacidade || vanSelecionado.capacidade}
                                onChange={(e) => setForm({ ...form, capacidade: e.target.value })}
                                className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                            />

                            <input
                                type="text"
                                placeholder="Ano"
                                required
                                value={form.ano || vanSelecionado.ano}
                                onChange={(e) => setForm({ ...form, ano: e.target.value })}
                                className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                            />


                            <button
                                type="submit"
                                onClick={() => handleSave(vanSelecionado.id)}
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