import { getItinerarioById } from "@/controllers/itinerario"
import { getMotoristaById } from "@/controllers/motorista"
import { getVanById } from "@/controllers/van"
import { useEffect, useState } from "react"

export const useGets = () => {

    const [itinerario, setItinerario] = useState({})
    const [van, setVan] = useState(null)
    const [motorista, setMotorista] = useState(null)

    useEffect(() => {
        if (!itinerario) return

        if (itinerario.van) {
            vanAluno(itinerario.van)
        }
        if (itinerario.motorista) {
            motoristaAluno(itinerario.motorista)
        }
    }, [itinerario])

    const itinerarioAluno = async (id) => {
        const dataItinerario = await getItinerarioById(id)
        setItinerario(dataItinerario)
    }

    const vanAluno = async (id) => {
        const dataVan = await getVanById(id)
        setVan(dataVan)
    }

    const motoristaAluno = async (id) => {
        const dataMotorista = await getMotoristaById(id)
        setMotorista(dataMotorista)
    }

    return { itinerarioAluno, itinerario, van, motorista }
}