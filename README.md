# La Rouille

Roman court de science-fiction (~250 pages) et version interactive jouable dans le navigateur.

> En 2137, l'humanité oublie. Élise Varenne part pour 2026, dans le corps de son arrière-arrière-grand-mère, afin d'empêcher la catastrophe. Elle va découvrir que la Rouille n'a pas d'origine. Elle a seulement un cycle.

## Organisation du dépôt

```
roman/
  bible/            Tout ce qui est « canon » : synopsis, personnages, univers, thèmes, style
  plan/             Plan chapitre par chapitre (24 chapitres, 3 actes)
  chapitres/        Les chapitres rédigés (un fichier par chapitre, en Markdown)
  notes/            Questions ouvertes, incohérences à résoudre, idées en vrac
site/               Le livre interactif (HTML/CSS/JS purs, aucune dépendance)
  story.js          Toute l'histoire interactive : scènes, choix, variables
  engine.js         Le moteur (sauvegarde, carnet, retour arrière, effet « Rouille »)
scripts/
  check-story.js    Vérifie le graphe de l'histoire (liens cassés, impasses, scènes orphelines)
```

## Écrire le roman

- Un chapitre = un fichier `roman/chapitres/NN-titre.md`.
- Le suivi d'avancement est en tête de `roman/plan/plan-chapitres.md`.
- Avant d'écrire, relire `roman/bible/themes-et-style.md` (voix, temps, règles de ton).
- Ce qui reste flou ou contradictoire va dans `roman/notes/questions-ouvertes.md`.

## Lancer le livre interactif

```bash
python3 -m http.server 8080 -d site
```

Puis ouvrir http://localhost:8080. (Ouvrir `site/index.html` directement fonctionne aussi.)

## Écrire / modifier l'histoire interactive

Tout se passe dans `site/story.js`. Une scène ressemble à ceci :

```js
lac: {
  chapter: "Acte I — La greffe",
  title: "Le lac",
  pov: "elise",                       // "elise" | "lucie" | "neutre"
  text: [
    "Le froid vient avant tout le reste.",
    { if: "f.archives", t: "Tu repenses à la ligne des archives." }   // paragraphe conditionnel
  ],
  choices: [
    { label: "Rester immobile.", to: "ecoute", add: { discretion: 1 } },
    { label: "Marcher vers le barrage.", to: "barrage", if: "v.memoire > 2", flag: "a_marche" }
  ]
}
```

- `add` modifie les jauges (`confiance`, `memoire`, `discretion`, bornées de 0 à 5).
- `flag` pose un ou plusieurs drapeaux (accessibles dans les conditions via `f.nom`).
- `carnet` ajoute une entrée dans le carnet partagé d'Élise et Lucie.
- `if` est une condition JavaScript sur `v` (jauges) et `f` (drapeaux).
- Une scène avec `end: true` termine une branche.

Après toute modification : `node scripts/check-story.js`.

## État

Voir `roman/plan/plan-chapitres.md`. Interactif : l'Acte I est jouable (de la bibliothèque de 2137 à la première réponse de Lucie). Les Actes II et III restent à écrire.
