export async function getMotoristas() {
    try {
        const resp = await fetch(`http://localhost:3002/driver`)
        const data = await resp.json()

        return resp.status == 200 ? data : {}
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}

export async function getMotoristaById(id) {
    try {
        const resp = await fetch(`http://localhost:3002/driver/${id}`)
        const data = await resp.json()

        return resp.status == 200 ? data : {}
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}

export async function createMotorista(form) {
    try {
        const options = {
            method: "POST",
            body: JSON.stringify(form),
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

export async function updateMotorista(id, form) {
    try {
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
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

export async function deleteMotorista(id) {
    if (!confirm("Tem certeza que deseja excluir este motorista?")) return false

    try {
        const resp = await fetch(`http://localhost:3002/driver/${id}`, { method: "DELETE" })

        return resp.status == 200 ? true : false
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}