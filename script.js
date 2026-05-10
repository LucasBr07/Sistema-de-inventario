const API_USUARIOS = "https://inventario-backend-9oz3.onrender.com/usuarios";

function abrirLogin() {
    document.getElementById("modalLogin").style.display = "flex";
}

function fazerLogin() {
    let login = document.getElementById("login").value;
    let senha = document.getElementById("senha").value;
    fetch(`${API_USUARIOS}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ login, senha })
    })
    .then(res => res.json())
    .then(data => {
        if (data) {
            document.getElementById("modalLogin").style.display = "none";
            document.getElementById("app").style.display = "block";
        } else {
            alert("Login inválido!");
        }
    });
}

function abrirCadastro() {
    document.getElementById("modalCadastro").style.display = "flex";
}

function fecharCadastro() {
    document.getElementById("modalCadastro").style.display = "none";
}

function cadastrarUsuario() {
    let nome = document.getElementById("nome").value;
    let login = document.getElementById("novoLogin").value;
    let senha = document.getElementById("novaSenha").value;
    const btn = document.getElementById("btnCadastrar");
    btn.textContent = "Cadastrando...";
    btn.disabled = true;
    fetch(`${API_USUARIOS}/cadastrar`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ nome, login, senha })
    })
    .then(() => {
        alert("Usuário cadastrado!");
        fecharCadastro();
    })
    .finally(() => {
        btn.textContent = "Cadastrar";
        btn.disabled = false;
    });
}

function mostrarSecao(secao) {
    document.getElementById("secaoBanner").style.display = secao === "home" ? "block" : "none";
    document.getElementById("secaoCards").style.display = secao === "home" ? "flex" : "none";
    document.getElementById("secaoUsuarios").style.display = secao === "usuarios" ? "block" : "none";
    if (secao === "usuarios") carregarUsuarios();
}

function carregarUsuarios() {
    fetch(`${API_USUARIOS}/listar`)
        .then(res => res.json())
        .then(usuarios => {
            const tbody = document.getElementById("tabelaUsuarios");
            tbody.innerHTML = "";
            usuarios.forEach(u => {
                tbody.innerHTML += `
                    <tr>
                        <td><input type="checkbox" value="${u.usuario_id}"></td>
                        <td>${u.usuario_id}</td>
                        <td>${u.nome}</td>
                        <td>${u.login}</td>
                    </tr>`;
            });
        });
}

function getSelecionadosUsuarios() {
    return [...document.querySelectorAll("#tabelaUsuarios input[type=checkbox]:checked")]
        .map(cb => cb.value);
}

function marcarTodosUsuarios(cb) {
    document.querySelectorAll("#tabelaUsuarios input[type=checkbox]")
        .forEach(c => c.checked = cb.checked);
}

function abrirModalUsuario() {
    document.getElementById("modalUsuarioTitulo").textContent = "Incluir Usuário";
    document.getElementById("editId").value = "";
    document.getElementById("formNome").value = "";
    document.getElementById("formLogin").value = "";
    document.getElementById("formSenha").value = "";
    document.getElementById("modalUsuario").style.display = "flex";
}

function editarUsuarioSelecionado() {
    const ids = getSelecionadosUsuarios();
    if (ids.length !== 1) return alert("Selecione exatamente 1 usuário para editar.");
    fetch(`${API_USUARIOS}/${ids[0]}`)
        .then(res => res.json())
        .then(u => {
            document.getElementById("modalUsuarioTitulo").textContent = "Editar Usuário";
            document.getElementById("editId").value = u.usuario_id;
            document.getElementById("formNome").value = u.nome;
            document.getElementById("formLogin").value = u.login;
            document.getElementById("formSenha").value = u.senha;
            document.getElementById("modalUsuario").style.display = "flex";
        });
}

function salvarUsuario() {
    const id = document.getElementById("editId").value;
    const body = {
        nome: document.getElementById("formNome").value,
        login: document.getElementById("formLogin").value,
        senha: document.getElementById("formSenha").value
    };
    const url = id ? `${API_USUARIOS}/${id}` : `${API_USUARIOS}/cadastrar`;
    const method = id ? "PUT" : "POST";
    fetch(url, { method, headers: {"Content-Type": "application/json"}, body: JSON.stringify(body) })
        .then(() => { fecharModalUsuario(); carregarUsuarios(); });
}

function excluirUsuarioSelecionado() {
    const ids = getSelecionadosUsuarios();
    if (ids.length === 0) return alert("Selecione ao menos 1 usuário para excluir.");
    if (!confirm(`Excluir ${ids.length} usuário(s)?`)) return;
    Promise.all(ids.map(id => fetch(`${API_USUARIOS}/${id}`, { method: "DELETE" })))
        .then(() => carregarUsuarios());
}

function fecharModalUsuario() {
    document.getElementById("modalUsuario").style.display = "none";
}