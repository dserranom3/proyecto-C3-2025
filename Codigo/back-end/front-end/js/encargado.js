const usuarioObj = JSON.parse(localStorage.getItem("usuario"));
if(!usuarioObj || usuarioObj.rol !== "encargado") window.location.href = "dashboard.html";

const contenedor = document.getElementById("contenedorReportes");
const infoEst = document.getElementById("infoEstudiante");

document.addEventListener("DOMContentLoaded", async () => {
    const idEstudiante = usuarioObj.estudianteId;
    if(!idEstudiante) {
        infoEst.innerHTML = "<h2>No tienes estudiante asignado.</h2>";
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/api/listar-pei");
        const todos = await res.json();
        const misPeis = todos.filter(p => {
            let pId = (p.estudianteId && p.estudianteId._id) ? p.estudianteId._id : p.estudianteId;
            return pId === idEstudiante;
        });

        if(misPeis.length > 0 && misPeis[0].estudianteId.nombre) {
            infoEst.innerHTML = `<h2>Estudiante: ${misPeis[0].estudianteId.nombre}</h2>`;
        }

        if(misPeis.length === 0) {
            contenedor.innerHTML = "<p>No hay planes registrados.</p>";
            return;
        }

        contenedor.innerHTML = ""; 
        for (const pei of misPeis) {
            let nombreProg = pei.programaId ? pei.programaId.nombre : "General";
            let div = document.createElement("div");
            div.className = "programaCard"; 
            div.innerHTML = `
                <h3>${nombreProg}</h3>
                <p><strong>Meta:</strong> ${pei.descripcion}</p>
                <hr>
                <ul id="lista-${pei._id}"><li>Cargando...</li></ul>
            `;
            contenedor.appendChild(div);
            cargarProgresos(pei._id);
        }
    } catch (e) { console.error(e); }
});

async function cargarProgresos(peiId) {
    const res = await fetch(`http://localhost:3000/api/listar-progreso/${peiId}`);
    const data = await res.json();
    const ul = document.getElementById(`lista-${peiId}`);
    ul.innerHTML = "";
    if(data.length === 0) ul.innerHTML = "<li>Sin reportes.</li>";
    else {
        data.reverse().forEach(d => {
            ul.innerHTML += `<li>${d.observacion} <small>(${new Date(d.fecha).toLocaleDateString()})</small></li>`;
        });
    }
}