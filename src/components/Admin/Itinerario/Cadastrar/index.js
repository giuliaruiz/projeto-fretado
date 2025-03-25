"use client"
import { useItinerario } from "./hooks/useItinerario"
import { useState } from "react"

export default function CadastrarItinerario() {
    const [form, setForm] = useState({
        nome: "",
        inicio: "",
        cep_inicio: "",
        cidade_inicio: "",
        bairro_inicio: "",
        rua_inicio: "",
        numero_inicio: "",
        final: "",
        cep_final: "",
        cidade_final: "",
        bairro_final: "",
        rua_final: "",
        numero_final: "",
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
                className="grid grid-cols-2 gap-4 w-full"
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
                    placeholder="Final do Trajeto"
                    value={form.final}
                    required
                    onChange={(e) => setForm({ ...form, final: e.target.value })}
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
                    placeholder="CEP Final"
                    value={form.cep_final}
                    required
                    onChange={(e) => setForm({ ...form, cep_final: e.target.value })}
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
                    placeholder="Cidade Final"
                    value={form.cidade_final}
                    required
                    onChange={(e) => setForm({ ...form, cidade_final: e.target.value })}
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
                    placeholder="Bairro Final"
                    value={form.bairro_final}
                    required
                    onChange={(e) => setForm({ ...form, bairro_final: e.target.value })}
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
                    placeholder="Rua Final"
                    value={form.rua_final}
                    required
                    onChange={(e) => setForm({ ...form, rua_final: e.target.value })}
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
                    placeholder="Numero Final"
                    value={form.numero_final}
                    required
                    onChange={(e) => setForm({ ...form, numero_final: e.target.value })}
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