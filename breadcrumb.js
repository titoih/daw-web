// Guardamos la URL actual:
let url = window.location.href;
// La dividimos en segmentos que guardamos en un array:
let segmentos = url.split('/');
// Inicializamos un string vacío:
let breadcrumb = '';
// Iteramos sobre los segmentos y construimos el breadcrumb
for (let i = 0; i < segmentos.length; i++) {
    if (segmentos[i] !== '') {
        breadcrumb += `<li><a href="${segmentos.slice(0, i + 1).join('/')}">${segmentos[i]}</a></li>`;
    }
}
// Añadimos el breadcrumb al ul de la clase .breadcrumb vacío en el html:
document.querySelector('.breadcrumb').innerHTML = breadcrumb;