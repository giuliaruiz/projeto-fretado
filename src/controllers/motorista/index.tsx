import { Motorista, MotoristaCreate } from "@/@types/type"

export async function getMotoristas(): Promise<Motorista[]> {
    try {
        const resp = await fetch(`http://localhost:3002/driver`)
        const data: Motorista[] = await resp.json()

        return resp.status == 200 ? data : []
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}

export async function getMotoristaById(id: number): Promise<Motorista | null> {
    try {
        const resp = await fetch(`http://localhost:3002/driver/${id}`)
        const data: Motorista = await resp.json()

        return resp.status == 200 ? data : null
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}

export async function createMotorista(motorista: MotoristaCreate) {
    try {
        const options = {
            method: "POST",
            body: JSON.stringify(motorista),
            headers: { "Content-Type": "application/json" },
        }
        const resp = await fetch("http://localhost:3002/admin/createDriver", options);

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

export async function updateMotorista(id: number, motorista: MotoristaCreate) {
    try {
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(motorista),
        }
        const resp = await fetch(`http://localhost:3002/driver/${id}`, options);

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

export async function deleteMotorista(id: number): Promise<boolean> {
    if (!confirm("Tem certeza que deseja excluir este motorista?")) return false

    try {
        const resp = await fetch(`http://localhost:3002/driver/${id}`, { method: "DELETE" })

        return resp.status == 200 ? true : false
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}