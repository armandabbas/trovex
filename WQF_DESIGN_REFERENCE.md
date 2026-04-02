# WorldQuant Foundry - Complete Design Reference for Trovex Clone

## 1. TECH STACK

- **CSS Framework**: Tailwind CSS v4.1.17
- **JS Framework**: Alpine.js (x-data, x-show, x-cloak, x-trap directives)
- **Animations**: GSAP + ScrollTrigger
- **3D**: Three.js (canvas in footer)
- **Slider**: Swiper.js
- **Smooth Scroll**: GSAP ScrollSmoother
- **CMS**: Craft CMS (SEOmatic, Formie)
- **CDN**: Servd (svdcdn.com for images/transforms)

---

## 2. COLOR PALETTE (CSS Custom Properties)

```css
--color-core-black: #090909;
--color-rich-carbon: #111111;       /* Primary dark bg */
--color-urban-smoke: #1b1b1b;       /* Header scrolled bg */
--color-pulse-ash: #535353;          /* Muted text */
--color-off-white: #e7e7e7;         /* Light text on dark */
--color-neural-fog: #dadada;         /* Light section bg, secondary text */
--color-white-flash: #f5f5f5;       /* Bright white variant */
--color-electric-teal: #5c939f;     /* Accent - founders cards */
--color-infrared: #ed6d40;          /* CTA / Footer accent */
--color-validation-green-dark: #59a993;
--color-validation-red: #cb3500;
```

### Usage in Tailwind classes:
- `bg-rich-carbon` = #111
- `bg-neural-fog` = #dadada
- `bg-urban-smoke` = #1b1b1b
- `bg-infrared` = #ed6d40
- `bg-electric-teal` = #5c939f
- `text-rich-carbon` = #111
- `text-neural-fog` = #dadada
- `text-off-white` = #e7e7e7
- `text-off-white/60` = #e7e7e7 at 60% opacity
- `border-off-white/20` = border at 20% opacity

---

## 3. TYPOGRAPHY

### Fonts
```css
--font-roc-grotesk: "Roc Grotesk", sans-serif;   /* Primary - headings & body */
--font-azeret-mono: "Azeret Mono", monospace;       /* Mono - labels, buttons, small text */
```

### Font Files
- `/assets/roc-grotesk-regular.woff2` (weight: 400)
- `/assets/roc-grotesk-medium.woff2` (weight: 500)
- `/assets/azeret-mono-regular.otf` (weight: 500)

### Typography Scale (custom utility classes)

#### Headings (Roc Grotesk Medium, weight 500)
| Class | Mobile | Desktop | Line Height |
|-------|--------|---------|-------------|
| `.h2` | 2.25rem (36px) | 3.75rem (60px) | 0.95 |
| `.h3` | 2rem (32px) | 3.125rem (50px) | 1.0 |
| `.h4` | 1.75rem (28px) | 2.5rem (40px) | 1.0 |
| `.h5` | 1.5rem (24px) | 1.875rem (30px) | 1.0 |
| `.h6` | 1.125rem (18px) | 1.375rem (22px) | 1.1 / 1.0 |

#### Body Text (Roc Grotesk Regular)
| Class | Mobile | Desktop | Line Height |
|-------|--------|---------|-------------|
| `.p1` | 0.875rem (14px) | 1rem (16px) | 120% |
| `.p2` | 0.938rem (15px) | - | 110% |
| `.p3` | 0.875rem (14px) | - | 115% |

#### Mono Text (Azeret Mono, uppercase)
| Class | Mobile | Desktop | Line Height |
|-------|--------|---------|-------------|
| `.p1-mono` | 0.75rem (12px) | 0.875rem (14px) | 120% |
| `.p2-mono` | 0.688rem (11px) | 0.75rem (12px) | 0.938rem |
| `.p3-mono` | 0.688rem (11px) | - | 130% |
| `.p4-mono` | 0.688rem (11px) | - | 130% |

All mono classes include `text-transform: uppercase`.

---

## 4. GLOBAL LAYOUT VARIABLES

