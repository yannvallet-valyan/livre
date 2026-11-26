/* Schéma temporel de La Rouille, dévoilé acte par acte (niveaux 1 à 4). */
(function () {
  "use strict";
  const root = document.getElementById("chrono");
  if (!root) return;

  const LEVELS = [
    { n: 1, label: "Acte I", hint: "Sans révélation : le point de départ." },
    { n: 2, label: "Acte II", hint: "Révèle le second voyageur et ce qui se passe à Vallorce." },
    { n: 3, label: "Acte III", hint: "Révèle la boucle, l'identité d'Anselme et celle du Veilleur." },
    { n: 4, label: "Épilogue", hint: "Révèle la chute finale. À ne regarder qu'après la lecture." }
  ];

  // Axe vertical : années -> y
  const Y = { 1956: 40, 1980: 80, 1988: 140, s26: 250, o26: 290, n06: 330, n14: 380, a27: 430, j27: 495, 2052: 500, 2078: 530, 2090: 565, 2101: 610, 2103: 630, 2130: 680, 2137: 740 };
  const X = { axis: 48, var: 98, mar: 240, evt: 300 };
  const W = 400, H = 1090;

  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  const text = (x, y, lines, cls, l, anchor) => {
    lines = [].concat(lines);
    return '<text class="' + cls + '" data-l="' + l + '" x="' + x + '" y="' + y + '"' + (anchor ? ' text-anchor="' + anchor + '"' : "") + ">" +
      lines.map((t, i) => '<tspan x="' + x + '" dy="' + (i ? 12 : 0) + '">' + esc(t) + "</tspan>").join("") + "</text>";
  };
  const node = (x, y, l, cls) => '<circle class="node ' + (cls || "") + '" data-l="' + l + '" cx="' + x + '" cy="' + y + '" r="5"/>';
  const line = (x1, y1, x2, y2, cls, l) => '<line class="' + cls + '" data-l="' + l + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/>';
  const path = (d, cls, l) => '<path class="' + cls + '" data-l="' + l + '" d="' + d + '" marker-end="url(#arr-' + (cls.includes("fall") ? "fall" : cls.includes("loop") ? "loop" : "trav") + ')"/>';

  let s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-labelledby="chrono-title chrono-desc" class="chrono-svg">' +
    '<title id="chrono-title">Schéma temporel de La Rouille</title>' +
    '<desc id="chrono-desc">Le temps s\'écoule de haut en bas, de 1980 à 2137. Les flèches qui remontent sont des voyages de conscience vers des ancêtres.</desc>' +
    "<defs>" + ["trav", "fall", "loop"].map((k) => '<marker id="arr-' + k + '" class="m-' + k + '" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z"/></marker>').join("") + "</defs>";

  // Bandes de fond : la fenêtre d'ouverture du cristal
  s += '<rect class="band" data-l="1" x="' + (X.axis + 6) + '" y="' + (Y.s26 - 18) + '" width="' + (W - X.axis - 10) + '" height="' + (Y.n14 - Y.s26 + 30) + '" rx="6"/>';
  s += '<rect class="band" data-l="3" x="' + (X.axis + 6) + '" y="' + (Y[1980] - 14) + '" width="' + (W - X.axis - 10) + '" height="28" rx="6"/>';

  // Axe des années
  s += line(X.axis, 20, X.axis, Y[2137] + 10, "axis", 1);
  [["1980", Y[1980], 3], ["1988", Y[1988], 1], ["2026", Y.s26, 1], ["oct.", Y.o26, 2], ["6 nov.", Y.n06, 2], ["14 nov.", Y.n14, 1], ["2027", Y.a27, 1], ["2090", Y[2090], 2], ["2103", Y[2103], 1], ["2130", Y[2130], 1], ["2137", Y[2137], 1]]
    .forEach(([t, y, l]) => { s += text(X.axis - 6, y + 4, t, "year", l, "end") + line(X.axis - 3, y, X.axis + 3, y, "axis", l); });

  // En-têtes de colonnes
  s += text(X.var, 14, "Lignée Varenne", "col", 1, "middle") + text(X.mar, 14, "Lignée Marle", "col", 1, "middle") + text(X.evt + 50, 14, "Le lac, le monde", "col", 1, "middle");

  // Lignes de sang
  s += line(X.var, Y[1980], X.var, Y[2130], "blood", 1);
  s += line(X.mar, Y.o26, X.mar, Y[2101], "blood dashed", 3);
  s += line(X.var, Y.n06, X.mar, Y.n06, "union", 2);
  s += line(X.mar, Y[2101] + 2, X.var + 6, Y[2130] - 2, "union", 3);

  // Personnes
  s += node(X.var, Y[1980], 1) + text(X.var, Y[1980] - 10, "Anselme Roch, père de Sophia", "lbl", 1, "middle");
  s += node(X.var, Y[1988], 1) + text(X.var + 9, Y[1988] + 4, "Sophia, 1988", "lbl", 1);
  s += node(X.var, Y.s26, 1, "host") + text(X.var + 9, Y.s26 + 4, ["Sophia, 38 ans", "hôte d'Élise"], "lbl", 1);
  s += node(X.var, Y.a27, 2) + text(X.var + 9, Y.a27 + 4, ["Anne, août 2027", "fille de Sophia"], "lbl", 2);
  s += node(X.var, Y[2103], 1) + text(X.var + 9, Y[2103] + 4, "Élise, 2103", "lbl", 1);
  s += node(X.var, Y[2130], 1) + text(X.var + 9, Y[2130] + 4, "Iris, 2130", "lbl", 1);
  s += node(X.mar, Y.o26, 1, "host") + text(X.mar + 9, Y.o26 + 4, ["Étienne", "Marle"], "lbl", 1);
  s += node(X.mar, Y[2101], 3) + text(X.mar + 9, Y[2101] - 2, ["Noé, 2101", "père d'Iris"], "lbl", 3);

  // Départs de 2137
  s += node(X.var, Y[2137], 1, "trav") + text(X.var, Y[2137] + 18, ["Élise part", "(34 ans)"], "lbl", 1, "middle");
  s += node(X.mar, Y[2137], 2, "trav") + text(X.mar, Y[2137] + 18, ["« Sacha » part", "(qui est-il ?)"], "lbl l2only", 2, "middle");
  s += text(X.mar, Y[2137] + 18, ["Noé part", "derrière elle"], "lbl", 3, "middle");

  // Voyages (flèches qui remontent le temps)
  s += path("M" + (X.var - 8) + "," + (Y[2137] - 6) + " C" + (X.var - 42) + "," + (Y[2137] - 150) + " " + (X.var - 42) + "," + (Y.s26 + 120) + " " + (X.var - 8) + "," + (Y.s26 + 6), "trav", 1);
  s += text(X.var - 22, (Y.s26 + Y[2137]) / 2 + 60, ["greffe", "la nuit"], "trav-lbl", 1, "middle");
  s += path("M" + (X.mar - 8) + "," + (Y[2137] - 6) + " C" + (X.mar - 32) + "," + (Y[2137] - 160) + " " + (X.mar - 32) + "," + (Y.o26 + 140) + " " + (X.mar - 8) + "," + (Y.o26 + 6), "trav", 2);
  s += text(X.mar - 26, (Y.o26 + Y[2137]) / 2 + 60, ["greffe", "la nuit"], "trav-lbl", 2, "middle");

  // La chute : 14 nov. 2026 -> oct. 1980 (dans Anselme)
  s += path("M" + (X.var + 6) + "," + (Y.n14 - 4) + " C" + (X.var + 135) + "," + (Y.n14 - 30) + " " + (X.var + 135) + "," + (Y[1980] + 70) + " " + (X.var + 7) + "," + (Y[1980] + 6), "fall", 3);
  s += text(X.var + 116, Y[1988] + 18, ["la chute :", "chaque fois", "qu'elle brise", "le cristal"], "fall-lbl", 3);

  // Événements
  const evt = (y, lines, l, cls) => { s += node(X.evt, y, l, "evt " + (cls || "")) + text(X.evt + 9, y + 4, lines, "lbl", l); };
  evt(Y[1980], ["Vidange :", "cristal ouvert"], 3);
  evt(Y.s26, ["Lac abaissé :", "cristal ouvert"], 1);
  evt(Y.o26, ["Premiers oublis", "(3 mois d'avance)"], 2);
  evt(Y.n14, ["14 nov. :", "« l'incident »"], 1, "danger");
  s += text(X.evt + 9, Y.n14 + 28, ["= Élise brise", "le cristal"], "lbl danger-lbl", 3);
  evt(Y.j27, ["Premiers cas", "officiels"], 1);
  evt(Y[2090], ["Guerre de 2090,", "finie par l'oubli"], 2);
  evt(Y[2137], ["Le refuge,", "la Rouille"], 1);

  // La spirale : la Rouille -> nouveau départ -> nouveau tour
  s += path("M" + (W - 6) + "," + (Y.n14 + 8) + " L" + (W - 6) + "," + (Y[2137] - 40) + " Q" + (W - 6) + "," + (Y[2137] + 40) + " " + (X.var + 14) + "," + (Y[2137] + 4), "loop", 3);
  s += text(W - 12, Y[2090] + 54, ["la spirale :", "un nouveau", "tour"], "loop-lbl", 3, "end");

  // Acte III : la troisième porte
  s += text(X.evt + 9, Y.n14 + 56, ["→ cette fois :", "noyé intact", "sous le béton"], "lbl ok-lbl", 3);

  // Épilogue : la nouvelle ligne
  const ny = 840;
  s += '<rect class="band new" data-l="4" x="8" y="' + (ny - 40) + '" width="' + (W - 16) + '" height="' + (H - ny + 30) + '" rx="8"/>';
  s += text(W / 2, ny - 20, "Nouvelle ligne, sans Rouille : 2137′", "col", 4, "middle");
  const gens = [["Anne", "2027"], ["Jeanne", "2052"], ["Paul", "2078"], ["Iris", "2103"], ["Élise", "2130"]];
  gens.forEach((g, i) => {
    const x = 40 + i * 80, cls = i >= 3 ? "inv" : "";
    s += node(x, ny + 20, 4, cls) + text(x, ny + 42, g[0], "lbl " + (cls ? "inv-lbl" : ""), 4, "middle") + text(x, ny + 55, g[1], "year", 4, "middle");
    if (i) s += line(x - 72, ny + 20, x - 8, ny + 20, "blood", 4);
  });
  s += text(W / 2, ny + 82, ["Iris naît à la place d'Élise, Élise à celle d'Iris."], "lbl", 4, "middle");
  s += text(W / 2, ny + 104, ["« C'est qui ? »  « C'est toi. »"], "quote", 4, "middle");
  s += text(24, ny + 132, ["2141 : pour guérir les nuits de sa fille, Iris ouvre", "la fiole que Sophia avait gardée. La Rouille recommence."], "lbl danger-lbl", 4);
  s += text(24, ny + 166, ["2164 : Élise part à son tour. « Le noyer ne suffit pas. »", "Elle brise le cristal, et tombe en 1980 : la plus ancienne."], "lbl danger-lbl", 4);
  s += text(24, ny + 200, "La sortie était l'entrée. La boucle n'a pas de premier tour.", "quote", 4);
  // Le nœud : Élise (nouvelle ligne) -> chute en 1980
  s += '<path class="fall" data-l="4" marker-end="url(#arr-fall)" d="M' + (W - 30) + "," + (ny + 10) + " L" + (W - 14) + "," + (ny - 50) + " L" + (W - 14) + "," + (Y[1980] + 30) + " Q" + (W - 14) + "," + (Y[1980] - 22) + " " + (X.evt + 8) + "," + (Y[1980] - 6) + '"/>';
  s += text(W - 18, Y[1988] - 8, ["la plus", "ancienne"], "fall-lbl", 4, "end");

  s += "</svg>";

  const NOTES = {
    1: ["Le temps s'écoule de haut en bas. Une flèche qui <b>remonte</b> est un voyage de conscience.",
      "On ne voyage que dans <b>son propre sang</b>, vers un ancêtre <b>endormi</b>, et seulement quand le cristal est « ouvert », c'est-à-dire quand le lac est bas.",
      "Élise part de 2137 pour empêcher « l'incident » du 14 novembre 2026, d'où serait née la Rouille."],
    2: ["Un second voyageur habite le Dr Marle la nuit. Il se fait appeler « Sacha ».",
      "La Rouille arrive avec <b>trois mois d'avance</b> sur les archives d'Élise.",
      "Anne, l'ancêtre dont dépend toute la lignée d'Élise, doit être conçue en novembre 2026."],
    3: ["L'incident, c'est <b>Élise</b> : en brisant le cristal, elle répand la poussière qui deviendra la Rouille.",
      "En le brisant, elle coupe son fil et <b>tombe en 1980</b>, dernière ouverture du cristal, dans Anselme. Le « premier Passeur », c'est elle.",
      "À chaque tour, la Rouille arrive plus tôt. Ce n'est pas un cercle mais une <b>spirale</b>.",
      "« Sacha » est <b>Noé</b>, le père d'Iris, qu'Élise a oublié.",
      "La sortie : noyer le cristal <b>intact</b>. Le fil se coupe sans chute, et les voyageurs se fondent dans leurs hôtes."],
    4: ["La femme du prologue, en 1980, aux cheveux longs, qui dit « maman » : c'est l'Élise de la nouvelle ligne. La page « Le no… ne suffit pas » du dossier du chapitre 2, c'est elle qui l'a écrite.",
      "Chaque sortie fabrique l'entrée suivante : briser le cristal crée la Rouille, le noyer laisse une fiole, et la fiole recrée la Rouille.",
      "Dans la nouvelle ligne, le carnet se transmet et l'on donne aux enfants les noms qu'on y lit.",
      "<b>Iris</b> naît en 2103, <b>Élise</b> en 2130 : les places s'inversent. Puis la boucle recommence par l'autre bout."]
  };

  root.innerHTML =
    '<article class="scene"><p class="chapter">Schéma</p><h1 tabindex="-1">Le temps de la Rouille</h1>' +
    '<p class="lede">Pour suivre les voyages et les lignées. Choisissez jusqu\'où vous avez lu : chaque niveau dévoile les secrets de l\'acte.</p>' +
    '<div class="levels" role="group" aria-label="Niveau de révélation">' +
    LEVELS.map((l) => '<button type="button" data-level="' + l.n + '">' + l.label + "</button>").join("") + "</div>" +
    '<p class="level-hint" id="level-hint"></p>' +
    '<div class="chrono-wrap">' + s + "</div>" +
    '<ul class="chrono-notes" id="chrono-notes"></ul></article>';

  function setLevel(n) {
    root.querySelectorAll("[data-l]").forEach((el) => { el.style.display = Number(el.dataset.l) <= n ? "" : "none"; });
    root.querySelectorAll(".l2only").forEach((el) => { el.style.display = n === 2 ? "" : "none"; });
    root.querySelectorAll(".levels button").forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.level) === n)));
    root.querySelector("#level-hint").textContent = LEVELS[n - 1].hint;
    let notes = "";
    for (let i = 1; i <= n; i++) notes += NOTES[i].map((t) => '<li class="n' + i + '">' + t + "</li>").join("");
    root.querySelector("#chrono-notes").innerHTML = notes;
    try { localStorage.setItem("rouille-chrono", String(n)); } catch (e) { /* ignore */ }
  }
  root.querySelectorAll(".levels button").forEach((b) => b.addEventListener("click", () => {
    const n = Number(b.dataset.level);
    if (n >= 3 && !b.dataset.ok && !confirm("Ce niveau révèle des secrets de l'histoire. Continuer ?")) return;
    b.dataset.ok = "1";
    setLevel(n);
  }));
  let start = 1;
  try { start = Number(localStorage.getItem("rouille-chrono")) || 1; } catch (e) { /* ignore */ }
  setLevel(Math.min(Math.max(start, 1), 4));
})();
