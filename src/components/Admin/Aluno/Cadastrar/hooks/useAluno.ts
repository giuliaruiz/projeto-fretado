import { AlunoCreate } from "@/@types/type"
import { createAluno } from "@/controllers/aluno"
import { useRouter } from "next/navigation"

export const useAluno = () => {

    const router = useRouter()

    const addAluno = async (aluno: AlunoCreate) => {
        const resp = await createAluno(aluno)
        if (resp) {
            router.push("/admin")
        } else {
            alert("Erro ao cadastrar aluno!")
        }
    }

    return { addAluno }
}