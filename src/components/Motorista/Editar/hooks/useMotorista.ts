import {  MotoristaCreate } from "@/@types/type"
import { updateMotorista } from "@/controllers/motorista"

export const useMotorista = () => {

    const saveMotorista = async (id: number, form: MotoristaCreate) => {
        await updateMotorista(id, form)
    }

    return { saveMotorista }
}