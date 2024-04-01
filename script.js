window.addEventListener('load', iniciar);

function iniciar() {
    const navbarHeader = document.getElementById('navbar-header');
    let lastScrollTop = 0;
    window.addEventListener('scroll', function () {
        let scrollTop = document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            navbarHeader.style.position = 'static';
        } else if (scrollTop != 0) {
            navbarHeader.style.position = 'fixed';
            navbarHeader.style.backgroundColor = 'white';
        } else {
            navbarHeader.style.position = 'static';
        }
        lastScrollTop = scrollTop;
    });
}


