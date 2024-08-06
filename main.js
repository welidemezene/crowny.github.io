const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("nav-links");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

function searchSite(event) {
  event.preventDefault();
  const query = document.getElementById("searchInput").value.toLowerCase();

  // Simple client-side search example
  // Assuming you have a list of items to search through
  const items = document.querySelectorAll(".item"); // Replace with actual items
  items.forEach((item) => {
    const content = item.textContent.toLowerCase();
    if (content.includes(query)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  // Alternatively, you could redirect to a server-side search page
  // window.location.href = `search.html?query=${encodeURIComponent(query)}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const animatedText = document.getElementById("animated-text");

  setTimeout(() => {
    animatedText.style.opacity = "1";
    animatedText.style.transform = "translateY(0)";
  }, 1000); // Delay the animation by 1 second for a smooth appearance
});

document.getElementById("check-availability").addEventListener("click", () => {
  const checkInDate = document.getElementById("check-in").value;
  const adults = document.getElementById("adults").value;
  const children = document.getElementById("children").value;

  alert(
    `Checking availability for:\nCheck-In Date: ${checkInDate}\nAdults: ${adults}\nChildren: ${children}`
  );
});

const scrollContainer = document.querySelector(".rooms-scroll");
const scrollLeft = document.querySelector(".scroll-left");
const scrollRight = document.querySelector(".scroll-right");

scrollLeft.addEventListener("click", () => {
  scrollContainer.scrollBy({
    top: 0,
    left: -300,
    behavior: "smooth",
  });
});

scrollRight.addEventListener("click", () => {
  scrollContainer.scrollBy({
    top: 0,
    left: 300,
    behavior: "smooth",
  });
});

const scrollContainergallery = document.querySelector(".gallery-scroll");
const scrollLeftgallery = document.querySelector(".scroll-left1");
const scrollRightgallery = document.querySelector(".scroll-right1");

scrollLeftgallery.addEventListener("click", () => {
  scrollContainergallery.scrollBy({
    top: 0,
    left: -300,
    behavior: "smooth",
  });
});

scrollRightgallery.addEventListener("click", () => {
  scrollContainergallery.scrollBy({
    top: 0,
    left: 300,
    behavior: "smooth",
  });
});

const slides = document.querySelectorAll(".comment-slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    dots[i].classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
      dots[i].classList.add("active");
    }
  });
  currentSlide = index;
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => showSlide(index));
});

// Auto slide every 5 seconds
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 2500);

document.addEventListener("DOMContentLoaded", () => {
  const subscribeContainer = document.getElementById("subscribe-container");
  setTimeout(() => {
    subscribeContainer.style.display = "block";
  }, 500);
});

document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector(".footer");
  footer.style.opacity = 0;
  footer.style.transition = "opacity 1s ease-in-out";

  setTimeout(() => {
    footer.style.opacity = 1;
  }, 500);
});
