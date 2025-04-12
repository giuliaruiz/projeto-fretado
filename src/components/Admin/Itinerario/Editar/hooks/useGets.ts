import { Motorista, Van } from "@/@types/type"
import { getMotoristas } from "@/controllers/motorista"
import { getVans } from "@/controllers/van"
import { useEffect, useState } from "react"

export const useGets = () => {

    const [motoristas, setMotoristas] = useState<Motorista[]>([])
    const [vans, setVans] = useState<Van[]>([])

    useEffect(() => {
        (
            async () => {
                const dataMotorista = await getMotoristas()
                const dataVan = await getVans()

                setMotoristas(dataMotorista)
                setVans(dataVan)
            }
        )()
    }, [])

    return { vans, motoristas }
}