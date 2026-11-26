/* ============================================================
   LA ROUILLE — histoire interactive
   Acte I jouable. Voir README.md pour le format des scènes.

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
          { label: "Continuer : Acte II (à venir)", to: "fin_provisoire" }
        ]
      },

      fin_provisoire: {
        chapter: "Fin de l'Acte I",
        title: "À suivre",
        pov: "neutre",
        text: [
          "L'Acte I s'arrête ici. Les deux femmes ont commencé à s'écrire.",
          "Dans l'Acte II : le laboratoire, la galerie interdite, le cristal, un gardien qui connaît ton nom, et un message qui n'est ni de Sophia ni de toi.",
          "*Ce que tu as écrit dans le carnet est conservé. Reviens quand le livre sera plus long.*"
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
