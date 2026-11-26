# Rapport de correction — La Rouille (V3 → V3.1)

Branche de travail : `claude/blissful-knuth-jy0qc7`. Trois commits : parties 1, 2.1 + 3, bible/notes.
Lecture préalable : les 48 chapitres, `chronologie.md`, `themes-et-style.md`, `questions-ouvertes.md`. Rien n'a été touché dans `site/`, `scripts/`, `story.js`.

---

## A. Ce qui est appliqué

### Partie 1 — cicatrices de réécriture

| Point | Fichier | Fait |
|---|---|---|
| 1.1 | `06-sophia-le-jour.md` | Les paragraphes « Ce qu'il découvrait, c'était de la vase. » et « Et puis il y avait les poissons. » suivent maintenant la phrase « …et ce qu'il découvrait. ». La séquence « Elle s'était dit… » vient après. **Ajustement de raccord** : le dialogue avec Kerr arrivait sans transition après le passé de Sophia. J'ai écrit « Kerr la croisa dans le couloir, ce matin-là. » puis « — Vous avez l'air fatiguée, Sophia, dit-il. » (au lieu de « …dit-il ce matin-là en croisant son regard dans le couloir »). |
| 1.2 | `20-le-nom-du-chien.md` | Le premier paragraphe s'arrête à « …comme une prière. ». Enchaînement avec le paragraphe détaillé (robe de chambre, haie, « Et Mathis ! », porte, prénom répété). Puis, avant la « Note médicale » : « Puis Sophia rouvrit le carnet à la page où, trois semaines plus tôt, Élise avait recopié ce qu'elle savait des premiers symptômes. » (« elle » → « Sophia », « Puis elle » → « Puis Sophia »). |
| 1.3 | `21-mathis.md` | « — Et le monsieur du barrage… elle appelle sa maman. » et « Il referma la porte derrière lui. » sont juste après « — C'est pour elle… Celui-là, il attend depuis longtemps. », avant « Sophia apprit plus tard, par Corinne… » et « Le caillou resta… ». Aucun ajustement. |
| 1.4 | `31-le-premier-passeur.md` | Bloc « — Toutes en même temps ? … presque pas de nom. » retiré de sa place. Version fusionnée (texte de ton prompt, tel quel) après « …où une autre toi est déjà tombée, et une autre avant elle. ». Raccords vérifiés : « Aime-le autrement. » → « Il regarda par la fenêtre, vers le village. » ; « — Toutes en même temps ? » (Élise) → réplique d'Anselme → « — Et aucune n'a jamais fait autrement ? » (Élise). |

### Partie 2.1 — dates, chiffres, généalogie (13 corrections, toutes faites)

| Fichier | Avant → après |
|---|---|
| `00-prologue` | « dix-neuf jours » → « douze jours » ; « Le dix-neuvième jour » → « Le douzième jour » (13e jour = lundi 13 octobre 1980, déjà dans le texte) |
| `09-reponse` (lettre) | « Jeudi… 411,94. Lundi… 411,52. » → « Lundi, à 7 h 12 : 411,71. Jeudi, à 7 h 12 : 411,52. » |
| `09-reponse` (vérification) | « Le jeudi… 411,94. Le lundi, 411,52. » → « Le lundi, à 7 h 12, la jauge affichait 411,71. Le jeudi, 411,52. » (concorde avec `11` : 411,71 le lundi, et `22` : 01/10 = 411,52) |
| `06-sophia-le-jour` | « trente-huit ans » → « trente-sept ans » |
| `20-le-nom-du-chien` | « J'ai trente-huit ans » → « J'ai trente-sept ans » |
| `22-le-registre` | « de 1 à 46 » → « de 1 à 47 » ; « cahier 46 » → « cahier 47 » ; « quarante-six cahiers » → « quarante-sept cahiers » (les « quarante-six ans » restent) |
| `02-la-bibliotheque` | « neuf ans d'intervalle » → « six ans d'intervalle ». Vérifié : `01` (Paul rouille quand Élise a 15 ans = 2118), `04` (2117, « un an avant de rouiller », Élise 14 ans) et 2124 pour Marthe s'accordent. Aucune autre date contradictoire. |
| `35-la-nuit-de-noe` | « Le grand-père du grand-père de son grand-père. » → « Le grand-père de son grand-père. » |
| `39-le-mur` | « arrière-arrière-arrière-grand-père » → « arrière-arrière-grand-père » |
| `45-epilogue` | « Et trente ans plus tard » → « Et vingt-sept ans plus tard » |

