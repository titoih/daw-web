window.addEventListener('load', iniciar);

function iniciar() {
    const navbarHeader = document.getElementById('navbar-header');
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

    //Responsive: mostrar u ocultar navbar con el botón hamburguesa:
    document.getElementsByClassName('menu-toggle')[0].addEventListener('click', function () {
        document.getElementsByClassName('navbar-list')[0].classList.toggle('show');
    })
}


