import { Aluno, Itinerario } from "@/@types/type"
import { getItinerarios, getItinerarioById, getItinerariosByAluno } from "@/controllers/itinerario"
import { useEffect, useState } from "react"

export const useItinerario = () => {

    const [itinerarios, setItinerarios] = useState<Itinerario[]>([])
    const [selectedItinerario, setSelectedItinerario] = useState<number | null>(null)
    const [alunos, setAlunos] = useState<Aluno[]>([])
    const [itinerario, setItinerario] = useState<Itinerario | null>(null)

    useEffect(() => {
        (
            async () => {
                const data = await getItinerarios()
                setItinerarios(data)
            }
        )()
    }, [setItinerarios])

    useEffect(() => {
        if (!selectedItinerario) return

        (async () => {
            const data = await getItinerarioById(selectedItinerario)
            const dataAlunos = await getItinerariosByAluno(selectedItinerario)

            setItinerario(data)
            setAlunos(dataAlunos)
        })()
    }, [selectedItinerario])

    return { itinerarios, alunos, setAlunos, itinerario, selectedItinerario, setSelectedItinerario }
}