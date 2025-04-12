import { Aluno, Itinerario } from "@/@types/type";
import { getItinerarioById, getItinerariosByAluno } from "@/controllers/itinerario";
import { useEffect, useState } from "react";

export const useItinerario = () => {

    const [itinerario, setItinerario] = useState<Itinerario | null>(null)
    const [alunos, setAlunos] = useState<Aluno[]>()

    useEffect(() => {
        if (!itinerario) return
        (
            async () => {
                const dataAluno = await getItinerariosByAluno(itinerario.id)
                setAlunos(dataAluno)
            }
        )()
    }, [itinerario]);

    const itinerarioByMotorista = async (id: number | undefined) => {

        const dataItinerario = await getItinerarioById(id)
        setItinerario(dataItinerario)

    }


    return { itinerario, itinerarioByMotorista, alunos }

}