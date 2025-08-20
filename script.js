let lista = JSON.parse(localStorage.getItem("listaCompras")) || [];
let tema = localStorage.getItem("tema") || "escuro"; // padrão escuro

function salvarLocal() {
  localStorage.setItem("listaCompras", JSON.stringify(lista));
}

function salvarTema() {
  localStorage.setItem("tema", tema);
}

function atualizarLista() {
  const ul = document.getElementById("lista");
  const total = document.getElementById("total");
  const pendentes = document.getElementById("pendentes");
  const comprados = document.getElementById("comprados");
  const empty = document.querySelector(".empty");

  ul.innerHTML = "";

  if (lista.length === 0) {
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
  }

  lista.forEach((item, index) => {
    let li = document.createElement("li");
    li.textContent = item.nome;
    if (item.comprado) li.classList.add("comprado");

    li.addEventListener("click", () => {
      lista[index].comprado = !lista[index].comprado;
      salvarLocal();
      atualizarLista();
    });

    ul.appendChild(li);
  });

  total.textContent = lista.length;
  pendentes.textContent = lista.filter(i => !i.comprado).length;
  comprados.textContent = lista.filter(i => i.comprado).length;
}

function adicionarItem() {
  const input = document.getElementById("itemInput");
  const valor = input.value.trim();

  if (valor !== "") {
    lista.push({ nome: valor, comprado: false });
    input.value = "";
    salvarLocal();
    atualizarLista();
  }
}

function limparLista() {
  lista = [];
  salvarLocal();
  atualizarLista();
}

function mostrarTodos() {
  atualizarLista();
}

function mostrarPendentes() {
  const ul = document.getElementById("lista");
  ul.innerHTML = "";

  lista
    .filter(item => !item.comprado)
    .forEach((item) => {
      let li = document.createElement("li");
      li.textContent = item.nome;
      ul.appendChild(li);
    });
}

function mostrarComprados() {
  const ul = document.getElementById("lista");
  ul.innerHTML = "";

  lista
    .filter(item => item.comprado)
    .forEach((item) => {
      let li = document.createElement("li");
      li.textContent = item.nome;
      li.classList.add("comprado");
      ul.appendChild(li);
    });
}

// 🔹 Alternar Tema
const toggleTheme = document.getElementById("toggleTheme");
function aplicarTema() {
  if (tema === "claro") {
    document.body.classList.add("claro");
    toggleTheme.textContent = "🌙";
  } else {
    document.body.classList.remove("claro");
    toggleTheme.textContent = "☀️";
  }
  salvarTema();
}

toggleTheme.addEventListener("click", () => {
  tema = tema === "escuro" ? "claro" : "escuro";
  aplicarTema();
});

// Inicializa lista e tema ao abrir
aplicarTema();
atualizarLista();
