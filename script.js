/* =============================================
   Portfolio — script.js
   Features: 3D tilt, scroll reveal, role cycle,
             nav scroll state, contact form
   ============================================= */

/* ── NAV SCROLL ─────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── MOBILE MENU ────────────────────────────── */
function toggleNav() {
  const ham = document.getElementById('ham');
  const menu = document.getElementById('mobileMenu');
  ham.classList.toggle('open');
  menu.classList.toggle('open');
}
function closeNav() {
  document.getElementById('ham').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
}

/* ── ROLE CYCLE ─────────────────────────────── */
const words = document.querySelectorAll('.rw');
let wIdx = 0;
setInterval(() => {
  words[wIdx].classList.remove('active');
  wIdx = (wIdx + 1) % words.length;
  words[wIdx].classList.add('active');
}, 2400);

/* ── SCROLL REVEAL ──────────────────────────── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(
  '.proj-card, .skill-card, .tl-item, .cs-item, .hero-card, .about-text, .timeline'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  revealObs.observe(el);
});

/* ── SKILL BARS ANIMATE ─────────────────────── */
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sk-fill').forEach(bar => {
        bar.classList.add('anim');
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

const grid = document.querySelector('.skills-grid');
if (grid) barObs.observe(grid);

/* ── 3D TILT ────────────────────────────────── */
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width  / 2;
    const cy = rect.height / 2;

    // Max tilt: 8 degrees
    const rotateX = ((y - cy) / cy) * -7;
    const rotateY = ((x - cx) / cx) *  7;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    card.style.boxShadow = `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.1)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    card.style.boxShadow = '';
  });
});

/* ── CONTACT FORM ───────────────────────────── */
function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('cfBtn');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  btn.style.opacity = '0.7';
  setTimeout(() => {
    btn.style.display = 'none';
    const success = document.getElementById('cfSuccess');
    success.style.display = 'block';
  }, 1500);
}

/* ── SMOOTH HASH SCROLL (for nav links) ──────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
