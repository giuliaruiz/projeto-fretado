"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function CadastroVan() {
    const [form, setForm] = useState({
        placa: "",
        capacidade: "",
        modelo: "",
        cor: "",
        ano: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resp = await fetch("http://localhost:3002/admin/createVan", {
                method: "POST",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" },
            });

            if (resp.status != 201) {
                throw new Error(data.message || "Erro ao cadastrar van");
            }

            alert("Cadastro realizado com sucesso!");
            router.push("/admin");

        } catch (error) {
            console.error("Erro no cadastro:", error);
            alert("Falha ao cadastrar. Verifique os dados.");
        }
    };

    const router = useRouter();

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