"use client";
import MapaMotorista from "@/components/MapaMotorista";
import { GetCookie } from "../../../actions/cookie";
import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import { getItinerariosByAluno } from "../../controllers/itinerario";

export default function Aluno() {

    const [checked, setChecked] = useState(true);
    const [studentAddresses, setStudentAddresses] = useState([])

    const handlePresenca = async (id) => {
        try {
            const response = await fetch(`http://localhost:3002/student/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ presenca: checked }),
            });

            if (!response.ok) throw new Error("Erro ao salvar");

        } catch (err) {
            console.error(err);
        }
    };

    // const alunosEnderecos = async (id) => {
    //     const itinerarios = await getItinerariosByAluno(id)


    //     const data = itinerarios.map(aluno => `${aluno.rua}, ${aluno.numero}, ${aluno.bairro}`);
    //     console.log(data)
    //     setStudentAddresses(data)
    // };

    const handleChange = (nextChecked) => {
        setChecked(nextChecked);
    };

    useEffect(() => {
        (async () => {
            const data = await GetCookie();
            handlePresenca(data.data.id)
            
        })();
    }, [handleChange]);

    return (
        <div className="w-full h-full">
            <h1 className="text-2xl mb-2">
                Bem-vindo, Aluno!
            </h1>
            <div className="flex gap-2 mb-4">
                <span>Você irá para a aula hoje ?</span>
                <Switch onChange={handleChange} checked={checked} />
            </div>

            <div className="w-full h-full">
                <MapaMotorista />
            </div>
        </div>
    );
}



