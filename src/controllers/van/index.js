export async function getVans() {
    try {
        const resp = await fetch(`http://localhost:3002/van`)
        const data = await resp.json()

        return resp.status == 200 ? data : {}
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}

export async function getVanById(id) {
    try {
        const resp = await fetch(`http://localhost:3002/van/${id}`)
        const data = await resp.json()

        return resp.status == 200 ? data : {}
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}

export async function createMotorista() { }

export async function updateMotorista() { }

export async function deleteMotorista(id) {
    try {
        const resp = await fetch(`http://localhost:3002/van/${id}`, { method: "DELETE" })
        
        return resp.status == 200 ? true : false
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}