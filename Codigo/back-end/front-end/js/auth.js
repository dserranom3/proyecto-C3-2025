document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");
  if(form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const correo = document.getElementById("txtCorreo").value.trim();
      const contrasenna = document.getElementById("txtPass").value.trim();

      try {
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correo, contrasenna })
        });
        const data = await res.json();

        if(!res.ok || !data.ok) {
          alert(data.msj || "Error en credenciales");
          return;
        }
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        window.location.href = "dashboard.html";
      } catch (err) { alert("Error de conexión"); }
    });
  }
});