
(function ($) {

  "use strict";

  // HERO SLIDE
  $('.hero-slide').backstretch([
    "images/slideshow/Unsplash1.jpg",
    "images/slideshow/Unsplash2.jpg",
    "images/slideshow/Unsplash3.jpg",
  ], { duration: 2000, fade: 750 });

  // REVIEWS CAROUSEL
  $('.reviews-carousel').owlCarousel({
    items: 3,
    loop: true,
    dots: false,
    nav: true,
    autoplay: true,
    margin: 30,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  })

  // CUSTOM LINK
  $('.smoothscroll').click(function () {
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height();

    scrollToDiv(elWrapped, header_height);
    return false;

    function scrollToDiv(element, navheight) {
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop - navheight;

      $('body,html').animate({
        scrollTop: totalScroll
      }, 300);
    }
  });

})(window.jQuery);

let preloader = document.querySelector('.preloader');
let logoPreload = document.querySelector('.logo-preloader');
let logoLetter = document.querySelectorAll('.logo');
let navbar = document.querySelector('.navbar');
let loader = document.querySelector('.loader');

window.addEventListener('load', () => {
  setTimeout(() => {
    logoLetter.forEach((span, idx) => {
      setTimeout(() => {
        span.classList.add('active');
        loader.style.display = "none";
      }, (idx + 1) * 400)
    });
    setTimeout(() => {
      logoLetter.forEach((span, idx) => {
        setTimeout(() => {
          span.classList.remove('active')
          span.classList.add('fade');
        }, (idx + 1) * 50)
      })
    }, 2000);
    setTimeout(() => {
      preloader.style.top = '-100vh';
      navbar.classList.add('fixed-top');
    }, 2300)
  })
});

