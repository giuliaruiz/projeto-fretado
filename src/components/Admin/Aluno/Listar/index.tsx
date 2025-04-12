"use client"
import { Pencil, Trash2 } from "lucide-react"
import { useAluno } from "./hooks/useAluno"
import { useState } from "react"
import Modal from "./modal"
import { Aluno } from "@/@types/type"

export default function ListaAlunos() {

    const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const { alunos, setAlunos, itinerarioByAluno, excluirAluno } = useAluno()

    const abrirModal = (aluno: Aluno) => {
        setAlunoSelecionado(aluno)
        setModalOpen(true)
    }

    const fecharModal = () => {
        setModalOpen(false)
        setAlunoSelecionado(null)
    }

    return (
        <div className="w-[700px] p-5 bg-[#333] rounded-lg text-center text-white">
            <h1 className="text-3xl mb-5">
                Listar Alunos
            </h1>

            {alunos.length == 0 && (
                <div>Sem nenhum dado</div>
            )}

            <ul className="w-full  max-h-[70vh] overflow-y-auto">
                {alunos && alunos.map((aluno) => (
                    <li
                        key={aluno.id}
                        className="flex justify-between items-center bg-[#222] px-4 py-2 rounded-lg text-lg mb-3"
                    >
                        <div className="flex flex-col justify-start items-start">
                            <span className="text-lg">{aluno.nome}</span>
                            <span className="text-sm text-slate-300">{aluno.rua}, {aluno.numero}, {aluno.bairro} - {aluno.cidade}</span>
                            <span className="text-sm text-slate-300">Itinerario: {aluno.itinerario ? itinerarioByAluno[aluno.itinerario] : "Nenhum Itinerario"}</span>
                        </div>
                        <div className="flex flex-row gap-5 justify-center">
                            <Pencil
                                onClick={() => abrirModal(aluno)}
                                cursor={"pointer"}
                                color="#1e0bff"
                            />
                            <Trash2
                                onClick={() => excluirAluno(aluno.id)}
                                color="#ff3421"
                                cursor={"pointer"}
                            />
                        </div>
                    </li>
                ))}
            </ul>

            {modalOpen && alunoSelecionado && (
                <Modal
                    aluno={alunoSelecionado}
                    fecharModal={fecharModal}
                    setAlunos={setAlunos}
                    alunos={alunos}
                />)}
        </div>
    )
}