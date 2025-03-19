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

export async function createMotorista() { }

export async function updateMotorista() { }

export async function deleteMotorista(id) {
    try {
        const resp = await fetch(`http://localhost:3002/driver/${id}`, { method: "DELETE" })
        
        return resp.status == 200 ? true : false
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}