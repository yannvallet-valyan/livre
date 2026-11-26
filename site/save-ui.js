/* Export / import de toute la progression (histoire interactive, livre, réglages). */
(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const panel = $("save-panel"), btn = $("btn-save"), msg = $("save-msg");
  if (!panel || !btn) return;

  const mine = () => { const o = {}; try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.indexOf("rouille-") === 0) o[k] = localStorage.getItem(k); } } catch (e) { /* ignore */ } return o; };
  const say = (t) => { msg.textContent = t; };

  btn.addEventListener("click", () => {
    const open = panel.hidden; panel.hidden = !open; btn.setAttribute("aria-expanded", String(open));
    if (open) say(Object.keys(mine()).length ? "Ta progression est enregistrée dans ce navigateur." : "Rien d'enregistré pour l'instant.");
  });
  $("save-close").addEventListener("click", () => { panel.hidden = true; btn.setAttribute("aria-expanded", "false"); });

  $("save-export").addEventListener("click", () => {
    const data = { app: "la-rouille", version: 1, date: new Date().toISOString(), data: mine() };
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "la-rouille-sauvegarde.json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    say("Sauvegarde téléchargée. Garde ce fichier pour reprendre ailleurs.");
  });

  $("save-import").addEventListener("change", (e) => {
    const f = e.target.files && e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const j = JSON.parse(String(r.result));
        if (!j || j.app !== "la-rouille" || !j.data) throw new Error("format");
        if (!confirm("Remplacer ta progression actuelle par celle du fichier ?")) return;
        Object.keys(j.data).forEach((k) => { if (k.indexOf("rouille-") === 0) localStorage.setItem(k, j.data[k]); });
        say("Progression restaurée. Rechargement…");
        setTimeout(() => location.reload(), 600);
      } catch (err) { say("Ce fichier n'est pas une sauvegarde de La Rouille."); }
    };
    r.readAsText(f); e.target.value = "";
  });
})();
