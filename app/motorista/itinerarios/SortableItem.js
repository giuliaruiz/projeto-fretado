import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem = ({ id, aluno }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners} className="hover:bg-gray-700 cursor-pointer">
      <td className="border border-gray-600 px-6 py-4 text-center">☰</td>
      <td className="border border-gray-600 px-6 py-4">{aluno.nome}</td>
      <td className="border border-gray-600 px-6 py-4">{aluno.endereco}</td>
    </tr>
  );
};
