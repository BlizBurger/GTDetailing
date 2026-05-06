/**
 * GT Detailing - Main JavaScript
 * Handles interactive features, animations, and form management
 */

// ===== NAVIGATION =====
const hamburger = document.querySelector('.nav-hamburger');
const navMobile = document.querySelector('.nav-mobile');
const nav = document.getElementById('nav');

// Mobile menu toggle
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMobile?.classList.toggle('open');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-mobile a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    navMobile?.classList.remove('open');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav?.classList.add('scrolled');
  } else {
    nav?.classList.remove('scrolled');
  }
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== PARTICLES CANVAS =====
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 1.5;
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw() {
      ctx.fillStyle = `rgba(242, 200, 9, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Animation loop
  const animateParticles = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animateParticles);
  };

  animateParticles();

  // Resize canvas on window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ===== PRICING TABS =====
const tabButtons = document.querySelectorAll('.tarifs-tab-btn');
const tabPanels = document.querySelectorAll('.tarifs-panel');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabName = button.dataset.tab;

    // Remove active class from all buttons and panels
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));

    // Add active class to clicked button and corresponding panel
    button.classList.add('active');
    document.getElementById(`tab-${tabName}`)?.classList.add('active');
  });
});

// ===== VEHICLE TOGGLE =====
const vehicleButtons = document.querySelectorAll('.vehicle-btn');

vehicleButtons.forEach(button => {
  button.addEventListener('click', () => {
    vehicleButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // TODO: Update pricing based on vehicle type
    const vehicleType = button.dataset.vehicle;
    console.log('Selected vehicle:', vehicleType);
  });
});

// ===== FORM HANDLING =====
const reserverForm = document.querySelector('.reserver-form');

if (reserverForm) {
  reserverForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(reserverForm);
    const data = Object.fromEntries(formData);

    console.log('Form submitted:', data);

    // TODO: Send form data to backend/email service
    // Example with fetch:
    /*
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Réservation confirmée! Vérifiez votre email.');
        reserverForm.reset();
      } else {
        alert('Erreur lors de la réservation. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erreur de connexion.');
    }
    */

    alert('Réservation reçue! Nous vous contacterons sous peu.');
    reserverForm.reset();
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      const navHeight = document.getElementById('nav')?.offsetHeight || 80;
      const targetPosition = target.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
  // Close mobile menu on Escape
  if (e.key === 'Escape') {
    hamburger?.classList.remove('open');
    navMobile?.classList.remove('open');
  }
});

// ===== PERFORMANCE: Preload critical resources =====
document.addEventListener('DOMContentLoaded', () => {
  // Add performance marks for monitoring
  performance.mark('app-loaded');

  if (window.performance && window.performance.measure) {
    try {
      performance.measure('app-load', 'navigationStart', 'app-loaded');
      console.log('App load time:', performance.getEntriesByName('app-load')[0].duration, 'ms');
    } catch (e) {
      console.error('Performance measurement error:', e);
    }
  }
});
