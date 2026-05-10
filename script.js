function abrirLogin() {
    document.getElementById("modalLogin").style.display = "flex";
}

function fazerLogin() {
    let login = document.getElementById("login").value;
    let senha = document.getElementById("senha").value;

    fetch("https://inventario-backend-9oz3.onrender.com/usuarios/login", {
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

const btn = document.querySelector("#modalCadastro button");
    btn.textContent = "Cadastrando...";
    btn.disabled = true;

function cadastrarUsuario() {
    let nome = document.getElementById("nome").value;
    let login = document.getElementById("novoLogin").value;
    let senha = document.getElementById("novaSenha").value;

    fetch("https://inventario-backend-9oz3.onrender.com/usuarios/cadastrar", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ nome, login, senha })
    })
    .then(() => {
        alert("Usuário cadastrado!");
        fecharCadastro();
    });
}