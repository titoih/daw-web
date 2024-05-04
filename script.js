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

const currentDate = document.querySelector("#current-date");
const daysTag = document.querySelector(".days");

//Se guarda en las variables currentYear y currentMonth el mes y año actuales
let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();

const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

const renderCalendar = () => {
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); //Nos da el primer día del mes (día de la semana [0,6]), donde el 0 es el domingo
    let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); //Nos da el último día del mes
    let lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay(); //Nos da el último día del mes (día de la semana [0,6]), donde el 0 es el domingo
    let lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate(); //Nos da el el último día del mes anterior
    let liTag = "";

    //Creamos los li de los últimos días del mes anterior
    for (let i = firstDayOfMonth - 1; i > 0; i--) {//firstDayOfMonth - 1, el -1 es porque nuestro primer día de la semana es el lunes no el domingo
        liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;

    }
    //Creamos los li del mes actual
    for (let i = 1; i <= lastDateOfMonth; i++) {
        //Se añade la clase "active" al día actual (coincide día, mes, año)
        let isToday = i === date.getDate() && currentMonth === new Date().getMonth()
            && currentYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;

    }
    //Creamos los li de los primeros días del mes siguiente
    for (let i = lastDayOfMonth; i < 7; i++) {
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;

    }

    currentDate.innerText = `${MONTHS[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = liTag;
}

renderCalendar();

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
    renderCalendar();
})
