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
        document.querySelector('.navbar-list').classList.toggle('show');
    })

    //Comportamiento botones galeria de reviews
    const buttonLeft = document.querySelector('.button-left');
    const buttonRight = document.querySelector('.button-right');
    const reviewList = document.querySelector('.review-list');
    const reviewCards = reviewList.querySelectorAll('.review-card');
    
    let currentIndex = 0;
    const totalReviews = reviewCards.length;
    const visibleReviews = 4; // Número de revisiones visibles a la vez
    
    buttonLeft.addEventListener('click', function() {
      if (currentIndex > 0) {
        currentIndex--;
        reviewCards[currentIndex].scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        // Vuelve a mostrar la última tarjeta cuando se llega a la primera
        reviewCards[totalReviews - 1].scrollIntoView({ behavior: "smooth", block: "center" });
        currentIndex = totalReviews - 1;
      }
    });
    
    buttonRight.addEventListener('click', function() {
      if (currentIndex < totalReviews - 1) {
        currentIndex++;
        reviewCards[currentIndex].scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        // Vuelve a mostrar la primera tarjeta cuando se llega a la última
        reviewCards[0].scrollIntoView({ behavior: "smooth", block: "center" });
        currentIndex = 0;
      }
    });


    }


