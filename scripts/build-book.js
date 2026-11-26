#!/usr/bin/env node
/* Génère site/book.js à partir de roman/chapitres/*.md (ordre = ordre des fichiers).
   Titres reconnus : « # Chapitre N — Titre », « # Prologue — … », « # Interlude — … »,
   « # Épilogue — … », « # Coda », « # Annexe — … ».
   Usage : node scripts/build-book.js   (lancé aussi au déploiement Vercel) */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dir = path.join(root, "roman", "chapitres");

const chapters = fs.readdirSync(dir).filter((f) => /\.md$/.test(f)).sort().map((f) => {
  const lines = fs.readFileSync(path.join(dir, f), "utf8").replace(/\r/g, "").split("\n");
  let label = "", title = f, n = null;
  const blocks = [];
  let buf = [];
  const flush = () => { if (buf.length) { blocks.push({ t: "p", s: buf.join(" ") }); buf = []; } };
  for (const line of lines) {
    const h1 = line.match(/^#\s+(.+)$/);
    if (h1) {
      const m = h1[1].match(/^Chapitre\s+(\d+)\s*[—-]\s*(.+)$/);
      if (m) { n = +m[1]; label = "Chapitre " + n; title = m[2].trim(); }
      else { const k = h1[1].split(/\s+—\s+/); label = k[0].trim(); title = (k.slice(1).join(" — ") || k[0]).trim(); }
      continue;
    }
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) { flush(); blocks.push({ t: "h", s: h2[1].trim() }); continue; }
    if (/^\*\(.*\)\*\s*$/.test(line.trim())) continue;           // note de suivi : *(premier jet)*
    if (/^---+$/.test(line.trim())) { flush(); blocks.push({ t: "hr" }); continue; }
    if (!line.trim()) { flush(); continue; }
    buf.push(line.trim());
  }
  flush();
  const words = blocks.reduce((a, b) => a + (b.s ? b.s.split(/\s+/).length : 0), 0);
  return { id: f.replace(/\.md$/, ""), n, label, title, blocks, words };
});

const out = "window.BOOK = " + JSON.stringify({ title: "La Rouille", chapters }, null, 1) + ";\n";
fs.writeFileSync(path.join(root, "site", "book.js"), out);
console.log(`Livre : ${chapters.length} sections, ${chapters.filter((c) => c.n).length} chapitres, ~${chapters.reduce((a, c) => a + c.words, 0)} mots.`);