```css
--easing: cubic-bezier(0.62, 0.16, 0.13, 1.01);  /* Custom easing for all transitions */
--header-height: 4rem;          /* Mobile */
--header-height: 5rem;          /* Desktop (lg: 64rem+) */
--spacing: 0.25rem;             /* Tailwind base spacing unit */
```

### Container Breakpoints (max-width)
- sm: 40rem (640px)
- md: 48rem (768px)
- lg: 64rem (1024px)
- xl: 80rem (1280px)
- 2xl: 96rem (1536px)

The `.container` class is used with auto margins and responsive padding via `px-[10px]` on mobile.

---

## 5. PAGE STRUCTURE - SECTION BY SECTION

### Body
```html
<body class="bg-rich-carbon text-neural-fog font-roc-grotesk">
```

### 5.1 HEADER (Fixed, auto-hide on scroll)
```
<header class="fixed top-0 z-50 w-full transition-transform duration-400 ease-(--easing) lg:h-(--header-height) lg:overflow-hidden">
  <div class="flex w-full lg:container">
    <div class="relative isolate mx-auto flex h-(--header-height) w-fit grow items-center justify-between gap-[20px] bg-transparent px-[10px] transition-all duration-600 ...">
```
- On scroll: `bg-rich-carbon` -> `bg-urban-smoke` (lg), shrinks to pill shape with `rounded-[8px]`, `px-[12px]`, `py-[4px]`
- Logo: 120x30px, shrinks to 30x30px icon on scroll
- Nav links: `p2-mono` uppercase, `h-[40px]`, `px-[20px]`
- Nav hover: animated dot (10x10px, `rounded-[3px]`) slides in from left + text scroll-up animation

### Corner Accent SVG Pattern (used everywhere)
```css
.corner-accent { position: absolute; }
.corner-accent:first-of-type { left: 0; top: 0; }
.corner-accent:nth-of-type(2) { right: 0; top: 0; transform: rotate(90deg); }
.corner-accent:nth-of-type(3) { bottom: 0; left: 0; transform: rotate(270deg); }
.corner-accent:nth-of-type(4) { bottom: 0; right: 0; transform: rotate(180deg); }
```
These are 9x9px SVG "L" shapes at the 4 corners of interactive elements (buttons, nav links, cards).

### 5.2 HERO SECTION
```html
<section class="relative overflow-hidden">
  <div class="container">
    <div class="flex h-dvh min-h-[550px] flex-col justify-between gap-[40px]">
      <!-- Spacer top -->
      <div class="hidden grow basis-0 md:block"></div>
      <!-- Title area -->
      <div class="relative isolate flex w-full grow justify-center pt-(--header-height) max-md:items-center md:grow-0 md:pt-0">
        <h1 class="h2 max-w-[800px] text-center leading-none uppercase">
          <!-- Words wrapped in spans for animation -->
        </h1>
      </div>
      <!-- Bottom bar -->
      <div class="p3-mono text-off-white/60 mt-auto flex flex-col justify-end gap-[6px] pb-[24px] md:mt-0 md:grow md:basis-0 md:pb-[30px]">
        <div class="border-off-white/20 flex w-full flex-col-reverse gap-[24px] border-t pt-[20px] md:flex-row">
          <!-- Left: Contact button -->
          <div class="flex items-center justify-between md:w-[30%] xl:w-[50%]">
          <!-- Right: Scroll indicator + description -->
          <div class="flex shrink-0 items-start justify-between md:w-[70%] xl:w-[50%]">
```
- Full viewport height (`h-dvh min-h-[550px]`)
- Dark bg (`bg-rich-carbon` from body)
- Title: `h2` class, uppercase, max-w-[800px], centered
- Bottom bar: border-top with 20% opacity, flex row on desktop

