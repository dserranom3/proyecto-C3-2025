const up = JSON.parse(localStorage.getItem("usuario"));
if (!up) window.location.href = "login.html";

let selPEI = document.getElementById("selPEI");
let inputObservacion = document.getElementById("txtObservacion");
let btnGuardar = document.getElementById("btnGuardarProgreso");

window.onload = function () {
    fetch("http://localhost:3000/api/listar-pei")
    .then(res => res.json())
    .then(data => {
        data.forEach(p => {
            let option = document.createElement("option");
            option.value = p._id;
            // Muestra descripción del PEI y nombre estudiante si está disponible
            let nombreEst = p.estudianteId ? p.estudianteId.nombre : "";
            option.textContent = `${nombreEst} - ${p.descripcion}`;
            selPEI.appendChild(option);
        });
    });
};

btnGuardar.addEventListener("click", () => {
    let progreso = {
        peiId: selPEI.value,
        observacion: inputObservacion.value
    };
    fetch("http://localhost:3000/api/registrar-progreso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(progreso)
    })
    .then(res => res.json())
    .then(data => {
        Swal.fire("Éxito", "Progreso registrado", "success");
        inputObservacion.value = "";
    });
});