/* ============================================================
   ANISA AURALITA ASZAHRA — Portfolio
   main.js  |  Complete Interactive JavaScript
   ============================================================ */

"use strict";

/* ── KONFIGURASI KONTAK PUSAT (CENTRAL CONTACT CONFIG) ────── */
/*
   Seluruh data kontak dan pemesanan terpusat di sini:
   - whatsapp : Nomor WhatsApp dalam format internasional tanpa tanda +, spasi, atau angka 0 di depan (contoh: '6285733687785').
   - instagram: Username akun Instagram bisnis tanpa tanda @ (contoh: 'manis.dev_').
*/
const CONTACT_CONFIG = {
  whatsapp: '6285733687785',
  instagram: 'manis.dev_',
};

/* ── Helper Pembentukan Link Kontak & Pemesanan ───────────── */

/**
 * Membersihkan nomor WhatsApp agar murni berupa digit format internasional.
 */
function cleanWhatsAppNumber(phone) {
  let cleaned = String(phone || '').replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  }
  return cleaned;
}

/**
 * Format nomor WhatsApp untuk tampilan teks antarmuka (cth: +62 857-3368-7785).
 */
function formatWhatsAppDisplay(phone) {
  const cleaned = cleanWhatsAppNumber(phone);
  if (cleaned.startsWith('62') && cleaned.length >= 11) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)}-${cleaned.slice(5, 9)}-${cleaned.slice(9)}`;
  }
  return cleaned ? `+${cleaned}` : '';
}

/**
 * Fungsi reusable untuk membuat URL pemesanan WhatsApp.
 * Format: https://wa.me/NOMOR?text=PESAN
 * Pesan dinamis berdasarkan layanan terpilih dan dienkode dengan encodeURIComponent().
 */
function getWhatsAppUrl(serviceName) {
  const number = cleanWhatsAppNumber(CONTACT_CONFIG.whatsapp);
  if (!serviceName) {
    return `https://wa.me/${number}`;
  }
  const message = `Halo, saya tertarik untuk memesan layanan ${serviceName.trim()}. Bisa saya mendapatkan informasi lebih lanjut?`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Fungsi reusable untuk membuat URL profil Instagram.
 * Format: https://www.instagram.com/USERNAME/
 */
function getInstagramUrl() {
  const username = (CONTACT_CONFIG.instagram || 'manis.dev_').trim().replace(/^@/, '');
  return `https://www.instagram.com/${encodeURIComponent(username)}/`;
}

/* ── Utility ─────────────────────────────────────────────── */
const qs = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── 1. Navbar Scroll State ──────────────────────────────── */
(function initNavbarScroll() {
  const navbar = qs("#navbar");
  if (!navbar) return;

  const toggleScrolled = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  };

  window.addEventListener("scroll", toggleScrolled, { passive: true });
  toggleScrolled(); // run once on load
})();

/* ── 2. Smooth Scrolling ─────────────────────────────────── */
(function initSmoothScroll() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute("href");
    if (targetId === "#") return;

    const target = qs(targetId);
    if (!target) return;

    e.preventDefault();
    const navHeight = qs("#navbar")?.offsetHeight ?? 70;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({ top, behavior: "smooth" });
  });
})();

/* ── 3. Active Nav Link on Scroll ───────────────────────── */
(function initActiveNav() {
  const sections = qsa("section[id]");
  const navLinks = qsa(".nav-link");

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("active", isActive);
            if (isActive) {
              link.setAttribute("aria-current", "page");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        }
      });
    },
    {
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0,
    },
  );

  sections.forEach((section) => observer.observe(section));
})();

