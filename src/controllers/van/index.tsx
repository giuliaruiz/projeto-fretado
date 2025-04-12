import { Van, VanCreate } from "@/@types/type"

export async function getVans(): Promise<Van[]> {
    try {
        const resp = await fetch(`http://localhost:3002/van`)
        const data: Van[] = await resp.json()

        return resp.status == 200 ? data : []
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}

export async function getVanById(id: number): Promise<Van | null> {
    try {
        const resp = await fetch(`http://localhost:3002/van/${id}`)
        const data: Van = await resp.json()

        return resp.status == 200 ? data : null
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}

export async function createVan(van: VanCreate) {
    try {
        const options = {
            method: "POST",
            body: JSON.stringify(van),
            headers: { "Content-Type": "application/json" },
        }
        const resp = await fetch("http://localhost:3002/admin/createVan", options);

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

export async function updateVan(id: number, van: VanCreate) {
    try {
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(van),
        }
        const resp = await fetch(`http://localhost:3002/van/${id}`, options);

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

export async function deleteVan(id: number): Promise<boolean> {
    if (!confirm("Tem certeza que deseja excluir esta Van?")) return false

    try {
        const resp = await fetch(`http://localhost:3002/van/${id}`, { method: "DELETE" })

        return resp.status == 200 ? true : false
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}