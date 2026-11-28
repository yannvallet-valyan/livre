# La Rouille — consignes pour l'IA

Roman en français, trilogie en cours. **Le tome 1 est écrit** (`roman/chapitres/`, ~72 000 mots). Le tome 2 (`tome2/`) et le tome 3 (`tome3/`, premier jet complet ≈ 73 k mots) sont publiés sur le site (lecteur + EPUB).

## Avant tout
1. Lire `memoire/README.md` puis `memoire/canon.md` (~2 k tokens). **Ne pas relire tout le roman** : `memoire/chapitres.md` résume chaque fichier.
2. N'ouvrir un chapitre que pour le modifier ou en vérifier une formulation exacte. Préférer `grep` sur une citation à la lecture complète.
3. Les secrets de la trilogie sont dans `roman/bible/trilogie.md` (long : ne le lire que pour travailler sur les tomes 2-3).

## Sources de vérité
- Faits, dates, personnages, objets, indices : `memoire/`.
- Détails de la mécanique du tome 1 : `roman/bible/chronologie.md` (§0 fait foi ; sections suivantes partiellement datées).
- `site/story.js` et le jeu interactif ne sont **pas** à jour : ne pas s'en servir comme source.
- Citer les chapitres par **nom de fichier** (`20-le-nom-du-chien.md`), jamais par le numéro affiché.

## Après chaque modification
1. Mettre à jour le fichier `memoire/` concerné + une ligne dans `memoire/journal.md`.
2. Si un chapitre a changé, régénérer :
   ```bash
   python3 scripts/build-epub.py
   node scripts/build-book.js
   ```
   Si un chapitre du **tome 2** (`tome2/chapitres/`) a changé, régénérer aussi son EPUB (`build-book.js` l'intègre déjà au site, onglet « Le livre ») :
   ```bash
   python3 scripts/build-epub.py --tome 2   # écrit site/la-dame-du-lac.epub
   ```
   Idem pour le **tome 3** (`tome3/chapitres/`, publié depuis V3.67) :
   ```bash
   python3 scripts/build-epub.py --tome 3   # écrit site/lhomme-du-jour.epub
   ```
3. Respecter `memoire/style.md` (voix, motifs à ne pas couper, tics).

## Commandes utiles
- Recompter les tics :
  ```bash
  cd roman/chapitres && cat *.md | tr 'A-Z' 'a-z' | grep -o "il y avait\|comme on\|quelque chose\|longtemps\|à plat sur\|pour la première fois" | sort | uniq -c
  ```
- Trouver une citation : `grep -n "texte" roman/chapitres/*.md`

## Git
- Branche de travail : `claude/blissful-knuth-jy0qc7`. Branche par défaut (publiée sur Vercel) : `claude/bold-hamilton-hxdxdn`. Ne fusionner sur la branche par défaut que sur demande.
