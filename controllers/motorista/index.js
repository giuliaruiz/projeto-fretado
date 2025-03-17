export async function getMotoristas() {
    try {
        const resp = await fetch(`http://localhost:3002/driver`)
        const data = await resp.json()

        if(resp.status == 200){
            return data
        }else {
            return []
        }
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}

export async function getMotoristaById(id) {
    try {
        const resp = await fetch(`http://localhost:3002/driver/${id}`)
        const data = await resp.json()

        if(resp.status == 200){
            return data
        }else {
            return {}
        }
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}