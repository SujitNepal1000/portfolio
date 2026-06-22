# Portfolio Design Implementation Guide
**Sujit Nepal — QA Engineer Portfolio**

---

## Design Concept

**Theme:** Debug console meets engineering portfolio — dark, precise, terminal-inspired.
**Audience:** Hiring managers, technical leads, and clients evaluating a senior QA engineer.
**Page job:** Establish credibility fast, surface real impact numbers, and make contact effortless.

---

## Design Tokens

### Color Palette

| Name | Hex | Usage |
|---|---|---|
| `--bg-base` | `#0A0F1E` | Page background |
| `--bg-surface` | `#0E1628` | Cards, runner, nav |
| `--bg-bar` | `#141C30` | Terminal title bar |
| `--accent-cyan` | `#00D9FF` | Primary accent, links, pass indicator |
| `--accent-red` | `#FF4D6D` | Fail/bug indicator |
| `--accent-yellow` | `#FFB703` | Terminal dot (decorative) |
| `--border` | `#1E2940` | All borders and dividers |
| `--text-primary` | `#E8EDF5` | Headings, names |
| `--text-secondary` | `#8899B0` | Body copy, descriptions |
| `--text-muted` | `#6A85A0` | Bullets, project descriptions |
| `--text-dim` | `#3D5070` | Timestamps, section echoes |
| `--text-ghost` | `#2E4060` | Footer, inactive links |

### Typography

| Role | Font | Size | Weight | Usage |
|---|---|---|---|---|
| Display | `Space Grotesk` | 56px | 700 | Hero name |
| Body | `Space Grotesk` | 15px | 400 | Bio, bullets |
| Subheading | `Space Grotesk` | 18px | 600 | Company names |
| Code / Labels | `JetBrains Mono` | 11–13px | 400–500 | Roles, timestamps, section markers, nav logo |

**Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Spacing Scale

| Token | Value | Usage |
|---|---|---|
| `--space-xs` | `8px` | Icon gaps, tag gaps |
| `--space-sm` | `12px` | Internal card padding |
| `--space-md` | `16px` | Component padding |
| `--space-lg` | `24px` | Section sub-gaps |
| `--space-xl` | `2rem` | Section padding |
| `--space-2xl` | `4rem` | Section bottom padding |

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `4px` | Tags, code elements |
| `--radius-md` | `6px` | Cert items, small cards |
| `--radius-lg` | `8px` | Project cards, skill cards, test runner |
| `--radius-pill` | `100px` | Nav pills, role badges |

---

## Layout Architecture

### Page Structure (single-page scroll)

```
┌─────────────────────────────────────────┐
│  NAV (sticky)                           │
│  logo · links · hire me CTA            │
├─────────────────────────────────────────┤
│  HERO                                   │
│  eyebrow · name · title · bio · links  │
│  ┌───────────────────────────────────┐  │
│  │  TEST RUNNER (signature element)  │  │
│  │  animated test lines ✓ / ✗        │  │
│  └───────────────────────────────────┘  │
├─────────────────────────────────────────┤
│  SKILLS  // skills                      │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │ card │ │ card │ │ card │ │ card │  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
├─────────────────────────────────────────┤
│  PROJECTS  // projects                  │
│  ┌──────────┐ ┌──────────┐             │
│  │ proj card│ │ proj card│             │
│  └──────────┘ └──────────┘             │
├─────────────────────────────────────────┤
│  EXPERIENCE  // experience              │
│  [period]  Company · Role · Bullets    │
├─────────────────────────────────────────┤
│  CERTIFICATIONS  // certifications      │
│  stacked cert rows with icon           │
├─────────────────────────────────────────┤
│  FOOTER                                 │
│  contact · location · education        │
└─────────────────────────────────────────┘
```

### Max Width & Gutters

```css
.section {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 2rem 4rem;
}
```

---

## Component Specifications

### 1. Navigation (Sticky)

```
[sujit@qa:~$]    work  skills  projects  certs    [hire me ↗]
```

- Background: `#0A0F1E` at `0.95` opacity with `backdrop-filter: blur(8px)`
- Border bottom: `1px solid #1E2940`
- Logo: `JetBrains Mono`, `13px`, color `#00D9FF`
- Nav links: `13px`, color `#8899B0`, hover `#E8EDF5`
- CTA button: mono font, `12px`, `1px solid #00D9FF`, border-radius `4px`, hover bg `rgba(0,217,255,0.08)`

