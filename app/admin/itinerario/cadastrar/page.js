"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadastroTrajeto() {
    const router = useRouter();

    const [form, setForm] = useState({
        nome: "",
        inicio: "",
        final: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch("http://localhost:3002/admin/createItinerario", {
                method: "POST",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" },
            });

            if (resp.status !== 201) {
                throw new Error("Erro ao cadastrar trajeto");
            }

            alert("Cadastro realizado com sucesso!");
            router.push("/admin");
        } catch (error) {
            console.error("Erro no cadastro:", error);
            alert("Falha ao cadastrar. Verifique os dados.");
        }
    };

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
                    value={form.fim}
                    required
                    onChange={(e) => setForm({ ...form, fim: e.target.value })}
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