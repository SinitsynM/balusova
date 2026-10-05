/* ========== NAV: фон при скролле ========== */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ========== Мобильное меню ========== */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ========== Reveal-анимации ========== */
const revealItems = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = Math.min(i * 70, 350);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealItems.forEach(el => io.observe(el));

/* ========== FAQ-аккордеон: только один открыт ========== */
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      faqItems.forEach(other => {
        if (other !== item) other.open = false;
      });
    }
  });
});



/* ========== Модалка «Образование» ========== */
const modal = document.getElementById('educationModal');
const openBtn = document.getElementById('openEducation');
const closeEls = modal.querySelectorAll('[data-close]');

const openModal = () => {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};
const closeModal = () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

openBtn.addEventListener('click', openModal);
closeEls.forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ========== Год в футере ========== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ========== Параллакс блобов (десктоп) ========== */
if (window.matchMedia('(min-width: 1024px)').matches) {
  const blobs = document.querySelectorAll('.blob');
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    blobs.forEach((blob, i) => {
      const speed = (i + 1) * 0.5;
      blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });
}