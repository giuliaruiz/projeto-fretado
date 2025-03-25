"use client"
import { updateItinerario } from "@/controllers/itinerario"
import { useGets } from "./hooks/useGets"
import { useState } from "react"

export default function Modal({ itineraio, fecharModal, setItinerarios, itineraios }) {
    const [form, setForm] = useState({
        nome: itineraio?.nome || "",
        inicio: itineraio?.inicio || "",
        cep_inicio: itineraio?.cep_inicio || "",
        cidade_inicio: itineraio?.cidade_inicio || "",
        bairro_inicio: itineraio?.bairro_inicio || "",
        rua_inicio: itineraio?.rua_inicio || "",
        numero_inicio: itineraio?.numero_inicio || "",
        final: itineraio?.final || "",
        cep_final: itineraio?.cep_final || "",
        cidade_final: itineraio?.cidade_final || "",
        bairro_final: itineraio?.bairro_final || "",
        rua_final: itineraio?.rua_final || "",
        numero_final: itineraio?.numero_final || "",
        motorista: itineraio?.motorista || 0,
        van: itineraio?.van || 0,
    })

    const { vans, motoristas } = useGets()

    const handleSave = async (id) => {

        await updateItinerario(id, form)
        setItinerarios(itineraios.map(itinerarioMap =>
            itinerarioMap.id === itineraio.id ? { ...itineraio } : itinerarioMap
        ))

        fecharModal()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#333] p-5 rounded-lg w-[600px]">

                <h2 className="text-2xl mb-3">
                    Editar Itinerario
                </h2>

                <p className="mb-2">Nome do Itinerario: <strong>{itineraio.nome}</strong></p>
                <form
                    className="grid grid-cols-3  gap-4 w-full"
                >
                    <input
                        type="text"
                        placeholder="Nome do Itinerario"
                        value={form.nome || itineraio.nome}
                        required
                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                        className="bg-[#222] col-span-3 text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Inicio do Itinerario"
                        value={form.inicio || itineraio.inicio}
                        required
                        onChange={(e) => setForm({ ...form, inicio: e.target.value })}
                        className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                    />

                    <input
                        type="text"
                        placeholder="CEP Inicio"
                        value={form.cep_inicio}
                        required
                        onChange={(e) => setForm({ ...form, cep_inicio: e.target.value })}
                        className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Cidade Inicio"
                        value={form.cidade_inicio}
                        required
                        onChange={(e) => setForm({ ...form, cidade_inicio: e.target.value })}
                        className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Bairro Inicio"
                        value={form.bairro_inicio}
                        required
                        onChange={(e) => setForm({ ...form, bairro_inicio: e.target.value })}
                        className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Rua Inicio"
                        value={form.rua_inicio}
                        required
                        onChange={(e) => setForm({ ...form, rua_inicio: e.target.value })}
                        className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Numero Inicio"
                        value={form.numero_inicio}
                        required
                        onChange={(e) => setForm({ ...form, numero_inicio: e.target.value })}
                        className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Final do Itinerario"
                        value={form.final || itineraio.final}
                        required
                        onChange={(e) => setForm({ ...form, final: e.target.value })}
                        className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                    />

                    <input
                        type="text"
                        placeholder="CEP Final"
                        value={form.cep_final}
                        required
                        onChange={(e) => setForm({ ...form, cep_final: e.target.value })}
                        className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Cidade Final"
                        value={form.cidade_final}
                        required
                        onChange={(e) => setForm({ ...form, cidade_final: e.target.value })}
                        className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Bairro Final"
                        value={form.bairro_final}
                        required
                        onChange={(e) => setForm({ ...form, bairro_final: e.target.value })}
                        className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Rua Final"
                        value={form.rua_final}
                        required
                        onChange={(e) => setForm({ ...form, rua_final: e.target.value })}
                        className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Numero Final"
                        value={form.numero_final}
                        required
                        onChange={(e) => setForm({ ...form, numero_final: e.target.value })}
                        className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                    />

                    <div className="col-span-3 grid grid-cols-2 gap-4">
                        <select
                            value={form.motorista || itineraio.motorista || 0}
                            className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                            onChange={(e) => setForm({ ...form, motorista: Number(e.target.value) })}
                        >
                            <option value={0}>Selecione um motorista</option>
                            {motoristas
                                .filter((motorista) => motorista.itinerario === null || motorista.id === itineraio.motorista)
                                .map((motorista) => (
                                    <option key={motorista.id} value={motorista.id}>
                                        {motorista.nome}
                                    </option>
                                ))
                            }
                        </select>

                        <select
                            value={form.van || itineraio.van || 0}
                            className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                            onChange={(e) => setForm({ ...form, van: Number(e.target.value) })}
                        >
                            <option value={0}>Selecione uma van</option>
                            {vans
                                .filter((van) => van.itinerario === null || van.id === itineraio.van)
                                .map((van) => (
                                    <option key={van.id} value={van.id}>
                                        {van.placa}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="col-span-3 grid grid-cols-2 gap-4">
                        <button
                            type="submit"
                            onClick={() => handleSave(itineraio.id)}
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

                </form>
            </div>
        </div>
    )
}