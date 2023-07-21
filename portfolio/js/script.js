// 인트로 영역 애니메이션
const left = document.getElementById("left-side");

const handleMove = e => {
  left.style.width = `${e.clientX / window.innerWidth * 100}%`;
}

document.onmousemove = e => handleMove(e);

document.ontouchmove = e => handleMove(e.touches[0]);


// 스크롤 이벤트
const images = document.querySelectorAll('.js-lazyload-image');
const sections = document.querySelectorAll('.section');

let config = {
  rootMargin: '0px',
  threshold: 0
};

let observer = new IntersectionObserver((entries) => {
  console.log(entries);
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      intersectionHandler(entry);
    } 

  });
}, config);

sections.forEach(section => {
  observer.observe(section);
});

function intersectionHandler(entry) {
  const current = document.querySelector('.section.active');
  const next = entry.target;
  const header = next.querySelector(".section-header");

  if (current) {
    current.classList.remove('active');
  }
  if (next) {
    next.classList.add('active');
    document.body.style.setProperty("--color-bg", next.dataset.bgcolor);
  }
}

images.forEach(image => {
  observer.observe(image);
});

function preloadImage(img) {
  const src = img.getAttribute('data-src');
  if (!src) { return; }
  img.src = src;
}

// 이미지 슬라이드
var swiper = new Swiper('.product-slider', {
  spaceBetween: 30,
  effect: 'fade',
  // initialSlide: 2,
  loop: false,
  navigation: {
      nextEl: '.next',
      prevEl: '.prev'
  },
  // mousewheel: {
  //     // invert: false
  // },
  on: {
      init: function(){
          var index = this.activeIndex;

          var target = $('.product-slider__item').eq(index).data('target');

          console.log(target);

          $('.product-img__item').removeClass('active');
          $('.product-img__item#'+ target).addClass('active');
      }
  }

});

swiper.on('slideChange', function () {
  var index = this.activeIndex;

  var target = $('.product-slider__item').eq(index).data('target');

  console.log(target);

  $('.product-img__item').removeClass('active');
  $('.product-img__item#'+ target).addClass('active');

  if(swiper.isEnd) {
      $('.prev').removeClass('disabled');
      $('.next').addClass('disabled');
  } else {
      $('.next').removeClass('disabled');
  }

  if(swiper.isBeginning) {
      $('.prev').addClass('disabled');
  } else {
      $('.prev').removeClass('disabled');
  }
});

$(".js-fav").on("click", function() {
  $(this).find('.heart').toggleClass("is-active");
});