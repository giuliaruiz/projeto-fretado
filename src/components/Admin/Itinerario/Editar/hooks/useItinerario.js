import { getItinerarios, deleteItinerario } from "@/controllers/itinerario"
import { getMotoristaById } from "@/controllers/motorista"
import { getVanById } from "@/controllers/van"
import { useEffect, useState } from "react"

export const useItinerario = () => {

    const [itinerarios, setItinerarios] = useState([])
    const [vanMap, setVanMap] = useState({});
    const [motoristaMap, setMotoristaMap] = useState({});

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
                const motoristaMap = {}
                const vanMap = {}

                await Promise.all(
                    itinerarios.map(async (itineraio) => {
                        if (itineraio.motorista) {
                            const dataMotorista = await getMotoristaById(itineraio.motorista)
                            motoristaMap[itineraio.motorista] = dataMotorista.nome
                        }
                        if(itineraio.van) {
                            const dataVan = await getVanById(itineraio.van)
                            motoristaMap[itineraio.van] = dataVan.placa
                        }
                    })
                )
                setVanMap(vanMap)
                setMotoristaMap(motoristaMap)
            }
        )()
    }, [itinerarios])

    const excluirItinerario = async (id) => {
        const resp = await deleteItinerario(id)
        if (resp) return setItinerarios(itinerarios.filter(itineraio => itineraio.id !== id))
    }

    return { itinerarios, setItinerarios, vanMap, motoristaMap, excluirItinerario }
}