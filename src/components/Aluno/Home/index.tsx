"use client";
import { useAlunosEnderecos } from "./hooks/useAlunosEnderecos";
import { getItinerarioById } from "@/controllers/itinerario";
import React, { useEffect, useState } from "react";
import { usePresenca } from "./hooks/usePresenca";
import { GetCookie } from "@/actions/cookie";
import Mapa from "@/components/Mapa";
import Switch from "react-switch";
import { Aluno, Itinerario } from "@/@types/type";

interface ICooki {
    data: Aluno;
    cargo: string;
}

export default function Home() {

    const [checked, setChecked] = useState<boolean>(true)
    const [cookie, setCookie] = useState<ICooki | null>(null)
    const [itinerario, setItinerario] = useState<Itinerario | null>(null)

    const { updatePresenca } = usePresenca()
    const { getAlunoEnderecos, alunosEnderecos } = useAlunosEnderecos()

    useEffect(() => {
        (async () => {
            const data: ICooki = await GetCookie()

            setCookie(data)
            setChecked(data.data.presenca);
            getAlunoEnderecos(data.data.itinerario)

            const dataItinerario = await getItinerarioById(data.data.itinerario)
            setItinerario(dataItinerario)
        })();
    }, []);

    const handleChange = (nextChecked: boolean) => {
        setChecked(nextChecked)
        updatePresenca(cookie?.data.id, nextChecked)
    };

    return (
        <div className="w-full h-full">
            <h1 className="text-2xl mb-2">
                Bem-vindo, Aluno!
            </h1>
            <div className="flex gap-2 mb-4">
                <span>Você irá para a aula hoje ?</span>
                <Switch
                    onChange={handleChange}
                    checked={checked}
                />
            </div>

            <div className="w-full h-full">
                {alunosEnderecos.length === 0 ? (<div>Nenhum itinerario vinculado</div>) : (
                    <Mapa
                        alunosEnderecos={alunosEnderecos}
                        cargo={cookie?.cargo}
                        itinerario={itinerario}
                    />
                )}
            </div>
        </div>
    );
}