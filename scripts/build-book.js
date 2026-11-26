#!/usr/bin/env node
/* Génère site/book.js à partir de roman/chapitres/*.md et du plan.
   Usage : node scripts/build-book.js   (exécuté aussi au déploiement Vercel) */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dir = path.join(root, "roman", "chapitres");

const chapters = fs.readdirSync(dir)
  .filter((f) => /^\d+.*\.md$/.test(f)).sort()
  .map((f) => {
    const lines = fs.readFileSync(path.join(dir, f), "utf8").replace(/\r/g, "").split("\n");
    let n = parseInt(f, 10), title = f;
    const blocks = [];
    let buf = [];
    const flush = () => { if (buf.length) { blocks.push({ t: "p", s: buf.join(" ") }); buf = []; } };
    for (const line of lines) {
      const h = line.match(/^#\s+(?:Chapitre\s+(\d+)\s*[—-]\s*)?(.+)$/);
      if (h) { if (h[1]) n = parseInt(h[1], 10); title = h[2].trim(); continue; }
      if (/^\*\(.*\)\*\s*$/.test(line.trim())) continue;       // note de suivi : *(premier jet…)*
      if (/^---+$/.test(line.trim())) { flush(); blocks.push({ t: "hr" }); continue; }
      if (!line.trim()) { flush(); continue; }
      buf.push(line.trim());
    }
    flush();
    const words = blocks.filter((b) => b.t === "p").join(" ").split(/\s+/).length;
    return { n, title, blocks, words: blocks.reduce((a, b) => a + (b.s ? b.s.split(/\s+/).length : 0), 0) };
  });

// Chapitres à venir : lus dans le tableau du plan
const have = new Set(chapters.map((c) => c.n));
const upcoming = [];
const plan = fs.readFileSync(path.join(root, "roman", "plan", "plan-chapitres.md"), "utf8");
for (const line of plan.split("\n")) {
  const m = line.match(/^\|\s*(\d+)\s*\|[^|]*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|/);
  if (m && !have.has(+m[1])) upcoming.push({ n: +m[1], title: m[2] });
}

const out = "window.BOOK = " + JSON.stringify({ title: "La Rouille", chapters, upcoming }, null, 1) + ";\n";
fs.writeFileSync(path.join(root, "site", "book.js"), out);
console.log(`Livre : ${chapters.length} chapitre(s) rédigé(s), ${upcoming.length} à venir, ~${chapters.reduce((a, c) => a + c.words, 0)} mots.`);
