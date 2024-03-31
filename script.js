window.addEventListener('load', iniciar);

function iniciar() {
    const cabecera = document.getElementById('cabecera');
    let lastScrollTop = 0;
    window.addEventListener('scroll', function () {
        let scrollTop = document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            cabecera.style.position = 'static';
        } else {
            cabecera.style.position = 'sticky';
            cabecera.style.top = '0px';
        }
        lastScrollTop = scrollTop;
    });
}


