import { useRouter } from "next/navigation"
import { CreateCookie } from "@/actions/cookie"

interface IForm {
    email: string,
    senha: string,
}

export const useLogin = () => {

    const router = useRouter()

    const login = async ({ email, senha }: IForm) => {
        try {
            const resp = await fetch("http://localhost:3002/user/login",
                {
                    method: "POST",
                    body: JSON.stringify({ email, senha }),
                    headers: { "content-type": "application/json" }
                }
            )

            const data = await resp.json()
            await CreateCookie(data)

            switch (data.cargo) {
                case "admin":
                    router.push("/admin");
                    break;
                case "aluno":
                    router.push("/aluno/home");
                    break;
                case "motorista":
                    router.push("/motorista");
                    break;
                default:
                    alert("Cargo inválido!");
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro na conexão com o servidor.");
        }
    }

    return { login }
}