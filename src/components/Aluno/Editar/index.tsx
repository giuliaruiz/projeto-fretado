"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAluno } from "./hooks/useAluno";
import { GetCookie } from "@/actions/cookie";
import { Aluno, AlunoCreate } from "@/@types/type";
import { X } from "lucide-react";

interface ICooki {
    data: Aluno;
}

export default function Editar() {
    const [cookie, setCookie] = useState<ICooki | null>(null)
    const [form, setForm] = useState<AlunoCreate>({
        nome: "",
        faculdade: "",
        cpf: "",
        email: "",
        telefone: "",
        cep: "",
        cidade: "",
        rua: "",
        bairro: "",
        numero: "",
        fotoB64: "",
    });
    const [fileName, setFileName] = useState<string | null>(null)
    const { saveAluno } = useAluno()
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
                faculdade: cookie.data.faculdade || "",
                cpf: cookie.data.cpf || "",
                email: cookie.data.email || "",
                telefone: cookie.data.telefone || "",
                cep: cookie.data.cep || "",
                cidade: cookie.data.cidade || "",
                rua: cookie.data.rua || "",
                bairro: cookie.data.bairro || "",
                numero: cookie.data.numero || "",
                fotoB64: cookie.data.fotoB64 || "",
            });
        }
    }, [cookie]);

    const handleImageUpload = (e: any) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : null)

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setForm({ ...form, fotoB64: reader.result ? reader.result as string : "" });
            }
            reader.onerror = (error) => {
                console.error("Erro ao converter imagem:", error);
            }
        } else {
            setForm({ ...form, fotoB64: "" })
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (cookie == null) return
        saveAluno(cookie.data.id, form)
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
                    className="bg-[#222] col-span-2 text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                />

                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        id="file-upload"
                        className="hidden"
                    />
                    <label
                        htmlFor="file-upload"
                        className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full cursor-pointer text-left focus:outline-none focus:border-[#2ecc71]">
                        {fileName ? (
                            <div className="flex flex-row justify-between">
                                {fileName}
                                <X
                                    color={"#A45"}
                                />
                            </div>
                        ) : (
                            'Escolha sua foto'
                        )}
                    </label>
                </div>

                <input
                    type="text"
                    placeholder="Faculdade"
                    value={form.faculdade}
                    required
                    onChange={(e) => setForm({ ...form, faculdade: e.target.value })}
                    className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                />

                <input
                    type="text"
                    placeholder="CPF"
                    value={form.cpf}
                    required
                    onChange={(e) => setForm({ ...form, cpf: e.target.value })}
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
                    placeholder="CEP"
                    value={form.cep}
                    required
                    onChange={(e) => setForm({ ...form, cep: e.target.value })}
                    className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                />

                <input
                    type="text"
                    placeholder="Cidade"
                    value={form.cidade}
                    required
                    onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                    className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                />

                <input
                    type="text"
                    placeholder="Rua"
                    value={form.rua}
                    required
                    onChange={(e) => setForm({ ...form, rua: e.target.value })}
                    className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                />

                <input
                    type="text"
                    placeholder="Bairro"
                    value={form.bairro}
                    required
                    onChange={(e) => setForm({ ...form, bairro: e.target.value })}
                    className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                />

                <input
                    type="text"
                    placeholder="Número"
                    value={form.numero}
                    required
                    onChange={(e) => setForm({ ...form, numero: e.target.value })}
                    className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                />

                <button type="submit">Cadastrar</button>

                <button
                    type="button"
                    onClick={() => router.push('/aluno/home')}
                >
                    Voltar
                </button>
            </form>
        </div>
    );
}