### 5.3 ETHOS SECTION (Light bg)
```html
<section class="bg-neural-fog text-rich-carbon overflow-hidden rounded-t-[20px] pt-[120px] pb-[200px] md:py-[220px]">
  <div class="container" id="ethos">
    <!-- Header row: 2 cols on desktop -->
    <div class="mb-[40px] grid grid-cols-1 gap-x-[24px] gap-y-[24px] md:mb-[60px] md:grid-cols-2">
      <div class="flex flex-col gap-[12px]">
        <h2 class="p2-mono">Our ethos</h2>
        <p class="h5 uppercase">Vision matters. Velocity wins.</p>
      </div>
      <div class="flex flex-col items-start">
        <p class="p1 border-rich-carbon/20 mb-[24px] border-t pt-[20px] md:mb-[32px]">
          <!-- Description text -->
        </p>
        <!-- Button -->
      </div>
    </div>
    <!-- Cards: horizontal scroll on desktop -->
```
- **Key**: `rounded-t-[20px]` on the section creates overlap effect over hero
- Clip-path animation on scroll entry (`inset(0 100% 0 0)` -> `inset(0 0 0 0)`)
- Cards: `rounded-[20px]`, `bg-rich-carbon text-neural-fog`
- Card inner: `pt-[40px] pb-[20px] md:py-[40px]`, centered content, `max-w-[300px]`
- Card titles: `h4` on mobile, `h5` on desktop, uppercase

### 5.4 FOCUS SECTION (Text centered)
```html
<section id="focus" class="flex h-dvh items-center overflow-hidden">
  <div class="container text-center">
    <div class="mx-auto flex max-w-[895px] flex-col items-center gap-[30px]">
      <div class="flex flex-col gap-[12px]">
        <h2 class="p1-mono"><!-- label --></h2>
        <h3 class="h2 uppercase"><!-- heading --></h3>
      </div>
    </div>
  </div>
</section>
```
- Full viewport height, centered vertically
- Dark bg (inherits body)
- Max width: 895px
- Gap between label and heading: 12px
- Gap between heading group and content: 30px

### 5.5 INDUSTRIES SECTION (Interactive list)
```html
<section id="industries" class="-mt-px min-h-dvh py-[40px] md:py-[100px]">
  <div class="relative container">
    <ul class="relative isolate flex flex-col items-center text-center">
      <li class="group grid grid-rows-[auto_0fr] px-[40px] py-[10px] text-center transition-[grid-template-rows,padding] duration-500 ease-(--easing) data-active:grid-rows-[auto_1fr] data-active:py-[60px]">
```
- List items expand on hover/click using CSS grid row animation
- `grid-rows-[auto_0fr]` -> `grid-rows-[auto_1fr]` for expand
- Centered text, full width items

### 5.6 PORTFOLIO SECTION
```html
<section class="overflow-hidden pt-[170px] pb-[120px] md:pb-[200px]">
  <div class="@container container" id="portfolio">
    <!-- Centered header -->
    <div class="mx-auto mb-[80px] flex max-w-[668px] flex-col items-center gap-[15px] text-center md:mb-[100px]">
      <h2 class="p1-mono">Our portfolio</h2>
      <p class="h5 mb-[24px] text-balance uppercase md:mb-[32px]">...</p>
      <!-- Button -->
    </div>
    <!-- Portfolio cards grid -->
```
- Centered intro: max-w-[668px]
- Uses `@container` for container queries
- Dark bg (body)

### 5.7 INVESTORS SECTION
```html
<section class="py-[120px] md:py-[200px]" id="investors-section">
  <div class="container">
    <div class="mx-auto grid max-w-[1440px] grid-cols-12 items-start gap-x-[24px] gap-y-[40px]">
      <!-- Left column: sticky info -->
      <div class="col-span-12 flex flex-col items-start gap-[35px] md:col-span-5 xl:col-span-4">
        <div class="border-off-white/20 flex w-full flex-col gap-[15px] border-b pb-[15px]">
          <h2 class="p2-mono">For Investors</h2>
          <p class="h4 uppercase">...</p>
        </div>
        <p class="p2-mono text-off-white/60">...</p>
        <!-- Button -->
      </div>
      <!-- Right column: cards -->
      <div class="col-span-12 md:col-span-7 xl:col-span-8">
```
- 12-column grid, max-w-[1440px]
- Left: 5 cols (md) / 4 cols (xl), sticky on scroll
- Right: 7 cols (md) / 8 cols (xl)
- Section header pattern: label (p2-mono) + heading (h4 uppercase) + border-b

