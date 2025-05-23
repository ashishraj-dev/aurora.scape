AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

const toggleBtn = document.querySelector('.btn-mobile-nav');
const menuIcon = document.querySelector(
  '.icon-mobile-nav[name="menu-outline"]'
);
const closeIcon = document.querySelector(
  '.icon-mobile-nav[name="close-outline"]'
);
const sidebar = document.querySelector('.nav-links');
const scrollTopBtn = document.querySelector('.scrollTop');
const sidebarLinks = document.querySelectorAll('a:link');
const header = document.querySelector('header');
const wrapper = document.querySelector('.wrapper');
const mobileNav = this.document.querySelector('.icon-mobile-nav');
const marquee = document.querySelectorAll('.item');
let index = 0;
let interval;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;
const sliderContainer = document.querySelector('.slider-container');

function showSlide() {
  slides.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  index = (index + 1) % totalSlides;
  showSlide();
}

function prevSlide() {
  index = (index - 1 + totalSlides) % totalSlides;
  showSlide();
}

// window.onload = function () {
//   setInterval(nextSlide, 2000); // Runs nextSlide() every second
// };

function updateDimensions() {
  wrapperHeight = wrapper.getBoundingClientRect().height;
  headerHeight = header.getBoundingClientRect().height;
  totalHeight = wrapperHeight + headerHeight;
}
updateDimensions();

let isWideScreen = window.matchMedia('(min-width: 1135px)').matches;

document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('resize', function () {
    updateDimensions();
    const newIsWideScreen = window.matchMedia('(min-width: 1135px)').matches;

    // Only act if we're crossing the breakpoint
    if (isWideScreen !== newIsWideScreen) {
      if (newIsWideScreen) {
        sidebar.classList.remove('sidebar');
        sidebar.style.display = 'none';
        document.querySelector('.nav-links').style.display = 'flex';
        // Reset icons when going to wide screen
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      } else {
        document.querySelector('.nav-links').style.display = 'none';
      }
      isWideScreen = newIsWideScreen;
    }
  });

  // console.log(sidebarLinks);
  sidebarLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');

      if (href.startsWith('#')) {
        e.preventDefault();
        // Scroll to Top
        if (href === '#') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });

          if (sidebar.classList.contains('sidebar')) {
            sidebar.classList.remove('sidebar');
            sidebar.style.display = 'none';
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
          }
        }

        if (href !== '#' && href.startsWith('#')) {
          const sectionEl = document.querySelector(href);
          // sectionEl.scrollIntoView({ behavior: "smooth" });
          const headerOffset = totalHeight - wrapperHeight; // Adjust this value based on your header height
          const elementPosition = sectionEl.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.scrollY - headerOffset;

          if (scrollY <= headerOffset) {
            window.scrollTo({
              top: offsetPosition - headerOffset,
              behavior: 'smooth',
            });
          } else {
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
          // window.scrollTo({
          //   top: offsetPosition,
          //   behavior: "smooth",
          // });

          if (sidebar.classList.contains('sidebar')) {
            sidebar.classList.remove('sidebar');
            sidebar.style.display = 'none';
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
          }
        }
      }
    });
  });

  toggleBtn.addEventListener('click', function () {
    if (sidebar.classList.contains('sidebar')) {
      // Add close animation
      sidebar.classList.add('sidebar-anim-close');

      // Wait for animation to complete before hiding
      setTimeout(() => {
        sidebar.classList.remove('sidebar');
        sidebar.classList.remove('sidebar-anim-close');
        sidebar.style.display = 'none';
      }, 500); // Match animation duration
      menuIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    } else {
      sidebar.classList.add('sidebar');
      sidebar.style.display = 'flex';
      sidebar.classList.add('sidebar-anim-open');
      menuIcon.style.display = 'none';
      closeIcon.style.display = 'block';

      // Remove the open animation class after it's done
      setTimeout(() => {
        sidebar.classList.remove('sidebar-anim-open');
      }, 500);
    }
  });

  // Scroll effect for header
  window.addEventListener('scroll', function () {
    // const logo = document.querySelector(".logo");
    if (window.scrollY > wrapperHeight) {
      header.style.background = '#fff';
      header.style.position = 'fixed';
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      mobileNav.style.position = 'fixed';
      mobileNav.style.top = '12px';
      closeIcon.style.top = '15px';
      scrollTopBtn.classList.add('show-scrollTop');
      // logo.style.width = "100px";
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = 'none';
      header.style.position = 'relative';
      mobileNav.style.position = 'absolute';
      mobileNav.style.top = '12px';
      closeIcon.style.top = '65px';
      scrollTopBtn.classList.remove('show-scrollTop');
      // logo.style.width = "150px";
    }
  });

  window.addEventListener('scroll', function () {
    const ripple = document.querySelector('.ripple');

    if (window.scrollY > wrapperHeight) {
      marquee.forEach(item => {
        item.classList.add('anim-paused');
      });
      if (ripple) {
        ripple.classList.remove('anim-paused');
      }
    } else {
      marquee.forEach(item => {
        item.classList.remove('anim-paused');
      });
      if (ripple) {
        ripple.classList.add('anim-paused');
      }
    }
  });

  function startSlideShow() {
    interval = setInterval(nextSlide, 3000);
  }

  function stopSlideShow() {
    clearInterval(interval);
  }

  startSlideShow();
  sliderContainer.addEventListener('mouseover', stopSlideShow);
  sliderContainer.addEventListener('mouseleave', startSlideShow);

  const btnsOpenModal = document.querySelectorAll('.open-modal');
  const overlay = document.querySelector('.modal-overlay');
  const modalBox = document.querySelector('.modal');
  const btnsCloseModal = document.querySelector('.close-btn');

  if (modalBox && overlay && btnsOpenModal && btnsCloseModal) {
    const openModal = function () {
      modalBox.classList.remove('hidden');
      overlay.classList.remove('hidden');
    };

    const closeModal = function () {
      modalBox.classList.add('hidden');
      overlay.classList.add('hidden');
    };

    btnsOpenModal.forEach(modalEl => {
      modalEl.addEventListener('click', function () {
        setTimeout(() => {
          openModal();
        }, 300);
      });
    });

    btnsCloseModal.addEventListener('click', closeModal);

    overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modalBox.classList.contains('hidden')) {
        closeModal();
      }
    });
  }
});
