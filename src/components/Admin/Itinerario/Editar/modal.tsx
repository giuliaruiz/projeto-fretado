"use client"
import { updateItinerario } from "@/controllers/itinerario"
import { useGets } from "./hooks/useGets"
import { useState } from "react"
import { Itinerario, ItinerarioCreate } from "@/@types/type"

interface IModalProps {
    itinerario: Itinerario,
    setItinerarios: React.Dispatch<React.SetStateAction<Itinerario[]>>,
    itinerarios: Itinerario[],
    fecharModal: () => void
}

export default function Modal({ itinerario, fecharModal, setItinerarios, itinerarios }: IModalProps) {
    const [form, setForm] = useState<ItinerarioCreate>({
        nome: itinerario?.nome || "",
        inicio: itinerario?.inicio || "",
        cep_inicio: itinerario?.cep_inicio || "",
        cidade_inicio: itinerario?.cidade_inicio || "",
        bairro_inicio: itinerario?.bairro_inicio || "",
        rua_inicio: itinerario?.rua_inicio || "",
        numero_inicio: itinerario?.numero_inicio || "",
        final: itinerario?.final || "",
        cep_final: itinerario?.cep_final || "",
        cidade_final: itinerario?.cidade_final || "",
        bairro_final: itinerario?.bairro_final || "",
        rua_final: itinerario?.rua_final || "",
        numero_final: itinerario?.numero_final || "",
        motorista: itinerario?.motorista || 0,
        van: itinerario?.van || 0,
    })

    const { vans, motoristas } = useGets()

    const handleSave = async (id: number) => {

        await updateItinerario(id, form)
        setItinerarios(itinerarios.map(itinerarioMap =>
            itinerarioMap.id === itinerario.id ? { ...itinerario } : itinerarioMap
        ))

        fecharModal()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
            <div className="bg-[#333] p-5 rounded-lg w-5/6 md:w-[600px] max-h-[90vh] overflow-y-auto">

                <h2 className="text-2xl mb-3">
                    Editar Itinerario
                </h2>

                <p className="mb-2">Nome do Itinerario: <strong>{itinerario.nome}</strong></p>
                <form
                    className="grid grid-cols-1 md:grid-cols-3 max-h-[70vh] gap-4 w-full"
                >
                    <input
                        type="text"
                        placeholder="Nome do Itinerario"
                        value={form.nome || itinerario.nome}
                        required
                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                        className="bg-[#222] md:col-span-3 text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Inicio do Itinerario"
                        value={form.inicio || itinerario.inicio}
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
                        value={form.final || itinerario.final}
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

                    <div className="md:col-span-3 grid grid-cols-2 gap-4">
                        <select
                            value={form.motorista || itinerario.motorista || 0}
                            className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                            onChange={(e) => setForm({ ...form, motorista: Number(e.target.value) })}
                        >
                            <option value={0}>Selecione um motorista</option>
                            {motoristas
                                .filter((motorista) => motorista.itinerario === null || motorista.id === itinerario.motorista)
                                .map((motorista) => (
                                    <option key={motorista.id} value={motorista.id}>
                                        {motorista.nome}
                                    </option>
                                ))
                            }
                        </select>

                        <select
                            value={form.van || itinerario.van || 0}
                            className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                            onChange={(e) => setForm({ ...form, van: Number(e.target.value) })}
                        >
                            <option value={0}>Selecione uma van</option>
                            {vans
                                .filter((van) => van.itinerario === null || van.id === itinerario.van)
                                .map((van) => (
                                    <option key={van.id} value={van.id}>
                                        {van.placa}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="md:col-span-3 grid grid-cols-2 gap-4">
                        <button
                            type="submit"
                            onClick={() => handleSave(itinerario.id)}
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