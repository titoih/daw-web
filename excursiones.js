window.addEventListener('load', iniciar);

function iniciar() {
    //La cabecera se fija arriba al hacer scroll up.
    const navbarHeader = document.querySelector('#navbar-header');
    let lastScrollTop = 0;
    window.addEventListener('scroll', function () {
        let scrollTop = document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop || scrollTop === 0) {
            navbarHeader.style.position = 'static';
        } else {
            navbarHeader.style.position = 'fixed';
            navbarHeader.style.backgroundColor = 'white';
        }
        lastScrollTop = scrollTop;
    });
}

const selectCategoria = document.querySelector('#categoria');

selectCategoria.addEventListener('change', function () {
    const categoriaSeleccionada = this.value; // Obtiene el valor de la categoría seleccionada

    // Verifica si se ha seleccionado la categoría vacía
    if (categoriaSeleccionada === '') {
        // Si es la categoría vacía, muestra todos los elementos
        const elementos = document.querySelectorAll('.senderismo, .kayak, .buceo, .astronomia');
        elementos.forEach(elemento => {
            elemento.style.display = 'flex'; // Cambia a 'flex' si usas esta propiedad en CSS
        });
    } else {
        // Oculta todos los elementos
        const elementos = document.querySelectorAll('.senderismo, .kayak, .buceo, .astronomia');
        elementos.forEach(elemento => {
            elemento.style.display = 'none';
        });

        // Muestra solo los elementos de la categoría seleccionada
        const elementosMostrar = document.querySelectorAll(`.${categoriaSeleccionada}`);
        elementosMostrar.forEach(elemento => {
            elemento.style.display = 'flex'; // Cambia a 'flex' si usas esta propiedad en CSS
        });
    }
});

// Obtiene el parámetro de categoría de la URL
const urlParams = new URLSearchParams(window.location.search);
const categoria = urlParams.get('categoria');

// Filtra los resultados según la categoría seleccionada
if (categoria) {
    const elementos = document.querySelectorAll('.senderismo, .kayak, .buceo, .astronomia');
    elementos.forEach(elemento => {
        if (elemento.classList.contains(categoria)) {
            elemento.style.display = 'flex';
        } else {
            elemento.style.display = 'none';
        }
    });
}