### 5.8 FOUNDERS SECTION
```html
<section class="pb-[200px] md:pt-[300px] md:pb-[300px]" id="founders-section">
  <div class="container" id="founders">
    <div class="mx-auto grid max-w-[1440px] grid-cols-12 items-start gap-x-[24px] gap-y-[40px]">
      <!-- Left: stacking cards -->
      <div class="order-2 col-span-12 md:order-1 md:col-span-6">
        <!-- Card -->
        <div class="bg-electric-teal text-rich-carbon flex aspect-[1.3/1] max-h-[500px] min-h-[300px] w-full max-w-[668px] flex-col justify-between gap-[32px] rounded-[20px] px-[20px] py-[40px] md:min-h-[500px] md:px-[40px] md:py-[60px]">
      </div>
      <!-- Right: sticky info (same pattern as investors) -->
```
- Same 12-col grid layout
- Founder cards: `bg-electric-teal`, `rounded-[20px]`, `aspect-[1.3/1]`
- Cards pin/stack on scroll (GSAP ScrollTrigger)

### 5.9 PARTNERS SECTION
```html
<section class="container grid items-center pt-[120px] md:grid-cols-12 md:pt-[300px] md:pb-[280px]">
  <div class="col-span-12 lg:col-span-4">
    <!-- Info column: same pattern -->
    <div class="flex max-w-[437px] flex-col items-start gap-[35px]">
      <div class="border-off-white/20 flex flex-col gap-[15px] border-b pb-[15px]">
        <h2 class="p2-mono md:p1-mono">partners</h2>
        <h3 class="h5 uppercase">...</h3>
      </div>
      <p class="p1-mono text-off-white/60">...</p>
    </div>
  </div>
  <!-- Logos grid: col-span-8 -->
```

