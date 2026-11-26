/* Onglets + lecteur du livre linéaire. */
(function () {
  "use strict";
  const BOOK = window.BOOK || { chapters: [], upcoming: [] };
  const $ = (id) => document.getElementById(id);
  const root = $("book");

  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const inline = (s) => esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>");
  const pages = (w) => Math.max(1, Math.round(w / 300));

  function toc() {
    const total = BOOK.chapters.reduce((a, c) => a + c.words, 0);
    let h = '<p class="chapter">Roman</p><h1 tabindex="-1">La Rouille</h1>' +
      '<p class="lede"><em>En 2137, l\'humanité oublie. Élise Varenne part pour 2026, dans le corps de son arrière-arrière-grand-mère. Elle va découvrir que la Rouille n\'a pas d\'origine. Elle a seulement un cycle.</em></p>' +
      '<p class="meta">' + BOOK.chapters.length + " chapitre(s) rédigé(s) · ~" + total.toLocaleString("fr-FR") + " mots · premier jet</p><ol class=\"toc\">";
    BOOK.chapters.forEach((c) => {
      h += '<li><a href="#livre/' + c.n + '"><span class="num">' + c.n + '</span><span class="t">' + esc(c.title) + '</span><span class="p">' + pages(c.words) + " p.</span></a></li>";
    });
    BOOK.upcoming.forEach((c) => {
      h += '<li class="soon"><span class="num">' + c.n + '</span><span class="t">' + esc(c.title) + '</span><span class="p">à venir</span></li>';
    });
    root.innerHTML = '<article class="scene enter">' + h + "</ol></article>";
  }

  function chapter(n) {
    const i = BOOK.chapters.findIndex((c) => c.n === n);
    if (i < 0) return toc();
    const c = BOOK.chapters[i], prev = BOOK.chapters[i - 1], next = BOOK.chapters[i + 1];
    let h = '<p class="chapter">Chapitre ' + c.n + '</p><h1 tabindex="-1">' + esc(c.title) + '</h1><div class="prose">';
    c.blocks.forEach((b) => { h += b.t === "hr" ? '<p class="sep" aria-hidden="true">·&nbsp;·&nbsp;·</p>' : "<p>" + inline(b.s) + "</p>"; });
    h += '</div><nav class="pager" aria-label="Chapitres">' +
      (prev ? '<a href="#livre/' + prev.n + '">← ' + esc(prev.title) + "</a>" : "<span></span>") +
      '<a href="#livre">Sommaire</a>' +
      (next ? '<a href="#livre/' + next.n + '">' + esc(next.title) + " →</a>" : "<span></span>") + "</nav>";
    root.innerHTML = '<article class="scene enter">' + h + "</article>";
  }

  function route() {
    const m = location.hash.match(/^#livre(?:\/(\d+))?/);
    const book = !!m;
    document.body.dataset.view = book ? "livre" : "story";
    $("tab-story").setAttribute("aria-current", book ? "false" : "page");
    $("tab-book").setAttribute("aria-current", book ? "page" : "false");
    document.title = book ? "La Rouille — Le livre" : "La Rouille";
    if (!book) return;
    m[1] ? chapter(parseInt(m[1], 10)) : toc();
    window.scrollTo(0, 0);
    const t = root.querySelector("h1"); if (t) t.focus({ preventScroll: true });
  }

  window.addEventListener("hashchange", route);
  route();
})();
