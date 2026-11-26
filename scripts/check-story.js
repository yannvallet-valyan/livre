#!/usr/bin/env node
/* Vérifie le graphe de l'histoire interactive.
   Usage : node scripts/check-story.js */
const path = require("path");
const STORY = require(path.join(__dirname, "..", "site", "story.js"));

const errors = [], warnings = [];
const scenes = STORY.scenes;
const ids = Object.keys(scenes);

if (!scenes[STORY.start]) errors.push(`Scène de départ introuvable : ${STORY.start}`);
if (!scenes.fin_oubli) warnings.push("Pas de scène « fin_oubli » (utilisée quand la mémoire tombe à 0).");

function checkExpr(expr, where) {
  try { new Function("v", "f", "return (" + expr + ")"); }
  catch (e) { errors.push(`${where} : condition invalide « ${expr} » (${e.message})`); }
}

const edges = {};
for (const id of ids) {
  const sc = scenes[id];
  edges[id] = [];
  if (!sc.text || !sc.text.length) errors.push(`${id} : pas de texte.`);
  (sc.text || []).forEach((p, i) => { if (typeof p !== "string") { if (!p.t) errors.push(`${id}.text[${i}] : paragraphe conditionnel sans « t ».`); checkExpr(p.if, `${id}.text[${i}]`); } });
  const choices = sc.choices || [];
  if (!sc.end && choices.length === 0) errors.push(`${id} : impasse (ni choix, ni « end: true »).`);
  choices.forEach((c, i) => {
    const w = `${id}.choices[${i}]`;
    if (!c.label) errors.push(`${w} : pas de label.`);
    if (!scenes[c.to]) errors.push(`${w} : cible inconnue « ${c.to} ».`);
    else edges[id].push(c.to);
    if (c.if) checkExpr(c.if, w);
    if (c.add) for (const k in c.add) if (!(k in STORY.vars)) errors.push(`${w} : jauge inconnue « ${k} ».`);
  });
}
if (scenes.fin_oubli) edges.__any = ["fin_oubli"];

// Accessibilité
const seen = new Set();
const stack = [STORY.start, ...(edges.__any || [])];
while (stack.length) {
  const id = stack.pop();
  if (seen.has(id) || !scenes[id]) continue;
  seen.add(id);
  (edges[id] || []).forEach((t) => stack.push(t));
}
ids.filter((id) => !seen.has(id)).forEach((id) => warnings.push(`${id} : scène inaccessible depuis le début.`));

// Drapeaux lus mais jamais posés
const set = new Set(), read = new Set();
for (const id of ids) {
  (scenes[id].choices || []).forEach((c) => [].concat(c.flag || []).forEach((f) => set.add(f)));
  const exprs = [];
  (scenes[id].text || []).forEach((p) => p.if && exprs.push(p.if));
  (scenes[id].choices || []).forEach((c) => c.if && exprs.push(c.if));
  exprs.forEach((e) => (e.match(/\bf\.([a-zA-Z_]\w*)/g) || []).forEach((m) => read.add(m.slice(2))));
}
[...read].filter((f) => !set.has(f)).forEach((f) => warnings.push(`Drapeau « ${f} » lu mais jamais posé.`));
[...set].filter((f) => !read.has(f)).forEach((f) => warnings.push(`Drapeau « ${f} » posé mais jamais lu (information).`));

// Statistiques
const words = ids.reduce((n, id) => n + (scenes[id].text || []).map((p) => (typeof p === "string" ? p : p.t)).join(" ").split(/\s+/).length, 0);
console.log(`${ids.length} scènes, ${ids.reduce((n, id) => n + (scenes[id].choices || []).length, 0)} choix, ~${words} mots.`);
warnings.forEach((w) => console.log("⚠ ", w));
errors.forEach((e) => console.error("✗ ", e));
if (errors.length) { console.error(`\n${errors.length} erreur(s).`); process.exit(1); }
console.log("✓ Histoire valide.");
