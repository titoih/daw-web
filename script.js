window.addEventListener('load', iniciar);

function iniciar() {
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

    //Responsive: mostrar u ocultar navbar con el botón hamburguesa:
    document.querySelector('.menu-toggle').addEventListener('click', function () {
        document.getElementById('navigation-menu').classList.toggle('show');
        document.getElementById('language-picker').classList.toggle('show');
        document.getElementById('social-links-header').classList.toggle('show');
    })
}


