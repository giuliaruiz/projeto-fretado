import { getVans, deleteVan } from "@/controllers/van"
import { useEffect, useState } from "react"

export const useVan = () => {

    const [vans, setVans] = useState([])
    const [itinerarioByVan, setItinerarioByVan] = useState({})

    useEffect(() => {
        (
            async () => {
                const data = await getVans()
                setVans(data)
            }
        )()
    }, [setVans])

    useEffect(() => {
        if (vans.length === 0) return

        (
            async () => {
                const itinerarioMap = {}

                await Promise.all(
                    vans.map(async (van) => {
                        if (van.itinerario) {
                            try {
                                const response = await fetch(`http://localhost:3002/itinerario/${van.itinerario}`)
                                if (!response.ok) throw new Error("Erro ao buscar itinerario")
                                const data = await response.json()
                                itinerarioMap[van.itinerario] = data.nome
                            } catch (err) {
                                itinerarioMap[van.itinerario] = "Erro ao carregar"
                            }
                        }
                    })
                )

                setItinerarioByVan(itinerarioMap)
            }
        )()
    }, [vans])


    const excluirVan = async (id) => {
        const resp = await deleteVan(id)
        if (resp) return setVans(vans.filter(van => van.id !== id))
    }

    return { vans, vans, itinerarioByVan, excluirVan }
}