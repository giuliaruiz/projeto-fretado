import { createVan } from "@/controllers/van"
import { useRouter } from "next/navigation"

export const useVan = () => {

    const router = useRouter()

    const addVan = async (van) => {
        const resp = await createVan(van)
        if (resp) {
            router.push("/admin")
        } else {
            alert("Erro ao cadastrar van!")
        }
    }

    return { addVan }
}