---

### 2. Hero Section

**Eyebrow**
- `JetBrains Mono`, `12px`, `#00D9FF`, `letter-spacing: 0.12em`, uppercase
- Left decorative line: `24px wide`, `1px`, `#00D9FF`

**Name**
- `Space Grotesk`, `56px`, `700`, `letter-spacing: -0.02em`
- "Nepal" highlighted in `#00D9FF`

**Title line**
- `JetBrains Mono`, `18px`, color `#5A7090`
- Content: `AI · LLM · Automation · API · Performance`

**Bio**
- `15px`, `line-height: 1.75`, color `#8899B0`, `max-width: 560px`

**Pill links**
- `JetBrains Mono`, `12px`, border `1px solid #1E2940`, `border-radius: 100px`
- Icons from Tabler outline icon set
- Hover: border `#00D9FF`, text `#00D9FF`

---

### 3. Test Runner (Signature Element)

The hero's centerpiece. A terminal-styled window that animates test lines in one by one on page load, referencing real metrics from the QA work.

**Window chrome**
```
● ● ●   test_suite — sujit_nepal_qa.spec.ts
```
- Three dots: red `#FF4D6D`, yellow `#FFB703`, cyan `#00D9FF`
- Title bar bg: `#141C30`, border-bottom `1px solid #1E2940`
- Title text: `JetBrains Mono`, `11px`, `#3D5070`

**Test lines (animate in sequence)**

Each line: `font-family: JetBrains Mono`, `12px`
- Status `✓`: color `#00D9FF`
- Status `✗`: color `#FF4D6D`
- Test name label: `#C8D8E8` (bold part), `#5A7090` (rest)
- Timestamp: `#2E4060`
- Separator: `border-bottom: 1px solid #111827`

**Animation:**
```js
// Stagger each line by 320ms
lines.forEach((id, i) => {
  setTimeout(() => {
    el.classList.add('visible'); // opacity 0→1, translateX(-6px)→0
    if (last line) show summary after 400ms
  }, 400 + i * 320);
});
```

**Summary row**
```
✓ 5 passed    ✗ 1 caught    Test suite: 4.6s
```
- Fades in after all lines complete
- Pass: `#00D9FF`, Fail: `#FF4D6D`, Time: `#3D5070`

**Test lines content:**
```
✓  LLM accuracy › hallucination rate below threshold              12ms
✓  API integrity › all 200+ endpoints return valid schema         38ms
✓  Load test › 5,000 concurrent users — no degradation           4.2s
✓  Prompt injection › 200 adversarial inputs — all blocked        91ms
✓  Source attribution › 90% accuracy confirmed                    7ms
✗  Regression › 40 discrepancies logged → patched               213ms
```

---

### 4. Section Labels

```
// skills ──────────────────────────────────────────
```

- `JetBrains Mono`, `11px`, `#3D5070`, `letter-spacing: 0.14em`, uppercase
- After pseudo-element: `flex: 1`, `height: 1px`, `background: #1E2940`

---

### 5. Skill Cards

Grid: `repeat(auto-fit, minmax(200px, 1fr))`, `gap: 12px`

Each card:
- Background: `#0E1628`
- Border: `1px solid #1E2940`, hover `#2A3D5C`
- Border-radius: `8px`, padding `1rem 1.25rem`
- Category label: `JetBrains Mono`, `10px`, `#00D9FF`, uppercase, `letter-spacing: 0.1em`
- Tools text: `13px`, `#6A85A0`, `line-height: 1.7`

**Six skill cards:**
| Category | Tools |
|---|---|
| AI / LLM Testing | Accuracy · Hallucination · Prompt Injection · Bias Detection · Intent Validation |
| API & Integration | Postman · REST · Microservices · Schema Validation · Error Handling |
| Automation | Cypress · Selenium · Keyword-Driven · Data-Driven · CI/CD |
| Performance & Security | JMeter · OWASP ZAP · Burp Suite · Load Testing · Stress Testing |
| Database | SQL · Query Optimization · Data Validation · Data Integrity |
| Tools & Tracking | Jira · Git · GitHub · Docker · AWS · Grafana · Lens |

---

### 6. Project Cards

Grid: `repeat(auto-fit, minmax(260px, 1fr))`, `gap: 16px`

Each card:
- Background: `#0E1628`
- Border: `1px solid #1E2940`, hover `#00D9FF`
- Hover: `transform: translateY(-2px)`
- Border-radius: `8px`, padding `1.5rem`
- `display: flex; flex-direction: column; gap: 10px`

