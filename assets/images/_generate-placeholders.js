/* Generates cinematic SVG placeholder images for Serra Luma.
   Run once with:  node assets/images/_generate-placeholders.js
   These are intended to be REPLACED with real photography (see README). */
const fs = require("fs");
const path = require("path");

const OUT = __dirname;
const GAL = path.join(OUT, "gallery");
if (!fs.existsSync(GAL)) fs.mkdirSync(GAL, { recursive: true });

/* palette */
const C = {
  forest: "#1F2A30",
  stone: "#E8E0D2",
  ivory: "#F7F3EA",
  euc: "#8A9A8A",
  clay: "#B8845F",
  ink: "#242424",
};

/* theme presets: [skyTop, skyBottom, ridge1, ridge2, foreground, label colour] */
const THEMES = {
  views:        [C.clay, "#d8b58c", "#6e7e74", "#4a5a52", C.forest, C.ivory],
  architecture: ["#2c3a40", "#48565b", "#5c6a64", "#3d4a44", C.forest, C.stone],
  interiors:    ["#2a2520", "#4a3f33", "#6b5a45", "#8a7355", "#3a322a", C.stone],
  studio:       ["#3a4340", "#5a6560", "#7b857c", "#566058", C.forest, C.ivory],
  land:         ["#9aa78f", "#7e8f74", "#5e7158", "#465c44", "#2f3e2c", C.ivory],
  creek:        ["#7d8f86", "#9ca89a", "#6b8278", "#4d6359", "#324038", C.ivory],
  lifestyle:    ["#c98f63", "#e0b88f", "#8a9a8a", "#5e7158", C.forest, C.ivory],
  hero:         ["#3a4a50", "#6b7a72", "#4a5a52", "#2f3c38", C.forest, C.ivory],
};

function svg(w, h, theme, label) {
  const t = THEMES[theme] || THEMES.views;
  const [skyA, skyB, r1, r2, fg, lab] = t;
  // gentle ridgeline paths scaled to viewbox
  const ridge = (y, amp, fill, op) => {
    const pts = [];
    const steps = 8;
    for (let i = 0; i <= steps; i++) {
      const x = (w / steps) * i;
      const yy = y + Math.sin(i * 1.3 + (theme.length || 3)) * amp - Math.cos(i * 0.7) * (amp * 0.6);
      pts.push(`${x.toFixed(0)},${yy.toFixed(0)}`);
    }
    return `<path d="M0,${h} L0,${pts[0].split(",")[1]} L${pts.join(" L")} L${w},${h} Z" fill="${fill}" opacity="${op}"/>`;
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyA}"/>
      <stop offset="1" stop-color="${skyB}"/>
    </linearGradient>
    <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.12"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#sky)"/>
  <circle cx="${w * 0.74}" cy="${h * 0.26}" r="${Math.min(w, h) * 0.09}" fill="#ffffff" opacity="0.16"/>
  ${ridge(h * 0.55, h * 0.06, r1, 0.55)}
  ${ridge(h * 0.66, h * 0.05, r2, 0.7)}
  ${ridge(h * 0.8, h * 0.04, fg, 0.92)}
  <rect width="${w}" height="${h * 0.5}" fill="url(#haze)"/>
  <text x="${w / 2}" y="${h - 26}" text-anchor="middle"
    font-family="Georgia, serif" font-size="${Math.max(13, w * 0.028)}"
    letter-spacing="3" fill="${lab}" opacity="0.85">SERRA LUMA · ${label.toUpperCase()}</text>
</svg>`;
}

function write(file, content) {
  fs.writeFileSync(file, content);
  console.log("wrote", path.relative(path.join(OUT, "..", ".."), file));
}

/* Hero poster + OG image */
write(path.join(OUT, "hero-poster.svg"), svg(1920, 1080, "hero", "Ridgeline"));
write(path.join(OUT, "og-image.svg"), svg(1200, 630, "views", "Lifestyle Acreage"));
write(path.join(OUT, "details-hero.svg"), svg(1920, 1080, "architecture", "The Residence"));
write(path.join(OUT, "contact-hero.svg"), svg(1920, 1080, "creek", "Enquire"));
write(path.join(OUT, "band.svg"), svg(1920, 1080, "land", "Room To Create"));

/* Feature images */
write(path.join(OUT, "feature-residence.svg"), svg(900, 1125, "architecture", "Pavilion"));
write(path.join(OUT, "feature-studio.svg"), svg(900, 1125, "studio", "Guest Studio"));
write(path.join(OUT, "feature-land.svg"), svg(900, 1125, "land", "The Land"));

/* Gallery — varied sizes + categories */
const gallery = [
  ["architecture", 800, 1000, "Architecture"],
  ["views", 800, 600, "Views"],
  ["interiors", 800, 1050, "Interiors"],
  ["creek", 800, 560, "Creek"],
  ["land", 800, 900, "Land"],
  ["studio", 800, 1000, "Studio"],
  ["lifestyle", 800, 600, "Lifestyle"],
  ["views", 800, 1000, "Views"],
  ["architecture", 800, 620, "Architecture"],
  ["interiors", 800, 800, "Interiors"],
  ["land", 800, 560, "Land"],
  ["creek", 800, 980, "Creek"],
];
gallery.forEach((g, i) => {
  const [cat, w, h, label] = g;
  write(path.join(GAL, `gallery-${String(i + 1).padStart(2, "0")}-${cat}.svg`), svg(w, h, cat, label));
});

console.log("\nDone. Placeholder imagery generated.");