/* ── 4. Mobile Drawer ────────────────────────────────────── */
(function initMobileDrawer() {
  const hamburger = qs("#hamburger");
  const drawer = qs("#mobile-drawer");
  const backdrop = qs("#drawer-backdrop");
  const closeBtn = qs("#drawer-close");
  const drawerLinks = qsa(".drawer-link");

  if (!hamburger || !drawer) return;

  // Focusable elements inside the drawer for focus trap
  const getFocusable = () =>
    qsa('button, a, input, [tabindex]:not([tabindex="-1"])', drawer).filter(
      (el) => !el.disabled && el.offsetParent !== null,
    );

  function openDrawer() {
    drawer.classList.add("open");
    backdrop.classList.add("open");
    hamburger.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    drawer.removeAttribute("aria-hidden");
    document.body.style.overflow = "hidden";

    // Focus close button
    setTimeout(() => closeBtn?.focus(), 50);
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    hamburger.focus();
  }

  // Focus trap
  drawer.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const focusable = getFocusable();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

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
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) {
      closeDrawer();
    }
  });

  hamburger.addEventListener("click", openDrawer);
  closeBtn?.addEventListener("click", closeDrawer);
  backdrop?.addEventListener("click", closeDrawer);

  // Close drawer when a link is clicked
  drawerLinks.forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
})();

/* ── 5. Scroll Reveal ────────────────────────────────────── */
(function initScrollReveal() {
  const revealEls = qsa(".reveal, .reveal-left, .reveal-right");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  revealEls.forEach((el) => observer.observe(el));
})();

/* ── 6. Cat Mascot Click Interaction ────────────────────── */
(function initCatMascot() {
  const messages = [
    "Halo! 👋",
    "Miau~ 🐾",
    "Jangan lupa istirahat ya!",
    "Portfolio ini dibuat dengan ♥",
    "Kucing cantik dong!",
    "Semangat belajarnya Anisa! 🌸",
    "Aku suka ikan~ 🐟",
    "Klik lagi klik lagi!",
    "Makasih udah berkunjung!",
    "Anisa baik banget pasti~",
    "Ada yang bisa kubantu? ✨",
    "Meong! Jangan lupa minum air ya~ 💧",
    "Yuk intip karya-karya pilihan di sini! ✦",
    "Senang bertemu denganmu! 🐱",
    "Semoga harimu menyenangkan! 🌸",
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
    let bubble = qs(".cat-bubble", cat);
    if (!bubble) {
      bubble = document.createElement("div");
      bubble.className = "cat-bubble";
      cat.appendChild(bubble);
    }

    bubble.textContent = getRandom();
    bubble.classList.add("visible");

    // Clear existing timer
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      bubble.classList.remove("visible");
    }, 3500);
  }

  // Attach click interaction to all cat mascot elements
  document.addEventListener("click", (e) => {
    const target =
      e.target instanceof Element ? e.target : document.activeElement;
    const cat = target?.closest?.(".cat-mascot");
    if (cat) showBubble(cat);
  });

  // Support keyboard activation (Enter & Space)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const target =
        e.target instanceof Element ? e.target : document.activeElement;
      const cat = target?.closest?.(".cat-mascot");
      if (cat) {
        e.preventDefault();
        showBubble(cat);
      }
    }
  });
})();

/* ── 7. Certificate Lightbox ─────────────────────────────── */
(function initLightbox() {
  const lightbox = qs("#lightbox");
  const backdrop = qs("#lightbox-backdrop");
  const closeBtn = qs("#lightbox-close");
  const img = qs("#lightbox-img");

  if (!lightbox || !img) return;

  function openLightbox(src, alt) {
    img.src = src;
    img.alt = alt;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Focus close button
    setTimeout(() => closeBtn?.focus(), 50);
  }

  function closeLightbox() {
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    img.src = "";
    img.alt = "";
  }

  // Open on cert thumbnail click
  document.addEventListener("click", (e) => {
    const thumb = e.target.closest(".cert-thumbnail [data-lightbox]");
    if (thumb) {
      const src = thumb.getAttribute("data-lightbox") || thumb.src;
      const alt = thumb.getAttribute("data-alt") || thumb.alt || "Sertifikat";
      openLightbox(src, alt);
    }
  });

  // Also open on cert-card click (whole card)
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".cert-card[data-src]");
    if (card) {
      const src = card.getAttribute("data-src");
      const alt = card.getAttribute("data-alt") || "Sertifikat";
      if (src) openLightbox(src, alt);
    }
  });

  closeBtn?.addEventListener("click", closeLightbox);
  backdrop?.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      lightbox.getAttribute("aria-hidden") === "false"
    ) {
      closeLightbox();
    }
  });
})();

