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

export async function createAluno(form) {
    try {
        const options = {
            method: "POST",
            body: JSON.stringify(form),
            headers: { "Content-Type": "application/json" },
        }
        const resp = await fetch("http://localhost:3002/admin/createStudent", options);

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

export async function updateAluno(id, form, updatePresenca = false) {
    try {
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        }
        const resp = await fetch(`http://localhost:3002/student/${id}`, options);

        if (resp.status == 200) {
            if (!updatePresenca) {
                alert("Atualizado com sucesso!");
            }
            return true
        } else {
            throw new Error("Erro ao atualizar.")
        }
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}

export async function deleteAluno(id) {
    if (!confirm("Tem certeza que deseja excluir este aluno?")) return false

    try {
        const resp = await fetch(`http://localhost:3002/student/${id}`, { method: "DELETE" })

        return resp.status == 200 ? true : false
    } catch (err) {
        throw `Erro durante a requisição: ${err}`
    }
}

export async function updateOrdenacaoAluno(alunos) {
    try {
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ alunos }),
        }
        const resp = await fetch(`http://localhost:3002/student/aluno/ordenar`, options);

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