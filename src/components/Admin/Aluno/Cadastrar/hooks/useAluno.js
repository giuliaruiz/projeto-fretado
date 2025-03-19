import { createAluno } from "@/controllers/aluno"
import { useRouter } from "next/navigation"

export const useAluno = () => {

    const router = useRouter()

    const addAluno = async (aluno) => {
        const resp = await createAluno(aluno)
        if (resp) {
            router.push("/admin")
        } else {
            alert("Erro ao cadastrar aluno!")
        }
    }

    return { addAluno }
}