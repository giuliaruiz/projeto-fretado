import { Itinerario, Motorista, Van } from "@/@types/type"
import { getItinerarioById } from "@/controllers/itinerario"
import { getMotoristaById } from "@/controllers/motorista"
import { getVanById } from "@/controllers/van"
import { useEffect, useState } from "react"

export const useGets = () => {

    const [itinerario, setItinerario] = useState<Itinerario | null>(null)
    const [van, setVan] = useState<Van | null>(null)
    const [motorista, setMotorista] = useState<Motorista | null>(null)

    useEffect(() => {
        if (!itinerario) return

        if (itinerario.van) {
            vanAluno(itinerario.van)
        }
        if (itinerario.motorista) {
            motoristaAluno(itinerario.motorista)
        }
    }, [itinerario])

    const itinerarioAluno = async (id: number) => {
        const dataItinerario = await getItinerarioById(id)
        setItinerario(dataItinerario)
    }

    const vanAluno = async (id: number) => {
        const dataVan = await getVanById(id)
        setVan(dataVan)
    }

    const motoristaAluno = async (id: number) => {
        const dataMotorista = await getMotoristaById(id)
        setMotorista(dataMotorista)
    }

    return { itinerarioAluno, itinerario, van, motorista }
}