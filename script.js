/* ============================================
   REBORN IMPORT & EXPORT — JS
   Nav, mobile menu, GSAP animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- NAV SCROLL --- */
  const nav = document.getElementById('nav');
  const handleScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* --- MOBILE MENU --- */
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* --- SMOOTH SCROLL --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = nav.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* --- GSAP ANIMATIONS --- */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .from('.hero-badge', { opacity: 0, y: 20, duration: 0.6, delay: 0.3 })
      .from('.hero-title', { opacity: 0, y: 40, duration: 0.8 }, '-=0.3')
      .from('.hero-sub', { opacity: 0, y: 30, duration: 0.6 }, '-=0.4')
      .from('.hero-actions', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      .from('.hero-stats .hero-stat', {
        opacity: 0, y: 20, duration: 0.5, stagger: 0.15
      }, '-=0.2')
      .from('.hero-scroll', { opacity: 0, duration: 0.6 }, '-=0.2');

    // Stat counter animation
    document.querySelectorAll('.hero-stat-number').forEach(el => {
      const text = el.textContent;
      const num = parseInt(text.replace(/\D/g, ''));
      const suffix = text.replace(/[\d]/g, '');
      const obj = { val: 0 };
      gsap.to(obj, {
        val: num,
        duration: 2,
        delay: 1,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = Math.floor(obj.val).toLocaleString() + suffix;
        }
      });
    });

    // Reveal elements on scroll
    document.querySelectorAll('.reveal').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        }
      });
    });

    // Stagger service cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true,
        }
      });
    });

    // Stagger why-cards
    gsap.utils.toArray('.why-card').forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true,
        }
      });
    });

    // Process steps stagger
    gsap.utils.toArray('.process-step').forEach((step, i) => {
      gsap.to(step, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: i * 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
          once: true,
        }
      });
    });

    // Process connectors
    gsap.utils.toArray('.process-connector').forEach((conn, i) => {
      gsap.to(conn, {
        opacity: 1,
        scaleX: 1,
        duration: 0.5,
        delay: 0.3 + i * 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: conn,
          start: 'top 85%',
          once: true,
        }
      });
      gsap.set(conn, { scaleX: 0 });
    });

    // Brands slide in
    gsap.from('.brand-item', {
      opacity: 0,
      y: 15,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.brands-grid',
        start: 'top 85%',
        once: true,
      }
    });

    // Parallax hero image
    gsap.to('.hero-bg-img', {
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    });
  }

  /* --- FALLBACK (no GSAP) --- */
  else {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('visible');
    });
  }

});
