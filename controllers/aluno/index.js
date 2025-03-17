export async function getAlunos() {
    try {
        const resp = await fetch(`http://localhost:3002/student`)
        const data = await resp.json()

        return resp.status == 200 ? data : {}
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}

export async function getAlunoById(id) {
    try {
        const resp = await fetch(`http://localhost:3002/student/${id}`)
        const data = await resp.json()

        return resp.status == 200 ? data : {}
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}

export async function createAluno() { }

export async function updateAluno() { }

export async function deleteAluno(id) {
    try {
        const resp = await fetch(`http://localhost:3002/student/${id}`, { method: "DELETE" })
        
        return resp.status == 200 ? true : false
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}