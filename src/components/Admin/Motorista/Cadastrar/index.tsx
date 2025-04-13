"use client"
import { MotoristaCreate } from "@/@types/type"
import { useMotorista } from "./hooks/useMotorista"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"

export default function CadastrarMotorista() {
    const [form, setForm] = useState<MotoristaCreate>({
        nome: "",
        telefone: "",
        email: "",
        habilitacao: "",
        fotoB64: "",
    })
    const [fileName, setFileName] = useState<string | null>(null)
    const { addMotorista } = useMotorista()
    const router = useRouter()

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
        e.preventDefault()
        addMotorista(form)
    }

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
    )
}