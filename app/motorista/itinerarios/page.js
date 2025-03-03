"use client";
import { useState } from "react";
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem"; // Arquivo auxiliar para tornar os itens arrastáveis

const ListaAlunos = () => {
  const [alunos, setAlunos] = useState([
    { id: "1", nome: "Giulia Ruiz", endereco: "Rua das Flores, 123" },
    { id: "2", nome: "João", endereco: "Av. Central, 456" },
    { id: "3", nome: "Pedro", endereco: "Travessa Sol, 789" },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = alunos.findIndex((aluno) => aluno.id === active.id);
    const newIndex = alunos.findIndex((aluno) => aluno.id === over.id);

    setAlunos(arrayMove(alunos, oldIndex, newIndex));
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">Lista de Alunos</h2>

      <div className="tabela-container">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={alunos} strategy={verticalListSortingStrategy}>
            <table className="w-full tabela-grande border border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr className="text-left">
                  <th className="border border-gray-600 px-6 py-4 w-1/6">Ordenação</th>
                  <th className="border border-gray-600 px-6 py-4 w-1/3">Nome do Aluno</th>
                  <th className="border border-gray-600 px-6 py-4 w-1/2">Endereço</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {alunos.map((aluno) => (
                  <SortableItem key={aluno.id} id={aluno.id} aluno={aluno} />
                ))}
              </tbody>
            </table>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default ListaAlunos;
