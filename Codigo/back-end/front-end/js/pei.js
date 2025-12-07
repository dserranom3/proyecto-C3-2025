const upei = JSON.parse(localStorage.getItem("usuario"));
if(!upei) window.location.href = "login.html";

let selEstudiante = document.getElementById("selEstudiante");
let selPrograma = document.getElementById("selPrograma");
let inputDescripcion = document.getElementById("txtDescripcion");
let btnGuardar = document.getElementById("btnGuardarPEI");

window.onload = function(){
    fetch("http://localhost:3000/api/listar-usuarios")
    .then(res => res.json())
    .then(data => {
        data.filter(u => u.rol === "estudiante").forEach(u => {
            let option = document.createElement("option");
            option.value = u._id;
            option.textContent = u.nombre;
            selEstudiante.appendChild(option);
        });
    });

    fetch("http://localhost:3000/api/listar-programas")
    .then(res => res.json())
    .then(data => {
        data.forEach(p => {
            let option = document.createElement("option");
            option.value = p._id;
            option.textContent = p.nombre;
            selPrograma.appendChild(option);
        });
    });
};

btnGuardar.addEventListener("click", () => {
    let pei = {
        estudianteId: selEstudiante.value,
        programaId: selPrograma.value,
        descripcion: inputDescripcion.value
    };
    fetch("http://localhost:3000/api/registrar-pei", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pei)
    })
    .then(res => res.json())
    .then(data => Swal.fire("Éxito", "PEI registrado", "success"));
});