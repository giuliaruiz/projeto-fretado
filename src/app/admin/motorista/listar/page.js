"use client"
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react"

export default function ListaMotorista() {
    const [motoristas, setMotoristas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [itinerarios, setItinerarios] = useState({});

    useEffect(() => {
        fetchMotorista()
    }, [])


    const fetchMotorista = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:3002/driver");
            if (!response.ok) throw new Error("Erro ao buscar motoristas");

            const data = await response.json();
            setMotoristas(data);

            fetchItinerarios(data);
        } catch (err) {
            setError("Erro ao carregar motoristas.");
        } finally {
            setLoading(false);
        }
    };

    const fetchItinerarios = async (motoristas) => {
        const itinerarioMap = {};

        await Promise.all(
            motoristas.map(async (motorista) => {
                if (motorista.itinerario) {
                    try {
                        const response = await fetch(`http://localhost:3002/itinerario/${motorista.itinerario}`);
                        if (!response.ok) throw new Error("Erro ao buscar itinerario");
                        const data = await response.json();
                        itinerarioMap[motorista.itinerario] = data.nome;
                    } catch (err) {
                        itinerarioMap[motorista.itinerario] = "Erro ao carregar";
                    }
                }
            })
        );

        setItinerarios(itinerarioMap);
    };

    const excluirMotorista = async (id, idItinerario) => {

        if (!confirm("Tem certeza que deseja excluir este motorista?")) return;

        if (idItinerario) {
            try {
                const response = await fetch(`http://localhost:3002/itinerario/${idItinerario}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ motorista: null }),
                });

                if (!response.ok) throw new Error("Erro ao salvar");

            } catch (err) {
                console.error(err);
            }
        }

        try {
            const response = await fetch(`http://localhost:3002/driver/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Erro ao excluir motorista");
            setMotoristas(motoristas.filter(motorista => motorista.id !== id));
        } catch (err) {
            setError("Erro ao excluir motorista.");
        }
    };

    return (
        <div className="w-[700px] p-5 bg-[#333] rounded-lg text-center text-white">
            <h1 className="text-3xl mb-5">
                Listar Motorista
            </h1>

            {loading && <p>Carregando...</p>}
            {error && <p className="text-red-600 text-base mb-3">{error}</p>}

            <ul className="w-full">
                {motoristas.map((motorista) => (
                    <li
                        key={motorista.id}
                        className="flex justify-between items-center bg-[#222] px-4 py-2 rounded-lg text-lg mb-3"
                    >
                        <div className="flex flex-col justify-start items-start">
                            <span className="text-lg">{motorista.nome}</span>
                            <span className="text-sm text-slate-300">{motorista.email}</span>
                            <span className="text-sm text-slate-300">Itinerario:  {itinerarios[motorista.itinerario] || "Nenhum trajeto"}</span>
                        </div>
                        <Trash2
                            onClick={() => excluirMotorista(motorista.id, motorista.itinerario)}
                            color="red"
                            cursor={"pointer"}
                        />
                    </li>
                ))}
            </ul>

            {motoristas.length === 0 && !loading && <p>Nenhum motorista encontrado.</p>}
        </div>
    );
}