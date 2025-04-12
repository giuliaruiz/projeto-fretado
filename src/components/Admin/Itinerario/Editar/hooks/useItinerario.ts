import { Itinerario } from "@/@types/type"
import { getItinerarios, deleteItinerario } from "@/controllers/itinerario"
import { getMotoristaById } from "@/controllers/motorista"
import { getVanById } from "@/controllers/van"
import { useEffect, useState } from "react"

export const useItinerario = () => {

    const [itinerarios, setItinerarios] = useState<Itinerario[]>([])
    const [vanMap, setVanMap] = useState<Record<number, string>>({});
    const [motoristaMap, setMotoristaMap] = useState<Record<number, string>>({});

    useEffect(() => {
        (
            async () => {
                const data = await getItinerarios()
                setItinerarios(data)
            }
        )()
    }, [setItinerarios])

    useEffect(() => {
        if (itinerarios.length === 0) return

        (
            async () => {
                const motoristaMap: any = {}
                const vanMap: any = {}

                await Promise.all(
                    itinerarios.map(async (itineraio) => {
                        if (itineraio.motorista) {
                            const dataMotorista = await getMotoristaById(itineraio.motorista)
                            motoristaMap[itineraio.motorista] = dataMotorista?.nome
                        }
                        if (itineraio.van) {
                            const dataVan = await getVanById(itineraio.van)
                            vanMap[itineraio.van] = dataVan?.placa
                        }
                    })
                )
                setVanMap(vanMap)
                setMotoristaMap(motoristaMap)
            }
        )()
    }, [itinerarios])

    const excluirItinerario = async (id: number) => {
        const resp = await deleteItinerario(id)
        if (resp) return setItinerarios(itinerarios.filter(itineraio => itineraio.id !== id))
    }

    return { itinerarios, setItinerarios, vanMap, motoristaMap, excluirItinerario }
}