**Card anatomy:**
```
┌─────────────────────────────────┐
│  Project Name          Lead QA  │  ← name 15px/600 + role badge
│                                 │
│  Short description of the       │  ← 13px, #6A85A0, line-height 1.65
│  project and QA impact.         │
│                                 │
│  [tag] [tag] [tag]              │  ← 10px mono, border #1E2940
│                                 │
│  ↗ live-url.com                 │  ← 11px mono, #2E4060 → #00D9FF hover
└─────────────────────────────────┘
```

**Role badge:**
- `JetBrains Mono`, `10px`, `#00D9FF`
- Background: `rgba(0,217,255,0.08)`
- Border: `1px solid rgba(0,217,255,0.2)`
- Border-radius: `100px`, padding `3px 8px`

---

### 7. Experience Section

Two-column grid: `140px` (period) + `1fr` (content), `gap: 2rem`

- Period: `JetBrains Mono`, `12px`, `#3D5070`
- Company name: `18px`, `600`, `#E8EDF5`
- Role: `JetBrains Mono`, `12px`, `#00D9FF`
- Bullets: `13px`, `#6A85A0`, `line-height: 1.6`
  - Bullet marker: `▸` positioned absolutely, `#1E2940`, `10px`
- Separator: `border-bottom: 1px solid #1E2940`

---

### 8. Certifications List

Stacked rows, `gap: 10px`

Each row:
- Background: `#0E1628`, border `1px solid #1E2940`, border-radius `6px`
- Padding: `12px 16px`
- Icon: `ti-certificate` from Tabler, `16px`, `#00D9FF`
- Cert name: `13px`, `#8899B0`
- Issuer: `JetBrains Mono`, `11px`, `#3D5070`, right-aligned

---

### 9. Footer

- Border-top: `1px solid #1E2940`
- Text: `JetBrains Mono`, `12px`, `#2E4060`
- Links: `#00D9FF`
- Content: name · location · email · phone · education

---

## Icons

Uses **Tabler Icons** (outline, loaded via CDN):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
```

| Location | Icon class |
|---|---|
| Website link | `ti-world` |
| GitHub | `ti-brand-github` |
| LinkedIn | `ti-brand-linkedin` |
| Email | `ti-mail` |
| External project link | `ti-external-link` |
| NDA project | `ti-lock` |
| Certificates | `ti-certificate` |

All decorative icons get `aria-hidden="true"`.

---

## Animations

| Element | Animation | Timing |
|---|---|---|
| Test runner lines | `opacity 0→1`, `translateX(-6px → 0)` | staggered, `320ms` apart, starting at `400ms` |
| Test runner summary | `opacity 0→1` | `400ms` after last line |
| Project cards | `translateY(-2px)` on hover | `transition: 0.2s` |
| Pill links | color + border-color change | `transition: 0.2s` |
| Nav CTA | background fill | `transition: 0.2s` |

`prefers-reduced-motion` should disable the test runner stagger and show all lines immediately.

---

## Accessibility

- `<h2 class="sr-only">` at top of widget with page summary for screen readers
- All decorative icons: `aria-hidden="true"`
- CTA button: visible focus ring
- Color is never the sole indicator — pass `✓` / fail `✗` use both symbol and color
- Sticky nav: `z-index: 100`

---

## Responsive Notes

- Hero name: scale down to `36px` below `480px`
- Skills grid: collapses to `1` column below `400px`
- Projects grid: collapses to `1` column below `480px`
- Experience grid: collapses to single column, period moves above content
- Nav links: hide on mobile, keep logo + CTA only

---

## File Structure (if building as a site)

```
portfolio/
├── index.html          ← single page entry
├── css/
│   ├── tokens.css      ← all CSS variables from this doc
│   ├── layout.css      ← nav, hero, sections, footer
│   └── components.css  ← cards, runner, badges, pills
├── js/
│   └── runner.js       ← test runner animation logic
└── assets/
    └── resume.pdf      ← downloadable resume
```

---

## External Dependencies

| Resource | URL |
|---|---|
| Space Grotesk + JetBrains Mono | `fonts.googleapis.com` |
| Tabler Icons webfont | `cdn.jsdelivr.net/npm/@tabler/icons-webfont` |

No JS frameworks required — vanilla HTML, CSS, and JavaScript only.