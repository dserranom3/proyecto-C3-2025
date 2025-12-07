document.addEventListener("DOMContentLoaded", () => {
  const usuarioStr = localStorage.getItem("usuario");
  if(!usuarioStr) {
    window.location.href = "login.html";
    return;
  }
  const usuario = JSON.parse(usuarioStr);
  const rol = usuario.rol;
  const main = document.getElementById("mainContent");
  
  document.getElementById("btnLogout").addEventListener("click", () => {
    localStorage.removeItem("usuario");
    window.location.href = "login.html";
  });

  if(rol === "admin") {
    main.innerHTML = `
      <h2>Administrador: ${usuario.nombre}</h2>
      <ul>
        <li><a href="index.html">Registrar Usuarios</a></li>
        <li><a href="programas.html">Gestión de Programas</a></li>
        <li><a href="pei.html">Gestión de PEI</a></li>
      </ul>`;
  } else if(rol === "docente" || rol === "terapeuta") {
    main.innerHTML = `
      <h2>${rol.toUpperCase()}: ${usuario.nombre}</h2>
      <ul>
        <li><a href="pei.html">Ver PEI</a></li>
        <li><a href="progreso.html">Registrar Progreso</a></li>
      </ul>`;
  } else if(rol === "encargado") {
    main.innerHTML = `
      <h2>Encargado: ${usuario.nombre}</h2>
      <ul><li><a href="encargado.html">Ver Progreso del Estudiante</a></li></ul>`;
  } else {
    main.innerHTML = `<h2>Bienvenido ${usuario.nombre}</h2>`;
  }

  // Ocultar links del menú header según rol
  if(rol !== "admin") document.getElementById("linkProgramas").style.display = "none";
  if(!(rol === "admin" || rol === "docente" || rol === "terapeuta")) document.getElementById("linkPEI").style.display = "none";
  if(rol !== "encargado") document.getElementById("linkEncargado").style.display = "none";
});