### 5.10 FOOTER
```html
<footer id="footer">
  <div class="container px-0!">
    <div class="bg-rich-carbon relative grid lg:grid-cols-2">
      <!-- Left: Three.js canvas (hidden on mobile) -->
      <canvas class="hidden size-full lg:block"></canvas>
      <!-- Right: CTA area -->
      <div class="bg-infrared text-rich-carbon grid w-full grid-cols-2 gap-[12px] gap-y-[60px] rounded-t-[20px] px-[10px] pt-[30px] pb-[10px] md:min-h-[666px] md:gap-[32px] md:gap-y-[210px] md:rounded-bl-[20px] md:pt-[40px] md:pb-[30px] lg:px-[24px] xl:px-[40px]">
        <!-- Top left: heading + description + CTA -->
        <div class="flex w-full flex-col items-start justify-start gap-[12px]">
          <h2 class="h6 uppercase">Own what's next.</h2>
          <p class="p2-mono mb-auto">...</p>
          <!-- Contact button -->
        </div>
        <!-- Top right: Logo emblem -->
        <!-- Bottom: Legal links -->
      </div>
    </div>
  </div>
</footer>
```
- Footer CTA: `bg-infrared` (#ed6d40), 2-column grid
- `rounded-t-[20px]` on mobile, adds `rounded-bl-[20px]` on md
- Min height: 666px on desktop
- Legal links use `p2-mono` with underline-on-hover animation

---

## 6. BUTTON COMPONENT PATTERN

Every button/link follows this exact pattern:
```html
<button class="group/button hover:animate-glitch-hover relative isolate" data-theme="light|dark">
  <div class="flex h-[40px] items-center justify-center px-[20px]">
    <!-- Animated dot -->
    <div class="group-data-[theme=light]/button:bg-neural-fog group-data-[theme=dark]/button:bg-rich-carbon size-[10px] -translate-x-[24px] rounded-[3px] opacity-0 blur-[20px] transition-all duration-400 ease-(--easing) group-hover/button:-translate-x-[5px] group-hover/button:opacity-100 group-hover/button:blur-[0px]"></div>
    <!-- Text with scroll animation -->
    <div class="p2-mono ... relative isolate flex -translate-x-[5px] overflow-hidden transition-transform duration-400 ease-(--easing) group-hover/button:translate-x-[5px]">
      <span class="transition-transform duration-400 ease-(--easing) group-hover/button:-translate-y-full">Label</span>
      <span class="absolute inset-0 translate-y-full transition-transform duration-400 ease-(--easing) group-hover/button:translate-y-0" aria-hidden="true">Label</span>
    </div>
  </div>
  <!-- 4x Corner accent SVGs (9x9px) -->
</button>
```
- `data-theme="light"`: dot is neural-fog, text is neural-fog
- `data-theme="dark"`: dot is rich-carbon, text is rich-carbon
- Height: 40px
- Hover: dot slides in from left (blur->sharp), text shifts right, text scrolls up (duplicate below)
- `animate-glitch-hover`: quick opacity flicker (0.3s)

---

## 7. SECTION HEADER PATTERN (Repeated)

Used in Investors, Founders, Partners sections:
```html
<div class="border-off-white/20 flex flex-col gap-[15px] border-b pb-[15px]">
  <h2 class="p2-mono">Label</h2>
  <p class="h4 uppercase">Heading text</p>
</div>
<p class="p2-mono text-off-white/60">Description</p>
```

---

## 8. KEY SPACING VALUES

| Usage | Value |
|-------|-------|
| Section padding (mobile) | `pt-[120px] pb-[200px]` |
| Section padding (desktop) | `py-[220px]` or `py-[200px]` |
| Container gaps | `gap-x-[24px] gap-y-[40px]` |
| Card border radius | `rounded-[20px]` |
| Section overlap radius | `rounded-t-[20px]` |
| Header pill radius | `rounded-[8px]` |
| Button corner radius | `rounded-[3px]` (dot only) |
| Grid max-width | `max-w-[1440px]` |
| Content max-width (centered) | `max-w-[668px]` or `max-w-[800px]` |
| Card padding | `px-[20px] py-[40px]` mobile, `px-[40px] py-[60px]` desktop |
| Border color | `border-off-white/20` (dark bg) or `border-rich-carbon/20` (light bg) |

---

## 9. ANIMATION KEYFRAMES

```css
@keyframes glitch-hover {
  0% { opacity: 1 }
  /* Quick flicker effect */
}

@keyframes loader {
  0% { clip-path: inset(0); transform: translateY(0) }
}

@keyframes clip-svg {
  0% { clip-path: inset(100% 0 0) }
}
```

### GSAP Scroll Animations Used:
1. **Section reveal**: `clipPath: 'inset(0 100% 0 0)'` -> normal (scrub)
2. **Content fade-up**: `opacity: 0, y: 80` on scroll trigger
3. **Text split reveal**: Individual word/char animations
4. **Sticky columns**: ScrollTrigger pin for info columns
5. **Stacking cards**: Cards pin at increasing offsets (80px + 80*index*0.25)

---

## 10. RESPONSIVE BREAKPOINTS

| Prefix | Min-width |
|--------|-----------|
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |

Mobile-first approach. Key responsive changes:
- Header: hamburger on mobile, horizontal nav on lg
- Grids: 1 col mobile -> 2 col md -> 12 col grid system
- Section padding roughly doubles from mobile to desktop
- Typography scales up ~1.5-1.7x from mobile to desktop

---

## 11. CONTACT MODAL

```html
<div class="bg-rich-carbon/40 fixed inset-0 z-50 flex backdrop-blur-[10px]">
  <div class="bg-neural-fog text-rich-carbon max-w-[700px] overflow-y-auto px-[16px] pt-[32px] md:rounded-r-[20px] md:p-[40px]">
```
- Backdrop: 40% opacity + 10px blur
- Panel: slides in from left with clip-path animation
- Light bg (`bg-neural-fog`), max-w-[700px]
- Form uses Formie (Craft CMS plugin)

---

## 12. MOBILE MENU

```html
<div class="bg-rich-carbon/1 absolute top-full left-0 h-[calc(100dvh-var(--header-height))] w-full backdrop-blur-[10px] lg:hidden">
  <ul class="bg-rich-carbon border-off-white/20 grid grid-cols-2 border-b px-[10px] py-[12px]">
    <li class="relative isolate">
      <div class="flex h-[60px] items-center justify-center text-center">
        <span class="p3-mono">LINK</span>
      </div>
      <!-- Corner accents -->
    </li>
```
- 2-column grid layout
- Each item: 60px height, centered text
- Clip-path slide-down animation
