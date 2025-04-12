"use client"
import { Van, VanCreate } from "@/@types/type"
import { updateVan } from "@/controllers/van"
import { useState } from "react"

interface IModalProps {
    van: Van,
    setVans: React.Dispatch<React.SetStateAction<Van[]>>,
    vans: Van[],
    fecharModal: () => void,
}

export default function Modal({ van, fecharModal, setVans, vans }: IModalProps) {
    const [form, setForm] = useState<VanCreate>({
        placa: van?.placa || "",
        modelo: van?.modelo || "",
        cor: van?.cor || "",
        capacidade: van?.capacidade || "",
        ano: van?.ano || "",
    })

    const handleSave = async (id: number) => {

        await updateVan(id, form)
        setVans(vans.map(van => van.id === id ? { ...van } : van))

        fecharModal()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#333] p-5 rounded-lg w-[500px]">

                <h2 className="text-2xl mb-3">
                    Editar Van
                </h2>

                <p className="mb-2">Placa da Van: <strong>{van.placa}</strong></p>
                <form
                    className="grid grid-cols-2 gap-5 w-full"
                >
                    <input
                        type="text"
                        placeholder="Placa"
                        value={form.placa || van.placa}
                        required
                        onChange={(e) => setForm({ ...form, placa: e.target.value })}
                        className="bg-[#222] col-span-2 text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Modelo"
                        value={form.modelo || van.modelo}
                        required
                        onChange={(e) => setForm({ ...form, modelo: e.target.value })}
                        className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Cor"
                        value={form.cor || van.cor}
                        required
                        onChange={(e) => setForm({ ...form, cor: e.target.value })}
                        className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Capacidade"
                        required
                        value={form.capacidade || van.capacidade}
                        onChange={(e) => setForm({ ...form, capacidade: e.target.value })}
                        className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Ano"
                        required
                        value={form.ano || van.ano}
                        onChange={(e) => setForm({ ...form, ano: e.target.value })}
                        className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                    />


                    <button
                        type="submit"
                        onClick={() => handleSave(van.id)}
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
    )
}