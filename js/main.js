/* ============================================================
   ANISA AURALITA ASZAHRA — Portfolio
   main.js  |  Complete Interactive JavaScript
   ============================================================ */

'use strict';

/* ── Utility ─────────────────────────────────────────────── */
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── 1. Navbar Scroll State ──────────────────────────────── */
(function initNavbarScroll() {
  const navbar = qs('#navbar');
  if (!navbar) return;

  const toggleScrolled = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', toggleScrolled, { passive: true });
  toggleScrolled(); // run once on load
})();

/* ── 2. Smooth Scrolling ─────────────────────────────────── */
(function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href');
    if (targetId === '#') return;

    const target = qs(targetId);
    if (!target) return;

    e.preventDefault();
    const navHeight = qs('#navbar')?.offsetHeight ?? 70;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({ top, behavior: 'smooth' });
  });
})();

/* ── 3. Active Nav Link on Scroll ───────────────────────── */
(function initActiveNav() {
  const sections = qsa('section[id]');
  const navLinks = qsa('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', isActive);
            if (isActive) {
              link.setAttribute('aria-current', 'page');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    },
    {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
})();

/* ── 4. Mobile Drawer ────────────────────────────────────── */
(function initMobileDrawer() {
  const hamburger     = qs('#hamburger');
  const drawer        = qs('#mobile-drawer');
  const backdrop      = qs('#drawer-backdrop');
  const closeBtn      = qs('#drawer-close');
  const drawerLinks   = qsa('.drawer-link');

  if (!hamburger || !drawer) return;

  // Focusable elements inside the drawer for focus trap
  const getFocusable = () =>
    qsa('button, a, input, [tabindex]:not([tabindex="-1"])', drawer).filter(
      (el) => !el.disabled && el.offsetParent !== null
    );

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    drawer.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';

    // Focus close button
    setTimeout(() => closeBtn?.focus(), 50);
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  // Focus trap
  drawer.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = getFocusable();
    if (!focusable.length) return;

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  hamburger.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  // Close drawer when a link is clicked
  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });
})();

/* ── 5. Scroll Reveal ────────────────────────────────────── */
(function initScrollReveal() {
  const revealEls = qsa('.reveal, .reveal-left, .reveal-right');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  revealEls.forEach((el) => observer.observe(el));
})();

/* ── 6. Cat Mascot Click Interaction ────────────────────── */
(function initCatMascot() {
  const messages = [
    'Halo! 👋',
    'Miau~ 🐾',
    'Jangan lupa istirahat ya!',
    'Portfolio ini dibuat dengan ♥',
    'Kucing cantik dong!',
    'Semangat belajarnya Anisa! 🌸',
    'Aku suka ikan~ 🐟',
    'Klik lagi klik lagi!',
    'Makasih udah berkunjung!',
    'Anisa baik banget pasti~',
    'Ada yang bisa kubantu? ✨',
    'Meong! Jangan lupa minum air ya~ 💧',
    'Yuk intip karya-karya pilihan di sini! ✦',
    'Senang bertemu denganmu! 🐱',
    'Semoga harimu menyenangkan! 🌸',
  ];

  let lastIndex = -1;
  let hideTimer = null;

  function getRandom() {
    let idx;
    do {
      idx = Math.floor(Math.random() * messages.length);
    } while (idx === lastIndex);
    lastIndex = idx;
    return messages[idx];
  }

  function showBubble(cat) {
    // Find or create bubble inside this cat element
    let bubble = qs('.cat-bubble', cat);
    if (!bubble) {
      bubble = document.createElement('div');
      bubble.className = 'cat-bubble';
      cat.appendChild(bubble);
    }

    bubble.textContent = getRandom();
    bubble.classList.add('visible');

    // Clear existing timer
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      bubble.classList.remove('visible');
    }, 3500);
  }

  // Attach click interaction to all cat mascot elements
  document.addEventListener('click', (e) => {
    const target = e.target instanceof Element ? e.target : document.activeElement;
    const cat = target?.closest?.('.cat-mascot');
    if (cat) showBubble(cat);
  });

  // Support keyboard activation (Enter & Space)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const target = e.target instanceof Element ? e.target : document.activeElement;
      const cat = target?.closest?.('.cat-mascot');
      if (cat) {
        e.preventDefault();
        showBubble(cat);
      }
    }
  });
})();

/* ── 7. Certificate Lightbox ─────────────────────────────── */
(function initLightbox() {
  const lightbox  = qs('#lightbox');
  const backdrop  = qs('#lightbox-backdrop');
  const closeBtn  = qs('#lightbox-close');
  const img       = qs('#lightbox-img');

  if (!lightbox || !img) return;

  function openLightbox(src, alt) {
    img.src = src;
    img.alt = alt;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button
    setTimeout(() => closeBtn?.focus(), 50);
  }

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    img.src = '';
    img.alt = '';
  }

  // Open on cert thumbnail click
  document.addEventListener('click', (e) => {
    const thumb = e.target.closest('.cert-thumbnail [data-lightbox]');
    if (thumb) {
      const src = thumb.getAttribute('data-lightbox') || thumb.src;
      const alt = thumb.getAttribute('data-alt') || thumb.alt || 'Sertifikat';
      openLightbox(src, alt);
    }
  });

  // Also open on cert-card click (whole card)
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.cert-card[data-src]');
    if (card) {
      const src = card.getAttribute('data-src');
      const alt = card.getAttribute('data-alt') || 'Sertifikat';
      if (src) openLightbox(src, alt);
    }
  });

  closeBtn?.addEventListener('click', closeLightbox);
  backdrop?.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
      closeLightbox();
    }
  });
})();

/* ── 8. Footer Copyright Year ────────────────────────────── */
(function initCopyrightYear() {
  const yearEl = qs('#copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* ── 9. Scroll-to-Top Button ─────────────────────────────── */
(function initScrollTop() {
  const btn = qs('#scroll-top');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    },
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
