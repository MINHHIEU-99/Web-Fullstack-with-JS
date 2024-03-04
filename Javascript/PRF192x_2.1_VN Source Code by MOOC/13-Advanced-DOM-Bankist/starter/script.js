'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const section1 = document.querySelector('#section--1');
const btnScrollTo = document.querySelector('.btn--scroll-to');

const nav = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////
// Button Scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log('height/weight viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({behavior: "smooth"});
});


/////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');  // get the relative link not absolute link (this.href)
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   })
// })

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  
  // Matching strategy
  if(e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');  // get the relative link not absolute link (this.href)
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  } 
});


/*************************************************  Tabbed Component *************************************************/

// tabs .forEach(t => t.addEventListener('click', () => console.log('TAB'))); // => k t?i ?u t?c ?? x? lý

tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard Clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(tC => tC.classList.remove('operations__content--active'));

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});


/********************************** Menu fade animation ******************************************/
const handleHover = function(e) {
  if (e.target.classList.contains('nav__link')) {
    // console.log(this);
    const link = e.target;

    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}
// Passing 'argument' into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));


/******************************* Nav sticky navigation ***************************************/
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY);
//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky'); 
//   else nav.classList.remove('sticky');
// });
// // Intersection Observer API
// const obsCallback = function(entries, observer) {
//   entries.forEach(entry => {console.log(entry);})
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,     // khi scroll chu?t mà ph?n t? root(trong TH này là ??u trang giao v?i header là 0% thi` hàm stickyNav ?c g?i)
  rootMargin: `-${navHeight}px`,  // ng??ng giao nhau s? t?i s?m h?n 1 kho?ng px b?ng v?i height c?a nav
});
headerObserver.observe(header);



/**************************************** Reveal sections ************************************/
const allSections = document.querySelectorAll('.section');
const revealSection = function(entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function(section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
})

/***************************** Lazy Image ***************************************/ 

const imgTargets = document.querySelectorAll('img[data-src]');  //ch? ch?n nh?ng img co thuoc tinh data-src 
const loadImg = function(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () { // thay doi image trong src cung giong nhu 1 event, nen khi them addEventListener vao thi khi su kien thay doi img dien ra behind the scence xong thi moi xoa class lazy => ng dung` se k thay dc su thay doi hinh anh
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}

const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imageObserver.observe(img));

/******************************************* Slider ********************************************/ 
const slider = function() {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotsContainer = document.querySelector('.dots');
  
  let curSlide = 0;
  let maxSlide = slides.length;
  
  //Function
  
  const goToSlide = function(slide) {
    slides.forEach((s ,i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
    // curSlide = 0:  0%, 100%, 200%, 300%
    // curSlide = 1:  -100%, 0%, 100%, 200%
    // curSlide = 2:  -200%, -100%, 0%, 100%
    // curSlide = 3:  -300%, -200%, -100%, 0%
  };

  const createDots = function() {
  slides.forEach(function(_, i) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class='dots__dot' data-slide='${i}'></button>`)
  })
  };

  const activateDot = function(slide) {
    document
    .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const nextSlide = function() {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;

    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const prevSlide = function() {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function() {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  btnRight.addEventListener('click', nextSlide);

  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function(e) {
    if(e.key === 'ArrowLeft') prevSlide();
    e.key ==='ArrowRight' && nextSlide();
  });

  dotsContainer.addEventListener('click', function(e) {
    if(e.target.classList.contains('dots__dot')) {
      const {slide} = e.target.dataset;   // ~ const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  })
};
slider();

document.addEventListener('DOMContentLoaded', function(e) {
  console.log('HTML parsed and DOM tree built', e);
});

window.addEventListener('load', function(e) {
  console.log('Page fully loaded', e);
});


////////////////////////////////////////
// Creating and inserting elements
// const header = document.querySelector('.header');
// const message = document.createElement('div');

// message.classList.add('cookie-message');
// message.innerHTML = 
//   'We use cookied for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';

// header.append(message);

// document.querySelector('.btn--close--cookie').addEventListener('click', function () {
//   // message.remove(); 
//   message.parentElement.removeChild(message);
// });

// // Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10)+30+'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);

// console.log(logo.className);
// // Non-standard
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');

// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.twitter-link');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// // Data Attributes
// console.log(logo.dataset.versionNumber);

// // Classes
// logo.classList.add('c');
// logo.classList.remove('c');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// // Don't use
// logo.className = 'jonas';


////////////////////////////////////////
// Event Mouseenter
const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');

  h1.removeEventListener('mouseenter', alertH1);
}
h1.addEventListener('mouseenter', alertH1);


///////////////////////////////////////
// Event Propagation
// rgb(255,255,255)
// const randomInt = (min,max) => Math.floor(Math.random() * (max-min+1) + min);

// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });



//////// DOM traversing
// const h1 = document.querySelector('h1');

// Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);

// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'white';


// // Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// // Going sidewards: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function(el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });