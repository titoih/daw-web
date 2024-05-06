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