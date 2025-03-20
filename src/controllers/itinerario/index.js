export async function getItinerarios() {
    try {
        const resp = await fetch(`http://localhost:3002/itinerario`)
        const data = await resp.json()

        return resp.status == 200 ? data : {}
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}

export async function getItinerarioById(id) {
    try {
        const resp = await fetch(`http://localhost:3002/itinerario/${id}`)

        const data = await resp.json()
        return resp.status == 200 ? data : {}
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}

export async function createItinerario(form) {
    try {
        const options = {
            method: "POST",
            body: JSON.stringify(form),
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

export async function updateItinerario(id, form) {
    try {
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
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

export async function deleteItinerario(id) {
    if (!confirm("Tem certeza que deseja excluir este itinerario?")) return false

    try {
        const resp = await fetch(`http://localhost:3002/itinerario/${id}`, { method: "DELETE" })

        return resp.status == 200 ? true : false
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}

export async function getItinerariosByAluno(id) {
    try {
        const resp = await fetch(`http://localhost:3002/itinerario/aluno/${id}`)
        let data = await resp.json()
        data = data.sort((a, b) => a.ordem - b.ordem);

        return resp.status == 200 ? data : {}
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}