import { createItinerario } from "@/controllers/itinerario"
import { useRouter } from "next/navigation"

export const useItinerario = () => {

    const router = useRouter()

    const addAItinerario = async (itinerario) => {
        const resp = await createItinerario(itinerario)
        if (resp) {
            router.push("/admin")
        } else {
            alert("Erro ao cadastrar itinerario!")
        }
    }

    return { addAItinerario }
}