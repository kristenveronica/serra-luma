# Video — where to place the property film

The homepage hero plays a full-screen looping video.

## Add your film
1. Export your property film as **MP4 (H.264)**, ideally 1080p, and keep it
   reasonably small for fast loading (aim for **under ~10–15 MB** — trim length,
   lower the bitrate, or use a short cinematic loop of 20–40s).
2. Name it exactly: **`hero.mp4`**
3. Place it in this folder: `assets/video/hero.mp4`

That's it — the hero in `index.html` already points here.

## Optional: better browser support / smaller files
You can add a WebM version too. Put `hero.webm` in this folder and add a second
`<source>` line above the mp4 one in `index.html`:

```html
<source src="assets/video/hero.webm" type="video/webm" />
<source src="assets/video/hero.mp4" type="video/mp4" />
```

## Poster image (shown while the video loads)
The hero currently uses `assets/images/hero-poster.svg`. Replace that file with a
beautiful still frame from your film (export it as `hero-poster.jpg` and update the
`poster="..."` attribute in `index.html`) for the most cinematic first impression.

## "Watch the Film" button
The hero "Watch the Film" button currently scrolls to the intro section. If you'd
prefer it to open a YouTube/Vimeo video, tell me and I'll wire up a modal player.
