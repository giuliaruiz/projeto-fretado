"use client"
import { SendHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { GetCookie } from "../../../actions/cookie";

export default function FretadoAluno() {

    const [itinerario, setItinerario] = useState(null)
    const [van, setVan] = useState(null)
    const [motorista, setMotorista] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const data = await GetCookie();
                if (!data || !data.data.itinerario) {
                    console.error("Erro: Cookie não contém itinerário válido.");
                    return;
                }

                const response = await fetch(`http://localhost:3002/itinerario/${data.data.itinerario}`);
                const itinerarioData = await response.json();
                setItinerario(itinerarioData);
            } catch (error) {
                console.error("Erro ao buscar itinerário:", error);
            }
        })();
    }, []);


    useEffect(() => {
        const fetchMotorista = async () => {

            if (itinerario?.motorista == null) return
            try {
                const response = await fetch(`http://localhost:3002/driver/${itinerario.motorista}`);
                if (!response.ok) throw new Error("Erro ao buscar motorista");
                const data = await response.json();
                setMotorista(data);
            } catch (err) {
                setError("Erro ao carregar motorista.");
            } finally {
                setLoading(false);
            }

        };

        const fetchVan = async () => {

            if (itinerario?.van == null) return

            try {
                const response = await fetch(`http://localhost:3002/van/${itinerario.van}`);
                if (!response.ok) throw new Error("Erro ao buscar van");
                const data = await response.json();
                setVan(data);
            } catch (err) {
                setError("Erro ao carregar van.");
            } finally {
                setLoading(false);
            }

        };
        fetchMotorista()
        fetchVan()
    }, [itinerario])

    return (
        <div className="w-[700px] p-5 bg-[#333] rounded-lg text-center text-white">
            <h1 className="text-3xl mb-5">
                Seu Trajeto
            </h1>
            <div className="grid grid-cols-2 p-4 gap-3 w-full rounded-lg bg-[#222] mb-3">

                <div className="flex flex-row gap-4 justify-start">
                    <SendHorizontal color="green" />
                    Início: {itinerario?.inicio || "Carregando..."}
                </div>

                <div className="flex flex-row gap-4 justify-start">
                    Van: {van ? van.placa : "Nenhuma van"}
                </div>

                <div className="flex flex-row gap-4 justify-start">
                    <SendHorizontal color="#ff3421" />
                    Final: {itinerario?.final || "Carregando..."}
                </div>

                <div className="flex flex-row gap-4 justify-start">
                    Motorista: {motorista ? motorista.nome : "Nenhum motorista"}
                </div>

            </div>
        </div>
    );
}
