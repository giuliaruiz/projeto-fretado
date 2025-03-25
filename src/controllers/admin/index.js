export async function getAdminById(id) {
    try {
        const resp = await fetch(`http://localhost:3002/admin/findAdmin/${id}`)
        const data = await resp.json()

        return resp.status == 200 ? data : {}
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}