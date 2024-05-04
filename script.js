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
    let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); //Nos da el último día del mes
    let liTag = "";

    for (let i = 1; i < lastDateOfMonth; i++) {
        liTag += `<li>${i}</li>`;

    }
    currentDate.innerText = `${MONTHS[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = liTag;


}

renderCalendar();

const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
//Eventos hacer click en botón "prev" o "next":
prevButton.addEventListener('click', function () {
    currentMonth = currentMonth - 1;
    renderCalendar();
});
nextButton.addEventListener('click', function () {
    currentMonth = currentMonth + 1;
    renderCalendar();
})
