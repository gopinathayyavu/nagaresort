// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });
}

// Smooth scroll for anchor links (only on pages where they exist)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Buttons navigation (index.html specific)
const exploreBtn = document.getElementById('exploreRoomsBtn');
const bookNowBtn = document.getElementById('bookNowBtn');
const reserveNowBtns = document.querySelectorAll('#reserveNowBtn');

if (exploreBtn) {
  exploreBtn.addEventListener('click', () => {
    window.location.href = 'rooms.html';
  });
}
if (bookNowBtn) {
  bookNowBtn.addEventListener('click', () => {
    window.location.href = 'contact.html';
  });
}
reserveNowBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = 'contact.html';
  });
});

// Room page book buttons
const bookRoomBtns = document.querySelectorAll('.book-room-btn');
bookRoomBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = 'contact.html';
  });
});

// Intersection Observer for scroll reveal
const hiddenElements = document.querySelectorAll('.hidden');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
hiddenElements.forEach(el => observer.observe(el));

// Testimonial slider (only on index.html)
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
let currentIdx = 0;

function showTestimonial(index) {
  if (testimonialCards.length) {
    testimonialCards.forEach((card, i) => {
      card.style.display = i === index ? 'block' : 'none';
    });
  }
}

if (prevSlide && nextSlide && testimonialCards.length) {
  showTestimonial(0);
  nextSlide.addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % testimonialCards.length;
    showTestimonial(currentIdx);
  });
  prevSlide.addEventListener('click', () => {
    currentIdx = (currentIdx - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentIdx);
  });
}

// Lightbox initialization (gallery page)
if (typeof lightbox !== 'undefined') {
  lightbox.option({
    resizeDuration: 300,
    wrapAround: true,
    albumLabel: 'Gallery %1 of %2'
  });
}

// Contact form submission alert
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! Our team will get back to you within 24 hours.');
    contactForm.reset();
  });
}