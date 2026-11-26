/* ============================================================
   LA ROUILLE — histoire interactive
   Actes I à III jouables, cinq fins. Voir README.md pour le format des scènes.

   v = jauges   : confiance (de Sophia), memoire (d'Élise), discretion (face au Veilleur)
   f = drapeaux : f.nom (true si posé)
   Texte à la deuxième personne ("tu"), au présent.
   *mot* = italique.
   ============================================================ */

(function (root) {
  const STORY = {
    title: "La Rouille",
    start: "titre",
    version: 1,

    // Valeurs initiales des jauges (bornées de 0 à 5)
    vars: { confiance: 0, memoire: 5, discretion: 0 },

    scenes: {

      /* ---------------------------------------------------- TITRE */
      titre: {
        chapter: "",
        title: "La Rouille",
        pov: "neutre",
        text: [
          "*En 2137, l'humanité oublie.*",
          "Une contamination appelée la Rouille efface peu à peu la mémoire des gens : d'abord les visages, puis les mots, puis les gestes les plus simples.",
          "Tu es Élise Varenne, archiviste. Tu es l'une des dernières personnes qui sachent encore lire. Et tu vas remonter le temps, une nuit après l'autre, dans le corps d'une femme qui dort.",
          "Ce que tu écriras, elle le lira. Ce qu'elle répondra, tu le liras. Chaque choix laisse une trace, et chaque trace coûte quelque chose."
        ],
        choices: [
          { label: "Entrer dans la Rouille", to: "biblio" }
        ]
      },

      /* ---------------------------------------------------- 2137 */
      biblio: {
        chapter: "Acte I — La greffe",
        title: "La bibliothèque",
        pov: "elise",
        text: [
          "Sous la ville, la bibliothèque ne ferme jamais. Il n'y a plus de jour, là-bas, seulement des lampes qu'on allume quand quelqu'un se souvient pourquoi.",
          "Tu as trente-quatre ans. Tu fais partie des quarante-deux personnes du refuge qui savent lire sans épeler. Sur la table devant toi, un seul dossier gris : *l'incident de Vallorce, novembre 2026*. En face, le Conseil des Lucides attend. Personne ne prononce le mot « Passeuse ». Tout le monde l'a déjà pensé.",
          "Dans ta poche, un dessin d'Iris : une maison, un soleil, et quelque chose qui est peut-être ton visage. Hier, elle te l'a tendu en demandant : *c'est qui ?*"
        ],
        choices: [
          { label: "Accepter. Tout de suite.", to: "protocole", flag: "accepte_vite" },
          { label: "Exiger de relire les archives d'abord.", to: "archives" }
        ]
      },

      archives: {
        chapter: "Acte I — La greffe",
        title: "Les archives",
        pov: "elise",
        text: [
          "Le dossier tient en trois feuilles. Tu les connais par cœur, mais tu les relis, parce que relire est la seule chose que tu saches faire mieux que tout le monde.",
          "Une date : *14 novembre 2026*. Un lieu : *laboratoire de Vallorce, galerie technique*. Un nom, en bas de page, dans la liste des personnels : *S. Varenne, hydrologue*.",
          "Tu t'arrêtes sur le nom. C'est le tien. Pas tout à fait : c'est celui de la femme dont le sang, à travers quatre générations, t'a faite.",
          "Quelqu'un, derrière toi, dit doucement que tu as le droit d'avoir peur."
        ],
        choices: [
          { label: "Refermer le dossier. J'y vais.", to: "protocole", flag: "archives" }
        ]
      },

      protocole: {
        chapter: "Acte I — La greffe",
        title: "Le protocole",
        pov: "elise",
        text: [
          "On t'explique les règles trois fois. Tu les répètes à voix haute, comme une prière.",
          "*On ne remonte que dans sa propre lignée. La conscience se greffe sur celle de l'ancêtre quand il dort. Tu vivras la nuit, dans un corps qui n'est pas le tien. Au matin, elle ne se souviendra de rien, mais trouvera des traces.*",
          "*Rien ne voyage avec toi. Ni objet, ni souvenir précis. Seulement une ancre : une seule chose, que tu tiendras si fort que le voyage ne pourra pas te l'arracher.*",
          "Tu as une heure pour choisir ce que tu garderas serré contre toi pendant la traversée. Personne ne sait ce que valent ces ancres. Aucun voyageur n'est jamais revenu pour le dire."
        ],
        choices: [
          { label: "Le visage d'Iris.", to: "lac", flag: "ancre_iris" },
          { label: "Le nom de Sophia.", to: "lac", flag: "ancre_nom" },
          { label: "La date : novembre 2026.", to: "lac", flag: "ancre_date" }
        ]
      },

      /* ---------------------------------------------------- LE LAC */
      lac: {
        chapter: "Acte I — La greffe",
        title: "Le lac",
        pov: "elise",
        text: [
          "Le froid vient avant tout le reste. Avant le nom, avant la peur, avant même l'idée qu'il y ait quelqu'un pour avoir froid.",
          "Il monte par la plante de tes pieds. Du gravier, mouillé, incliné. Tu ne marches pas : ton corps se tient là, face à l'eau, comme un manteau sur une chaise. À ta droite, une paroi immense. Un barrage. Au sommet, une lampe jaune. Un ronronnement grave te traverse les côtes.",
          "*Ne bouge pas. Compte.*",
          "Tu comptes jusqu'à soixante. Le corps ne se débat pas. Tu ne sauras jamais si tu as gagné ou si on t'a laissée faire.",
          { if: "f.ancre_iris", t: "Tu serres le visage d'Iris contre toi. Il tient. Pour l'instant." },
          { if: "f.ancre_nom", t: "Tu répètes le nom : *Sophia*. Il est là, dur comme un caillou dans la bouche." },
          { if: "f.ancre_date", t: "Tu récites la date comme une comptine. *Novembre. Deux mille vingt-six.* Elle te tient debout." },
          "Quelque part sous toi, très bas, quelqu'un dort. Une respiration lente, calme, qui ne sait pas qu'on la regarde."
        ],
        choices: [
          { label: "Regarder ton reflet dans le lac.", to: "reflet" },
          { label: "Marcher vers le barrage, vers la lumière.", to: "barrage" },
          { label: "Rester immobile et écouter la nuit.", to: "ecoute" }
        ]
      },

      reflet: {
        chapter: "Acte I — La greffe",
        title: "Le reflet",
        pov: "elise",
        text: [
          "Tu te penches. D'abord, seulement du noir. Puis la surface se fait miroir et rend un visage de femme, la trentaine avancée, creusé sous les pommettes, une bouche sérieuse qui ne sourit pas.",
          "Tu ne la connais pas. Tu la connais pourtant, d'une manière qui ne passe par aucun souvenir : *le menton de ta mère. Le front d'Iris.*",
          "Tu t'assois dans les galets. Tu pleures sans bruit, sans savoir dans quel corps coulent les larmes.",
          { if: "f.ancre_iris", t: "L'image d'Iris vacille, une seconde. Tu la rattrapes. Elle ne s'effacera pas cette nuit." },
          { if: "!f.ancre_iris", t: "Quelque chose, au fond de toi, se desserre : le visage de ta fille était une chose que tu n'avais pas pensé à protéger." }
        ],
        choices: [
          { label: "Te relever et regarder autour de toi.", to: "traces" },
          { label: "Te relever vite. Quelqu'un a peut-être vu.", to: "barrage" }
        ]
      },

      ecoute: {
        chapter: "Acte I — La greffe",
        title: "Écouter",
        pov: "elise",
        text: [
          "Tu ne bouges pas. Le lac clapote contre les pierres. Le barrage vrombit. Des arbres, quelque part, respirent : une odeur épaisse, sombre. Le mot arrive en retard, comme une pièce qui touche enfin le fond d'un puits : *résine*.",
          "Les mots affluent. *Grève. Brume. Frisson. Tiède.* Dans la bibliothèque, pour retrouver *tiède*, tu aurais dû fermer les yeux un long moment. Ici, tu n'as qu'à tendre la main. Le corps de Sophia possède une langue intacte, sans une lacune, et tu es une affamée dans une cuisine.",
          "*Ce n'est pas à toi. Ne touche pas.*"
        ],
        choices: [
          { label: "Te relever et regarder autour de toi.", to: "traces" },
          { label: "Tendre la main vers cette langue pleine. Juste un mot de plus.", to: "traces", add: { memoire: -1 }, flag: "a_pris_des_mots" }
        ]
      },

      barrage: {
        chapter: "Acte I — La greffe",
        title: "La cabine",
        pov: "elise",
        text: [
          "Tu fais quelques pas vers le sentier. C'est alors que tu vois la cabine, accrochée au flanc de la digue comme un nid : une fenêtre jaune, et dans la fenêtre, une silhouette immobile qui regarde vers le lac. Vers toi.",
          "Tu cesses de respirer.",
          "Alors la silhouette lève la main. Pas pour appeler. Pas pour chasser. Lentement, paume ouverte, comme on salue quelqu'un qu'on attendait.",
          "Tu ne lui as jamais parlé. Tu ne sais pas qui il est. Ton cœur, le cœur de Sophia, cogne contre vos côtes communes."
        ],
        choices: [
          { label: "Lever la main, toi aussi.", to: "traces", add: { discretion: -1 }, flag: "salue_anselme" },
          { label: "Baisser la tête et t'éloigner sans répondre.", to: "traces", add: { discretion: 1 } }
        ]
      },

      /* ---------------------------------------------------- LES TRACES */
      traces: {
        chapter: "Acte I — La greffe",
        title: "Les traces",
        pov: "elise",
        text: [
          "Tu retrouves la maison par les gestes : le corps de Sophia connaît le chemin, la clé, la marche qui grince. Il fait plus chaud dedans. Sur la table, des feuilles couvertes de chiffres à l'encre bleue. Au mur, un barographe. Partout, la marque d'une femme qui ne laisse rien au hasard.",
          "L'aube est à trois heures d'ici. Tu as le temps de laisser quelque chose. Elle se réveillera sans savoir où elle a dormi, ni ce qu'elle a fait de ses nuits. Il faut qu'elle comprenne qu'elle n'est pas folle.",
          "Ou du moins, qu'elle n'est pas seule à l'être."
        ],
        choices: [
          { label: "Écrire un mot sur la table : « N'aie pas peur. »", to: "jour_sophia", flag: "mot",
            add: { confiance: -1 },
            carnet: { who: "elise", text: "N'aie pas peur. Je ne te veux aucun mal." } },
          { label: "Cacher un carnet sous le plancher, et y écrire.", to: "carnet_ecrire", flag: "plancher" },
          { label: "Ne rien laisser. Dormir. Elle comprendra seule.", to: "jour_sophia", flag: "rien", add: { memoire: -1 } }
        ]
      },

      carnet_ecrire: {
        chapter: "Acte I — La greffe",
        title: "Le carnet",
        pov: "elise",
        text: [
          { if: "!f.camera && !f.brule", t: "Le plancher grince à gauche du radiateur. Tu soulèves une lame : un creux, juste assez profond. Dans le tiroir, un carnet à la couverture grise, jamais utilisé. Tu écris la date. Ta main hésite : elle n'est pas faite pour écrire de cette façon." },
          { if: "f.camera", t: "Dans le salon, un petit objet noir est braqué sur le lit : elle t'a filmée. Tu fais un pas de côté, hors du champ. Elle cherche des preuves. Bien. Tu lui en laisseras." },
          { if: "f.brule", t: "Dans la cheminée, des cendres de papier. Elle a brûlé ton premier message. Tu le sais sans qu'on te l'ait dit. Tu prends un nouveau carnet. Tu recommences, et cette fois, tu cherches des mots qui ne feront pas peur." },
          "Il faut commencer par quelque chose. Quelque chose que Sophia, au matin, ne pourra pas jeter par la fenêtre.",
          "*Que lui dis-tu ?*"
        ],
        choices: [
          { label: "La vérité, en entier : « Je viens de 2137. »", to: "jour_sophia", flag: "carnet", add: { confiance: -1, memoire: -1 },
            carnet: { who: "elise", text: "Je m'appelle Élise. Je viens de 2137. Tu es mon aïeule. Je suis dans ton corps quand tu dors. Je sais que ça n'a aucun sens." } },
          { label: "Une preuve : « Demain, la jauge du barrage affichera 412,6 à 7 h 12. »", to: "jour_sophia", flag: ["carnet", "preuve"], add: { confiance: 2, discretion: -1 },
            carnet: { who: "elise", text: "Demain, à 7 h 12, la jauge du barrage affichera 412,6. Note-le avant. Ne me crois pas encore. Vérifie." } },
          { label: "Rester brève : « Ne dis rien à personne. Réponds-moi. »", to: "jour_sophia", flag: "carnet", add: { confiance: 1 },
            carnet: { who: "elise", text: "Ne dis rien à personne, pour l'instant. Réponds-moi si tu peux. Ici, sur cette page." } }
        ]
      },

      /* ---------------------------------------------------- LUCIE, LE JOUR */
      jour_sophia: {
        chapter: "Acte I — La greffe",
        title: "Sophia, le jour",
        pov: "sophia",
        text: [
          "Tu te réveilles à six heures quarante, comme toujours, sans réveil. Tu as les pieds glacés. Les orteils, sales : de la boue, du gravier, des brindilles de pin entre les doigts.",
          "Tu regardes tes pieds un long moment. Il n'a pas plu depuis trois jours.",
          { if: "f.mot", t: "Sur la table de la cuisine, un mot. De ton écriture : les mêmes boucles, la même inclinaison. *N'aie pas peur. Je ne te veux aucun mal.* Tu ne l'as pas écrit. Tu en es certaine. Et pourtant." },
          { if: "f.plancher", t: "Sur la porte du frigo, un post-it dans ta propre graphie, à l'encre noire : *Sous le plancher, à gauche du radiateur.* Tu n'as pas d'encre noire." },
          { if: "f.carnet && !f.plancher", t: "Sur la porte du frigo, un post-it dans ta propre graphie, à l'encre noire : *Sous le plancher, à gauche du radiateur.* Tu n'as pas d'encre noire." },
          { if: "f.camera_parle", t: "Sur l'enregistrement, tu te vois te lever en pleine nuit, regarder l'objectif, et dire quelque chose. Il n'y a pas de son. Tu lis sur tes lèvres : *Je suis là. Lis le carnet.*" },
          { if: "f.rien && !f.carnet", t: "Rien sur la table. Rien sur le sol. Rien, sinon cette boue, et ce vide dans la nuit, à l'endroit où auraient dû se trouver des rêves." },
          "Tu es hydrologue. Tu crois ce qui se mesure. Ce que tu mesures, ce matin, c'est ceci : tu as marché pendant que tu dormais, et tu ne sais pas où."
        ],
        choices: [
          { label: "Soulever la lame de plancher.", to: "lire_carnet", if: "f.plancher || f.carnet" },
          { label: "Installer une caméra devant ton lit pour la nuit prochaine.", to: "nuit_camera", if: "!f.carnet", flag: "camera" },
          { label: "Prendre rendez-vous avec le docteur Marle.", to: "medecin" }
        ]
      },

      nuit_camera: {
        chapter: "Acte I — La greffe",
        title: "L'objectif",
        pov: "elise",
        text: [
          "Tu te réveilles dans le corps de Sophia, debout au milieu du salon. Un petit objet noir est braqué sur le lit. Une diode rouge clignote.",
          "Elle ne se contente pas de croire. Elle teste. Tu apprends à l'aimer pour ça.",
          "Il va falloir lui laisser quelque chose, et vite : elle regardera l'enregistrement demain matin."
        ],
        choices: [
          { label: "Parler à la caméra, doucement, en regardant la lentille.", to: "carnet_ecrire", flag: "camera_parle", add: { confiance: 1, discretion: -1 } },
          { label: "Écrire le carnet, hors du champ de l'objectif.", to: "carnet_ecrire", add: { discretion: 1 } }
        ]
      },

      lire_carnet: {
        chapter: "Acte I — La greffe",
        title: "Les mots de la main",
        pov: "sophia",
        text: [
          "Sous la lame, un carnet gris. Tes mains tremblent, ce qui t'agace.",
          "Tu l'ouvres. Ton écriture, en plus lente, plus appliquée, comme celle d'une enfant qui recopie. À l'encre noire.",
          { if: "f.plancher", t: "Le premier message est là. Tu le lis. Tu le relis. Tu cherches la faille." },
          "Il y a, quelque part dans ta poitrine, deux voix. L'une dit : *c'est un canular, c'est toi, tu as perdu la tête*. L'autre dit : *regarde la date en haut de la page*. C'est demain. Celle qui a écrit ces mots a écrit une date qui n'est pas encore arrivée.",
          { if: "f.brule", t: "Il reste des cendres dans la cheminée. Tu t'en souviens vaguement. Tu as déjà fait cela une fois." }
        ],
        choices: [
          { label: "Y répondre.", to: "reponse", add: { confiance: 1 } },
          { label: "Le brûler. C'est de la folie, ou pire.", to: "bruler" },
          { label: "Le montrer au docteur Marle.", to: "medecin", flag: "carnet_montre", add: { discretion: -2 } }
        ]
      },

      bruler: {
        chapter: "Acte I — La greffe",
        title: "La cheminée",
        pov: "sophia",
        text: [
          "Tu déchires les pages une à une. Tu les mets dans la cheminée. Une allumette. Le papier brunit, se recroqueville, devient noir. Au centre de chaque page, la dernière chose à brûler : la date.",
          "Tu te sens presque soulagée. Presque.",
          "Dans ton dos, le plancher grince, tout seul, comme si quelqu'un avait déplacé son poids d'un pied sur l'autre."
        ],
        choices: [
          { label: "Passer la journée à faire comme si de rien n'était.", to: "nuit_cendres", flag: "brule", add: { confiance: -2 } }
        ]
      },

      nuit_cendres: {
        chapter: "Acte I — La greffe",
        title: "Les cendres",
        pov: "elise",
        text: [
          "Cette nuit, tu te réveilles accroupie devant la cheminée. Des cendres de papier, encore tièdes. Elle a tout brûlé.",
          "Tu poses la main sur les cendres. Elle a peur. Tu connais cette peur, tu l'as vue dans les yeux de ta fille.",
          "Il va falloir recommencer, et payer le prix de la recommencer : un peu de toi, chaque fois que tu forces le corps d'une autre à tenir le stylo contre sa volonté."
        ],
        choices: [
          { label: "Recommencer le carnet, avec d'autres mots.", to: "carnet_ecrire", add: { memoire: -1 } }
        ]
      },

      /* ---------------------------------------------------- LE MÉDECIN */
      medecin: {
        chapter: "Acte I — La greffe",
        title: "Le docteur",
        pov: "sophia",
        text: [
          "Le cabinet du docteur Marle donne sur la place de l'église. Dans la salle d'attente, il n'y a pas d'horloge. Tu l'as toujours trouvé reposant. Aujourd'hui, ça te semble curieux.",
          "Il t'écoute sans t'interrompre, la tête un peu penchée, les mains jointes. Il a une voix douce, de ces voix qu'on croit avoir toujours connues.",
          { if: "f.carnet_montre", t: "Il lit le carnet longtemps. Il ne dit rien. Quand il relève les yeux, son visage n'exprime rien. *Rien du tout*, ce qui est étrange pour quelqu'un à qui l'on vient de montrer un cas pareil." },
          "— Le somnambulisme est fréquent, dit-il enfin, quand le stress s'accumule. Vous écrivez de la main droite, la nuit ?",
          "Tu hésites. Ce n'est pas la question que tu attendais.",
          "— Et quand *elle* écrit, elle utilise le même geste que vous ?",
          "Tu ne lui as pas parlé d'une autre personne. Tu en es à peu près sûre."
        ],
        choices: [
          { label: "Relever : « Je n'ai pas dit *elle*. »", to: "medecin_suite", flag: "a_releve_elle", add: { discretion: 1 } },
          { label: "Laisser passer. Hocher la tête. Remercier.", to: "medecin_suite", add: { discretion: -1 } }
        ]
      },

      medecin_suite: {
        chapter: "Acte I — La greffe",
        title: "Ordonnance",
        pov: "sophia",
        text: [
          { if: "f.a_releve_elle", t: "Il sourit, et le sourire arrive une demi-seconde trop tard. — Pardon. Déformation professionnelle. On parle toujours d'*elle* dans les cas de ce genre : la part de soi qu'on ne reconnaît pas." },
          { if: "!f.a_releve_elle", t: "Il note quelque chose, très vite, avec un stylo à l'encre noire. Tu ne regardes pas ce qu'il écrit." },
          "Il te prescrit du repos, quelques comprimés qui ne font pas dormir, et de ne plus rester seule la nuit.",
          "En sortant, tu regardes les fenêtres de la place. Aucune ne bouge. Pourtant tu as cette sensation, celle d'un regard qui s'attarde.",
          { if: "f.carnet || f.plancher", t: "Tu passes la journée à relire ce qui est écrit sous ton plancher. À la tombée du soir, tu prends ton stylo. Il est bleu. Tu t'aperçois que tu l'attends, cette autre écriture." },
          { if: "!(f.carnet || f.plancher)", t: "Tu passes la journée à surveiller le moindre signe. À la tombée du soir, tu poses un carnet vide sur la table, en évidence, avec un stylo à côté. Tu ne sais pas pourquoi tu fais cela." }
        ],
        choices: [
          { label: "Écrire la première ligne de la réponse.", to: "reponse" }
        ]
      },

      /* ---------------------------------------------------- LA RÉPONSE */
      reponse: {
        chapter: "Acte I — La greffe",
        title: "Réponse",
        pov: "sophia",
        text: [
          "Tu ouvres le carnet à la première page vierge. Ton stylo est bleu. Tout le reste est noir. Tu lis la dernière ligne de l'autre, celle que tu n'as pas écrite.",
          { if: "f.preuve", t: "Ce matin, la jauge du barrage affichait 412,6. À 7 h 12 exactement. Tu l'avais noté avant, sur un coin de papier, par défi. Tu ne sais plus comment respirer." },
          { if: "f.carnet && !f.preuve", t: "Tu n'as pas encore décidé si tu crois à cette histoire. Mais tu ne peux pas ne pas écrire." },
          "Il y a quelqu'un qui te parle. Quelqu'un qui habite ton corps pendant que tu n'y es plus. Et tu n'as pas peur autant que tu le devrais.",
          "*Que lui écris-tu ?*"
        ],
        choices: [
          { label: "« Qui es-tu ? »", to: "fin_acte1", flag: "q_qui", add: { confiance: 1 },
            carnet: { who: "sophia", text: "Qui es-tu ?" } },
          { label: "« Prouve-le encore. »", to: "fin_acte1", flag: "q_preuve",
            carnet: { who: "sophia", text: "Prouve-le encore. Dis-moi quelque chose que je ne peux pas savoir." } },
          { label: "« Que se passe-t-il au lac, la nuit ? »", to: "fin_acte1", flag: "q_lac", add: { discretion: -1 },
            carnet: { who: "sophia", text: "Que se passe-t-il au lac, la nuit ? Je me réveille avec les pieds pleins de boue." } }
        ]
      },

      fin_acte1: {
        chapter: "Acte I — La greffe",
        title: "La nuit suivante",
        pov: "elise",
        text: [
          "Tu te réveilles dans le corps de Sophia, assise devant la table, le stylo à la main, comme si tu n'avais jamais cessé d'écrire.",
          "Le carnet est ouvert à la bonne page. Quelqu'un a répondu. À l'encre bleue.",
          { if: "f.q_qui", t: "*Qui es-tu ?* Trois mots. C'est la première fois depuis cent ans que quelqu'un te demande qui tu es." },
          { if: "f.q_preuve", t: "*Prouve-le encore.* Tu souris, avec la bouche de Sophia. Elle te ressemble plus que tu ne l'aurais cru." },
          { if: "f.q_lac", t: "*Que se passe-t-il au lac, la nuit ?* C'est la bonne question. Tu ne sais pas encore y répondre." },
          "Le lac est noir, dehors. Le barrage ronronne. Quelque part, dans une cabine accrochée à la paroi, une fenêtre est allumée.",
          { if: "f.salue_anselme", t: "Tu lui as rendu son salut, la première nuit. Tu y penses, maintenant. Pourquoi t'attendait-il ?" },
          "Une seule chose est certaine : tu n'es plus seule dans ce corps. Et ce que tu écriras maintenant, Sophia le lira demain, sans s'en souvenir."
        ],
        choices: [
          { label: "Continuer : Acte II", to: "a2_mur" }
        ]
      },

      /* ==================================================== ACTE II */
      a2_mur: {
        chapter: "Acte II — Les deux femmes",
        title: "Le mur",
        pov: "elise",
        text: [
          "Octobre. Le carnet vit sur la table de la cuisine, un stylo bleu et un stylo noir posés en croix, comme deux couverts.",
          "Cette nuit-là, assise sur le lit de Sophia, tu entends le mur. Le mur mitoyen, celui de la maison des voisins. Un coup sourd, très doux, à hauteur de l'oreiller. Puis un autre. Une seconde entre chaque, pas plus.",
          "Tu te mets à compter sans le vouloir. Vingt. Quarante. Cinquante-sept. Cinquante-huit. Cinquante-neuf.",
          "Plus rien. Le soixantième ne vient pas."
        ],
        choices: [
          { label: "Compter avec les coups, chaque nuit, et ne rien dire.", to: "a2_etoiles", flag: "compte_mur" },
          { label: "Frapper une fois en retour.", to: "a2_etoiles", flag: "frappe_tot", add: { discretion: -1 } },
          { label: "Se dire que c'est un tuyau. Dormir.", to: "a2_etoiles" }
        ]
      },

      a2_etoiles: {
        chapter: "Acte II — Les deux femmes",
        title: "L'homme aux étoiles",
        pov: "elise",
        text: [
          { if: "f.frappe_tot", t: "Depuis que tu as frappé, le mur se tait. Trois nuits de silence. Tu as l'impression d'avoir fait peur à quelqu'un." },
          "Tu montes sur le barrage. Le ciel est si chargé d'étoiles qu'il en paraît sale. Au milieu du parapet, un homme est assis, la tête renversée vers le ciel, comme quelqu'un qui n'en a jamais vu.",
          "Il tourne la tête vers toi. Il ne paraît pas surpris.",
          "— On n'en voit pas, chez moi, dit-il. Il a buté sur *chez moi*, comme sur un mot appris.",
          "Quand il passe sous la lampe de la cabine, tu vois une cicatrice blanche au-dessus de son sourcil gauche. Celle du docteur de Sophia."
        ],
        choices: [
          { label: "« Chez moi non plus. »", to: "a2_sacha", flag: "sacha" },
          { label: "Partir sans un mot.", to: "a2_jour", flag: "mefiance", add: { discretion: 1 } }
        ]
      },

      a2_sacha: {
        chapter: "Acte II — Les deux femmes",
        title: "Sacha",
        pov: "elise",
        text: [
          "Il dit s'appeler Sacha. Ce n'est pas son vrai nom, il le dit lui-même. Il vient de 2137, d'un autre refuge, au nord. Le Conseil l'aurait envoyé derrière toi, pour t'aider.",
          "Vous revenez presque toutes les nuits. Vous vous rendez les mots perdus : il t'offre *aubépine*, tu lui rends *nostalgie*.",
          "Un soir, il dit qu'il a aimé une femme qui a oublié son visage. Qu'il est resté quand même. *Où voulais-tu que j'aille ?*",
          "— On ne touche pas à ces corps, dit-il. Ils ne sont pas à nous.",
          "Tu gardes un mètre entre vos mains. Ce mètre pèse plus lourd que tout le reste."
        ],
        choices: [
          { label: "Lui parler d'Iris.", to: "a2_jour", flag: "parle_iris" },
          { label: "Ne rien lui dire de toi.", to: "a2_jour", add: { discretion: 1 } }
        ]
      },

      a2_jour: {
        chapter: "Acte II — Les deux femmes",
        title: "Pour le dossier",
        pov: "sophia",
        text: [
          { if: "f.sacha", t: "Dans le carnet, à l'encre noire : *Il y a un homme, la nuit, sur le barrage. Il habite le corps de ton docteur.* Tu relis la phrase trois fois." },
          { if: "!f.sacha", t: "Dans le carnet, à l'encre noire : *Quelqu'un regarde les étoiles sur le barrage, la nuit. Je ne suis pas allée lui parler.*" },
          "Au café de la place, Étienne te montre ses paumes écorchées, sa voiture déplacée, les notes noires dans ses tiroirs. Il rit, d'un rire fatigué. Pour la première fois depuis des semaines, tu ris aussi.",
          "Il pose sa main sur la tienne, le temps de deux battements de cœur."
        ],
        choices: [
          { label: "Lui parler du carnet. De tout.", to: "a2_labo", flag: "etienne_sait", add: { confiance: 1 } },
          { label: "Garder le secret. Pour l'instant.", to: "a2_labo" }
        ]
      },

      a2_labo: {
        chapter: "Acte II — Les deux femmes",
        title: "La salle du fond",
        pov: "sophia",
        text: [
          "Code 1-4-1-1. La porte s'ouvre avec un soupir de caoutchouc. Douze bacs sous une lumière violette. Dans la vase, des aiguilles rouges, en éventail, comme des doigts. La couleur d'un clou laissé sous la pluie.",
          "Trois lits de camp, des électrodes. Au tableau : *Croissance ×3,4 à proximité des dormeurs.*",
          "Sur le terminal des badges : *ROCH A.*, ton père, presque toutes les nuits. Et une autre ligne, que tu ne comprends pas : *KERR B. — 03:40.* Kerr jure qu'il rentre à Grenoble tous les soirs."
        ],
        choices: [
          { label: "Tout photographier, et se taire.", to: "a2_galerie", flag: "photos", add: { confiance: 1 } },
          { label: "Confronter Kerr dès le lendemain.", to: "a2_galerie", flag: "kerr_alerte", add: { discretion: -2 } }
        ]
      },

      a2_galerie: {
        chapter: "Acte II — Les deux femmes",
        title: "La galerie",
        pov: "elise",
        text: [
          { if: "f.kerr_alerte", t: "Kerr a fait changer les codes. Tu passes quand même : quelqu'un a laissé la porte de service entrouverte, calée avec un bout de carton." },
          "Sur la première marche de l'escalier de fer, une lampe torche est posée, allumée, tournée vers le bas. Comme une lumière laissée dans l'entrée pour quelqu'un qui rentre tard. Personne ne l'a posée là. Personne que tu connaisses.",
          { if: "f.sacha", t: "Sacha est derrière toi. Vous comptez les marches ensemble : cent douze." },
          "Au bout de la galerie, le mur est percé. Derrière, la vase grise, et dedans, des veines rouges, un réseau, un poumon. Au centre, un nœud gros comme une tête d'enfant.",
          "Tu sens une pente. Une immense fatigue bienveillante. On te vide, doucement, comme une baignoire. Le nom d'une éducatrice. L'odeur du réfectoire. Puis le menton d'Iris, qui commence à partir."
        ],
        choices: [
          { label: "Reculer. Compter. Penser à ses mains.", to: "a2_anselme", add: { memoire: -1 } },
          { label: "Poser la main sur le nœud.", to: "a2_vision", flag: "vision", add: { memoire: -2 } }
        ]
      },

      a2_vision: {
        chapter: "Acte II — Les deux femmes",
        title: "Ce qu'il montre",
        pov: "elise",
        text: [
          "C'est tiède. Ça ronronne. Et tu vois.",
          "Une femme dans la galerie, une masse d'atelier au-dessus de la tête. Elle compte. À soixante, elle frappe. Le nœud éclate comme du sucre, une poussière rouge, l'eau du lac qui s'engouffre.",
          "Tu ne vois pas son visage. Tu vois seulement qu'elle porte le manteau de Sophia.",
          { if: "f.sacha", t: "Quelqu'un t'arrache à la paroi. Sacha, ses mains sur tes épaules. *Pense à Iris. Pense à ses mains pleines de craie.* Tu ne lui as jamais parlé de la craie." },
          { if: "!f.sacha", t: "Tu t'arraches toi-même à la paroi, en hurlant des chiffres. Tu saignes du nez." }
        ],
        choices: [
          { label: "Remonter.", to: "a2_anselme" }
        ]
      },

      a2_anselme: {
        chapter: "Acte II — Les deux femmes",
        title: "Le gardien",
        pov: "elise",
        text: [
          "Une lampe tempête au fond de la galerie. Un vieil homme, grand, voûté, cheveux blancs ras. Le père de Sophia.",
          "Il ne regarde pas Sophia. Il te regarde, toi, au fond.",
          "— Élise, dit-il. Tu es en avance, cette fois.",
          { if: "f.vision", t: "Il voit le sang sous ton nez. Son visage se défait. — Tu l'as touché. Si tôt. Aucune de nous ne l'avait touché si tôt." },
          { if: "f.sacha", t: "Il se tourne vers Sacha. — Et toi. Toujours toi." }
        ],
        choices: [
          { label: "Le suivre jusqu'à sa cabine.", to: "a2_cabine", flag: "cabine" },
          { label: "Fuir.", to: "a2_pradel" }
        ]
      },

      a2_cabine: {
        chapter: "Acte II — Les deux femmes",
        title: "Les murs de la cabine",
        pov: "elise",
        text: [
          "Les murs sont couverts de dessins. Des centaines. Une maison au toit en triangle, un soleil aux rayons trop longs, une silhouette aux cheveux courts. Le dessin d'Iris. *C'est toi, maman.*",
          "Les plus anciens, au fond, jaunis, sont différents : la silhouette a de longs cheveux, et un petit point au coin de l'œil gauche. Tu n'y prêtes pas attention.",
          "Le vieil homme compte à voix basse en faisant chauffer de l'eau pour personne.",
          "— Méfie-toi de celui qui regarde les étoiles, dit-il. Il t'aime. C'est pour ça qu'il arrive toujours trop tard."
        ],
        choices: [
          { label: "Rentrer avant l'aube.", to: "a2_pradel" }
        ]
      },

      a2_pradel: {
        chapter: "Acte II — Les deux femmes",
        title: "Dans la vase",
        pov: "sophia",
        text: [
          "Le 25 octobre, on retrouve Martine Pradel au pied du barrage, à genoux dans la vase, l'eau jusqu'aux coudes. Elle dormait au laboratoire, pour cent euros la nuit.",
          "Ses pantoufles sont rangées côte à côte sur un rocher sec. Elle a les yeux ouverts. Elle sourit.",
          "Étienne retourne sa main. Les ongles sont cassés jusqu'à la chair. Dessous, une poudre rouge, fine, couleur de clou mouillé. Elle a creusé.",
          "Le soir, devant le carnet, tu ne sais pas quoi écrire."
        ],
        choices: [
          { label: "Coller l'avis de décès dans le carnet. Qu'elle sache.", to: "a2_caillou", add: { confiance: 1 } },
          { label: "Ne rien écrire. Te protéger d'elle, un peu.", to: "a2_caillou", add: { confiance: -1 } }
        ]
      },

      a2_caillou: {
        chapter: "Acte II — Les deux femmes",
        title: "Une politesse",
        pov: "elise",
        text: [
          "Un caillou contre la vitre. Puis un deuxième. Dans la rue, personne. Tout au bout, une silhouette en blouse blanche qui s'éloigne vers le laboratoire sans se retourner.",
          "Sur l'appui de la fenêtre, un badge. La photo souriante de Bastien Kerr. Au dos, d'une écriture fine, presque typographique, que tu n'as jamais vue : *Pour le jour où le sien ne suffira plus.*",
          { if: "f.compte_mur", t: "Cette nuit encore, le mur compte avec toi jusqu'à cinquante-neuf." }
        ],
        choices: [
          { label: "Garder le badge.", to: "a2_veilleur", flag: "badge_kerr" },
          { label: "Le jeter dans le lac. Un piège, sûrement.", to: "a2_veilleur", add: { discretion: 1 } }
        ]
      },

      a2_veilleur: {
        chapter: "Acte II — Les deux femmes",
        title: "La boucle doit tourner",
        pov: "elise",
        text: [
          "Dans le carnet, Sophia a recopié une note trouvée dans le tiroir d'Étienne, à l'encre noire : *C'est S. Certitude. Le 14, l'empêcher. Coûte que coûte. La boucle doit tourner.*",
          { if: "f.sacha", t: "Sur le barrage, Sacha avoue avant même que tu parles. On l'a envoyé pour veiller à ce que l'histoire reste l'histoire. *Le Veilleur.* Il devait t'empêcher. Il ne l'a pas fait. — Tu sais pourquoi, dit-il." },
          { if: "!f.sacha", t: "Celui qui habite le docteur te cherche. Il t'a trouvée. Tu ne lui as jamais parlé, et il sait tout de toi." }
        ],
        choices: [
          { label: "Lui tendre la main, au-dessus du mètre.", to: "a3_cycle", if: "f.sacha", flag: "main" },
          { label: "Le quitter, et descendre seule au cristal.", to: "a3_cycle", flag: "rupture", add: { discretion: 1 } }
        ]
      },

      /* ==================================================== ACTE III */
      a3_cycle: {
        chapter: "Acte III — Le cycle",
        title: "Le cycle",
        pov: "elise",
        text: [
          { if: "f.main", t: "Une nuit de novembre, tu te réveilles dans un lit inconnu, contre un corps qui respire. Sophia a dormi chez Étienne. À côté de toi, Sacha se réveille en comptant. Vous vous levez sans vous toucher. Dans la poche du pull, un mot de Sophia : *C'est moi qui l'ai voulu. Je suis heureuse. Rentre doucement.*" },
          { if: "f.badge_kerr", t: "Dans ta poche, le badge de Kerr, avec son écriture typographique au dos. Tu n'en as pas besoin cette nuit. Quelqu'un l'avait prévu pour une autre." },
          "Anselme t'attend devant le laboratoire. Il ouvre avec son badge. Il compte les marches comme toi, avec une petite pause entre trente et trente et un.",
          "— Pose ta main, dit-il. Ne pense pas à l'enfant. Laisse-la te montrer.",
          { if: "f.vision", t: "Tu l'as déjà entrevue, cette femme à la masse. Cette fois, tu vois son visage." },
          "C'est toi. Dans le manteau de Sophia, la masse au-dessus de la tête, le 14 novembre, à 3 h 12. Tu frappes. La poussière. L'eau. Et la chute, en arrière, jusqu'à un jeune homme en bottes debout au milieu d'un lac sans eau, en octobre 1980.",
          "Et encore. Et encore. Chaque fois, la poussière arrive un peu plus tôt dans le monde.",
          "*L'incident, c'est toi.*"
        ],
        choices: [
          { label: "Remonter avec lui jusqu'à la cabine.", to: "a3_anselme", add: { memoire: -1 } }
        ]
      },

      a3_anselme: {
        chapter: "Acte III — Le cycle",
        title: "Le premier Passeur",
        pov: "elise",
        text: [
          "— Nous sommes toi, dit le vieil homme. Celles qui ont brisé. Nous tombons en 1980, dans lui. Nous vivons ses nuits. Nous nous recouvrons, comme des couches de vase.",
          "— Aucune n'a jamais fait autrement ?",
          "— Nous ne savons pas. Celles qui font autrement ne tombent pas jusqu'ici. Nous ne connaissons que celles qui brisent.",
          "Il baisse les yeux. — Il y a trois ans, nous avons envoyé un bocal de vase à un homme qui voulait oublier son fils. *Ce qui efface.* Nous voulions qu'on invente l'oubli. Pour nous.",
          "Le laboratoire existe à cause de toi. De vous. De nous.",
          "— Demande à l'homme aux étoiles qui dort dans le lit vide."
        ],
        choices: [
          { label: "Aller trouver celui qui habite le docteur.", to: "a3_noe" }
        ]
      },

      a3_noe: {
        chapter: "Acte III — Le cycle",
        title: "Le lit vide",
        pov: "elise",
        text: [
          "Sous le toit du vieux lavoir, la source coule. Il est là.",
          "— Qui dort dans le lit vide ? demandes-tu.",
          "— Je m'appelle Noé, dit-il. Je suis le père d'Iris.",
          { if: "f.main", t: "Tu as tenu sa main toute une nuit sans savoir que tu l'avais déjà tenue pendant huit ans." },
          { if: "!f.sacha", t: "Tu ne l'as jamais rencontré ici. Il t'a regardée de loin pendant deux mois, sans oser venir." },
          { if: "f.parle_iris", t: "Tu lui avais décrit le visage d'Iris, sur le barrage. Jamais ses mains. Il connaissait la craie depuis le début." },
          "Tu ne te souviens pas de lui. La Rouille prend d'abord les visages qu'on a le plus regardés.",
          "— Ne brise rien, dit-il. Rentre avec moi. Iris ne nous reconnaîtra pas, mais elle existera.",
          "Tu lui racontes Anselme. Les couches. Les quarante-six ans de nuits. Il ne savait pas."
        ],
        choices: [
          { label: "Rentrer chez Sophia et attendre la nuit.", to: "a3_mur" }
        ]
      },

      a3_mur: {
        chapter: "Acte III — Le cycle",
        title: "Cinquante-neuf",
        pov: "elise",
        text: [
          "La veille de la dernière nuit, tu ne sors pas. Tu t'allonges dans le noir. Tu attends.",
          { if: "f.compte_mur", t: "Trois heures. Les coups. Un. Deux. Tu comptes avec eux, comme chaque nuit depuis six semaines. Cinquante-sept. Cinquante-huit. Cinquante-neuf. Silence." },
          { if: "!f.compte_mur", t: "Trois heures. Le mur se tait. Il s'est tu depuis longtemps. Tu n'as jamais su qui frappait, et maintenant tu ne le sauras plus." }
        ],
        choices: [
          { label: "Frapper le soixantième coup.", to: "a3_iris", if: "f.compte_mur" },
          { label: "Se tourner vers la fenêtre. Penser aux portes.", to: "a3_portes", if: "!f.compte_mur" }
        ]
      },

      a3_iris: {
        chapter: "Acte III — Le cycle",
        title: "Soixante",
        pov: "elise",
        text: [
          "De l'autre côté, une respiration courte d'enfant. Puis une voix de petit garçon, étouffée par la pierre. Mais ce n'est pas un petit garçon qui parle.",
          "— Quand j'étais petite, tu tapais sur le bois du lit jusqu'à soixante. Je m'endormais toujours avant la fin. Je n'ai jamais entendu le soixantième.",
          "— Iris.",
          "Elle est dans Mathis. Mathis épousera Anne : c'est le seul corps où elle pouvait être à côté de toi. Six semaines, ta fille était à quarante centimètres, et tu croyais que c'était un tuyau.",
          "— Je sais ce que tu vas faire, dit-elle. Je suis venue te dire que tu peux.",
          "— J'ai perdu quelque chose de ton visage.",
          "— Le grain de beauté. Au coin de la paupière gauche. Il faut regarder de très près.",
          "Le visage revient d'un coup, entier, comme une lampe qu'on allume."
        ],
        choices: [
          { label: "Rester jusqu'à l'aube, le front contre le mur.", to: "a3_portes", flag: "iris", add: { memoire: 2, confiance: 1 } }
        ]
      },

      a3_portes: {
        chapter: "Acte III — Le cycle",
        title: "Trois portes",
        pov: "elise",
        text: [
          "*Briser.* La poussière, la Rouille, un peu plus tôt. La chute en 1980. Quarante-six ans à dessiner une maison avec un soleil.",
          "*Rentrer.* Le cristal entier, extrait par Kerr, cultivé à Genève. Une bibliothèque où ta fille ne te reconnaît pas.",
          "*Rester.* Le noyer intact sous le béton. Te dissoudre dans Sophia. Pas de chute, pas de retour. Peut-être pas d'Iris.",
          { if: "f.refus", t: "Sophia t'a dit non. Il ne reste que deux portes." },
          { if: "v.memoire < 2", t: "Le fil qui te relie à 2137 est trop mince. Tu ne trouverais plus le chemin du retour." }
        ],
        choices: [
          { label: "Briser le cristal.", to: "fin_briser" },
          { label: "Ne rien faire, et rentrer avec Noé.", to: "fin_rentrer", if: "v.memoire >= 2" },
          { label: "Rester. Le demander à Sophia.", to: "a3_oui", if: "!f.refus && v.confiance >= 3" },
          { label: "Rester. Le demander à Sophia.", to: "a3_non", if: "!f.refus && v.confiance < 3" }
        ]
      },

      a3_non: {
        chapter: "Acte III — Le cycle",
        title: "Non",
        pov: "sophia",
        text: [
          "Tu lis la question d'Élise trois fois. *Est-ce que tu veux bien de moi ?*",
          "Tu penses à Martine Pradel dans la vase. Au bleu sur ta hanche. Aux nuits volées. Tu ne la connais pas assez. Tu ne lui as jamais assez fait confiance pour lui donner ta tête.",
          "Tu écris, à l'encre bleue : *Non. Pardon.*"
        ],
        choices: [
          { label: "Refermer le carnet.", to: "a3_portes", flag: "refus" }
        ]
      },

      a3_oui: {
        chapter: "Acte III — Le cycle",
        title: "Oui",
        pov: "sophia",
        text: [
          "*Est-ce que tu veux bien de moi ?*",
          "*Tu m'as appris le nom des étoiles que je ne regardais pas. Tu m'as rendu mon père. Tu n'es pas entrée par effraction : j'avais laissé la porte ouverte depuis longtemps.*",
          "*Oui.*",
          { if: "f.etienne_sait", t: "Étienne sait tout depuis octobre. Il n'a pas hésité longtemps." },
          "Dans le tiroir d'Étienne, à l'encre bleue, sous une note de Noé : *Je suis d'accord. S'il le veut, il peut rester.*"
        ],
        choices: [
          { label: "La dernière nuit.", to: "a3_derniere", carnet: { who: "sophia", text: "Oui." } }
        ]
      },

      a3_derniere: {
        chapter: "Acte III — Le cycle",
        title: "La dernière nuit",
        pov: "elise",
        text: [
          "Il reste trente-deux pages blanches. Tu écris jusqu'à quatre heures. Le cristal, le coulis, Ménard, les bacs. Anne, le 3 août, à Lyon. Ton père, ses nuits, *merci d'avoir attendu*. Iris, et le grain de beauté, si tu l'as retrouvé.",
          "Il reste une chose à écrire à Sophia. Tu la connais. Tu sais ce qu'elle garde sur son étagère, entre deux lacs."
        ],
        choices: [
          { label: "« Ne garde rien. Pas un grain. Promets-le-moi. »", to: "a3_matin", flag: "promesse",
            carnet: { who: "elise", text: "Ne garde rien. Pas un grain, Sophia. Promets-le-moi." } },
          { label: "Ne pas l'écrire. Lui faire confiance.", to: "a3_matin",
            carnet: { who: "elise", text: "Je te laisse la dernière page." } }
        ]
      },

      a3_matin: {
        chapter: "Acte III — Le cycle",
        title: "Le matin",
        pov: "sophia",
        text: [
          "Tu te réveilles sur le barrage, sous une couverture givrée, la main dans celle d'Étienne. Six heures. En bas, les pompes démarrent.",
          "Kerr arrive à 8 h 50, trop tard : son badge avait disparu pendant la nuit, on l'a retrouvé dans le congélateur.",
          "À 9 h 40, le coulis atteint le niveau du nœud. Quelque chose s'endort en toi pour la dernière fois. Une vague : une bibliothèque sans fenêtres, une recette de soupe, une chanson dont tu connais enfin les paroles.",
          "L'après-midi, tu vides les bacs dans la benne de béton. Onze. Le douzième ne contient qu'une aiguille rouge, pas plus longue qu'un ongle.",
          { if: "f.promesse", t: "*Pas un grain, Sophia. Promets-le-moi.*" },
          "Tu es hydrologue. Tu as quarante-trois fioles sur ton étagère, une par lac. On ne détruit pas la seule preuve d'une chose que personne ne croira jamais."
        ],
        choices: [
          { label: "Garder l'aiguille dans une fiole. Un témoin.", to: "fin_noeud" },
          { label: "La verser dans le béton. Tenir la promesse.", to: "fin_page_blanche", if: "f.promesse && v.confiance >= 4" }
        ]
      },

      /* ==================================================== FINS */
      fin_briser: {
        chapter: "Fin",
        title: "Cassant comme du sucre",
        pov: "elise",
        text: [
          "Tu prends la masse dans l'appentis du barrage. Tu descends les cent douze marches. Tu comptes.",
          "À soixante, tu frappes.",
          "Le nœud éclate comme du sucre. La poussière rouge remplit la galerie. L'eau du lac s'engouffre par la brèche et l'emporte vers la rivière, vers la vallée, vers le monde.",
          "En haut des marches, une voix d'homme crie ton nom. Trop tard. Toujours trop tard.",
          "Tu tombes. Longtemps. Et tu ouvres les yeux dans un corps d'homme, en bottes, au milieu d'un lac sans eau. Octobre 1980.",
          "Tu as quarante-six ans de nuits devant toi pour oublier ton nom. Il te restera un dessin.",
          { if: "f.iris", t: "Derrière un mur, à Vallorce, quelqu'un compte encore jusqu'à cinquante-neuf. Personne ne frappera plus le soixantième." },
          "*Tu es déjà venue. Tu reviens toujours.*"
        ],
        end: true,
        choices: []
      },

      fin_rentrer: {
        chapter: "Fin",
        title: "Le retour",
        pov: "elise",
        text: [
          "Le 14 au matin, tu ne descends pas. Tu t'endors sur le barrage, la main dans celle de Noé, en pensant très fort à une salle des Cartes.",
          "Tu te réveilles sur un lit de camp, au troisième sous-sol. L'éclat est froid sur ton front. Ruben pleure.",
          "Les archives n'ont pas changé. Le 14 novembre 2026, à 8 h 50, pendant l'extraction, un bloc s'est brisé dans les mains d'un technicien. La poussière est partie dans l'eau.",
          "Au dortoir, Iris dessine une maison avec un soleil. Elle lève les yeux vers toi, poliment.",
          "— C'est qui ?",
          "À côté de toi, un homme pleure sans bruit. Tu sais maintenant qui il est. Elle, non."
        ],
        end: true,
        choices: []
      },

      fin_noeud: {
        chapter: "Fin",
        title: "Le nœud",
        pov: "neutre",
        text: [
          "Tu ranges la fiole entre le lac d'Annecy et le lac du Bourget, là où personne ne la remarquera jamais. *Vallorce, 14/11/2026.*",
          "2137 — Une bibliothèque lumineuse au bord du lac. Une archiviste de trente-quatre ans, un grain de beauté au coin de l'œil. Elle s'appelle Iris. Sa fille, sept ans, s'appelle Élise. Elle dessine une maison avec un soleil. *C'est qui ? — C'est toi.*",
          "2141 — La petite Élise compte la nuit, marche dans le lac, dit d'une voix de femme : *Il faut le briser avant le 14.* Pour la sauver, Iris ouvre la fiole près de son lit. L'enfant guérit. Puis elle oublie. Puis, un matin : *C'est qui ?*",
          "2164 — Élise a trente-quatre ans et les cheveux longs. Le Conseil a décidé que *le noyer ne suffit pas*. Elle part. Elle se réveille au bord d'un lac, dans le corps d'une hydrologue. Elle écrit une page, l'arrache, la cache sous une vieille photo.",
          "*Le cristal est cassant comme du sucre. Il faut le briser avant le 14. Le noyer ne suffit pas.*",
          { if: "f.iris", t: "Dans les archives de Genève, une ligne d'un cahier noir : *Première fois en 47 tours que la mère et la fille se parlent. Je ne sais pas ce que cela change.*" },
          "Elle s'appelait Élise. Elle n'était jamais venue. Elle reviendrait toujours."
        ],
        end: true,
        choices: []
      },

      fin_page_blanche: {
        chapter: "Fin cachée",
        title: "La page blanche",
        pov: "neutre",
        text: [
          "Tu verses l'aiguille dans le béton. Elle disparaît sans un bruit. Tu restes longtemps devant la benne, les mains vides.",
          "Dans le carnet, tu laisses la dernière page blanche. Tu n'écris rien sur la première non plus. Pas de consigne, pas de secret. Juste deux encres.",
          "2137 — Une bibliothèque au bord d'un lac. Une petite fille lit une recette à voix haute, et tout le monde rit, et elle rit aussi. Elle dort bien. Elle ne compte jamais.",
          "*Archives de Genève, fonds Léthé, cahier noir, dernière page :*",
          "*Tour 48. Variante sans témoin. Aucune fiole. Aucune chute. La ligne B ne rouvre pas.*",
          "*Pour la première fois depuis le tour 1, je ne sais pas ce qui vient.*",
          { if: "f.iris", t: "*Variable I. : elle a rendu à É. ce que le cristal avait pris. C'est peut-être cela, la différence.*" },
          "*Il faut que je trouve qui a commencé. — K.*"
        ],
        end: true,
        choices: []
      },

      /* ---------------------------------------------------- FIN : OUBLI */
      fin_oubli: {
        chapter: "Fin",
        title: "Rouille",
        pov: "elise",
        text: [
          "Tu ouvres les yeux. Il y a une femme qui te regarde, très près, depuis très longtemps.",
          "Tu connais ce visage. Tu cherches son nom. Tu cherches le tien.",
          "Tu cherches le mot pour dire *carnet*. Tu cherches le mot pour dire *chercher*.",
          "Il reste, tout au fond, une toute petite chose qui ressemble à une maison avec un soleil. Tu ne sais plus à qui elle appartient.",
          "*La Rouille a gagné cette nuit-là. Elle gagnera aussi toutes les suivantes.*"
        ],
        end: true,
        choices: []
      }
    }
  };

  if (typeof module !== "undefined" && module.exports) module.exports = STORY;
  else root.STORY = STORY;
})(typeof window !== "undefined" ? window : globalThis);
