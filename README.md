# Serra Luma — Estate Presentation Website

A premium, editorial website for **Serra Luma** — a rare 134-acre architectural
sanctuary in *Chowan Creek, Byron Bay Hinterland NSW*.

Structured as a luxury **destination / estate presentation** (in the spirit of Aman
Resorts and Six Senses) rather than a real estate listing — story-led, cinematic,
calm, and built to convert serious buyers through a single private enquiry.

> Strategic source of truth: `assets/Serra Luma Website Structure.pdf`
> (positioning, messaging, copy and visual direction).

The site is structured around **Story → Place → Experience → Possibility → Property**,
so features support the story rather than leading it.

---

## Pages
| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Cinematic narrative: Hero → The Story → The Estate (facts) → Future Chapters → Curated Gallery → Location → Enquire |
| The Estate | `estate.html` | One image-led page with anchored sections: Overview · The Residence (`#residence`) · The Studio (`#studio`) · The Land (`#land`) · Retreat Potential (`#retreat`) · Floor plan |
| Future Chapters | `future-chapters.html` | Five future visions — Family Estate, Wellness Retreat, Creative Sanctuary, Regenerative Holding, Eco Tourism — large imagery + narrative |
| Gallery | `gallery.html` | Immersive, distraction-free gallery with lightbox |
| Enquire | `enquire.html` | **Primary lead capture** — Name, Email, Phone, Country, Reason + “Send me the Information Memorandum” checkbox |

**Navigation:** Home · The Estate ▾ (dropdown to the four sections) · Future Chapters · Gallery · **[Enquire Privately]**

There is no separate Contact page or Information Memorandum page — all enquiries and
IM requests flow through `enquire.html`. (Old `/contact` and `/property-details`
URLs 301-redirect to the new pages via `netlify.toml`.)

---

## Tech stack
Intentionally **buildless** — plain semantic HTML, one CSS file, one JS file.
No framework, no build step, no dependencies to install. This means:
- **Instant deploy** anywhere (especially Netlify)
- **Fast loading** (lazy-loaded gallery, deferred JS, system-friendly fonts)
- **Easy to edit** — open the `.html` files and change the text directly

```
.
├── index.html              (Home)
├── estate.html             (The Estate)
├── future-chapters.html    (Future Chapters / Possibilities)
├── gallery.html            (Gallery)
├── enquire.html            (Enquire — lead capture)
├── netlify.toml
├── robots.txt
└── assets/
    ├── Serra Luma Website Structure.pdf   ← strategic source of truth
    ├── css/styles.css        ← all styling + colour/typography variables
    ├── js/main.js            ← nav, dropdown, scroll animations, gallery, lightbox, form
    ├── images/               ← property photography (Main House / Land / Studio + Floorplan.png)
    ├── video/                ← put hero.mp4 here (see video/README.md)
    └── docs/                 ← optional IM PDF (see docs/README.md)
```

### Colour palette (Aman-inspired — edit in `:root` of `styles.css`)
Deep charcoal `#1F1F1C` · warm stone `#D8D0C4` · soft eucalyptus `#8C9683`
· muted bronze `#B08D57` · warm ivory `#F7F4EE`.

---

## Quick start (preview locally)
Because the gallery/JS use relative paths, just open the file or run a tiny server:

```bash
# from this folder
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## How to customise

### Text content
All copy lives directly in the `.html` files — edit in place. Keep the PDF as the
voice/positioning reference.

### Colours & fonts
Open `assets/css/styles.css` and edit the variables at the top (`:root { ... }`):
```css
--forest:#1F1F1C; --stone:#D8D0C4; --ivory:#F7F4EE;
--eucalyptus:#8C9683; --clay:#B08D57; --ink:#2A2926;
```
Fonts: **Cormorant Garamond** (headings) + **Inter** (body), loaded from Google Fonts.

### The hero video
See **`assets/video/README.md`** — drop in `assets/video/hero.mp4` (slow, cinematic,
expansive: morning mist, Wollumbin, sunrise, timber, creek, ridgeline).

### Photos / gallery
Photography lives in `assets/images/Main House`, `Land` and `Studio`. To add/replace
gallery images, copy a `<figure class="tile …">` block in `gallery.html` (or the home
preview in `index.html`) and point it at your file. Span classes `tile--feature`,
`tile--wide`, `tile--tall` control the editorial rhythm.

### Agent / contact details
On `enquire.html`, edit the **"Private enquiries"** card — the email
(`hello@serraluma.com`) and the `[ Agent / agency name ]` placeholder.

---

## Enquiry form (primary lead capture)

`enquire.html` is the single conversion point. Fields: Name, Email, Phone, Country,
Reason for enquiry, optional Message, and a **“Please send me the Information
Memorandum”** checkbox — so IM requests are captured as leads (no separate download
page). It is pre-wired for **Netlify Forms** (`data-netlify="true"`); on Netlify,
submissions appear under **Forms** in your dashboard and become your buyer database.
Add email alerts under *Site settings → Forms → Form notifications*.

**Prefer another service?** Set the form's `action` to your endpoint, e.g. Formspree:
```html
<form id="enquiry-form" class="form" method="POST" action="https://formspree.io/f/XXXXXXX">
```
(Remove the `data-netlify` and hidden Netlify fields if not using Netlify.)

If neither is configured, the form shows a friendly on-page confirmation and resets —
so it never looks broken during testing.

---

## Deploy to Netlify

**Option A — drag & drop (fastest):**
1. Go to <https://app.netlify.com/drop>
2. Drag this whole folder onto the page. Done.

**Option B — Git + continuous deploy:**
1. Push this folder to a GitHub repo.
2. In Netlify: *Add new site → Import from Git* → pick the repo.
3. Build command: *(leave blank)* · Publish directory: `.`
4. Deploy. `netlify.toml` already sets caching + clean URLs.

After deploying, set a custom domain in Netlify (Domain settings).

---

## SEO & sharing (already done)
- Unique `<title>` + meta description per page.
- Open Graph + Twitter card tags with a preview image
  (`assets/images/og-image.svg` — replace with a 1200×630 JPG for best results).
- Semantic HTML, descriptive `alt` text, accessible form labels, skip link.
- `robots.txt` allows indexing. (Add a `sitemap.xml` later if desired — ask me.)

---

## Accessibility
- Keyboard-navigable nav, form and lightbox (Esc closes the lightbox).
- Visible focus states, labelled inputs, and `prefers-reduced-motion` support
  (animations are disabled for users who request reduced motion).
- Colour palette chosen for readable contrast over imagery (dark overlays on heroes).

---

## Want changes?
Easy things to ask for next: a YouTube/Vimeo modal for "Watch the Film",
a Google Map embed on the location section, a `sitemap.xml`, or swapping all
placeholder `.svg` references to your real `.jpg` photos in one pass.
