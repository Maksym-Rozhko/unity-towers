document.addEventListener('DOMContentLoaded', () => {
  headerScrollFixed();
  burgerMenu();
  initSliders();
  navItemsSlidingUnderline();
  // btnScrollToTop();
  // smoothScrollToElem();
  // widgetAndPopUpShow();
  // popUpThanks();
});

function headerScrollFixed() {
  const headerFixed = document.querySelector('.header__desktop');
  
  window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;
    scrollY > 100 ? headerFixed.classList.add('header__desktop-active') : headerFixed.classList.remove('header__desktop-active');
  });
};

function burgerMenu() {
  const burgerMenuElem = document.querySelector('.burger-menu');
  const navigationMobileList = document.querySelector('.navigation__mobile');
  const navigationBackground = document.querySelector('.navigation-bg');

  burgerMenuElem.addEventListener('click', () => {
    burgerMenuElem.classList.toggle('burger-menu__active');
    navigationMobileList.classList.toggle('navigation__active');
    navigationBackground.classList.toggle('navigation-bg__active');
  });
};

function initSliders() {
  const pricingSliderContainer = document.querySelector('.pricing-slider.swiper-container');
  pricingSliderContainer.children[0].classList.add('price-wrapper');
  const mainScreenSlider = new Swiper('.main-slider.swiper-container', {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 0,
    slidesPerGroup: 1,
    freeMode: true,
    navigation: {
      nextEl: '.main-btn__next',
      prevEl: '.main-btn__prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
  });

  const gallerySlider = new Swiper('.gallery-slider.swiper-container', {
    slidesPerView: "auto",
    loop: true,
    centeredSlides: true,
    spaceBetween: 20,
    navigation: {
      nextEl: '.gallery-btn__next',
      prevEl: '.gallery-btn__prev',
    },
  });

  if(window.innerWidth <= 812) {
    pricingSliderContainer.children[0].classList.remove('price-wrapper');
    const pricingSlider = new Swiper('.pricing-slider.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: '.pricing-btn__next',
        prevEl: '.pricing-btn__prev',
      },
    });
  }
};

function navItemsSlidingUnderline() {
  const menu = document.querySelector('.nav-list');
  
  menu.addEventListener('mouseover', e => {
    const target = e.target;
    if (target.classList.contains('nav-list__link')) {
      menu.style.setProperty( 
        '--underline-width', `${target.offsetWidth}px`
      );
      menu.style.setProperty(
        '--underline-offset-x', `${target.offsetLeft}px`
      );
    };
  });
  menu.addEventListener('mouseleave', () =>
    menu.style.setProperty('--underline-width', '0')
  );
};

function btnScrollToTop() {
  const btnScrollUp = document.querySelector('.scroll-top');
  const topElem = document.querySelector('.main'); 
  
  btnScrollUp.addEventListener('click', () => {
    topElem.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}

function smoothScrollToElem() {
  const anchorsLink = document.querySelectorAll('a.nav-list__link');
  const scrollToTop = document.querySelectorAll('a.header__logo');
  const scrollToPageElem = document.querySelectorAll('a.main-button');
  const burgerMenuElem = document.querySelector('.burger-menu');
  const navigationMobileList = document.querySelector('.navigation__mobile');
  const navigationBackground = document.querySelector('.navigation-bg');

  const removeBurgerOverflow = () => {
    burgerMenuElem.classList.toggle('burger-menu__active');
    navigationMobileList.classList.toggle('navigation__active');
    navigationBackground.classList.toggle('navigation-bg__active');
  };

  const smoothScroll = (anchors) => {
    for (let anchor of anchors) {
      const blockID = anchor.getAttribute('href');
      anchor.addEventListener('click', (e) => {
        e.preventDefault();

        if(innerWidth <= 812 && burgerMenuElem.classList.contains('burger-menu__active')) {
          setTimeout(() => {
            removeBurgerOverflow();
          }, 500);
        }

        document.querySelector(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        if (anchor.classList.value === 'nav-list__link' || anchor.classList.value !== 'nav-list__link') {
          for (let anchor of anchors) {
            anchor.classList.remove('active-nav-link');
          }
          anchor.classList.add('active-nav-link');
        }
      });
    };
  };

  smoothScroll(scrollToTop);
  smoothScroll(anchorsLink);
  smoothScroll(scrollToPageElem);
}

function widgetAndPopUpShow() {
  const btnPopUpCloseElem = document.querySelectorAll('.pop-up__close');
  const popUpOverflow = document.querySelector('.pop-up__overflow');
  const popUpOverflow2 = document.querySelector('.pop-up__overflow2');
  const orderCallElems = document.querySelectorAll('.callback-form');

  const disableScroll = () => {
    const widthScroll = window.innerWidth - document.body.offsetWidth;
    document.body.dbScrollY = window.scrollY;
    document.body.style.cssText = `
        position: fixed;
        top: ${-window.scrollY}px;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        padding-right: ${widthScroll}px;
    `;
  };
  
  const enableScroll = () => {
    document.body.style.cssText = '';
    window.scroll({
        top: document.body.dbScrollY
    });
  };

  const openPopUp = () => {
    popUpOverflow.classList.add('pop-up__active');
    document.addEventListener('keydown', escapeHandler);
    disableScroll();
  };

  const openPopUpOrder = () => {
    popUpOverflow2.classList.add('pop-up__active');
    document.addEventListener('keydown', escapeHandler);
    disableScroll();
  };
    
  const closePopUp = () => {
    popUpOverflow.classList.remove('pop-up__active');
    popUpOverflow2.classList.remove('pop-up__active');
    popUpThanks.classList.remove('pop-up__active');
    document.removeEventListener('keydown', escapeHandler);
    enableScroll();
  };

  const escapeHandler = e => {
    e.code === 'Escape' ? closePopUp() : false;
    enableScroll();
  }

  setTimeout(() => {
    openPopUp();
  }, 30000);

  btnPopUpCloseElem.forEach(btn => btn.addEventListener('click', () => closePopUp()));

  const checkPopUpActive = (popUpElem, e) => {
    const target = e.target;
    target.classList.contains('pop-up__close') || target === popUpElem ? closePopUp() : false;
  };

  popUpOverflow.addEventListener('click', e => checkPopUpActive(popUpOverflow, e));

  popUpOverflow2.addEventListener('click', e => checkPopUpActive(popUpOverflow2, e));

  popUpThanks.addEventListener('click', e => checkPopUpActive(popUpThanks, e));

  orderCallElems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      openPopUpOrder();
    });
  });
}

