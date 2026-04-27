// Reveal-on-scroll
const targets = document.querySelectorAll('.section, .hero-mockup, .stats-strip, .step, .feat, .safety-list li, .download-card');
targets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

targets.forEach(el => io.observe(el));

// Subtle parallax on hero mockup (cursor follow)
const mockup = document.querySelector('.hero-mockup');
if (mockup && window.matchMedia('(min-width: 1024px)').matches) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 12;
    mockup.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
}
