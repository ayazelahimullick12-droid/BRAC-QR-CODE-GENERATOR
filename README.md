# brac একতা QR Generator

A small internal web app: paste a link, style the QR code (shape, colours, dot
style, corner style, and an optional centre image/logo), preview it live, and
download it as PNG / SVG / JPEG / WEBP.

Everything is generated **client-side in the browser** using
[qr-code-styling](https://github.com/kozakdenys/qr-code-styling) (the library
is vendored in `public/vendor/qr-code-styling.js`, built from the source in
`../qr-code-styling`). The Node/Express server only serves the static files —
no link or uploaded image is ever sent to the server, and there's no
database. That also means there are no native build dependencies, so it's
simple to run locally and to deploy on Render.

## What people can customize

- **Link/text** — the QR's content.
- **Shape** — square or circle.
- **Decorative border** (circle only) — none, a brac-style gradient frame, or
  the brac একতা logo repeated around the ring.
- **Dot style / corner square style / corner dot style** — every style the
  library supports (square, dots, rounded, classy, classy-rounded,
  extra-rounded).
- **Colours** — dots, corner squares, corner dots, background (with a
  transparent-background option).
- **Centre image** — none by default, the brac একতা logo, or **upload your
  own image** — nothing is hard-coded to always use one image.
- **Error correction level**, **output size**, and **file name**.
- **Quick style presets** for one-click starting points (Classic pink, Round
  dots, Circle with frame, Circle with logo ring, Plain black & white).

## Run it locally

```bash
cd "webapp"
npm install
npm start
```

Then open <http://localhost:3000> (or set `PORT=xxxx` before `npm start` to
use a different port).

## Deploy on Render

1. Push this `webapp` folder (or the whole repo) to a GitHub repo.
2. In Render, create a **New Web Service** from that repo.
3. Settings:
   - **Root directory:** `webapp` (if it's not the repo root)
   - **Build command:** `npm install`
   - **Start command:** `npm start`
   - **Environment:** Node
   - Render sets `PORT` automatically — `server.js` already reads
     `process.env.PORT`, so no extra config is needed.

No database, no native modules, no environment variables required — it's a
static-file server plus a browser app, so the free tier is enough.

## Project layout

```
webapp/
  server.js            Express static server
  public/
    index.html          Page + form controls
    styles.css           brac-pink theme
    app.js                All QR-building logic (client-side)
    vendor/qr-code-styling.js   Vendored library build (browser bundle)
    assets/brac-logo.png        Default brac একতা logo (optional preset image)
```

## Updating the vendored library

If `../qr-code-styling` (the cloned GitHub repo) is updated and rebuilt
(`npm run build` in that folder), copy the new browser bundle over:

```bash
cp ../qr-code-styling/lib/qr-code-styling.js public/vendor/qr-code-styling.js
```
