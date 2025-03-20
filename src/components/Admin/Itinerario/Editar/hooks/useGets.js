import { getMotoristas } from "@/controllers/motorista"
import { getVans } from "@/controllers/van"
import { useEffect, useState } from "react"

export const useGets = () => {

    const [motoristas, setMotoristas] = useState([])
    const [vans, setVans] = useState([])

    useEffect(() => {
        (
            async () => {
                const data = await getMotoristas()
                const data2 = await getVans()

                setMotoristas(data)
                setVans(data2)
            }
        )()
    }, [])

    return { vans, motoristas }
}