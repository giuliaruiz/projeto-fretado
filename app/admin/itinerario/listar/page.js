"use client"
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


export default function ItinerarioAdmin() {
    const [itinerarios, setItinerarios] = useState([]);
    const [selectedItinerario, setSelectedItinerario] = useState(null);
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [itiner, setItiner] = useState(null)

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
        const fetchAlunos = async () => {
            try {
                const response = await fetch(`http://localhost:3002/itinerario/aluno/${selectedItinerario}`);
                if (!response.ok) throw new Error("Erro ao buscar alunos");
                const data = await response.json();
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




    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const updatedAlunos = Array.from(alunos);
        const [movedAluno] = updatedAlunos.splice(result.source.index, 1);
        updatedAlunos.splice(result.destination.index, 0, movedAluno);

        setAlunos(updatedAlunos);
    };

    return (
        <div style={{ maxWidth: "500px", margin: "40px auto", textAlign: "center" }}>
            <h2>Selecionar Itinerário</h2>

            <select
                value={selectedItinerario || ""}
                onChange={(e) => setSelectedItinerario(Number(e.target.value))}
                className="bg-[#222] text-white border-2 border-[#333] rounded-lg p-3 w-full focus:border-[#2ecc71] focus:outline-none"
            >
                <option value="">Selecione um itinerário</option>
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
                                style={{
                                    listStyle: "none",
                                    padding: "20px 0px",
                                    width: "400px",
                                    borderRadius: "10px",
                                }}
                            >
                                <li>
                                    <div style={{ fontSize: "20px", margin: "0px 0px 30px 0px" }}>
                                        <strong>Início: {itiner.inicio}</strong>
                                    </div>
                                </li>

                                {alunos.map((aluno, index) => (
                                    <Draggable key={aluno.id} draggableId={aluno.id.toString()} index={index}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    padding: "10px",
                                                    margin: "5px",
                                                    background: "#222",
                                                    color: "#fff",
                                                    borderRadius: "10px",
                                                    ...provided.draggableProps.style,
                                                    alignItems: "start"
                                                }}
                                            >
                                                <strong>{aluno.nome}</strong> <br />
                                                {aluno.rua}, {aluno.numero} - {aluno.bairro}
                                            </li>
                                        )}
                                    </Draggable>
                                ))}

                                <li>
                                    
                                    <div style={{ fontSize: "20px", margin: "30px 0px 0px 0px" }}>
                                        <strong>FInal: {itiner.final}</strong>
                                    </div>
                                </li>
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            )}

            {selectedItinerario && alunos.length === 0 && !loading && <p>Nenhum aluno encontrado.</p>}
        </div>
    );
}

const inputStyle = {
    flex: "1 1 48%",
    minWidth: "280px",
    padding: "0.9rem",
    backgroundColor: "#222",
    color: "#fff",
    border: "2px solid #333",
    borderRadius: "5px",
    fontSize: "1rem",
};