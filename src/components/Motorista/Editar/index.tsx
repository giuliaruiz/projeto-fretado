"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GetCookie } from "@/actions/cookie";
import { Motorista, MotoristaCreate } from "@/@types/type";
import { useMotorista } from "./hooks/useMotorista";

interface ICooki {
    data: Motorista;
}

export default function Editar() {
    const [cookie, setCookie] = useState<ICooki | null>(null)
    const [form, setForm] = useState<MotoristaCreate>({
        nome: "",
        email: "",
        telefone: "",
        habilitacao: "",
    });

    const { saveMotorista } = useMotorista()
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const data = await GetCookie()
            setCookie(data)
        })();
    }, []);

    useEffect(() => {
        if (cookie?.data) {
            setForm({
                nome: cookie.data.nome || "",
                email: cookie.data.email || "",
                telefone: cookie.data.telefone || "",
                habilitacao: cookie.data.habilitacao || "",
            });
        }
    }, [cookie]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (cookie == null) return
        saveMotorista(cookie.data.id, form)
    };


    return (
        <div className="px-16 py-8 bg-[#333] rounded-lg w-[700px]">
            <h1 className="text-3xl mb-5">
                Editar Perfil
            </h1>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-5 w-full"
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
                    placeholder="Habilitação"
                    value={form.habilitacao}
                    required
                    onChange={(e) => setForm({ ...form, habilitacao: e.target.value })}
                    className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                />

                <button type="submit">Cadastrar</button>

                <button
                    type="button"
                    onClick={() => router.push('/motorista/home')}
                >
                    Voltar
                </button>
            </form>
        </div>
    );
}