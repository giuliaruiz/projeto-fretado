"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function CadastroMotorista() {
    const [form, setForm] = useState({
        nome: "",
        telefone: "",
        email: "",
        habilitacao: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resp = await fetch("http://localhost:3002/admin/createDriver", {
                method: "POST",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" },
            });

            if (resp.status != 201) {
                throw new Error(data.message || "Erro ao cadastrar usuário");
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
                Cadastrar Motorista
            </h1>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2  gap-5 w-full"
            >
                <input
                    type="text"
                    placeholder="Nome completo"
                    value={form.nome}
                    required
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    required
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                />

                <input
                    type="text"
                    placeholder="Telefone"
                    value={form.telefone}
                    required
                    onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                    className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                />

                <input
                    type="text"
                    placeholder="Nº Habilitação"
                    required
                    value={form.habilitacao}
                    onChange={(e) => setForm({ ...form, habilitacao: e.target.value })}
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