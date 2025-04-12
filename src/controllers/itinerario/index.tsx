import { Aluno, Itinerario, ItinerarioCreate } from "@/@types/type"

export async function getItinerarios(): Promise<Itinerario[]> {
    try {
        const resp = await fetch(`http://localhost:3002/itinerario`)
        const data: Itinerario[] = await resp.json()

        return resp.status == 200 ? data : []
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}

export async function getItinerarioById(id: number | undefined): Promise<Itinerario | null> {
    try {
        if(!id) return null
        const resp = await fetch(`http://localhost:3002/itinerario/${id}`)

        const data: Itinerario = await resp.json()
        return resp.status == 200 ? data : null
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}

export async function createItinerario(itinerario: ItinerarioCreate) {
    try {
        const options = {
            method: "POST",
            body: JSON.stringify(itinerario),
            headers: { "Content-Type": "application/json" },
        }
        const resp = await fetch("http://localhost:3002/admin/createItinerario", options);

        if (resp.status == 201) {
            alert("Cadastro realizado com sucesso!")
            return true
        } else {
            throw new Error("Erro ao cadastrar.")
        }
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}

export async function updateItinerario(id: number, itinerario: ItinerarioCreate) {
    try {
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(itinerario),
        }
        const resp = await fetch(`http://localhost:3002/itinerario/${id}`, options);

        if (resp.status == 200) {
            alert("Atualizado com sucesso!")
            return true
        } else {
            throw new Error("Erro ao atualizar.")
        }
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}

export async function deleteItinerario(id: number): Promise<boolean> {
    if (!confirm("Tem certeza que deseja excluir este itinerario?")) return false

    try {
        const resp = await fetch(`http://localhost:3002/itinerario/${id}`, { method: "DELETE" })

        return resp.status == 200 ? true : false
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}

export async function getItinerariosByAluno(id: number): Promise<Aluno[]> {
    try {
        const resp = await fetch(`http://localhost:3002/itinerario/aluno/${id}`)
        let data = await resp.json()

        if (resp.status == 200) {
            data = data.sort((a: Aluno, b: Aluno) => {
                const ordemA = a.ordem ?? Infinity;
                const ordemB = b.ordem ?? Infinity;
                return ordemA - ordemB;
            });
            return data
        } else {
            return []
        }

    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}