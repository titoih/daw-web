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

/*Calendario dinámico:*/
const currentDate = document.querySelector("#current-date");
const daysTag = document.querySelector(".days");
/*Se guarda en las variables currentYear y currentMonth el mes y año actuales*/
let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();
let diasDisponibles = document.querySelectorAll('.disponible');

const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

/*Función eventoClick(): Comportamiento al hacer click sobre un día del mes en el calendario*/
//Reserva de fecha:
const horarios = document.querySelector('.horarios');
const userFeedback = document.querySelector('#user-feedback');
const formulario = document.querySelector('form');
const tickets = document.querySelector('.tickets');
const btnReservar = document.querySelector('form .btn');

const eventoClick = (e) => {
    date = new Date();
    if (date.getDate() === parseInt(e.target.innerText)) { //Si el día seleccionado es hoy
        if (date.getHours() >= 14) { //Deshabilitamos los botones si se pasa de la hora 
            document.querySelectorAll('.horarios input')[0].disabled = true;
            document.querySelectorAll('.horarios input')[1].disabled = true;
        } else if (date.getHours() >= 9) {
            document.querySelectorAll('.horarios input')[0].disabled = true;
        }
    } else {
        document.querySelectorAll('.horarios input')[0].disabled = false;
        document.querySelectorAll('.horarios input')[1].disabled = false;
    }
    horarios.classList.remove('hidden'); //Elimina la clase .hidden del fliendset .horarios y del formulario.
    formulario.classList.remove('hidden');
    userFeedback.innerText =
        `Horario para el día: ${e.target.innerText} de ${document.querySelector('#current-date').innerText.slice(0, document.querySelector('#current-date').innerText.indexOf(' ')).toLowerCase()} de ${document.querySelector('#current-date').innerText.slice(document.querySelector('#current-date').innerText.indexOf(' ') + 1)}`

    tickets.classList.add('hidden'); //Oculta los campos tickets y el botón de reservar
    btnReservar.classList.add('hidden');
    fieldsetPecioTotal.classList.add('hidden');
}

/*Función renderCalendar(): para generar dinámicamente los días del mes a mostrar*/
const renderCalendar = () => {
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); //Nos da el primer día del mes (día de la semana [0,6]), donde el 0 es el domingo
    let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); //Nos da el último día del mes
    let lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay(); //Nos da el último día del mes (día de la semana [0,6]), donde el 0 es el domingo
    let lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate(); //Nos da el el último día del mes anterior
    let liTag = "";

    if (currentMonth >= new Date().getMonth() && currentYear >= new Date().getFullYear()) {//Fechas futuras activas
        //Creamos los li de los últimos días del mes anterior
        for (let i = firstDayOfMonth - 1; i > 0; i--) {//firstDayOfMonth - 1, el -1 es porque nuestro primer día de la semana es el lunes no el domingo
            liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;

        }
        //Creamos los li del mes actual
        for (let i = 1; i <= lastDateOfMonth; i++) {
            //Se añade la clase "active" al día actual (coincide día, mes, año)
            let isToday = i === date.getDate() && currentMonth === new Date().getMonth()
                && currentYear === new Date().getFullYear() ? "active" : "";
            //Se añade la clase "disponible" a los jueves, viernes y sábados
            let isDay = (4 === new Date(currentYear, currentMonth, i).getDay()
                || 5 === new Date(currentYear, currentMonth, i).getDay()
                || 6 === new Date(currentYear, currentMonth, i).getDay())
                && i >= new Date().getDate() ? "disponible" : "inactive";
            liTag += `<li class="${isToday} ${isDay}">${i}</li>`;

        }
        //Creamos los li de los primeros días del mes siguiente
        for (let i = lastDayOfMonth; i < 7; i++) {
            liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;

        }
    } else {
        for (let i = 1; i <= lastDateOfMonth; i++) {//Para que las fechas pasadas no estén activas
            liTag += `<li class="inactive">${i}</li>`;
        }
    }
    currentDate.innerText = `${MONTHS[currentMonth]} ${currentYear}`; //Se actualiza el mes y año actual del calendario
    daysTag.innerHTML = liTag; //Se insertan los li creados dentro de .days

    for (const diaDisponible of diasDisponibles) {
        diaDisponible.removeEventListener('click', eventoClick); //Eliminamos las escuchas en los eventos click antiguos
    }

    diasDisponibles = document.querySelectorAll('.disponible'); //Actualizamos la lista de elemento li con clase .disponible

    for (const diaDisponible of diasDisponibles) {
        diaDisponible.addEventListener('click', eventoClick); //Al hacer click sobre cualquiera de los días disponibles para reserva se llama a eventoClick()
    }

}

renderCalendar(); //Llamada da renderCalendar()

//Comportamiento de los botones prev y next del calendario:
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
//Eventos hacer click en botón "prev" o "next":
prevButton.addEventListener('click', function () {
    currentMonth = currentMonth - 1; //Si hacemos click en prev se decrementa el mes actual en 1

    if (currentMonth < 0) {
        //Se crea una nueva fecha con el actual mes y año (hemos cambiado a un año anterior)
        date = new Date(currentYear, currentMonth);
        currentYear = date.getFullYear();
        currentMonth = date.getMonth();
    } else { //Si volvemos al año actual, actualiza la fecha (volvemos al año actual)
        date = new Date();
    }

    formulario.classList.add('hidden'); //Oculta el formulario

    renderCalendar();
});

nextButton.addEventListener('click', function () {
    currentMonth = currentMonth + 1; //Si hacemos click en next se incrementa el mes actual en 1

    if (currentMonth > 11) {
        //Se crea una nueva fecha con el actual mes y año (hemos cambiado a un año furuto)
        date = new Date(currentYear, currentMonth);
        currentYear = date.getFullYear();
        currentMonth = date.getMonth();
    } else { //Si volvemos al año actual, actualiza la fecha (volvemos al año actual)
        date = new Date();
    }

    formulario.classList.add('hidden'); //Oculta el formulario

    renderCalendar();
})

const radioButtons = document.querySelectorAll('.horarios input');
const fieldsetPecioTotal = document.querySelector('.precio-total');
const precioTotal = document.querySelector('#precio-total');
for (const input of radioButtons) {
    input.addEventListener('click', function () { //Al hacer click en cualquiera de los horarios se muestran los tipos de ticket.
        tickets.classList.remove('hidden');
    })
}

const adultos = document.querySelector('#adultos');
const menores = document.querySelector('#menores');
tickets.addEventListener('change', function () { //Al cambiar el valor de alguno de los selects
    if (adultos.value !== '0' || menores.value !== '0') { // Si se selecciona algún tipo de entrada muestra el botón de reserva
        btnReservar.classList.remove('hidden');
        fieldsetPecioTotal.classList.remove('hidden');
        precioTotal.innerText = `${adultos.value * 25.00 + menores.value * 18.00}`; //Cálculo del precio total
    } else if (adultos.value === '0' && menores.value === '0') { // Si no hay seleccionada ninguna entrada oculta el botón de reserva
        btnReservar.classList.add('hidden');
        fieldsetPecioTotal.classList.remove('hidden');
    }
})