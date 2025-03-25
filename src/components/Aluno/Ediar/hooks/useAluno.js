import { updateAluno } from "@/controllers/aluno"

export const useAluno = () => {

    const saveAluno = async (id, form) => {
        await updateAluno(id, form)
    }

    return { saveAluno }
}