function popUpThanks() {
  const popUpThanks = document.querySelector('.pop-up__thanks');
  const popUpOverflow = document.querySelector('.pop-up__overflow');
  const popUpOverflow2 = document.querySelector('.pop-up__overflow2');

  const showPopUpThanks = () => {
    popUpThanks.classList.add('pop-up__active');
  };

  const clearInputs = () => {
    const allInputs = document.querySelectorAll('.input-clear');
    allInputs.forEach(input => input.value = '');
  };

  const closePopUp = () => {
    popUpOverflow.classList.remove('pop-up__active');
    popUpOverflow2.classList.remove('pop-up__active');
    popUpThanks.classList.remove('pop-up__active');
  };
}
  
  // jQuery(".main-screen__form").on("submit", function(e) {
  //   e.preventDefault();
  //   jQuery.ajax({
  //       type: "POST",
  //       url: "phpTelegram/form-telegram.php",
  //       data: jQuery(this).serialize(),
  //       success: function(response) {
  //         setTimeout(() => {
  //             clearInputs();
  //             showPopUpThanks();
  //         }, 500);
  //       },
  //       error: function(response) {}
  //   });
  //   return false;
  // });

  // jQuery(".form-banner").on("submit", function(e) {
  //   e.preventDefault();
  //   jQuery.ajax({
  //       type: "POST",
  //       url: "phpTelegram/form-telegram.php",
  //       data: jQuery(this).serialize(),
  //       success: function(response) {
  //         setTimeout(() => {
  //             clearInputs();
  //             showPopUpThanks();
  //         }, 500);
  //       },
  //       error: function(response) {}
  //   });
  //   return false;
  // });

  // jQuery(".form-bottom").on("submit", function(e) {
  //   e.preventDefault();
  //   jQuery.ajax({
  //       type: "POST",
  //       url: "phpTelegram/form-telegram.php",
  //       data: jQuery(this).serialize(),
  //       success: function(response) {
  //         setTimeout(() => {
  //             clearInputs();
  //             showPopUpThanks();
  //         }, 500);
  //       },
  //       error: function(response) {}
  //   });
  //   return false;
  // });

  // jQuery(".pop-up__form").on("submit", function(e) {
  //   e.preventDefault();
  //   jQuery.ajax({
  //       type: "POST",
  //       url: "phpTelegram/form-telegram.php",
  //       data: jQuery(this).serialize(),
  //       success: function(response) {
  //         dataLayer.push({'event': 'send_form'});
  //         setTimeout(() => {
  //             clearInputs();
  //             closePopUp();
  //         }, 500);
  //         setTimeout(() => {
  //             showPopUpThanks();
  //         }, 1000);
          
  //       },
  //       error: function(response) {}
  //   });
  //   return false;
  // });

  // jQuery(function(){
  //   jQuery(".form-input--mask").mask("+38(999) 999-9999");
  // });
  

