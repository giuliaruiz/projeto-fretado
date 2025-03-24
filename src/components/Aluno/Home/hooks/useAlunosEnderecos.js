import { useState } from "react"
import { getItinerariosByAluno } from "@/controllers/itinerario"

export const useAlunosEnderecos = () => {

    const [alunosEnderecos, setAlunosEnderecos] = useState([])

    const getAlunoEnderecos = async (id) => {

        if (id == null) return alert("Você não está em nenhum itinerario. Por favor entrar em contato com a empresa.")

        const itinerarios = await getItinerariosByAluno(id)

        const itinerariosOrdenados = itinerarios.sort((a, b) => {
            if (a.ordem === null) return 1; 
            if (b.ordem === null) return -1; 
            return a.ordem - b.ordem; 
        });

        const data = itinerariosOrdenados.map(aluno => ({
            endereco: `${aluno.rua}, ${aluno.numero}, ${aluno.bairro}`,
            nome: aluno.nome,
            foto: aluno.fotoB64 || "/default_student_image.png"
        }));

        setAlunosEnderecos(data)

    }

    return {getAlunoEnderecos, alunosEnderecos}
}