let inputCorreo = document.getElementById("txtCorreo");
let inputNombre = document.getElementById("txtNombre");
let inputContrasenna = document.getElementById("txtContrasenna");
let inputConfirmacion = document.getElementById("txtConfirmacion");
let selRol = document.getElementById("selRol");
let selEstudianteCargo = document.getElementById("selEstudianteCargo");
let divEstudiante = document.getElementById("divEstudianteCargo");
let btnGuardar = document.getElementById("btnGuardar");

window.onload = function() { cargarEstudiantes(); };

function cargarEstudiantes(){
    fetch("http://localhost:3000/api/listar-usuarios")
    .then(res => res.json())
    .then(data => {
        selEstudianteCargo.innerHTML = '<option value="">-- Seleccione un estudiante --</option>';
        data.filter(u => u.rol === 'estudiante').forEach(u => {
            let opt = document.createElement("option");
            opt.value = u._id;
            opt.textContent = u.nombre;
            selEstudianteCargo.appendChild(opt);
        });
    });
}

window.verificarRol = function() {
    if(selRol.value === "encargado") divEstudiante.style.display = "block";
    else {
        divEstudiante.style.display = "none";
        selEstudianteCargo.value = "";
    }
}

function validar(){
    if(inputNombre.value === "" || inputCorreo.value === "") return false;
    if(inputContrasenna.value !== inputConfirmacion.value) {
        alert("Contraseñas no coinciden");
        return false;
    }
    if(selRol.value === "encargado" && selEstudianteCargo.value === "") {
        alert("Debe seleccionar un estudiante");
        return false;
    }
    return true;
}

btnGuardar.addEventListener("click", () => {
    if(validar()){
        let usuario = {
            nombre : inputNombre.value,
            correo : inputCorreo.value,
            contrasenna : inputContrasenna.value,
            rol : selRol.value,
            estudianteId: (selRol.value === "encargado") ? selEstudianteCargo.value : null
        };
        fetch("http://localhost:3000/api/registrar-usuario",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        })
        .then(res => res.json())
        .then(data => Swal.fire("Éxito", "Usuario registrado", "success"));
    }
});