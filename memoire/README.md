# Mémoire du projet : à lire en premier

But : permettre à une IA (ou à un humain) de continuer *La Rouille* **sans relire les 72 000 mots**. Ces fichiers sont la source de vérité compacte. Les chapitres (`roman/chapitres/`) sont le texte ; ici, il n'y a que les faits.

## Quoi lire selon la tâche (≈ tokens)

| Tâche | Lire | Coût |
|---|---|---|
| Toute session | `README.md` (ce fichier) + `canon.md` | ~2 k |
| Écrire ou corriger un chapitre du tome 1 | + `chapitres.md` (la ligne du chapitre et ses voisins) + `style.md` + le chapitre lui-même | ~5 k + chapitre |
| Vérifier une date | `chronologie.md` | ~2 k |
| Écrire un personnage | `personnages.md` (sa fiche) | ~1 k |
| Poser ou payer un indice | `indices.md` | ~2 k |
| Écrire le tome 2 ou 3 | `canon.md` + `chronologie.md` + `personnages.md` + `fils-ouverts.md` + `../roman/bible/trilogie.md` | ~12 k |
| Savoir quoi faire ensuite | `fils-ouverts.md` | ~1,5 k |

Ne lire `roman/bible/chronologie.md` (long, partiellement daté) qu'en cas de doute : `canon.md` en est le résumé à jour.

## Fichiers

| Fichier | Contenu |
|---|---|
| `canon.md` | Règles du monde, mécanique de la boucle, secrets de la trilogie. Une page. |
| `chronologie.md` | Toutes les dates, de 1929 à 2180, une ligne par événement. |
| `personnages.md` | Une fiche courte par personnage : dates, liens, hôte, secret, voix. |
| `chapitres.md` | Tome 1, fichier par fichier : date, point de vue, événements, indices. |
| `objets-lieux.md` | Objets clés (carnet, fiole, cahier noir…) et lieux. |
| `indices.md` | Chaque indice : où il est posé, ce qu'il annonce, quand il paie. |
| `style.md` | Voix, règles de ton, tics à surveiller, motifs à préserver. |
| `fils-ouverts.md` | Incohérences connues, fils non noués, chantiers des tomes 2 et 3. |
| `journal.md` | Historique court des versions. |

## Règles de maintenance (obligatoires)
1. **Toute modification du canon** (date, lien, règle, révélation) se reporte **dans la même session** dans le fichier mémoire concerné, puis dans `journal.md` (une ligne).
2. **Une information n'existe qu'à un seul endroit.** Les autres fichiers y renvoient (`→ chronologie.md`).
3. **Pas de prose.** Tableaux, listes, phrases courtes. Citer le texte seulement quand la formulation exacte compte (indices, motifs).
4. **Noms de fichiers = référence.** Les numéros de chapitre affichés dans le livre (« Chapitre 16 ») diffèrent des numéros de fichiers (`20-…`). Toujours citer le **fichier**.
5. Après une modification des chapitres : régénérer l'EPUB et le livre du site (voir `../CLAUDE.md`).

## Statuts
- ✅ décidé · 💡 proposé · ❓ à trancher · 🔒 secret (ne pas révéler avant le tome indiqué)
