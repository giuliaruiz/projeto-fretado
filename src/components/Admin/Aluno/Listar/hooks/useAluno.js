import { getAlunos, deleteAluno } from "@/controllers/aluno"
import { useEffect, useState } from "react"

export const useAluno = () => {

    const [alunos, setAlunos] = useState([])
    const [itinerarioByAluno, setItinerarioByAluno] = useState({})

    useEffect(() => {
        (
            async () => {
                const data = await getAlunos()
                setAlunos(data)
            }
        )()
    }, [setAlunos])

    useEffect(() => {
        if (alunos.length === 0) return

        (
            async () => {
                const itinerarioMap = {}

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


    const excluirAluno = async (id) => {
        const resp = await deleteAluno(id)
        if (resp) return setAlunos(alunos.filter(aluno => aluno.id !== id))
    }

    return { alunos, setAlunos, itinerarioByAluno, excluirAluno }
}