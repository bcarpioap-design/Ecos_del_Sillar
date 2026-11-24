
// ===========================================
// ECOS DEL SILLAR
// Laboratorio 12 - Narrativa Digital
// ===========================================


// 1. Menú de navegación para celulares

const botonMenu = document.getElementById("boton-menu");
const menu = document.getElementById("menu");

const vistaMovil = window.matchMedia("(max-width: 768px)");

function actualizarMenu() {

    botonMenu.hidden = !vistaMovil.matches;
    menu.hidden = vistaMovil.matches;

    botonMenu.setAttribute("aria-expanded", "false");
    botonMenu.setAttribute("aria-label", "Abrir menú");
    botonMenu.textContent = "☰";

}

actualizarMenu();

vistaMovil.addEventListener("change", actualizarMenu);


// Abrir y cerrar el menú

botonMenu.addEventListener("click", function () {

    menu.hidden = !menu.hidden;

    botonMenu.setAttribute("aria-expanded", String(!menu.hidden));

    if (menu.hidden) {

        botonMenu.textContent = "☰";
        botonMenu.setAttribute("aria-label", "Abrir menú");

    } else {

        botonMenu.textContent = "✕";
        botonMenu.setAttribute("aria-label", "Cerrar menú");

    }

});


// 2. Cerrar menú al seleccionar un enlace

const enlacesMenu = document.querySelectorAll("#menu a");

enlacesMenu.forEach(function (enlace) {

    enlace.addEventListener("click", function () {

        if (vistaMovil.matches) {

            actualizarMenu();

            const destino = document.querySelector(
                enlace.getAttribute("href")
            );

            if (destino) {

                destino.setAttribute("tabindex", "-1");
                destino.focus({ preventScroll: true });

            }

        }

    });

});


// 3. Cerrar menú utilizando la tecla Escape

document.addEventListener("keydown", function (evento) {

    if (evento.key === "Escape" && vistaMovil.matches && !menu.hidden) {

        actualizarMenu();
        botonMenu.focus();

    }

});


// 4. Identificar la sección actual

const secciones = document.querySelectorAll("main section[id]");

function marcarSeccionActiva() {

    let seccionActual = "";

    secciones.forEach(function (seccion) {

        const posicion = seccion.getBoundingClientRect().top;

        if (posicion <= 150) {

            seccionActual = seccion.id;

        }

    });

    enlacesMenu.forEach(function (enlace) {

        enlace.classList.remove("activo");
        enlace.removeAttribute("aria-current");

        if (enlace.getAttribute("href") === "#" + seccionActual) {

            enlace.classList.add("activo");
            enlace.setAttribute("aria-current", "location");

        }

    });

}

window.addEventListener("scroll", marcarSeccionActiva, {
    passive: true
});

marcarSeccionActiva();


// 5. Animaciones de aparición

const elementosAnimados = document.querySelectorAll(
    ".titulo-seccion, .contenido-doble, .tarjeta, " +
    ".galeria-grid figure, .experiencia, .creditos-contenido article"
);

const reducirMovimiento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

if ("IntersectionObserver" in window && !reducirMovimiento.matches) {

    const observador = new IntersectionObserver(function (entradas) {

        entradas.forEach(function (entrada) {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("visible");
                observador.unobserve(entrada.target);

            }

        });

    }, {
        threshold: 0.1
    });

    elementosAnimados.forEach(function (elemento) {

        elemento.classList.add("animar");
        observador.observe(elemento);

    });

}


// 6. Botón para regresar al inicio

const botonSubir = document.createElement("button");

botonSubir.className = "boton-subir";
botonSubir.textContent = "↑";
botonSubir.setAttribute("aria-label", "Volver al inicio");
botonSubir.title = "Volver al inicio";
botonSubir.hidden = true;

document.body.appendChild(botonSubir);

window.addEventListener("scroll", function () {

    botonSubir.hidden = window.scrollY <= 500;

}, {
    passive: true
});

botonSubir.addEventListener("click", function () {

    const inicio = document.getElementById("inicio");

    inicio.setAttribute("tabindex", "-1");
    inicio.focus({ preventScroll: true });

    window.scrollTo({

        top: 0,
        behavior: reducirMovimiento.matches ? "instant" : "smooth"

    });

});


// 7. Evitar reproducción simultánea de audios y videos

const reproductores = document.querySelectorAll("audio, video");

reproductores.forEach(function (reproductor) {

    reproductor.addEventListener("play", function () {

        reproductores.forEach(function (otro) {

            if (otro !== reproductor) {

                otro.pause();

            }

        });

    });

});