/* ── 8. Service Catalog Showcase & Detail Modal ──────────── */
(function initServiceShowcase() {
  const serviceDetails = {
    "company-profile": {
      title: "Website Company Profile",
      category: "Web Development",
      url: "company-profile.id",
      fullDesc:
        "Layanan pembuatan website profil perusahaan atau organisasi yang dirancang secara khusus untuk membangun kredibilitas dan citra profesional di dunia digital. Website dibuat dengan tampilan modern, cepat, responsif di semua perangkat, serta mudah diakses oleh calon mitra maupun pelanggan.",
      scope: [
        "Desain antarmuka beranda, profil, visi-misi, layanan, & kontak",
        "Tata letak responsif penuh (desktop, tablet, & mobile smartphone)",
        "Integrasi tombol WhatsApp instan, formulir kontak, & peta lokasi",
        "Optimasi kecepatan muat halaman dan struktur dasar ramah mesin pencari (SEO)",
        "Panduan pembaruan konten mandiri yang mudah dipahami",
      ],
    },
    "landing-page": {
      title: "Landing Page",
      category: "High Conversion Web",
      url: "promo-launch.id",
      fullDesc:
        "Halaman promosi satu halaman (one-page website) yang fokus pada tujuan tertentu, seperti promosi produk baru, pendaftaran event, penawaran spesial, atau portofolio kampanye. Struktur konten dirancang dengan alur psikologi konversi terarah untuk mendorong pengunjung mengambil tindakan.",
      scope: [
        "Perancangan layout konversi tinggi dengan Call-to-Action (CTA) terarah",
        "Headline persuasif, bagian keunggulan produk/jasa, dan testimoni",
        "Efek animasi visual halus dan interaktif yang menarik perhatian",
        "Optimasi khusus untuk trafik mobile dan media sosial (Instagram/TikTok ads)",
        "Integrasi tombol pemesanan langsung terhubung ke kontak bisnis",
      ],
    },
    "toko-online": {
      title: "Website Toko Online",
      category: "E-Commerce Solution",
      url: "toko-online.id/catalog",
      fullDesc:
        "Pengembangan platform katalog produk interaktif untuk mempermudah calon pembeli menjelajahi dan memesan barang dagangan secara online. Menampilkan etalase produk yang terorganisir rapi dengan pencarian, kategori, foto, rincian produk, serta alur pemesanan langsung bagi pelanggan.",
      scope: [
        "Halaman etalase katalog produk dengan navigasi kategori dan filter rapi",
        "Halaman detail produk lengkap (galeri foto, spesifikasi, dan harga)",
        "Alur pemesanan instan langsung terhubung ke WhatsApp bisnis",
        "Slot banner promosi diskon dan rekomendasi produk unggulan",
        "Struktur data produk yang ringan, cepat dimuat, dan mudah dikelola",
      ],
    },
    "web-app": {
      title: "Aplikasi Berbasis Web",
      category: "Custom Web App",
      url: "app.portal/dashboard",
      fullDesc:
        "Pembuatan aplikasi web interaktif yang disesuaikan dengan kebutuhan alur kerja dan operasional bisnis atau organisasi. Mulai dari sistem manajemen data, dashboard monitoring, pencatatan otomatis, hingga portal interaksi digital dengan antarmuka yang bersih dan mudah dioperasikan.",
      scope: [
        "Perancangan alur logika antarmuka dan interaksi sistem kustom",
        "Tampilan dashboard interaktif dengan ringkasan statistik dan grafik",
        "Formulir input data terstruktur dengan validasi langsung dan tabel responsif",
        "Pengorganisasian tata letak modular yang mudah dikembangkan lebih lanjut",
        "Tampilan responsif yang nyaman digunakan di berbagai ukuran layar",
      ],
    },
    "ui-ux-design": {
      title: "UI/UX Design",
      category: "Product Design & Prototype",
      url: "design-system.figma",
      fullDesc:
        "Proses perancangan antarmuka dan pengalaman pengguna secara menyeluruh untuk menghasilkan solusi visual aplikasi atau website yang intuitif, konsisten, dan nyaman digunakan. Menggabungkan riset kebutuhan pengguna, penyusunan kerangka halaman (wireframe), hingga prototipe interaktif siap uji.",
      scope: [
        "Penyusunan kerangka struktur halaman (wireframing alur pengguna)",
        "Desain visual antarmuka high-fidelity modern, rapi, dan estetis",
        "Design system lengkap (komponen tombol, palet warna, tipografi, & ikon)",
        "Prototipe interaktif (clickable prototype) untuk simulasi pengalaman pengguna",
        "File desain terstruktur rapi (Figma) siap diserahkan ke tahap pengembangan",
      ],
    },
    "maintenance-website": {
      title: "Maintenance Website",
      category: "Support & Optimization",
      url: "maintenance.monitor/health",
      fullDesc:
        "Layanan pendampingan teknis dan perawatan rutin agar website Anda selalu beroperasi dengan lancar, aman, dan mutakhir. Menangani kebutuhan pembaruan materi konten, penyesuaian tampilan, perbaikan kendala teknis, audit kecepatan akses, hingga pencadangan data berkala.",
      scope: [
        "Pembaruan rutin materi konten teks, gambar banner, dan informasi layanan",
        "Pemeriksaan fungsionalitas tombol, navigasi, dan pengecekan broken link",
        "Optimasi kecepatan akses dan kompresi aset gambar berkala",
        "Penyesuaian tata letak responsif dan perbaikan kendala tampilan antarmuka",
        "Pencadangan data dan pelaporan ringkasan status kesehatan website",
      ],
    },
  };

  const modal = qs("#service-modal");
  const backdrop = qs("#service-modal-backdrop");
  const closeBtn = qs("#service-modal-close");
  const screenEl = qs("#service-modal-screen");
  const urlEl = qs("#service-modal-url");
  const catEl = qs("#service-modal-category");
  const titleEl = qs("#service-modal-title");
  const descEl = qs("#service-modal-desc");
  const scopeListEl = qs("#service-modal-scope-list");

  // Modal order channel buttons
  const modalWaBtn = qs("#modal-order-wa");
  const modalIgBtn = qs("#modal-order-ig");

  // Contact section elements
  const contactBanner = qs("#service-selected-banner");
  const selectedTitle = qs("#selected-service-title");
  const contactCardWa = qs("#contact-card-wa");
  const contactCardIg = qs("#contact-card-ig");
  const contactInfoWa = qs("#contact-info-wa");
  const contactInfoIg = qs("#contact-info-ig");

  // Services CTA
  const servicesCtaIgBtn = qs("#services-cta-ig-btn");
  const servicesCtaIgText = qs("#services-cta-ig-text");

  if (!modal) return;

  /**
   * Mengupdate banner Layanan Terpilih dan link di section Kontak
   */
  function updateContactSection(serviceName) {
    if (!serviceName) return;

    if (contactBanner && selectedTitle) {
      selectedTitle.textContent = serviceName;
      contactBanner.style.display = "block";
      contactBanner.classList.add("highlight-pulse");
      setTimeout(() => contactBanner.classList.remove("highlight-pulse"), 1200);
    }

    if (contactCardWa) {
      contactCardWa.href = getWhatsAppUrl(serviceName);
    }

    if (contactCardIg) {
      contactCardIg.href = getInstagramUrl();
    }
  }

  /**
   * Mengatur tombol pemesanan di dalam modal detail sesuai nama layanan
   */
  function updateModalOrderButtons(serviceName) {
    if (modalWaBtn) {
      modalWaBtn.href = getWhatsAppUrl(serviceName);
      modalWaBtn.setAttribute("data-service-name", serviceName);
    }

    if (modalIgBtn) {
      modalIgBtn.href = getInstagramUrl();
      modalIgBtn.setAttribute("data-service-name", serviceName);
    }
  }

  /**
   * Menyelaraskan seluruh elemen halaman dengan data CONTACT_CONFIG terpusat
   */
  function applyContactConfig() {
    const igUrl = getInstagramUrl();

    // 1. Sinkronisasi kartu kontak default di section kontak
    if (contactCardWa) {
      contactCardWa.href = getWhatsAppUrl();
    }
    if (contactInfoWa) {
      contactInfoWa.textContent = formatWhatsAppDisplay(
        CONTACT_CONFIG.whatsapp,
      );
    }

    if (contactCardIg) {
      contactCardIg.href = igUrl;
    }
    if (contactInfoIg) {
      contactInfoIg.textContent = `@${CONTACT_CONFIG.instagram}`;
    }

    // 2. Sinkronisasi tautan sosial di hero section
    const heroWa = qs('.hero-socials a[aria-label*="WhatsApp"]');
    if (heroWa) {
      heroWa.href = getWhatsAppUrl();
    }
    const heroIg = qs('.hero-socials a[aria-label*="Instagram"]');
    if (heroIg) {
      heroIg.href = igUrl;
    }

    // 3. Sinkronisasi seluruh tombol WhatsApp di kartu layanan
    const cardWaButtons = qsa(
      '.service-order-channel-btn[data-channel="whatsapp"]',
    );
    cardWaButtons.forEach((btn) => {
      const sName = btn.getAttribute("data-service-name");
      btn.href = getWhatsAppUrl(sName);
    });

    // 4. Sinkronisasi seluruh tombol Instagram di kartu layanan
    const cardIgButtons = qsa(
      '.service-order-channel-btn[data-channel="instagram"]',
    );
    cardIgButtons.forEach((btn) => {
      btn.href = igUrl;
    });

    // 5. Sinkronisasi CTA Instagram Business
    if (servicesCtaIgBtn) {
      servicesCtaIgBtn.href = igUrl;
      servicesCtaIgBtn.target = "_blank";
      servicesCtaIgBtn.rel = "noopener noreferrer";
      if (servicesCtaIgText) {
        servicesCtaIgText.textContent = "Lihat Instagram Business";
      }
    }
  }

  function openModal(serviceKey) {
    const data = serviceDetails[serviceKey];
    if (!data) return;

    if (catEl) catEl.textContent = data.category;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.fullDesc;
    if (urlEl) urlEl.textContent = data.url;

    updateModalOrderButtons(data.title);

    if (scopeListEl) {
      scopeListEl.innerHTML = data.scope
        .map(
          (item) =>
            `<li><span class="scope-icon">🌸</span><span>${item}</span></li>`,
        )
        .join("");
    }

    // Retrieve the exact SVG mockup from the card
    const cardSvg = qs(
      `.service-card[data-service-id="${serviceKey}"] .service-browser-screen svg`,
    );
    if (screenEl && cardSvg) {
      screenEl.innerHTML = cardSvg.outerHTML;
    }

    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("open");
    document.body.style.overflow = "hidden";

    setTimeout(() => closeBtn?.focus(), 60);
  }

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  // Open modal on click of "Lihat Detail"
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".service-detail-btn");
    if (btn) {
      const key = btn.getAttribute("data-service-target");
      if (key) openModal(key);
    }
  });

  // Handle pemesanan dari tombol di kartu maupun modal (WhatsApp & Instagram)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".service-order-channel-btn");
    if (!btn) return;

    const serviceName =
      btn.getAttribute("data-service-name") || "Layanan Digital";

    updateContactSection(serviceName);

    // Jika pesanan dilakukan dari modal, tutup modal
    if (btn.closest("#service-modal")) {
      closeModal();
    }
  });

  closeBtn?.addEventListener("click", closeModal);
  backdrop?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
      closeModal();
    }
  });

  // Inisialisasi awal sinkronisasi data kontak
  applyContactConfig();
})();

/* ── 9. Footer Copyright Year ────────────────────────────── */
(function initCopyrightYear() {
  const yearEl = qs("#copyright-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* ── 9. Scroll-to-Top Button ─────────────────────────────── */
(function initScrollTop() {
  const btn = qs("#scroll-top");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("visible", window.scrollY > 500);
    },
    { passive: true },
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
