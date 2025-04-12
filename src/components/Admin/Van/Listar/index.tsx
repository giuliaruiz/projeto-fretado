"use client"
import { Pencil, Trash2 } from "lucide-react"
import { useVan } from "./hooks/useVan"
import { useState } from "react"
import Modal from "./modal"
import { Van } from "@/@types/type"

export default function ListarVan() {

    const [vanSelecionado, setVanSelecionado] = useState<Van | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const { vans, setVans, itinerarioByVan, excluirVan } = useVan()

    const abrirModal = (van: Van) => {
        setVanSelecionado(van)
        setModalOpen(true)
    }

    const fecharModal = () => {
        setModalOpen(false)
        setVanSelecionado(null)
    }

    return (
        <div className="w-[700px] p-5 bg-[#333] rounded-lg text-center text-white">
            <h1 className="text-3xl mb-5">
                Listar Van
            </h1>

            {vans.length == 0 && (
                <div>Sem nenhum dado</div>
            )}

            <ul className="w-full">
                {vans.map((van) => (
                    <li
                        key={van.id}
                        className="flex justify-between items-center bg-[#222] px-4 py-2 rounded-lg text-lg mb-3"
                    >
                        <div className="flex flex-col justify-start items-start">
                            <span className="text-lg">{van.modelo} ({van.placa})</span>
                            <span className="text-sm text-slate-300">Capacidade: {van.capacidade}</span>
                            <span className="text-sm text-slate-300">Itinerario:  {van.itinerario ? itinerarioByVan[van.itinerario] : "Nenhum trajeto"}</span>

                        </div>
                        <div className="flex flex-row gap-5 justify-center">
                            <Pencil
                                onClick={() => abrirModal(van)}
                                cursor={"pointer"}
                                color="#1e0bff"
                            />
                            <Trash2
                                onClick={() => excluirVan(van.id)}
                                color="#ff3421"
                                cursor={"pointer"}
                            />
                        </div>
                    </li>
                ))}
            </ul>

            {modalOpen && vanSelecionado && (
                <Modal
                    van={vanSelecionado}
                    fecharModal={fecharModal}
                    setVans={setVans}
                    vans={vans}
                />
            )}
        </div>
    );
}