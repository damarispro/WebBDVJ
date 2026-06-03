async function login() {
    const email =
        document.getElementById("username").value;
    const password =
        document.getElementById("password").value;
    try {
        const response = await fetch(
            "http://localhost:5000/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );
        const data = await response.json();
        if (data.ok) {
            const idUsuario = data.usuario.id;
            localStorage.setItem(
                "idUsuario",
                idUsuario
            );
            alert(
                "Bienvenido " +
                data.usuario.nombre
            );
            window.location.href =
                `juego/index.html?id=${idUsuario}`;
        } else {
            alert(
                "Usuario o contraseña incorrectos"
            );
        }
    } catch (error) {
        console.error(error);
        alert(
            "No se pudo conectar con la API"
        );
    }
}

function mostrarContenido() {
    const opcion = document.querySelector('input[name="opcion"]:checked');

    if (opcion) {
        document.getElementById("contenido").style.display = "block";
    }
}

function activarBoton() {
    const check1 = document.getElementById("check1").checked;
    const check2 = document.getElementById("check2").checked;

    document.getElementById("btnCheck").disabled = !(check1 && check2);
}

function cargarPaises() {
    const paises = {
        Mexico: ["Nuevo León", "Coahuila", "Tamaulipas"],
        USA: ["Texas", "California", "Washington"]
    };

    const selectPais = document.getElementById("pais");
    const selectRegion = document.getElementById("region");

    selectPais.innerHTML = "<option>Selecciona país</option>";

    for (let pais in paises) {
        let option = document.createElement("option");
        option.value = pais;
        option.text = pais;
        selectPais.appendChild(option);
    }

    selectPais.addEventListener("change", function () {
        selectRegion.innerHTML = "";

        paises[this.value].forEach(region => {
            let option = document.createElement("option");
            option.text = region;
            selectRegion.appendChild(option);
        });
    });
}

window.onload = cargarPaises;