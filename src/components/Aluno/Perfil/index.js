"use client";
import { getItinerarioById } from "@/controllers/itinerario";
import React, { useEffect, useState } from "react";
import { GetCookie } from "@/actions/cookie";

export default function VerPerfil() {
    const [perfil, setPerfil] = useState({})
    const [itinerario, setItinerario] = useState(null);
    const [loading, setLoading] = useState(true);

    const camposOcultos = ["id", "itinerario", "fotoB64", "senha", "presenca", "ordem"];

    useEffect(() => {
        (async () => {
            const data = await GetCookie();
            setPerfil(data.data);

            if (data.data.itinerario) {
                const itinerarioData = await getItinerarioById(data.data.itinerario);
                setItinerario(itinerarioData);
            }

            setLoading(false)
        })();
    }, []);

    if (loading) {
        return (
            <div className="text-white p-8">
                <p>Carregando...</p>
            </div>
        );
    }

    return (
        <div className="px-16 py-8 bg-[#333] rounded-lg w-[700px] text-white">
            <h1 className="text-3xl mb-5">Ver Perfil</h1>

            <div className="grid grid-cols-2 gap-5 w-full">
                {Object.entries(perfil)
                    .filter(([key]) => !camposOcultos.includes(key))
                    .map(([key, value]) => (
                        <div key={key}>
                            <p className="text-lg capitalize">{key}</p>
                            <p className="bg-[#232323] w-full rounded-md py-2 border border-white px-4">
                                {value || "Não informado"}
                            </p>
                        </div>
                    ))
                }

                <div>
                    <p className="text-lg">Itinerário</p>
                    <p className="bg-[#232323] w-full rounded-md py-2 border border-white px-4">
                        {itinerario ? itinerario.nome : "Não informado"}
                    </p>
                </div>
            </div>
        </div>
    );
}