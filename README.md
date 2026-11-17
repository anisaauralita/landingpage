# 🌸 Portfolio Anisa Auralita Aszahra

Personal portfolio website built with **HTML5, CSS3, and Vanilla JavaScript** — no frameworks, no backend.

---

## 📁 Project Structure

```
portfolio-anisa/
├── index.html                  ← Main HTML file (ALL sections)
├── css/
│   ├── style.css               ← Design system, components, layout
│   ├── animations.css          ← Keyframes, scroll reveal, hover FX
│   └── responsive.css          ← Breakpoints (desktop → mobile)
├── js/
│   └── main.js                 ← All interactive JavaScript
├── assets/
│   ├── images/
│   │   ├── profile/            ← Profile photo goes here
│   │   ├── projects/           ← Project screenshots go here
│   │   ├── certificates/       ← Certificate images go here
│   │   └── decorations/        ← Extra decoration assets
│   └── icons/                  ← Custom icon assets
└── README.md
```

---

## 🎨 Design System

### Color Palette
| Variable          | Value     | Usage                  |
|-------------------|-----------|------------------------|
| `--cream`         | `#FAF7F2` | Background             |
| `--dusty-pink`    | `#E8BFC5` | Accents, frames        |
| `--lavender`      | `#C8B8E5` | Tags, rings            |
| `--deep-plum`     | `#382B3D` | Primary text, buttons  |
| `--muted-rose`    | `#C98F9A` | Labels, highlights     |
| `--white`         | `#FFFFFF` | Card backgrounds       |

### Fonts (Google Fonts)
- **Poppins** (400, 700, 800) — Headings
- **Plus Jakarta Sans** (400, 500, 600) — Body text
- **Caveat** (400, 700) — Handwritten accents
- **DM Mono** (400, 500) — Labels, code, tags

### Breakpoints
| Label        | Range         |
|--------------|---------------|
| Desktop      | 1200px +      |
| Laptop       | 992–1199px    |
| Tablet       | 768–991px     |
| Mobile       | ≤ 767px       |
| Small Mobile | ≤ 480px       |

---

## ✅ What's Built

- [x] Fixed navbar with scroll-state glass effect
- [x] Mobile hamburger drawer with focus trap + Escape key
- [x] Hero section: photo blob frame, name, bio mini-cards
- [x] About section: scrapbook layout, education block, interests, goals
- [x] Skills section: 4 skill groups (Programming, Web, Tools, Soft Skills)
- [x] Projects section: asymmetric grid with browser mockup frames (3 projects)
- [x] Certificates section: gallery cards with lightbox overlay (3 certs)
- [x] Contact section: 4 contact cards (Email, GitHub, LinkedIn, WhatsApp)
- [x] Footer with copyright year (auto-updated)
- [x] Scroll reveal animations (IntersectionObserver)
- [x] Active nav link tracking
- [x] Cat mascot SVGs: waving (hero), peeking (skills), sleeping (about), envelope (contact)
- [x] Cat mascot click → speech bubble with funny Indonesian messages
- [x] Certificate lightbox (open/close/keyboard)
- [x] Scroll-to-top button
- [x] Reduced motion support (`prefers-reduced-motion`)
- [x] Semantic HTML5 + ARIA attributes for accessibility

---

## 📝 TODO — Fill in Real Data

> Search for `<!-- TODO` in `index.html` to find all placeholders.

### Profile & Bio
- [ ] `index.html` → Hero bio cards: Tempat/Tanggal Lahir, Pendidikan, Program Studi, Minat
- [ ] `index.html` → About section: personal narrative (3 paragraphs)
- [ ] `index.html` → Education block: university name, program, years
- [ ] `index.html` → Goals list: 4 personal goals

### Social & Contact Links
- [ ] `index.html` → GitHub href (navbar social + contact card)
- [ ] `index.html` → LinkedIn href (navbar social + contact card)
- [ ] `index.html` → Email: replace `todo@email.com`
- [ ] `index.html` → WhatsApp: replace `https://wa.me/6200000000000` with real number

### Profile Photo
- [ ] Add photo: `assets/images/profile/anisa.jpg`
- [ ] Uncomment `<img>` tag in hero photo-blob, remove placeholder div

### Projects (3 projects)
For each project in `index.html` (#proyek section):
- [ ] Project name (real name)
- [ ] Project category
- [ ] Project description
- [ ] Tech stack tags
- [ ] GitHub link
- [ ] Live demo link (or remove button)
- [ ] Screenshot: add to `assets/images/projects/proyekN.png`, uncomment `<img>` tag

### Certificates (3 certificates)
For each cert in `index.html` (#sertifikat section):
- [ ] Certificate name
- [ ] Issuer / platform
- [ ] Year
- [ ] Image: add to `assets/images/certificates/certN.jpg`
- [ ] Set `data-src="assets/images/certificates/certN.jpg"` on the article element
- [ ] Uncomment `<img>` tag inside cert-thumbnail

---

## 🚀 How to Run

1. Open the project folder: `D:\BACKUP\AM\aya\portfolio-anisa\`
2. Open `index.html` in a browser — it's a static site, no server needed.
3. For best development experience, use **Live Server** (VS Code extension).

---

## 🧰 Customization Tips

### Add more projects
Copy any `<article class="project-card ...">` block in the `#proyek` section and fill in the data. Update the grid CSS if you want a different layout.

### Add more certificates
Copy any `<article class="cert-card ...">` block in the `#sertifikat` section.

### Add more skill tags
Add `<span class="skill-tag">Tag Name</span>` inside any `.skill-tags` div. Use class `pink` for the rose-tinted variant.

### Change color palette
Edit the CSS custom properties in `css/style.css` → `:root {}` block.

### Add more cat messages
In `js/main.js` → `initCatMascot()` → the `messages` array.

---

## 📄 License

This portfolio is personal. All content, photos, and certificates belong to Anisa Auralita Aszahra.
Code structure is free to adapt for personal portfolio use.

---

