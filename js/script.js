// Dr. Raymundo Sánchez — Ginecología y Obstetricia
document.addEventListener('DOMContentLoaded', function () {

  /* Loading screen */
  var loader = document.getElementById('loading-screen');
  window.addEventListener('load', function () {
    setTimeout(function () {
      if (loader) loader.classList.add('is-hidden');
    }, 350);
  });

  /* Header scroll state */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
    toggleBackToTop();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  function closeMobileNav() {
    navToggle.classList.remove('is-active');
    mobileNav.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMobileNav);
    });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Animated counters */
  var counters = document.querySelectorAll('[data-count]');
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var value = Math.floor(progress * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* WhatsApp floating menu */
  var waToggle = document.getElementById('waToggle');
  var waMenu = document.getElementById('waMenu');
  if (waToggle && waMenu) {
    waToggle.addEventListener('click', function () {
      waMenu.classList.toggle('is-open');
    });
    document.addEventListener('click', function (e) {
      if (!waMenu.contains(e.target) && e.target !== waToggle && !waToggle.contains(e.target)) {
        waMenu.classList.remove('is-open');
      }
    });
  }

  /* Back to top */
  var toTop = document.getElementById('toTop');
  function toggleBackToTop() {
    if (!toTop) return;
    if (window.scrollY > 500) toTop.classList.add('is-visible');
    else toTop.classList.remove('is-visible');
  }
  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Contact form -> WhatsApp */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var nombre = document.getElementById('nombre').value.trim();
      var telefono = document.getElementById('telefono').value.trim();
      var servicio = document.getElementById('servicio').value;
      var mensaje = document.getElementById('mensaje').value.trim();

      var texto = 'Hola, mi nombre es ' + nombre + '. Me gustaria agendar una cita';
      if (servicio) texto += ' para ' + servicio;
      texto += '. Mi telefono es ' + telefono + '.';
      if (mensaje) texto += ' ' + mensaje;

      var url = 'https://wa.me/5219631212927?text=' + encodeURIComponent(texto);
      window.open(url, '_blank', 'noopener');
    });
  }

});
