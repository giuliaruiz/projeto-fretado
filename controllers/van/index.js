export async function getVans() {
    try {
        const resp = await fetch(`http://localhost:3002/van`)
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

export async function getVanById(id) {
    try {
        const resp = await fetch(`http://localhost:3002/van/${id}`)
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