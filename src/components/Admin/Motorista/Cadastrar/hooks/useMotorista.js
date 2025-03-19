import { createMotorista } from "@/controllers/motorista"
import { useRouter } from "next/navigation"

export const useMotorista = () => {

    const router = useRouter()

    const addMotorista = async (motorista) => {
        const resp = await createMotorista(motorista)
        if (resp) {
            router.push("/admin")
        } else {
            alert("Erro ao cadastrar motorista!")
        }
    }

    return { addMotorista }
}