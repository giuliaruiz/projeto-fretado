"use client"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Check, Menu, SendHorizontal, X } from "lucide-react"
import { getMotoristaById } from "@/controllers/motorista"
import { updateOrdenacaoAluno } from "@/controllers/aluno"
import { useItinerario } from "./hooks/useItinerario"
import { getVanById } from "@/controllers/van"
import { useEffect, useState } from "react"
import { Motorista, Van } from "@/@types/type"

export default function ListarItinerario() {

    const { itinerarios, alunos, setAlunos, itinerario, selectedItinerario, setSelectedItinerario } = useItinerario()

    const [motorista, setMotorista] = useState<Motorista | null>(null)
    const [van, setVan] = useState<Van | null>(null)

    useEffect(() => {
        if (!itinerario) return
        (
            async () => {
                const dataMotorista = itinerario.motorista ? await getMotoristaById(itinerario.motorista) : null
                const dataVan = itinerario.van ? await getVanById(itinerario.van) : null

                setMotorista(dataMotorista)
                setVan(dataVan)
            }
        )()
    }, [itinerario])


    const handleDragEnd = (result: any) => {
        if (!result.destination) return;

        const updatedAlunos = Array.from(alunos);
        const [movedAluno] = updatedAlunos.splice(result.source.index, 1);
        updatedAlunos.splice(result.destination.index, 0, movedAluno);

        const newAlunos = updatedAlunos.map((aluno, index) => ({
            ...aluno,
            ordem: index + 1,
        }));

        setAlunos(newAlunos)
    }

    const salvarOrdenacao = async () => {
        await updateOrdenacaoAluno(alunos)
    }

    return (
        <div className="w-full md:w-[700px] p-5 bg-[#333] rounded-lg text-center text-white">
            <h1 className="text-3xl mb-5">
                Listar Trajetos
            </h1>

            <select
                value={selectedItinerario || ""}
                onChange={(e) => setSelectedItinerario(Number(e.target.value))}
                className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
            >
                <option value="">Selecione um itinerário para Listar</option>
                {itinerarios.map((itinerario) => (
                    <option key={itinerario.id} value={itinerario.id}>
                        {itinerario.nome}
                    </option>
                ))}
            </select>

            {selectedItinerario && itinerario && (

                <DragDropContext onDragEnd={handleDragEnd}>

                    <Droppable droppableId="alunos">

                        {(provided) => (
                            <ul
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="w-full mt-5 flex flex-col gap-2"
                            >
                                <li className="grid grid-cols-2 p-4 gap-3 rounded-lg bg-[#222] mb-3">

                                    <div className="flex flex-row gap-4 justify-start">
                                        <SendHorizontal color="green" />
                                        Início: {itinerario.inicio}
                                    </div>

                                    <div className="flex flex-row gap-4 justify-start">
                                        Van: {van ? van.placa : "Nenhuma van"}
                                    </div>

                                    <div className="flex flex-row gap-4 justify-start">
                                        <SendHorizontal color="#ff3421" />
                                        Final: {itinerario.final}
                                    </div>

                                    <div className="flex flex-row gap-4 justify-start">
                                        Motorista: {motorista ? motorista.nome : "Nenhum motorista"}
                                    </div>

                                </li>

                                {alunos.length == 0 && (
                                    <div>Sem nenhum dado</div>
                                )}


                                {alunos.length > 0 && alunos.map((aluno, index) => (
                                    <Draggable key={aluno.id} draggableId={aluno.id.toString()} index={index}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="flex justify-between items-center bg-[#222] px-4 py-2 rounded-lg text-lg"
                                            >
                                                <div className="flex flex-row justify-start items-center gap-3">
                                                    <Menu />
                                                    <div className="flex flex-col justify-start items-start">
                                                        <span className="text-lg">{aluno.nome}</span>
                                                        <span className="text-sm text-slate-300">{aluno.rua}, {aluno.bairro} - {aluno.numero}</span>
                                                    </div>
                                                </div>
                                                {aluno.presenca ? <Check color="green" /> : <X color={"#ff3421"} />}
                                            </li>
                                        )}
                                    </Draggable>
                                ))}

                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            )}

            {selectedItinerario && alunos.length != 0 && (
                <button
                    onClick={salvarOrdenacao}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                    Salvar Ordem
                </button>
            )}

        </div>
    )
}