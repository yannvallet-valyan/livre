/* Onglets + lecteur du livre linéaire. */
(function () {
  "use strict";
  const BOOK = window.BOOK || { chapters: [] };
  const $ = (id) => document.getElementById(id);
  const root = $("book");

  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const inline = (s) => esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>");
  const pages = (w) => Math.max(1, Math.round(w / 280));

  /* ---------- Progression de lecture (localStorage, jamais bloquant) ---------- */
  const KEY = "rouille-book";
  let prog = { last: null, pos: {}, read: {} };
  try { const r = JSON.parse(localStorage.getItem(KEY) || "null"); if (r && r.pos) prog = r; } catch (e) { /* ignore */ }
  const saveProg = () => { try { localStorage.setItem(KEY, JSON.stringify(prog)); } catch (e) { /* ignore */ } };
  let resumeId = null;      // chapitre à rouvrir à la position sauvegardée
  let current = null;       // chapitre affiché
  let ticking = false;

  function fraction() {
    const el = document.documentElement;
    const max = el.scrollHeight - window.innerHeight;
    return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 1;
  }
  function onScroll() {
    if (!current || ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      if (!current) return;
      const f = fraction();
      prog.last = current; prog.pos[current] = Math.round(f * 1000) / 1000;
      if (f > 0.92) prog.read[current] = true;
      saveProg();
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  function toc() {
    const t1 = BOOK.chapters.filter((c) => !c.tome), t2 = BOOK.chapters.filter((c) => c.tome === 2), t3 = BOOK.chapters.filter((c) => c.tome === 3);
    const total = t1.reduce((a, c) => a + c.words, 0);
    let h = '<p class="chapter">Roman</p><h1 tabindex="-1">La Rouille</h1>' +
      '<p class="lede"><em>En 2137, l\'humanité oublie. Élise Varenne part pour 2026, dans le corps de son arrière-arrière-grand-mère. Elle va découvrir que la Rouille n\'a pas d\'origine. Elle a seulement un cycle.</em></p>' +
      '<p class="meta">' + t1.filter((c) => c.n).length + " chapitres · ~" + total.toLocaleString("fr-FR") + " mots · ~" + pages(total) + ' pages · premier jet</p>';
    const info2 = (BOOK.tomes && BOOK.tomes[2]) || null;
    h += '<div class="dl"><a href="la-rouille.epub" download="la-rouille.epub">Tome 1 : La Rouille <small>EPUB · Kindle, Kobo, Apple Livres</small></a>' +
      (t2.length ? '<a href="la-dame-du-lac.epub" download="la-dame-du-lac.epub">Tome 2 : La Dame du lac <small>EPUB · premier jet, mis à jour au fil de l\'écriture</small></a>' +
        '<p class="meta"><a href="#tome-2" data-goto="tome-2">Lire le tome 2 en ligne ↓</a></p>' : '') +
      (t3.length ? '<a href="lhomme-du-jour.epub" download="lhomme-du-jour.epub">Tome 3 : L\'Homme du jour <small>EPUB · premier jet, en cours de relecture</small></a>' +
        '<p class="meta"><a href="#tome-3" data-goto="tome-3">Lire le tome 3 en ligne ↓</a></p>' : '') +
      '<details><summary>Comment le lire sur Kindle ?</summary><ol>' +
      '<li>Télécharge le fichier <b>.epub</b> du tome voulu.</li>' +
      '<li>Envoie-le avec <b>Envoyer vers Kindle</b> (amazon.fr/sendtokindle, l\'application mobile ou l\'extension de navigateur), ou par e-mail à ton adresse Kindle personnelle.</li>' +
      '<li>Le livre apparaît dans ta bibliothèque, avec sa table des matières, et ta position se synchronise entre tes appareils.</li>' +
      '</ol></details></div>';
    const done = BOOK.chapters.filter((c) => prog.read[c.id]).length;
    const last = BOOK.chapters.find((c) => c.id === prog.last);
    if (last) {
      const pct = Math.round((prog.pos[last.id] || 0) * 100);
      h += '<a class="resume" href="#livre/' + last.id + '" data-resume="' + last.id + '"><span class="r-label">Reprendre ma lecture</span><span class="r-title">' +
        (last.n ? "Chapitre " + last.n + " · " : "") + esc(last.title) + '</span><span class="r-pct">' + pct + " % · " + done + " / " + BOOK.chapters.length + " sections lues</span></a>";
    }
    const list = (arr) => {
      let o = '<ol class="toc">';
      arr.forEach((c) => {
        o += '<li class="' + (c.n ? "" : "extra") + (prog.read[c.id] ? " done" : "") + '"><a href="#livre/' + c.id + '"><span class="num">' + (prog.read[c.id] ? "✓" : (c.n || "·")) + '</span><span class="t">' +
          (c.n ? "" : '<small>' + esc(c.label) + "</small> ") + esc(c.title) + '</span><span class="p">' + pages(c.words) + " p.</span></a></li>";
      });
      return o + "</ol>";
    };
    h += '<h2 class="part" id="tome-1">Tome 1 : La Rouille</h2>' + list(t1);
    if (t2.length) {
      const info = (BOOK.tomes && BOOK.tomes[2]) || { title: "Tome 2", subtitle: "" };
      const w2 = t2.reduce((a, c) => a + c.words, 0);
      h += '<h2 class="part" id="tome-2">Tome 2 : ' + esc(info.title) + '</h2><p class="meta">' + esc(info.subtitle) + " · " + t2.length + " chapitres · ~" + w2.toLocaleString("fr-FR") + " mots · ~" + pages(w2) + " pages</p>" +
        '<p class="lede"><em>⚠ Contient les révélations du tome 1.</em></p>' +
        '<p class="meta"><a href="la-dame-du-lac.epub" download="la-dame-du-lac.epub">⇩ Télécharger le tome 2 (EPUB)</a></p>' +
        list(t2);
    }
    if (t3.length) {
      const info = (BOOK.tomes && BOOK.tomes[3]) || { title: "Tome 3", subtitle: "" };
      const w3 = t3.reduce((a, c) => a + c.words, 0);
      h += '<h2 class="part" id="tome-3">Tome 3 : ' + esc(info.title) + '</h2><p class="meta">' + esc(info.subtitle) + " · " + t3.length + " chapitres · ~" + w3.toLocaleString("fr-FR") + " mots · ~" + pages(w3) + " pages</p>" +
        '<p class="lede"><em>⚠ Contient les révélations des tomes 1 et 2. Les chapitres ne suivent pas l\'ordre chronologique : c\'est voulu.</em></p>' +
        '<p class="meta"><a href="lhomme-du-jour.epub" download="lhomme-du-jour.epub">⇩ Télécharger le tome 3 (EPUB)</a></p>' +
        list(t3);
    }
    root.innerHTML = '<article class="scene enter">' + h + "</article>";
    const g = root.querySelector("[data-goto]");
    if (g) g.addEventListener("click", (e) => { e.preventDefault(); const t = document.getElementById(g.dataset.goto); if (t) t.scrollIntoView({ behavior: "smooth" }); });
    const rs = root.querySelector("[data-resume]");
    if (rs) rs.addEventListener("click", () => { resumeId = rs.dataset.resume; });
  }

  function chapter(id) {
    const i = BOOK.chapters.findIndex((c) => c.id === id || String(c.n) === id);
    if (i < 0) return toc();
    const c = BOOK.chapters[i], sameTome = (x) => x && (x.tome || 1) === (c.tome || 1), prev = sameTome(BOOK.chapters[i - 1]) ? BOOK.chapters[i - 1] : null, next = sameTome(BOOK.chapters[i + 1]) ? BOOK.chapters[i + 1] : null;
    let h = '<p class="chapter">' + esc(c.label) + '</p><h1 tabindex="-1">' + esc(c.title) + '</h1><div class="prose">';
    c.blocks.forEach((b) => {
      h += b.t === "hr" ? '<p class="sep" aria-hidden="true">·&nbsp;·&nbsp;·</p>' : b.t === "h" ? '<h2 class="part">' + esc(b.s) + "</h2>" : "<p>" + inline(b.s) + "</p>";
    });
    h += '</div><nav class="pager" aria-label="Chapitres">' +
      (prev ? '<a href="#livre/' + prev.id + '">← ' + esc(prev.title) + "</a>" : "<span></span>") +
      '<a href="#livre">Sommaire</a>' +
      (next ? '<a href="#livre/' + next.id + '">' + esc(next.title) + " →</a>" : "<span></span>") + "</nav>";
    root.innerHTML = '<article class="scene enter">' + h + "</article>";
    current = c.id; prog.last = c.id; if (prog.pos[c.id] == null) prog.pos[c.id] = 0; saveProg();
  }

  function route() {
    const m = location.hash.match(/^#livre(?:\/([\w-]+))?/);
    const book = !!m, chrono = location.hash === "#chrono";
    const view = book ? "livre" : chrono ? "chrono" : "story";
    document.body.dataset.view = view;
    $("tab-story").setAttribute("aria-current", view === "story" ? "page" : "false");
    $("tab-book").setAttribute("aria-current", view === "livre" ? "page" : "false");
    $("tab-chrono").setAttribute("aria-current", view === "chrono" ? "page" : "false");
    document.title = book ? "La Rouille — Le livre" : chrono ? "La Rouille — Chronologie" : "La Rouille";
    if (chrono) { window.scrollTo(0, 0); return; }
    if (!book) return;
    current = null;
    m[1] ? chapter(m[1]) : toc();
    const t = root.querySelector("h1"); if (t) t.focus({ preventScroll: true });
    const target = current && resumeId === current ? (prog.pos[current] || 0) : 0;
    resumeId = null;
    if (target > 0.01 && target < 0.98) {
      requestAnimationFrame(() => window.scrollTo(0, target * (document.documentElement.scrollHeight - window.innerHeight)));
    } else {
      window.scrollTo(0, 0);
    }
  }

  window.addEventListener("hashchange", route);
  route();
})();
