document.addEventListener('DOMContentLoaded', function() {
  // ===== Mobile Navigation =====
  const menuIcon = document.getElementById('menu-icon');
  const navLinks = document.getElementById('nav-links');
  
  function toggleMobileMenu() {
    const isExpanded = menuIcon.getAttribute('aria-expanded') === 'true';
    menuIcon.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    
    // Toggle body scroll when menu is open
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  }

  menuIcon.addEventListener('click', toggleMobileMenu);

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) { // Only for mobile
        toggleMobileMenu();
      }
    });
  });

  // ===== Hero Text Animation =====
  const animatedText = document.getElementById('animated-text');
  if (animatedText) {
    setTimeout(() => {
      animatedText.style.opacity = '1';
      animatedText.style.transform = 'translateY(0)';
    }, 500);
  }

  // ===== Booking Form =====
  const checkAvailabilityBtn = document.getElementById('check-availability');
  if (checkAvailabilityBtn) {
    checkAvailabilityBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const checkInDate = document.getElementById('check-in').value;
      const adults = document.getElementById('adults').value;
      const children = document.getElementById('children').value;
      
      if (!checkInDate) {
        alert('Please select a check-in date');
        return;
      }
      
      // Simulate API call
      setTimeout(() => {
        alert(`Rooms available for:\nDate: ${checkInDate}\nAdults: ${adults}\nChildren: ${children}\n\nRedirecting to booking page...`);
        window.location.href = 'booknow.html';
      }, 800);
    });
  }

  // ===== Scrollable Sections =====
  function setupHorizontalScroller(containerClass, leftBtnClass, rightBtnClass, scrollAmount = 300) {
    const container = document.querySelector(`.${containerClass}`);
    const leftBtn = document.querySelector(`.${leftBtnClass}`);
    const rightBtn = document.querySelector(`.${rightBtnClass}`);
    
    if (!container || !leftBtn || !rightBtn) return;

    function updateButtonVisibility() {
      leftBtn.style.display = container.scrollLeft > 0 ? 'flex' : 'none';
      rightBtn.style.display = container.scrollLeft < container.scrollWidth - container.clientWidth ? 'flex' : 'none';
    }

    leftBtn.addEventListener('click', () => {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setTimeout(updateButtonVisibility, 300);
    });

    rightBtn.addEventListener('click', () => {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(updateButtonVisibility, 300);
    });

    // Initialize button visibility
    updateButtonVisibility();
    
    // Update on resize
    window.addEventListener('resize', updateButtonVisibility);
  }

  // Set up scrollers for rooms and gallery
  setupHorizontalScroller('rooms-scroll', 'scroll-left', 'scroll-right');
  setupHorizontalScroller('gallery-scroll', 'scroll-left1', 'scroll-right1');

  // ===== Testimonial Slider =====
  function initTestimonialSlider() {
    const slides = document.querySelectorAll('.comment-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length === 0) return;

    function showSlide(index) {
      // Wrap around if at ends
      if (index >= slides.length) currentSlide = 0;
      else if (index < 0) currentSlide = slides.length - 1;
      else currentSlide = index;

      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
      });

      if (dots.length > 0) {
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === currentSlide);
        });
      }
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(index);
        startSlider();
      });
    });

    function startSlider() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    }

    // Initialize
    showSlide(0);
    startSlider();

    // Pause on hover
    const sliderContainer = document.querySelector('.comments-container');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
      sliderContainer.addEventListener('mouseleave', startSlider);
    }
  }

  initTestimonialSlider();

  // ===== Newsletter Subscription =====
  const subscribeForm = document.querySelector('.subscribe-container');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (!email) {
        alert('Please enter your email address');
        return;
      }
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Simulate subscription
      setTimeout(() => {
        alert(`Thank you for subscribing with ${email}!`);
        emailInput.value = '';
      }, 500);
    });
  }

  // ===== Smooth Footer Appearance =====
  const footer = document.querySelector('.footer');
  if (footer) {
    setTimeout(() => {
      footer.style.opacity = '1';
    }, 500);
  }

  // ===== Search Functionality =====
  const searchIcon = document.querySelector('.search-icon');
  if (searchIcon) {
    searchIcon.addEventListener('click', function() {
      const searchInput = document.getElementById('searchInput');
      if (searchInput) {
        searchInput.focus();
      } else {
        // Create search input if it doesn't exist
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
          <input type="text" id="searchInput" placeholder="Search...">
          <button id="searchSubmit">Search</button>
        `;
        this.parentElement.insertBefore(searchContainer, this);
        document.getElementById('searchSubmit').addEventListener('click', searchSite);
      }
    });
  }

  function searchSite(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    
    if (!query) {
      alert('Please enter a search term');
      return;
    }
    
    // This is a simple client-side search - consider implementing server-side search for production
    const searchableItems = document.querySelectorAll('[data-searchable]');
    let foundItems = 0;
    
    searchableItems.forEach(item => {
      const content = item.textContent.toLowerCase();
      if (content.includes(query)) {
        item.style.display = 'block';
        foundItems++;
        // Scroll to first found item
        if (foundItems === 1) {
          item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        item.style.display = 'none';
      }
    });
    
    if (foundItems === 0) {
      alert('No results found for "' + query + '"');
    }
  }
});

// ===== Scroll to Top Button =====
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '&uarr;';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollToTopBtn.style.display = 'none';

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', function() {
  scrollToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
});

scrollToTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== Responsive Adjustments =====
function handleResponsiveChanges() {
  const navbar = document.querySelector('.navbar');
  if (window.innerWidth > 768) {
    // Desktop styles
    navbar.classList.remove('mobile-menu-open');
    document.body.style.overflow = '';
  }
}

window.addEventListener('resize', handleResponsiveChanges);
handleResponsiveChanges();