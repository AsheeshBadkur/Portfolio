// ============================================================
// EMAILJS SETUP — Fill these 3 values after creating account
// at https://emailjs.com
// ============================================================
const EMAILJS_PUBLIC_KEY  = "SxU_sYYa9ujFlJZ87";
const EMAILJS_SERVICE_ID  = "service_624025e";
const EMAILJS_TEMPLATE_ID = "template_idk1feg"; // Email Templates tab
// ============================================================

// Init EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('.theme-icon');

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeIcon.textContent = next === 'dark' ? '🌙' : '☀️';
});

// ===== NAV SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveNav();
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== ACTIVE NAV =====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 80) current = s.id; });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

// ===== TYPEWRITER =====
const typewriter = document.getElementById('typewriter');
const words = ['Salesforce Developer', 'MERN Stack Dev', 'Apex Programmer', 'LWC Builder', 'Problem Solver'];
let wordIdx = 0, charIdx = 0, deleting = false;
function type() {
  const word = words[wordIdx];
  if (!deleting) {
    typewriter.textContent = word.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === word.length) { deleting = true; setTimeout(type, 1800); return; }
    setTimeout(type, 80);
  } else {
    typewriter.textContent = word.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) { deleting = false; wordIdx = (wordIdx + 1) % words.length; }
    setTimeout(type, 45);
  }
}
setTimeout(type, 1000);

// ===== SKILL BAR ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        bar.style.width = bar.getAttribute('data-width') + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));

// ===== CONTACT FORM — EMAILJS =====
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');
const formError   = document.getElementById('formError');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('userName').value.trim();
  const email   = document.getElementById('userEmail').value.trim();
  const message = document.getElementById('userMessage').value.trim();
  if (!name || !email || !message) return;

  // Check if keys are still placeholder
if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
  formError.style.display = 'block';
  formError.textContent = '⚙️ EmailJS not configured properly.';
  return;
}

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  formSuccess.style.display = 'none';
  formError.style.display = 'none';

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      user_name:  name,
      user_email: email,
      message:    message,
      to_email:   'asheeshbadkur05@gmail.com'
    });

    contactForm.reset();
    formSuccess.style.display = 'block';
    setTimeout(() => formSuccess.style.display = 'none', 5000);
  } catch (err) {
    console.error('EmailJS error:', err);
    formError.style.display = 'block';
    formError.textContent = '❌ Failed to send. Please email me at asheeshbadkur05@gmail.com';
    setTimeout(() => formError.style.display = 'none', 6000);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>`;
  }
});

// ===== FADE-IN ON SCROLL =====
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .cert-big-card, .highlight-item, .stat-card, .th-badge').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});
