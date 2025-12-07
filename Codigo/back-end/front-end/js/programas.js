const usuarioPrograma = JSON.parse(localStorage.getItem("usuario"));
if(usuarioPrograma.rol !== "admin") window.location.href = "dashboard.html";

const form = document.getElementById("formPrograma");
const contLista = document.getElementById("listaProgramas");

async function cargarProgramas() {
  try {
    const res = await fetch("http://localhost:3000/api/listar-programas");
    const data = await res.json();
    contLista.innerHTML = data.map(p => `
      <div class="programaCard">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion || "Sin descripción"}</p>
      </div>`).join("");
  } catch (error) { console.error(error); }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("descripcion").value;
  await fetch("http://localhost:3000/api/registrar-programa", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ nombre, descripcion })
  });
  alert("Programa registrado");
  form.reset();
  cargarProgramas();
});

cargarProgramas();