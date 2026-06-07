# Images — where to place property photography

The site currently uses elegant **SVG placeholders** so everything looks intentional
before your real photos arrive. Replace them with your own images at any time.

## The simplest way to swap images
Keep the **same filename** as the placeholder and the site updates automatically.
Real photos should be **JPG** (or WebP). The HTML uses `.svg` filenames, so either:

- **Option A (easiest):** save your photo with the exact placeholder name but `.jpg`,
  then do a find-and-replace of that one `.svg` → `.jpg` reference in the HTML, **or**
- **Option B:** just ask me to switch all references to `.jpg` in one pass.

## Recommended photos & sizes

| File | Used for | Suggested size |
|------|----------|----------------|
| `hero-poster.svg` | Hero still (behind/while video loads) | 1920×1080 |
| `og-image.svg` | Social share preview | 1200×630 |
| `details-hero.svg` | Property Details page banner | 1920×1080 |
| `contact-hero.svg` | Contact page banner | 1920×1080 |
| `band.svg` | "Room to create" full-width band (home) | 1920×1080 |
| `feature-residence.svg` | Residence split image | 900×1125 (portrait) |
| `feature-studio.svg` | Studio split image | 900×1125 (portrait) |
| `feature-land.svg` | IM band image (details) | 1920×1080 |
| `gallery/gallery-01..12-*.svg` | Masonry gallery | ~800px wide, varied heights |

## Gallery categories
Each gallery image in `index.html` has a `data-cat="..."` attribute that powers the
filter buttons. Categories available:
`architecture`, `views`, `interiors`, `studio`, `land`, `creek`, `lifestyle`.

To add more gallery images, copy a `<figure class="tile" ...>` block in `index.html`,
point it at your new file, and set the right `data-cat`. (Or send me the photos and
I'll lay them out.)

## Performance tips
- Compress JPGs (e.g. [squoosh.app](https://squoosh.app)) to ~150–400 KB each.
- Gallery images are already **lazy-loaded** — they only download as you scroll.
- Always keep meaningful `alt` text for accessibility and SEO.

## Regenerating placeholders
If you ever want to regenerate the placeholders:
`node assets/images/_generate-placeholders.js`
