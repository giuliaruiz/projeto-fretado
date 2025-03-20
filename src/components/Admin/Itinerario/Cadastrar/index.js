"use client"
import { useItinerario } from "./hooks/useItinerario"
import { useState } from "react"

export default function CadastrarItinerario() {
    const [form, setForm] = useState({
        nome: "",
        inicio: "",
        final: "",
    })

    const { addAItinerario } = useItinerario()

    const handleSubmit = (e) => {
        e.preventDefault()
        addAItinerario(form)
    }

    return (
        <div className="px-16 py-8 bg-[#333] rounded-lg w-[700px]">
            <h1 className="text-3xl mb-5">
                Cadastrar Trajeto
            </h1>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-5 w-full"
            >
                <input
                    type="text"
                    placeholder="Nome do Trajeto"
                    value={form.nome}
                    required
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    className="bg-[#222] col-span-2 text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                />

                <input
                    type="text"
                    placeholder="Inicio do Trajeto"
                    value={form.inicio}
                    required
                    onChange={(e) => setForm({ ...form, inicio: e.target.value })}
                    className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                />

                <input
                    type="text"
                    placeholder="Fim do Trajeto"
                    value={form.final}
                    required
                    onChange={(e) => setForm({ ...form, final: e.target.value })}
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
    )
}