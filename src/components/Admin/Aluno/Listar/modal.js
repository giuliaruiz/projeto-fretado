"use client"
import { getItinerarios } from "@/controllers/itinerario"
import { updateAluno } from "@/controllers/aluno"
import { useEffect, useState } from "react"

export default function Modal({ aluno, fecharModal, setAlunos, alunos }) {

    const [itinerarios, setItinerarios] = useState([])
    const [novoItinerario, setNovoItinerario] = useState(0)

    useEffect(() => {
        (async () => {
            const data = await getItinerarios()
            setItinerarios(data)
        })()
    }, [])

    const handleSave = async (id) => {

        await updateAluno(id, { itinerario: Number(novoItinerario) })
        setAlunos(alunos.map(alunoMap =>
            alunoMap.id === aluno.id ? { ...aluno, itinerario: novoItinerario } : alunoMap
        ))

        fecharModal()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#333] p-5 rounded-lg w-[400px]">

                <h2 className="text-2xl mb-3">
                    Editar Itinerario
                </h2>

                <p className="mb-2">Aluno: <strong>{aluno.nome}</strong></p>

                <select
                    value={novoItinerario}
                    className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
                    onChange={(e) => setNovoItinerario(e.target.value)}
                >
                    <option value="">Selecione um itinerário</option>
                    {itinerarios.map((itinerario) => (
                        <option key={itinerario.id} value={itinerario.id}>
                            {itinerario.nome}
                        </option>
                    ))}
                </select>

                <div className="grid grid-cols-2 justify-between w-full gap-4">
                    <button
                        type="button"
                        onClick={() => handleSave(aluno.id)}
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        onClick={fecharModal}
                    >
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    )
}