Laissé volontairement : « trente-huit ans » dans `40` (anniversaire du 12 novembre).

### Partie 3 — le secret de Noé

- `16-interlude-ruben` : `*Noé MARLE.*` → `*Noé.*`
- `26-le-veilleur` : « …dans le froid, en pensant qu'elle venait de parler au père d'un enfant qui naîtrait dans cent ans, et sans savoir qu'elle le pensait. Elle se coucha… » → « Elle rentra chez elle à pied, à deux heures du matin, dans le froid. Elle se coucha… »
- `30-le-cycle` : « Noé faire exactement la même chose » → « **Sacha** faire exactement la même chose » (contexte : le narrateur est dans Élise, qui ne connaît « Noé » qu'au chapitre 33 ; la scène emploie « Sacha » juste après).
- Contrôle des occurrences de « Noé » avant `33` : seules restent la liste de prénoms de `10` (conservée), celle de `22` (conservée) et la ligne de `16`. Aucune autre.

### Bible et notes

- `bible/chronologie.md` §0.12 (nouveau) : repères chiffrés V3.1 (vidange, âges, cahiers, jauge, Paul/Marthe, générations, « Noé » seul).
- `notes/questions-ouvertes.md` : section « Relecture V3.1 ».

### Vérifications finales (parties appliquées)

- Anciennes valeurs recherchées dans tout le roman : `411,94`, `dix-neuvième jour`, `dix-neuf jours`, `de 1 à 46`, `cahier 46`, `quarante-six cahiers`, `Noé MARLE` → **0 occurrence**. « trente-huit ans » → seulement `40`.
- Jours de la semaine contrôlés contre le calendrier réel : 15 sept. 2026 mardi ; jeudi 24 sept. ; dimanche 27 sept. ; lundi 28 sept. ; jeudi 1er oct. ; 4 oct. dimanche ; 16 oct. vendredi ; lundi 19 oct. ; samedi 24 oct. ; dimanche 25 oct. ; dimanche 1er nov. ; lundi 2 ; mercredi 4 ; vendredi 6 ; **samedi 7 nov.** (Hugo) ; vendredi 13 ; samedi 14 ; lundi 13 octobre 1980. **Tous justes.** Le problème n'est pas un jour faux, c'est l'enchaînement (point 2.3).

---

## B. Points validés puis appliqués (V3.1, deuxième passe)

> **Mise à jour :** tous les points ci-dessous ont été appliqués tels que proposés (2.2, 2.3, 4.1 à 4.8, indice 6.2, correctifs C1 et C2). L'annexe (6.1, option C) a été déplacée dans `tome2/annexe-cahier-noir.md` après application de 4.3. Partie 5 : seul le lot 1 (`00`-`02`) et la phrase de `15` sont faits. L'EPUB et `site/book.js` ont été régénérés.

(Texte des propositions conservé ci-dessous.)

### 2.2 — Les trois éclats de lumière

Constat : `11` (« Nous avons allumé trois fois. »), `22` et `31` (« la première nuit ») placent le signal le 15 septembre. Dans le texte, on ne le voit qu'à la fin de `07` (9e nuit).

**Proposition.** Insertion dans `05-le-corps-des-autres.md`, après « Puis elle se mit au travail. » (fin de la première section) :

> La première nuit, en remontant du lac, elle avait vu la lumière de la cabine s'éteindre, puis se rallumer, trois fois de suite, à intervalles réguliers. Elle y avait vu un défaut de courant. Le barrage était vieux.

Dans `07-le-carnet.md` (fin) :

- avant : « La lumière s'éteignit. / Élise retint son souffle. La lumière se ralluma. S'éteignit. Se ralluma. Trois fois, à intervalles parfaitement réguliers, comme un signal. »
- après : « La lumière s'éteignit, comme la première nuit. / Élise retint son souffle. La lumière se ralluma. S'éteignit. Se ralluma. De nouveau trois fois, à intervalles parfaitement réguliers. Ce n'était pas un défaut de courant. »

La coda n'est pas touchée.

### 2.3 — Calendrier d'octobre (chapitres 17 à 29)

Les jours de semaine sont justes, mais l'enchaînement est impossible. Calendrier **actuel**, avec les citations qui fixent chaque date :

| Date 2026 | Chapitre | Citation / repère |
|---|---|---|
| lun. 19 oct., 2 h | `17` | « Ils descendirent le 19 octobre, à deux heures du matin » ; `29` : « VARENNE S. — 19/10 — 02:07 » |
| ~22-23 oct. | `18`, `19` | `18` : « un matin de la mi-octobre » (J+32) ; `19` : « quelques jours après la galerie », Martine vivante dans son lit |
| **sam. 24 oct.** | `20` | « Corinne Delorme frappa chez Sophia un samedi matin » ; « On était le 24 octobre. » ; soir : liste d'Étienne, baiser, carnet |
| **dim. 25 oct.** | `20` | « Le lendemain matin, on retrouva Martine Pradel dans la vase » ; `bible` §8 : le 25 octobre ; `43` : enterrée le 29 |
| **mar. 27 oct.** (au plus tôt) | `21` | « Jusqu'au mardi où Mathis frappa à sa porte » (suit l'oubli de Corinne : « Elle oublie des trucs, maman, en ce moment. — Je sais. ») |
| mer. 28 | `21` | « Le lendemain matin, Sophia le trouva [le caillou] posé sur la page noire » |
| **sam. 31 oct.** | `21` | « Le samedi, elle l'emmena ramasser des cailloux » |
| **dim. 1er nov.** | `21` | « Elle monta à la cabine le dimanche » ; le soir : photo imprimée, collée, « Il m'a appelée Élise » |
| | `25` | « Le 1er novembre, tout Vallorce monta au cimetière du haut » (fin d'après-midi) |
| nuit 1er → 2 nov. | `26` | « La nuit de la Toussaint, Sophia ne dormit pas » ; Étienne l'a demandé « en redescendant du cimetière » |
| lun. 2 nov. | `26` | « Le 2 novembre, Étienne ouvrit le tiroir… » ; nuit : lecture à 1 h 10, badge de Kerr, barrage 1 h 40 |
| mer. 4 nov. | `27`, `28` | « Le 4 novembre, à sept heures du matin » ; « Le jour de la fontaine… » ; carnet écrit « trois jours plus tard » (7 nov.) |
| ven. 6 nov. | `29` | « Bastien Kerr la convoqua le 6 novembre » ; soir chez Étienne |
| sam. 7 nov. | `30`, `31`, `33`, `34` | réveil chez Étienne (« dans sept jours, c'est le 14 ») ; cabine à l'aube ; `34` : « Hugo Marle arriva le samedi 7 novembre, à midi » |

Et les chapitres qui doivent tenir **entre le 24 et le 31 octobre** (puisque `26` suppose que `22`, `23` et `24` ont eu lieu) :

- `22` : demande des registres (dimanche, sur la terrasse) ; « trois soirs » de lecture ; question ; « la nuit suivante » la réponse ; « Elle ne put pas dormir ».
- `23` : la nuit où Élise lit la page puis monte à la cabine (`26` : « Anselme m'a dit de me méfier de toi »).
- `24` : « un mardi » (recette), « le jeudi » (café, dispute), question, réponse « au matin », deuxième question, « deux nuits », dîner de lentilles.

Avec `21` au 27 oct.-1er nov., il reste au mieux 0 jour pour `22` à `24` : conflit net.

**Solution qui modifie le moins de phrases : remonter `21` d'une semaine, et décaler deux jours de semaine dans `24`.**

Calendrier proposé :

| Date | Événement |
|---|---|
| sam. 24 oct. | `20` (inchangé) |
| dim. 25 oct. | Martine retrouvée (`20`, inchangé). **Après-midi : `21`, visite à la cabine** (« le dimanche, comme d'habitude » : inchangé) ; Sophia demande les registres sur la terrasse (début de `22`, inchangé) ; soir : elle imprime la photo, ne la colle pas (point 4.6) |
| lun. 26 → mer. 28 oct. | `22` : les « trois soirs » de lecture ; le 3e soir, l'écriture noire dans les marges ; question à Élise |
| nuit 29 → 30 | réponse « Non. Jamais. Pourquoi ? » ; Sophia ne dort pas (fin de `22`) |
| sam. 31 oct. au soir | collage de la photo + « Il m'a appelée Élise » (nouvelle fin de `22`, point 4.6) ; nuit 31 oct. → 1er nov. : `23` (Élise lit, va à la cabine) |
| `24` | recette : « un **lundi** » (26 oct.) ; café : « le **mercredi** » (28) ; question le soir, réponse au matin ; 2e question ; « deux nuits » ; dîner de lentilles le sam. 31 oct. au soir |
| dim. 1er nov. | `25` Toussaint ; `26` nuit |

Phrases à modifier :

1. `21` — Mathis, avant : « Elle oublie des trucs, maman, en ce moment. » → après : « Elle perd ses clés, maman, en ce moment. » (le premier oubli officiel de Corinne est le 24 ; la visite de Mathis devient le mardi **20 octobre**, avant `20` dans le temps, après dans le livre ; sans date explicite, personne ne verra le saut).
2. `21` — « Le samedi, elle l'emmena ramasser des cailloux. » → « Le vendredi, elle l'emmena… » (23 oct. ; le samedi 24 est pris par Corinne et Étienne).
3. `24` — « un mardi » → « un lundi » ; « le jeudi » → « le mercredi ».
4. Les deux points de 4.6 (déplacement du collage et de la ligne « Il m'a appelée Élise »).

Tout le reste (22, 23, 25, 26…) reste tel quel. Aucun autre chapitre ne bouge.

Alternative écartée : avancer `20` (impossible : Martine est vivante dans `19` « quelques jours après la galerie », et sa mort au 25 est dans la bible) ; déplacer la Toussaint (fixe).

Remarque liée : `15` dit que Sophia trouve la recette « une semaine plus tard » (donc ~23 oct.) ; avec « lundi 26 », l'écart est de 10 jours. Acceptable, ou « une semaine plus tard » → « quelques jours plus tard ».

### 4.1 — Le piézomètre P7 n'est jamais préparé

`07-le-carnet.md`, avant :

> Une colonne de dates, une colonne de cotes. Élise l'avait recopiée dans sa tête à la manière d'un poème, parce que c'était ce qu'elle faisait de tout ce qu'elle lisait.

Après :

> Une colonne de dates, une colonne de cotes, puis, plus bas, les relevés des piézomètres du mur jusqu'à la veille de l'incident. Élise avait tout recopié dans sa tête à la manière d'un poème, parce que c'était ce qu'elle faisait de tout ce qu'elle lisait.

(Une seule phrase, aucun nom de piézomètre, aucun chiffre.)

### 4.2 — La fiole jetée au lac réapparaît dans la coda

`45-epilogue`, fin, avant :

> Cette nuit-là, Iris descendit au lac et jeta la fiole dans l'eau, aussi loin qu'elle put. Elle crut s'en débarrasser. Elle rendait seulement au lac ce qu'on lui avait pris plus d'un siècle plus tôt.

Après :

> Cette nuit-là, Iris descendit au lac. Elle tira l'aiguille de la fiole avec un chiffon et la jeta dans l'eau, aussi loin qu'elle put. Elle crut s'en débarrasser. Elle rendait seulement au lac ce qu'on lui avait pris plus d'un siècle plus tôt.
>
> Elle rapporta la fiole, qu'elle rinça et reposa sur l'étagère, et qu'elle crut vide. Au fond du verre, contre la paroi, un grain restait collé, trop petit pour qu'elle le voie.

`46-coda`, avant : « …une fiole vide, sur l'étagère des archives, et une ville entière qui oubliait. » → après : « …une fiole qu'on croyait vide, sur l'étagère des archives, et une ville entière qui oubliait. » (« Il en reste toujours un grain » trouve ainsi son appui.)
Ajustement : dans `45`, « les éviers de Vallorce descendaient au lac » et « rincé dans l'évier » restent ; le « rinça » d'Iris ajoute une troisième faute, voulue. Si tu préfères que le grain reste, enlève « qu'elle rinça et ».
Bible §0.8 (à modifier après accord) : « Puis Iris jette la fiole dans le lac » → « Puis Iris jette l'aiguille dans le lac et garde la fiole, qu'elle croit vide : un grain reste collé au verre. » (idem §6.)

### 4.3 — K. observe alors que Kerr est éveillé

`47-annexe`, trois remplacements :

1. « Le vieil homme a pleuré. Je l'ai regardé depuis la grève. » → « Cette nuit, je suis allé sur la grève. Le vieil homme pleurait encore. »
2. « Je l'ai vue faire. Je n'ai pas bougé. » → « Je l'ai vue sur son étagère, par la fenêtre. J'aurais pu entrer. Je n'ai pas bougé. »
3. « Empêcher S.V. de garder la fiole aurait été une intervention. » → « La lui prendre aurait été une intervention. »

« Je ne l'ai pas fait. » est conservé tel quel : il se rapporte désormais à « La lui prendre » et reste juste. Cohérence avec `43` : le badge au congélateur (nuit du 13 au 14, pendant le sommeil de Kerr), Kerr qui quitte Vallorce le 16 avec le cahier dans son tiroir : l'annexe est datée J + 61 (15 nov.), nuit où Kerr dort encore au laboratoire fermé : **compatible**. Dépend de la décision 6.1 (l'annexe garde-t-elle ou non sa place).

### 4.4 — Le dessin d'Anselme change de place

`43-le-matin`, avant :

> Il leva les yeux vers elle. Il ne demanda rien. Il fouilla dans le tas, longtemps, et en sortit un dessin qui n'était pas comme les autres : le plus vieux, le plus jauni, celui du fond, cassé aux plis, sur une page de carnet de chantier. La silhouette devant la maison avait de longs cheveux, et un petit point au coin de l'œil gauche. Il le lui tendit.

Après :

> Il leva les yeux vers elle. Il ne demanda rien. Il sortit son portefeuille et tira, de derrière sa carte d'identité, une page de carnet de chantier pliée en quatre, cassée aux plis. Il la déplia. La silhouette devant la maison avait de longs cheveux, et un petit point au coin de l'œil gauche. Il la lui tendit.

La suite (« Puis il prit les autres, tous les autres, les rangea dans un carton… », « Sophia regarda le dessin. Elle ne comprit pas pourquoi celui-là. ») est conservée sans changement. Accord avec `00` (carnet de chantier, plié en quatre, derrière la carte d'identité) et `11`.

### 4.5 — Le badge de Kerr ne sert jamais

`30-le-cycle`, avant :

> — Sophia n'a plus de badge.
> — Je sais. Je trouverai.
> […]
> Anselme l'attendait devant le laboratoire.
>
> Il ne dit pas qu'il savait qu'elle viendrait. Il n'en avait pas besoin. Il passa son badge d'exploitant sur le lecteur, la porte s'ouvrit, et ils descendirent l'escalier de fer…

Après :

> — Sophia n'a plus de badge.
> — Je sais. J'ai celui de Kerr, dans le manteau.
> […]
> Anselme l'attendait devant le laboratoire.
>
> Il ne dit pas qu'il savait qu'elle viendrait. Il n'en avait pas besoin. Elle passa le badge de Kerr sur le lecteur, la porte s'ouvrit, et ils descendirent l'escalier de fer…

Compatibilité : `29` (Kerr dit qu'il perd son badge et le retrouve), `43` (badge dans le congélateur le 14) et `47` (« un badge dans un congélateur ») restent vrais ; il faut simplement que K. reprenne le badge après le 7 (déjà dans son rôle de « politesses »). Je n'ajoute pas de phrase pour cela. Dis-moi si tu veux une demi-ligne.

### 4.6 — Le dessin est découvert après une question postérieure

`21-mathis`, fin, avant :

> Le soir, elle imprima la photo au format d'une page de carnet, sur la vieille imprimante du séjour. Elle la colla sur la page de droite, à côté de sa propre écriture, et n'écrivit qu'une ligne en dessous : […] Puis elle hésita, la main au-dessus du papier. Elle ajouta : *Il m'a appelée Élise.*

Après (fin de `21`) :

> Le soir, elle imprima la photo au format d'une page de carnet, sur la vieille imprimante du séjour. Elle la posa sur la table, à côté du carnet fermé, et n'osa pas la coller.

`22-le-registre`, ajout à la toute fin, après « Elle ne put pas dormir. Ce qui, pour une fois, voulait dire qu'Élise non plus. » :

> ---
>
> Le lendemain soir, elle prit la photo sur la table et la colla sur la page de droite, à côté de sa propre écriture. Elle n'écrivit qu'une ligne en dessous :
>
> *Ce dessin est sur tous les murs de mon père. Il en fait un chaque nuit depuis quarante-six ans. Est-ce que tu sais ce que c'est ?*
>
> Puis elle hésita, la main au-dessus du papier. Elle ajouta :
>
> *Il m'a appelée Élise.*

Raccords : « depuis quarante ans » devient « quarante-six ans » (après les trois soirs de registres, elle a le chiffre exact) ; « Le lendemain soir » ancre l'ajout une nuit après l'insomnie. `23` s'ouvre sur « Élise ouvrit le carnet, vit le dessin et cessa de respirer » puis « Elle lut la ligne de Sophia : *Il m'a appelée Élise.* » : **aucun changement nécessaire**. La question « Est-ce que tu as déjà été ici ? » reçoit désormais sa réponse « Non. Jamais. » *avant* que Élise voie le dessin, ce qui rend la révélation de `23` (« Tu es déjà venue ») cohérente. Le cahier d'Anselme est lui aussi déjà lu quand Sophia pose la question.
Si 2.3 est accepté, la date devient le samedi 31 octobre (soir).

### 4.7 — La feuille du Veilleur annonce une découverte déjà faite

`26-le-veilleur`, avant :

> *C'est S. Certitude. Corinne : non (elle ne voit rien quand Mathis parle). S. : la main gauche, l'écriture lente, la façon de lever les yeux vers le ciel.*
> *Rester près d'elle. Ne rien lui dire.*
> *Le 14, l'empêcher. Coûte que coûte.*
> *La boucle doit tourner.*
>
> Sophia la relut trois fois. Puis elle leva les yeux vers Étienne, qui lui tournait toujours le dos.
> — *S.*, c'est moi, dit-elle.
> — Je sais.
> — Il l'a trouvée. Elle. Il sait qu'elle est en moi.
> — Oui.
> — *L'empêcher.* L'empêcher de quoi ?

Après :

> *Rester près d'elle. Ne rien lui dire.*
> *Le 14, l'empêcher. Coûte que coûte.*
> *La boucle doit tourner.*
>
> Sophia la relut trois fois. Puis elle leva les yeux vers Étienne, qui lui tournait toujours le dos.
> — *Ne rien lui dire*, dit-elle. Il lui ment.
> — Je sais.
> — Et il veut l'empêcher. L'empêcher de quoi ?

La suite (« Étienne se retourna… Je sais seulement que ce type passe ses nuits avec elle… et qu'il lui ment. ») : couper « et qu'il lui ment » pour éviter le doublon → « …avec mes jambes, ma voix, mon manteau. »
Dans la page du carnet qui suit, couper « Il sait que tu es en moi. » : « *Il y a quelqu'un dans Étienne qui veut que la Rouille arrive. Il veut t'empêcher de faire ce que tu es venue faire, le 14. Il a écrit « la boucle doit tourner ».* »
Le paragraphe de Sacha plus bas (« J'ai continué à écrire dans les tiroirs de mon hôte ce que j'étais censé faire, pour m'en souvenir. Pour me forcer. ») reste juste.

### 4.8 — Deux origines pour la Fondation Léthé

`29-le-financeur`, avant :

> Elle avait été créée trois ans plus tôt, après qu'un géologue avait fait analyser, par hasard, une carotte de sédiments de Vallorce prélevée lors d'une inspection. On y avait trouvé une structure cristalline inconnue, et une propriété qui avait fait trembler les mains de tout le monde : […]

Après :

> Elle avait été créée trois ans plus tôt, après que Kerr, lui-même, avait fait analyser le contenu d'un bocal reçu par la poste. On y avait trouvé une structure cristalline inconnue, et une propriété qui avait fait trembler les mains de tout le monde : […]

Plus bas, dans le même discours de Kerr, « Il y a trois ans, j'ai reçu un colis. Pas d'expéditeur… » reste tel quel, et se prolonge naturellement : « Voilà pourquoi je fais ça » reste ; j'ajouterais à la fin du colis : « J'ai fait analyser ce qu'il y avait dedans. Le reste, vous le savez. » (une phrase). Ordre vérifié : `18` (Théo mort en août 2022, « quatre ans »), `29` (colis il y a trois ans = 2023), `31` (Anselme : « il y a trois ans… ce qui efface »), `37` (« Le bocal envoyé en 2023 »), bible §0.1 (l'aiguille d'Anselme). Cohérent. Il n'y a aucune autre mention de « carotte » ou de « géologue » dans le roman.

### Partie 5 — Style (aucune modification faite)

Compteurs actuels, confirmés sur le texte : il y avait 94 ; comme on 81 ; quelque chose 79 ; longtemps 61 ; à plat sur 28 ; pour la première fois 26 ; sans bruit 10 ; sans savoir pourquoi 8 ; ne le savait pas / ne sut jamais 7 ; ni l'un ni l'autre 6.

Plan : 10 lots (`00-04`, `05-09`, `10-14`, `15-19`, `20-24`, `25-29`, `30-34`, `35-39`, `40-44`, `45-47`). Les lots les plus chargés : `40-44` (quelque chose 15, longtemps 11, pour la première fois 8), `30-34` (quelque chose 12, comme on 11), `20-24` (comme on 11), `00-04` (il y avait 19, comme on 14).

**Lot 1 (`00` à `04`) — proposition** (je n'applique rien tant que tu n'as pas dit oui au principe) :

1. `00` : « il saigna du nez pendant le repas, longtemps, sans raison » → « …pendant le repas, sans raison »
2. `00` : « Il retira son gant sans savoir pourquoi, et il le toucha. » → « Il retira son gant, et il le toucha. » (on garde le « Sans savoir pourquoi non plus » suivant, qui devient plus net)
3. `00` : « elle se tenait au parapet les deux mains posées à plat sur la pierre » → à conserver (geste de retenue : le même que chez Élise).
4. `01` : « Elle se mit à pleurer sans bruit, sans comprendre pourquoi, ni pour qui, ni dans quel corps coulaient les larmes. » → « Elle se mit à pleurer, sans savoir pour qui, ni dans quel corps coulaient les larmes. »
5. `01` : « Il lui fallut longtemps pour que le froid reprenne ses droits. » → « Le froid mit du temps à reprendre ses droits. »
6. `02` : « Il y avait d'autres choses qu'elle avait cessé d'interroger. Chaque midi, au réfectoire, il y avait à sa place un bol de lentilles… » → « Elle avait cessé d'interroger d'autres choses. Chaque midi, au réfectoire, un bol de lentilles au cumin, encore chaud, l'attendait à sa place, posé là avant qu'elle n'arrive. »
7. `03`, `04` : les trois « comme on… » restants sont des images (« comme on parle à des vieilles bêtes », « comme on garde une relique ») et le « sans savoir pourquoi » final d'Oriane est un indice. **Conserver.**

Pas d'explication psychologique à couper dans ces cinq chapitres. Le lot 2 suivra sur le même modèle quand tu auras validé cette façon de faire (je cible environ 8 à 12 coupes par lot, en gardant tous les motifs de la liste 5 du prompt).

À traiter à part, dans les lots concernés :

- `15-les-lentilles` : réécrire « avec une tendresse si nue qu'elle dut baisser les yeux » (on la garde dans `23`). Proposition : « Il la regarda de l'autre bout de la cuisine. Elle détourna les yeux la première. »
- Dialogues de Sophia plus secs : à faire en lots `10-14`, `20-24`, `25-29`, `35-39`.

### Partie 6 — Décisions d'auteur

**6.1 — L'annexe** (`47-annexe.md`).
- **Option A, la garder** (avec 4.3) : garde l'amorce du tome 2 (« Tour 48 », « qui, de nous tous, a commencé ? »), la preuve que K. est un descendant de Kerr et l'écho de la nuit du 13. Coût : le livre ne se termine plus sur « Elle reviendrait toujours. », mais sur une note technique.
- **Option B, la raccourcir** (7-8 lignes) : garder « Tour 47. J + 61. Clôture. », la phrase sur la nuit du 13 (« Je n'ai pas observé la nuit du 13… »), « Tour 48 : préparer l'entrée par la ligne B » et la question finale. Retirer la note sur Léa et celle sur 1958 (déjà posées dans `32`, `15` et le tome 2). Coût : la fiche K. perd sa généalogie, qui n'est plus lisible que dans le tome 2.
- **Option C, la réserver au tome 2** (la retirer du roman, la déplacer dans `tome2/amorces`) : la coda reste la dernière page. Les amorces essentielles sont déjà dans le roman : `44` (Anne et la question « de qui sa fille était la fille »), `18`, `19`, `43` (cahier noir de Kerr, tours). Coût : on perd la confirmation explicite que K. voyage dans Kerr et la mention du tour 48.
- **Recommandation : C** pour la force de la dernière phrase ; B si tu veux garder une porte ouverte sur le tome 2. Si C : 4.3 s'applique à la copie du tome 2, pas au roman.

**6.2 — La règle de réécriture.** Un seul indice, discret, sans le premier Passeur, dans `18-interlude-kerr.md`, dans le premier bloc de notes (« *Tour 47. J + 32.* »), avant « *Ne pas intervenir sur la structure.* » :

> *Chaque tour recouvre le précédent. Ne survit que ce qui sort avant que la fenêtre se referme.*

Dite en jargon de mesure, par K., sans sujet ni personne : le lecteur ne la comprendra qu'à `31` (palimpseste), mais elle sera déjà là. Évité volontairement : une version dans `22` (écriture « par-dessus une autre »), trop proche de la révélation du premier Passeur.

**6.3 — « *(premier jet)* ».** Non touché ; à retirer des 48 fichiers quand tu déclareras la version terminée.

---

## C. Nouvelles incohérences trouvées en route (signalées, non corrigées)

1. `19-le-cahier-noir` : « *Tour 47. J + 44.* » correspond au 29 octobre ; Martine Pradel, vivante dans la scène, est retrouvée morte le 25. → « J + 37 » (22 oct., « quelques jours après la galerie »).
2. `41-interlude-iris` : le registre rouge porte « *Noé Marle.* » alors que Ruben n'a écrit que « *Noé.* » (`16`, après la partie 3). → dans `41`, remplacer par « *Noé.* » ; le nom de famille vient alors des registres de départ du Conseil (deux lignes plus bas).
3. `15-les-lentilles` : « Sophia la trouverait une semaine plus tard » (recette) vs `24` (voir 2.3).
4. `33-le-lit-vide` : Noé dit que Ruben lui a donné l'éclat « deux jours après ton départ » ; `04` montre Oriane donnant l'ordre le soir même (le 15), `41` date le départ de Noé du 17. Compatible, mais à garder en tête si l'on retouche `04`.
5. `13-le-laboratoire` : le code 1-4-1-1 est « la date de leur extraction » ; `47` ne le reprend pas. Rien à faire.
6. Badge de Kerr (4.5) : voir ci-dessus.
