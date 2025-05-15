document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".get-started")
    .addEventListener("click", function () {});
});
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  let lastScrollY = window.scrollY;

  // If the page loads at the top, show the header
  if (window.scrollY === 0) {
    header.classList.add("sticky");
  }

  window.addEventListener("scroll", function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY < lastScrollY) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }

    lastScrollY = currentScrollY;
  });
});

//TAB
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab-link");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));

      this.classList.add("active");
      document.getElementById(this.dataset.tab).classList.add("active");
    });
  });
});

// TAB2
document.addEventListener("DOMContentLoaded", function () {
  const tabs1 = document.querySelectorAll(".tab-link1");
  const contents1 = document.querySelectorAll(".tab-content1");

  tabs1.forEach((tab1) => {
    tab1.addEventListener("click", function () {
      tabs1.forEach((tc) => tc.classList.remove("active"));
      contents1.forEach((cc) => cc.classList.remove("active"));

      this.classList.add("active");
      document.getElementById(this.dataset.tab1).classList.add("active");
    });
  });
});

//Testimonials
let slideIndex = 0;
const slides = document.querySelectorAll(".testimonial-slide");
const indicators = document.querySelectorAll(".indicator");

function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  } else {
    slideIndex = index;
  }

  slides.forEach((slide, i) => {
    slide.style.display = i === slideIndex ? "block" : "none";
  });

  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === slideIndex);
  });
}

function moveSlide(step) {
  showSlide(slideIndex + step);
}

document.addEventListener("DOMContentLoaded", () => {
  showSlide(slideIndex);
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", function () {
  const submenuParent = document.querySelector(".has-submenu > a");

  // Toggle submenu on click of the parent link
  submenuParent.addEventListener("click", function (e) {
    // Prevent the void(0) link from doing anything
    e.preventDefault();
    const submenu = this.nextElementSibling;

    // Toggle the submenu display
    if (submenu.style.display === "block") {
      submenu.style.display = "none";
    } else {
      submenu.style.display = "block";
    }
  });

  // Optionally, close the submenu when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest("#nav-links")) {
      const submenu = document.querySelector(".has-submenu .submenu");
      if (submenu) {
        submenu.style.display = "none";
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const accordions = document.querySelectorAll(".qaAccordion");

  accordions.forEach((accordion) => {
    const header = accordion.querySelector(".qaaHeader");

    header.addEventListener("click", function () {
      // Toggle current accordion
      accordion.classList.toggle("active");

      // Close other accordions if needed (for an accordion-like behavior)
      accordions.forEach((otherAccordion) => {
        if (otherAccordion !== accordion) {
          otherAccordion.classList.remove("active");
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  // Function to check if elements are in viewport
  function checkAnimation() {
    // You can adjust the trigger point by changing this factor (0.8 = 80% of the viewport height)
    const triggerBottom = window.innerHeight * 0.8;

    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;

      // If the element is above the trigger point, add the active class
      if (elementTop < triggerBottom) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });
  }

  // Listen for the scroll event
  window.addEventListener("scroll", checkAnimation);

  // Initial check in case elements are already in view
  checkAnimation();
});

const images = document.querySelectorAll(".image");
let index = 0;
const positions = ["left", "center", "right"];

function rotateImages() {
  images.forEach((img, i) => img.classList.remove("left", "center", "right"));
  index = (index + 1) % images.length;
  images[index].classList.add("center");
  images[(index + 1) % images.length].classList.add("right");
  images[(index + 2) % images.length].classList.add("left");
}

setInterval(rotateImages, 3000);

//  script for pricing popup
  function openPricing() {
    document.getElementById('pricing').style.display = 'flex';
  }

  function closePricing() {
    document.getElementById('pricing').style.display = 'none';
  }

  
  // This script is for artist link,to go to a specific artist testimonial page 
    document.querySelectorAll('.scrollLink').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offset = -100; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset + offset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    

