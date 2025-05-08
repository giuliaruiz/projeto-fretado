"use client"
import { useMotorista } from "./hooks/useMotorista"
import { Trash2 } from "lucide-react"

export default function ListarMotorista() {

    const { motoristas, itinerarioByMotorista, excluirMotorista } = useMotorista()

    return (
        <div className="w-full md:w-[700px] p-5 bg-[#333] rounded-lg text-center text-white">
            <h1 className="text-3xl mb-5">
                Listar Motorista
            </h1>

            {motoristas.length == 0 && (
                <div>Sem nenhum dado</div>
            )}

            <ul className="w-full  max-h-[70vh] overflow-y-auto">
                {motoristas.map((motorista) => (
                    <li
                        key={motorista.id}
                        className="flex justify-between items-center bg-[#222] px-4 py-2 rounded-lg text-lg mb-3"
                    >
                        <div className="flex flex-col justify-start items-start">
                            <span className="text-lg">{motorista.nome}</span>
                            <span className="text-sm text-slate-300">{motorista.email}</span>
                            <span className="text-sm text-slate-300">Itinerario:  {motorista.itinerario ? itinerarioByMotorista[motorista.itinerario] : "Nenhum trajeto"}</span>
                        </div>
                        <Trash2
                            onClick={() => excluirMotorista(motorista.id)}
                            color="red"
                            cursor={"pointer"}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}