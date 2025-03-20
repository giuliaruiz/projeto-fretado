"use client"
import { useItinerario } from "./hooks/useItinerario"
import { Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import Modal from "./modal"

export default function EditarItinerario() {

    const [itinerarioSelecionado, setItinerarioSelecionado] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const { itinerarios, setItinerarios, vanMap, motoristaMap, excluirItinerario } = useItinerario()

    const abrirModal = (itinerario) => {
        setItinerarioSelecionado(itinerario);
        setModalOpen(true);
    }

    const fecharModal = () => {
        setModalOpen(false)
        setItinerarioSelecionado(null)
    }

    return (
        <div className="w-[700px] p-5 bg-[#333] rounded-lg text-center text-white">
            <h1 className="text-3xl mb-5">
                Editar Itinerario
            </h1>

            {itinerarios.length == 0 && (
                <div>Sem nenhum dado</div>
            )}

            <ul className="w-full">
                {itinerarios.map((itinerario) => (
                    <li
                        key={itinerario.id}
                        className="flex justify-between items-center bg-[#222] px-4 py-2 rounded-lg text-lg mb-3"
                    >
                        <div className="flex flex-col w-full justify-start items-start">
                            <span className="text-lg">{itinerario.nome}</span>
                            <div className="grid grid-cols-2 w-full text-sm text-slate-300">
                                <span className="flex justify-start">Inicio: {itinerario.inicio}</span>
                                <span className="flex justify-start">Motorista: {motoristaMap[itinerario.motorista] || "Nenhum motorista"}</span>
                                <span className="flex justify-start">Fim: {itinerario.final}</span>
                                <span className="flex justify-start">Van: {vanMap[itinerario.van] || "Nenhuma van"}</span>
                            </div>
                        </div>
                        <div className="flex flex-row gap-5 justify-center">
                            <Pencil
                                onClick={() => abrirModal(itinerario)}
                                cursor={"pointer"}
                                color="#1e0bff"
                            />
                            <Trash2
                                onClick={() => excluirItinerario(itinerario.id)}
                                color="#ff3421"
                                cursor={"pointer"}
                            />
                        </div>
                    </li>
                ))}
            </ul>

            {modalOpen && itinerarioSelecionado && (
                <Modal
                    itineraio={itinerarioSelecionado}
                    fecharModal={fecharModal}
                    setItinerarios={setItinerarios}
                    itineraios={itinerarios}
                />
            )}
        </div>
    )
}