"use client"
import { use, useEffect, useState, useSyncExternalStore } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Check, Menu, SendHorizontal, X } from "lucide-react";


export default function ItinerarioAdmin() {
    const [itinerarios, setItinerarios] = useState([]);
    const [selectedItinerario, setSelectedItinerario] = useState(null);
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [itiner, setItiner] = useState(null)

    const [motorista, setMotorista] = useState(null)
    const [van, setVan] = useState(null)

    useEffect(() => {
        const fetchItinerarios = async () => {
            try {
                const response = await fetch("http://localhost:3002/itinerario");
                if (!response.ok) throw new Error("Erro ao buscar itinerários");
                const data = await response.json();
                setItinerarios(data);
            } catch (err) {
                setError("Erro ao carregar itinerários.");
            }
        };
        fetchItinerarios();
    }, []);

    useEffect(() => {
        if (!selectedItinerario) return;

        setLoading(true);
        // const fetchAlunos = async () => {
        //     try {
        //         const response = await fetch(`http://localhost:3002/itinerario/aluno/${selectedItinerario}`);
        //         if (!response.ok) throw new Error("Erro ao buscar alunos");
        //         const data = await response.json();
        //         setAlunos(data);
        //     } catch (err) {
        //         setError("Erro ao carregar alunos.");
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        const fetchAlunos = async () => {
            try {
                const response = await fetch(`http://localhost:3002/itinerario/aluno/${selectedItinerario}`);
                if (!response.ok) throw new Error("Erro ao buscar alunos");
                let data = await response.json();
        
                data = data.sort((a, b) => a.ordem - b.ordem);
        
                setAlunos(data);
            } catch (err) {
                setError("Erro ao carregar alunos.");
            } finally {
                setLoading(false);
            }
        };
        
        const fetchItinerario = async () => {
            try {
                const response = await fetch(`http://localhost:3002/itinerario/${selectedItinerario}`);
                if (!response.ok) throw new Error("Erro ao buscar itinerario");
                const data = await response.json();
                setItiner(data);
            } catch (err) {
                setError("Erro ao carregar alunos.");
            } finally {
                setLoading(false);
            }
        };
        fetchItinerario()
        fetchAlunos();
    }, [selectedItinerario]);

    useEffect(() => {
        const fetchMotorista = async () => {

            if (itiner?.motorista == null) return
            try {
                const response = await fetch(`http://localhost:3002/driver/${itiner.motorista}`);
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

            if (itiner?.van == null) return

            try {
                const response = await fetch(`http://localhost:3002/van/${itiner.van}`);
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
    }, [itiner])

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const updatedAlunos = Array.from(alunos);
        const [movedAluno] = updatedAlunos.splice(result.source.index, 1);
        updatedAlunos.splice(result.destination.index, 0, movedAluno);

        const newAlunos = updatedAlunos.map((aluno, index) => ({
            ...aluno,
            ordem: index + 1,
        }));

        setAlunos(newAlunos);
        console.log(newAlunos)
    };

    const salvarOrdenacao = async () => {
        console.log(alunos)
        try {
            await fetch(`http://localhost:3002/student/aluno/ordenar`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ alunos }),
            });
            alert("Ordenação salva com sucesso!");
        } catch (error) {
            alert("Erro ao salvar ordenação.");
        }
    };

    return (
        <div className="w-[700px] p-5 bg-[#333] rounded-lg text-center text-white">
            <h1 className="text-3xl mb-5">
                Listar Trajetos
            </h1>

            <select
                value={selectedItinerario || ""}
                onChange={(e) => setSelectedItinerario(Number(e.target.value))}
                className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
            >
                <option value="">Selecione um itinerário para Listar</option>
                {itinerarios.map((itinerario) => (
                    <option key={itinerario.id} value={itinerario.id}>
                        {itinerario.nome}
                    </option>
                ))}
            </select>

            {loading && <p>Carregando alunos...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {selectedItinerario && !loading && alunos.length > 0 && (

                <DragDropContext onDragEnd={handleDragEnd}>

                    <Droppable droppableId="alunos">

                        {(provided) => (
                            <ul
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="w-full mt-5 flex flex-col gap-2"
                            >
                                <li className="grid grid-cols-2 p-4 gap-3 rounded-lg bg-[#222] mb-3">

                                    <div className="flex flex-row gap-4 justify-start">
                                        <SendHorizontal color="green" />
                                        Início: {itiner.inicio}
                                    </div>

                                    <div className="flex flex-row gap-4 justify-start">
                                        Van: {van ? van.placa : "Nenhuma van"}
                                    </div>

                                    <div className="flex flex-row gap-4 justify-start">
                                        <SendHorizontal color="#ff3421" />
                                        Final: {itiner.final}
                                    </div>

                                    <div className="flex flex-row gap-4 justify-start">
                                        Motorista: {motorista ? motorista.nome : "Nenhum motorista"}
                                    </div>

                                </li>

                                {alunos.map((aluno, index) => (
                                    <Draggable key={aluno.id} draggableId={aluno.id.toString()} index={index}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="flex justify-between items-center bg-[#222] px-4 py-2 rounded-lg text-lg"
                                            >
                                                <div className="flex flex-row justify-start items-center gap-3">
                                                    <Menu />
                                                    <div className="flex flex-col justify-start items-start">
                                                        <span className="text-lg">{aluno.nome}</span>
                                                        <span className="text-sm text-slate-300">{aluno.rua}, {aluno.bairro} - {aluno.numero}</span>
                                                    </div>
                                                </div>
                                                {aluno.presenca ? <Check color="green" /> : <X color={"#ff3421"} />}
                                            </li>
                                        )}
                                    </Draggable>
                                ))}

                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            )}

            <button
                onClick={salvarOrdenacao}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
            >
                Salvar Ordem
            </button>

        </div>
    );
}