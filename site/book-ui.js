/* Onglets + lecteur du livre linéaire. */
(function () {
  "use strict";
  const BOOK = window.BOOK || { chapters: [] };
  const $ = (id) => document.getElementById(id);
  const root = $("book");

  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const inline = (s) => esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>");
  const pages = (w) => Math.max(1, Math.round(w / 280));

  function toc() {
    const total = BOOK.chapters.reduce((a, c) => a + c.words, 0);
    let h = '<p class="chapter">Roman</p><h1 tabindex="-1">La Rouille</h1>' +
      '<p class="lede"><em>En 2137, l\'humanité oublie. Élise Varenne part pour 2026, dans le corps de son arrière-arrière-grand-mère. Elle va découvrir que la Rouille n\'a pas d\'origine. Elle a seulement un cycle.</em></p>' +
      '<p class="meta">' + BOOK.chapters.filter((c) => c.n).length + " chapitres · ~" + total.toLocaleString("fr-FR") + " mots · ~" + pages(total) + ' pages · premier jet</p><ol class="toc">';
    BOOK.chapters.forEach((c) => {
      h += '<li class="' + (c.n ? "" : "extra") + '"><a href="#livre/' + c.id + '"><span class="num">' + (c.n || "·") + '</span><span class="t">' +
        (c.n ? "" : '<small>' + esc(c.label) + "</small> ") + esc(c.title) + '</span><span class="p">' + pages(c.words) + " p.</span></a></li>";
    });
    root.innerHTML = '<article class="scene enter">' + h + "</ol></article>";
  }

  function chapter(id) {
    const i = BOOK.chapters.findIndex((c) => c.id === id || String(c.n) === id);
    if (i < 0) return toc();
    const c = BOOK.chapters[i], prev = BOOK.chapters[i - 1], next = BOOK.chapters[i + 1];
    let h = '<p class="chapter">' + esc(c.label) + '</p><h1 tabindex="-1">' + esc(c.title) + '</h1><div class="prose">';
    c.blocks.forEach((b) => {
      h += b.t === "hr" ? '<p class="sep" aria-hidden="true">·&nbsp;·&nbsp;·</p>' : b.t === "h" ? '<h2 class="part">' + esc(b.s) + "</h2>" : "<p>" + inline(b.s) + "</p>";
    });
    h += '</div><nav class="pager" aria-label="Chapitres">' +
      (prev ? '<a href="#livre/' + prev.id + '">← ' + esc(prev.title) + "</a>" : "<span></span>") +
      '<a href="#livre">Sommaire</a>' +
      (next ? '<a href="#livre/' + next.id + '">' + esc(next.title) + " →</a>" : "<span></span>") + "</nav>";
    root.innerHTML = '<article class="scene enter">' + h + "</article>";
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
    m[1] ? chapter(m[1]) : toc();
    window.scrollTo(0, 0);
    const t = root.querySelector("h1"); if (t) t.focus({ preventScroll: true });
  }

  window.addEventListener("hashchange", route);
  route();
})();
