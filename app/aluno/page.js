"use client";
import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import { GetCookie } from "../../actions/cookie";

export default function Aluno() {

    const [checked, setChecked] = useState(true);
    const [teste, setTeste] = useState(true);


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
        <div>
            <h1>Bem-vindo, Aluno!</h1>
            <p>Esta é a página exclusiva para alunos.</p>

            <div className="mt-4 flex gap-2">
                <span>Você irá para a aula hoje ?</span>
                <Switch onChange={handleChange} checked={checked} />
            </div>
        </div>
    );
}



