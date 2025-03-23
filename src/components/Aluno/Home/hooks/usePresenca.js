import { updateAluno } from "@/controllers/aluno";

export const usePresenca = () => {

    const updatePresenca = async (id, checked) => {
        await updateAluno(id, { presenca: checked }, true)
    }

    return { updatePresenca }
}