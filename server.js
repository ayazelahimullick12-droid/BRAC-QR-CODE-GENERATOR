// brac QR code generator — static file server.
// All QR generation happens client-side in the browser (qr-code-styling runs
// entirely in JS/canvas/svg), so this server just serves the page and assets.
// That also means there are no native build dependencies (no node-canvas),
// which keeps it simple to run locally and to deploy on Render.
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));

app.get("/healthz", (_req, res) => res.status(200).send("ok"));

app.listen(PORT, () => {
  console.log(`brac QR generator running at http://localhost:${PORT}`);
});
