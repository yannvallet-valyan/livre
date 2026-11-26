/* Moteur de récit — La Rouille. Aucune dépendance. */
(function () {
  "use strict";

  const STORY = window.STORY;
  const SAVE_KEY = "rouille-save-v1";
  const LABELS = { confiance: "Confiance de Sophia", memoire: "Ta mémoire", discretion: "Discrétion" };
  const MAX = 5;

  const $ = (id) => document.getElementById(id);
  const el = {
    chapter: $("chapter"), title: $("title"), text: $("text"), choices: $("choices"),
    scene: $("scene"), carnet: $("carnet"), carnetList: $("carnet-list"),
    gauges: $("gauges"), gaugeBars: $("gauge-bars")
  };

  let state = fresh();
  let history = [];

  /* ---------- État ---------- */
  function fresh() {
    return { scene: STORY.start, vars: Object.assign({}, STORY.vars), flags: {}, carnet: [] };
  }
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const clamp = (n) => Math.max(0, Math.min(MAX, n));

  function save() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify({ state, history })); } catch (e) { /* stockage indisponible */ }
  }
  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data.state || !STORY.scenes[data.state.scene]) return false;
      state = data.state; history = data.history || [];
      return true;
    } catch (e) { return false; }
  }

  /* ---------- Conditions et effets ---------- */
  function test(expr, st) {
    if (!expr) return true;
    try {
      return !!new Function("v", "f", "return (" + expr + ")")(st.vars, st.flags);
    } catch (e) { console.warn("Condition invalide :", expr, e); return false; }
  }
  function applyEffects(c, st) {
    if (c.add) for (const k in c.add) st.vars[k] = clamp((st.vars[k] || 0) + c.add[k]);
    if (c.flag) [].concat(c.flag).forEach((k) => { st.flags[k] = true; });
    if (c.carnet) st.carnet.push({ who: c.carnet.who, text: c.carnet.text });
  }

  /* ---------- Rendu ---------- */
  function escapeHtml(s) {
    return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }
  function inline(s) { return escapeHtml(s).replace(/\*([^*]+)\*/g, "<em>$1</em>"); }

  // Effet « Rouille » : plus la mémoire d'Élise baisse, plus des mots sont mangés (déterministe).
  function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rust(text, seed, level) {
    if (level <= 0) return escapeHtml(text);
    return text.split(/(\s+)/).map((w, i) => {
      if (/^\s+$/.test(w) || w.replace(/[^\p{L}]/gu, "").length < 4) return escapeHtml(w);
      return (hash(seed + ":" + i) % 100) < level * 5
        ? '<span class="rouille" aria-hidden="true">' + "▒".repeat(Math.min(w.length, 7)) + "</span>"
        : escapeHtml(w);
    }).join("");
  }

  function render() {
    // Fin automatique : la mémoire est tombée à zéro
    if (state.vars.memoire <= 0 && state.scene !== "fin_oubli" && !STORY.scenes[state.scene].end) state.scene = "fin_oubli";

    const sc = STORY.scenes[state.scene];
    document.body.dataset.pov = sc.pov || "neutre";
    document.body.dataset.scene = state.scene;
    el.chapter.textContent = sc.chapter || "";
    el.title.textContent = sc.title || "";

    const rustLevel = sc.pov === "elise" ? Math.max(0, 3 - state.vars.memoire) : 0;
    el.text.innerHTML = "";
    sc.text.forEach((p, i) => {
      const raw = typeof p === "string" ? p : (test(p.if, state) ? p.t : null);
      if (raw === null) return;
      const para = document.createElement("p");
      para.style.animationDelay = (i * 90) + "ms";
      if (rustLevel > 0) {
        const parts = raw.split(/(\*[^*]+\*)/);
        para.innerHTML = parts.map((part, j) => /^\*[^*]+\*$/.test(part)
          ? "<em>" + rust(part.slice(1, -1), state.scene + i + j, rustLevel) + "</em>"
          : rust(part, state.scene + i + j, rustLevel)).join("");
      } else {
        para.innerHTML = inline(raw);
      }
      el.text.appendChild(para);
    });

    el.choices.innerHTML = "";
    const visible = (sc.choices || []).filter((c) => test(c.if, state));
    visible.forEach((c) => {
      const b = document.createElement("button");
      b.className = "choice";
      b.type = "button";
      b.textContent = c.label;
      b.addEventListener("click", () => choose(c));
      el.choices.appendChild(b);
    });
    if (sc.end || !visible.length) {
      const b = document.createElement("button");
      b.className = "choice restart";
      b.type = "button";
      b.textContent = "Recommencer l'histoire";
      b.addEventListener("click", restart);
      el.choices.appendChild(b);
    }

    renderCarnet();
    renderGauges();
    $("btn-back").disabled = history.length === 0;
    el.scene.classList.remove("enter"); void el.scene.offsetWidth; el.scene.classList.add("enter");
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    el.title.focus({ preventScroll: true });
    save();
  }

  function renderCarnet() {
    el.carnetList.innerHTML = "";
    if (!state.carnet.length) {
      el.carnetList.innerHTML = '<li class="empty">Le carnet est vide. Ce que tu écriras apparaîtra ici.</li>';
    }
    state.carnet.forEach((e) => {
      const li = document.createElement("li");
      li.className = "entry " + e.who;
      li.innerHTML = '<span class="who">' + (e.who === "elise" ? "Élise · encre noire" : "Sophia · encre bleue") + "</span>" + inline(e.text);
      el.carnetList.appendChild(li);
    });
    $("btn-carnet").dataset.count = state.carnet.length;
  }

  function renderGauges() {
    el.gaugeBars.innerHTML = "";
    Object.keys(LABELS).forEach((k) => {
      const row = document.createElement("div");
      row.className = "gauge";
      row.innerHTML = '<span class="g-label">' + LABELS[k] + '</span><span class="g-bar" role="meter" aria-valuemin="0" aria-valuemax="' + MAX +
        '" aria-valuenow="' + state.vars[k] + '" aria-label="' + LABELS[k] + '"><i style="width:' + (state.vars[k] / MAX * 100) + '%"></i></span>';
      el.gaugeBars.appendChild(row);
    });
  }

  /* ---------- Actions ---------- */
  function choose(c) {
    history.push(clone(state));
    if (history.length > 200) history.shift();
    applyEffects(c, state);
    state.scene = c.to;
    render();
  }
  function back() {
    if (!history.length) return;
    state = history.pop();
    render();
  }
  function restart() {
    if (history.length && !confirm("Recommencer l'histoire depuis le début ?")) return;
    state = fresh(); history = [];
    try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* ignore */ }
    render();
  }
  function toggle(panel, btn, force) {
    const open = force !== undefined ? force : panel.hidden;
    panel.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
  }

  /* ---------- Interface ---------- */
  $("btn-back").addEventListener("click", back);
  $("btn-restart").addEventListener("click", restart);
  $("btn-carnet").addEventListener("click", () => toggle(el.carnet, $("btn-carnet")));
  $("btn-gauges").addEventListener("click", () => toggle(el.gauges, $("btn-gauges")));
  $("close-carnet").addEventListener("click", () => toggle(el.carnet, $("btn-carnet"), false));
  $("btn-font").addEventListener("click", () => {
    const sizes = ["", "large", "xlarge"];
    const next = sizes[(sizes.indexOf(document.body.dataset.size || "") + 1) % sizes.length];
    document.body.dataset.size = next;
    try { localStorage.setItem("rouille-size", next); } catch (e) { /* ignore */ }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") toggle(el.carnet, $("btn-carnet"), false);
    if (/^[1-9]$/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const b = el.choices.querySelectorAll(".choice")[Number(e.key) - 1];
      if (b) b.click();
    }
  });

  try { document.body.dataset.size = localStorage.getItem("rouille-size") || ""; } catch (e) { /* ignore */ }
  load();
  render();
})();
