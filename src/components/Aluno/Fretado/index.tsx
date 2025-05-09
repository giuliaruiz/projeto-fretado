"use client"
import { SendHorizontal } from "lucide-react";
import { GetCookie } from "@/actions/cookie";
import { useEffect, useState } from "react";
import { useGets } from "./hooks/useGets";
import { Aluno } from "@/@types/type";

export default function Fretado() {

    const [perfil, setPerfil] = useState<Aluno | null>(null)

    const { itinerarioAluno, itinerario, van, motorista } = useGets()

    useEffect(() => {
        (async () => {
            const data = await GetCookie();
            setPerfil(data.data);
        })()
    }, [])

    useEffect(() => {
        if (perfil?.itinerario == null) return
        itinerarioAluno(perfil.itinerario)
    }, [perfil])

    return (
        <div className="px-6 sm:px-16 py-8 bg-[#333] rounded-lg w-full sm:w-[400px] md:w-[700px]">
            <h1 className="text-3xl mb-5">
                Seu Trajeto
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-3 w-full rounded-lg bg-[#222] mb-3">

                <div className="flex flex-row gap-4 justify-start">
                    <SendHorizontal color="green" />
                    Início: {itinerario?.inicio || "Nenhum itinerario"}
                </div>

                <div className="flex flex-row gap-4 justify-start">
                    Van: {van ? van.placa : "Nenhuma van"}
                </div>

                <div className="flex flex-row gap-4 justify-start">
                    <SendHorizontal color="#ff3421" />
                    Final: {itinerario?.final || "Nenhum itinerario"}
                </div>

                <div className="flex flex-row gap-4 justify-start">
                    Motorista: {motorista ? motorista.nome : "Nenhum motorista"}
                </div>

            </div>
        </div>
    );
}
