"use client"
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Check, Menu, SendHorizontal, X } from "lucide-react";
import { GetCookie } from "@/actions/cookie";
import { getItinerariosByAluno } from "@/controllers/itinerario";


export default function ItinerarioAdmin() {

    const [itinerario, setItinerario] = useState(null)
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [motorista, setMotorista] = useState(null)
    const [van, setVan] = useState(null)


    useEffect(() => {
        (async () => {
            try {
                const data = await GetCookie();
                if (!data || !data.data.itinerario) {
                    setItinerario(null)
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
        if (!itinerario) return
        (
            async () => {
                const data = await getItinerariosByAluno(itinerario.id)
                setAlunos(data)
            }
        )()

    }, [itinerario]);

    // useEffect(() => {
    //     const fetchMotorista = async () => {

    //         if (itiner?.motorista == null) return
    //         try {
    //             const response = await fetch(`http://localhost:3002/driver/${itiner.motorista}`);
    //             if (!response.ok) throw new Error("Erro ao buscar motorista");
    //             const data = await response.json();
    //             setMotorista(data);
    //         } catch (err) {
    //             setError("Erro ao carregar motorista.");
    //         } finally {
    //             setLoading(false);
    //         }

    //     };

    //     const fetchVan = async () => {

    //         if (itiner?.van == null) return

    //         try {
    //             const response = await fetch(`http://localhost:3002/van/${itiner.van}`);
    //             if (!response.ok) throw new Error("Erro ao buscar van");
    //             const data = await response.json();
    //             setVan(data);
    //         } catch (err) {
    //             setError("Erro ao carregar van.");
    //         } finally {
    //             setLoading(false);
    //         }

    //     };
    //     fetchMotorista()
    //     fetchVan()
    // }, [itinerario])

    return (
        <div className="w-[700px] p-5 bg-[#333] rounded-lg text-center text-white">
            <h1 className="text-3xl mb-5">
                Listar Itinerario
            </h1>

            {loading && <p>Carregando alunos...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
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

                    {alunos.map((aluno, index) => (
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