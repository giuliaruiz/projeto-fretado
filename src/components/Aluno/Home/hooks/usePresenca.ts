import { updateAluno } from "@/controllers/aluno";

export const usePresenca = () => {

    const updatePresenca = async (id: number | undefined, checked: boolean) => {
        if(!id) return
        await updateAluno(id, { presenca: checked }, true)
    }

    return { updatePresenca }
}