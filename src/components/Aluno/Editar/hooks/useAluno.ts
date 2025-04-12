import { AlunoCreate } from "@/@types/type"
import { updateAluno } from "@/controllers/aluno"

export const useAluno = () => {

    const saveAluno = async (id: number, form: AlunoCreate) => {
        await updateAluno(id, form)
    }

    return { saveAluno }
}