"use client"
import { Check, SendHorizontal, X } from "lucide-react";
import { useItinerario } from "./hooks/useItinerario";
import { GetCookie } from "@/actions/cookie";
import { Motorista } from "@/@types/type";
import { useEffect } from "react";

interface ICookie {
    data: Motorista;
    cargo: string;
}

export default function Fretado() {

    const { itinerario, itinerarioByMotorista, alunos} = useItinerario()

    useEffect(() => {
        (async () => {
            const data: ICookie = await GetCookie();
            itinerarioByMotorista(data.data.itinerario)
        })();
    }, []);

    return (
        <div className="w-[700px] p-5 bg-[#333] rounded-lg text-center text-white">
            <h1 className="text-3xl mb-5">
                Listar Itinerario
            </h1>

            {itinerario ? (
                <ul
                    className="w-full mt-5 flex flex-col gap-2"
                >
                    <li className="grid grid-cols-2 p-4 gap-3 rounded-lg bg-[#222] mb-3">

                        <div className="flex flex-row gap-4 justify-start">
                            <SendHorizontal color="green" />
                            Início: {itinerario?.inicio || "Caregando ..."}
                        </div>

                        <div className="flex flex-row gap-4 justify-start">
                            {/* Van: {van ? van.placa : "Nenhuma van"} */}
                        </div>

                        <div className="flex flex-row gap-4 justify-start">
                            <SendHorizontal color="#ff3421" />
                            Final: {itinerario?.final || "Carregando ..."}
                        </div>

                        <div className="flex flex-row gap-4 justify-start">
                            {/* Motorista: {motorista ? motorista.nome : "Nenhum motorista"} */}
                        </div>

                    </li>

                    {alunos && alunos.map((aluno, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center bg-[#222] px-4 py-2 rounded-lg text-lg"
                        >
                            <div className="flex flex-row justify-start items-center gap-3">

                                <div className="flex flex-col justify-start items-start">
                                    <span className="text-lg">{aluno.nome}</span>
                                    <span className="text-sm text-slate-300">{aluno.rua}, {aluno.bairro} - {aluno.numero}</span>
                                </div>
                            </div>
                            {aluno.presenca ? <Check color="green" /> : <X color={"#ff3421"} />}
                        </li>
                    ))}
                </ul>
            ) : (
                <div>Motorista não está a nenhum itinerario</div>
            )}
        </div>
    );
}