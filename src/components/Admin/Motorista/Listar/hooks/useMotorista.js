import { getMotoristas, deleteMotorista } from "@/controllers/motorista"
import { useEffect, useState } from "react"

export const useMotorista = () => {

    const [motoristas, setMotoristas] = useState([])
    const [itinerarioByMotorista, setItinerarioByMotorista] = useState({})

    useEffect(() => {
        (
            async () => {
                const data = await getMotoristas()
                setMotoristas(data)
            }
        )()
    }, [setMotoristas])

    useEffect(() => {
        if (motoristas.length === 0) return

        (
            async () => {
                const itinerarioMap = {}

                await Promise.all(
                    motoristas.map(async (motorista) => {
                        if (motorista.itinerario) {
                            try {
                                const response = await fetch(`http://localhost:3002/itinerario/${motorista.itinerario}`)
                                if (!response.ok) throw new Error("Erro ao buscar itinerario")
                                const data = await response.json()
                                itinerarioMap[motorista.itinerario] = data.nome
                            } catch (err) {
                                itinerarioMap[motorista.itinerario] = "Erro ao carregar"
                            }
                        }
                    })
                )

                setItinerarioByMotorista(itinerarioMap)
            }
        )()
    }, [motoristas])


    const excluirMotorista = async (id) => {
        const resp = await deleteMotorista(id)
        if (resp) return setMotoristas(motoristas.filter(motorista => motorista.id !== id))
    }

    return { motoristas, itinerarioByMotorista, excluirMotorista }
}