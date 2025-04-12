import { Aluno } from "@/@types/type"
import { getAlunos, deleteAluno } from "@/controllers/aluno"
import { useEffect, useState } from "react"

export const useAluno = () => {

    const [alunos, setAlunos] = useState<Aluno[]>([])
    const [itinerarioByAluno, setItinerarioByAluno] = useState<Record<number, string>>({})


    useEffect(() => {
        (
            async () => {
                const data: Aluno[] = await getAlunos()
                setAlunos(data)
            }
        )()
    }, [setAlunos])

    useEffect(() => {
        if (alunos.length === 0) return

        (
            async () => {
                const itinerarioMap: any = {}

                await Promise.all(
                    alunos.map(async (aluno) => {
                        if (aluno.itinerario) {
                            try {
                                const response = await fetch(`http://localhost:3002/itinerario/${aluno.itinerario}`)
                                if (!response.ok) throw new Error("Erro ao buscar itinerario")
                                const data = await response.json()
                                itinerarioMap[aluno.itinerario] = data.nome
                            } catch (err) {
                                itinerarioMap[aluno.itinerario] = "Erro ao carregar"
                            }
                        }
                    })
                )

                setItinerarioByAluno(itinerarioMap)
            }
        )()
    }, [alunos])


    const excluirAluno = async (id: number) => {
        const resp = await deleteAluno(id)
        if (resp) return setAlunos(alunos.filter(aluno => aluno.id !== id))
    }

    return { alunos, setAlunos, itinerarioByAluno, excluirAluno }
}