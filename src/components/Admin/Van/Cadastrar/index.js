"use client"
import { useState } from "react"
import { useVan } from "./hooks/useVan";

export default function CadastrarVan() {
    const [form, setForm] = useState({
        placa: "",
        capacidade: "",
        modelo: "",
        cor: "",
        ano: "",
    })

    const { addVan } = useVan()

    const handleSubmit = (e) => {
        e.preventDefault()
        addVan(form)
    }

    return (
        <div className="px-16 py-8 bg-[#333] rounded-lg w-[700px]">
            <h1 className="text-3xl mb-5">
                Cadastrar Van
            </h1>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2  gap-5 w-full"
            >
                <input
                    type="text"
                    placeholder="Placa"
                    value={form.placa}
                    required
                    onChange={(e) => setForm({ ...form, placa: e.target.value })}
                    className="bg-[#222] col-span-2 text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                />

                <input
                    type="text"
                    placeholder="Modelo"
                    value={form.modelo}
                    required
                    onChange={(e) => setForm({ ...form, modelo: e.target.value })}
                    className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                />

                <input
                    type="text"
                    placeholder="Cor"
                    value={form.cor}
                    required
                    onChange={(e) => setForm({ ...form, cor: e.target.value })}
                    className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                />

                <input
                    type="text"
                    placeholder="Capacidade"
                    required
                    value={form.capacidade}
                    onChange={(e) => setForm({ ...form, capacidade: e.target.value })}
                    className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                />

                <input
                    type="text"
                    placeholder="Ano"
                    required
                    value={form.ano}
                    onChange={(e) => setForm({ ...form, ano: e.target.value })}
                    className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                />

                <button type="submit">Cadastrar</button>

                <button
                    type="button"
                    onClick={() => router.push('/admin')}
                >
                    Voltar
                </button>

            </form>
        </div>
    );
}