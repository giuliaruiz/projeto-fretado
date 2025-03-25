"use client"
import { X } from "lucide-react";
import { useAluno } from "./hooks/useAluno"
import { useState } from "react"

export default function CadastrarAluno() {
    const [form, setForm] = useState({
        nome: "",
        faculdade: "",
        cpf: "",
        email: "",
        telefone: "",
        cep: "",
        rua: "",
        bairro: "",
        numero: "",
        fotoB64: "",
    });
    const [fileName, setFileName] = useState(null)

    const { addAluno } = useAluno();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : null)

        
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setForm({ ...form, fotoB64: reader.result });
            }
            reader.onerror = (error) => {
                console.error("Erro ao converter imagem:", error);
            }
        }else{
            setForm({...form, fotoB64: ""})
        }
    };
    console.log(form)

    const handleSubmit = (e) => {
        e.preventDefault();
        addAluno(form)
    };

    return (
        <div className="px-16 py-8 bg-[#333] rounded-lg w-[700px]">
            <h1 className="text-3xl mb-5">
                Cadastrar Aluno
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

                {/* MANUTENCAO */}
                <div>
                    {/* Estilo personalizado para o arquivo */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        id="file-upload"
                        className="hidden"
                    />

                    {/* Botão estilizado */}
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
                    placeholder="CEP"
                    value={form.cep}
                    required
                    onChange={(e) => setForm({ ...form, cep: e.target.value })}
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

                <button type="submit" className="bg-green-500 text-white p-3 rounded-lg">
                    Cadastrar
                </button>

                <button
                    type="button"
                    className="bg-red-500 text-white p-3 rounded-lg"
                    onClick={() => router.push('/admin')}
                >
                    Voltar
                </button>
            </form>
        </div>
    );
}
