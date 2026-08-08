# GradusIQ — Pitch / Landing Page

The public pitch and landing page for **GradusIQ**, an AI academic advisor that
reads a student's real transcript and career goals and turns them into a
specific, evidence-grounded plan: which roles fit, what's missing, and where the
market is moving.

The page covers the product's four features (FIT, GAP, SHIFT, and the Professor
Comment Analyzer), the architecture behind them, the team, and the roadmap.

## Live product demo

https://gqr.sh/eZsT

## Structure

```
index.html        markup and copy
css/styles.css    design tokens + all styling
js/main.js        scroll-reveal (IntersectionObserver)
```

Static HTML, CSS, and vanilla JS. No build step, no npm install, no framework.
The only external request is the Google Fonts stylesheet (Newsreader, Inter,
IBM Plex Mono).

## Running locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploying

Vercel's zero-config static detection handles this as-is: with an `index.html`
at the repo root and no framework or build step detected, Vercel serves the
directory statically. No `vercel.json` is required.
