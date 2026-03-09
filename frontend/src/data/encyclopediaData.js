// EHIA - Encyclopédie Historique Illustrée de l'Algérie
// Données complètes intégrées

export const PERSONNAGES = [
  {
    id: "massinissa",
    nom: "Massinissa",
    variantes: ["Masinissa", "Masensen (berbère)"],
    dates: "vers 238 — 148 av. J.-C.",
    periode: "Royaumes numides",
    statut: "Roi",
    lieu: "Cirta (Constantine)",
    niveauCertitude: "bien_documente",
    biographie: `Massinissa est le premier grand roi unifié de Numidie. Fils d'un chef des Massyles, il réussit l'exploit de rassembler sous son autorité les deux grandes confédérations numides — Massyles et Masaesyles — après des années de luttes complexes où il alternait alliances avec Carthage et avec Rome selon les nécessités diplomatiques. Après la bataille de Zama (202 av. J.-C.), où il combattit aux côtés de Scipion l'Africain contre Hannibal, il reçut de Rome la reconnaissance de son royaume étendu. Son règne de près de cinquante ans fut remarquable par une politique agricole volontariste : il transforma des populations nomades et semi-nomades en agriculteurs sédentaires, fit construire des villes, favorisa les échanges méditerranéens et bâtit un État structuré avec Cirta pour capitale. Il mourut à un âge avancé, probablement nonagénaire, laissant un royaume solide qui ne lui survivrait pas longtemps.`,
    contexteMondial: "Contemporain de Scipion l'Africain, de Caton l'Ancien, de la déconstruction du monde hellénistique",
    iconographie: "Aucun portrait certain. Monnaies à son effigie connues (Musée National des Antiquités, Alger). Attribution à vérifier.",
    sourcePrimaire: "Tite-Live, Polybe, Appien",
    sourceSecondaire: "Gsell (1918), Brett & Fentress (1996)",
    sitesLies: ["medracen", "cirta"],
    periodesLiees: ["royaumes_numides", "afrique_romaine"],
    couleurPeriode: "#B8860B"
  },
  {
    id: "jugurtha",
    nom: "Jugurtha",
    variantes: ["Jugurthen", "Yugrten (berbère probable)"],
    dates: "vers 160 — 104 av. J.-C.",
    periode: "Royaumes numides",
    statut: "Roi",
    lieu: "Cirta (Constantine), Rome (captivité)",
    niveauCertitude: "bien_documente",
    biographie: `Jugurtha est l'une des figures les plus dramatiques de l'histoire numide et de la République romaine tardive. Petit-fils de Massinissa par un fils illégitime, il fut élevé à la cour numide et envoyé comme officier auxiliaire en Espagne aux côtés de Scipion Émilien, où il se distingua et noua des relations avec l'aristocratie romaine. À la mort de son oncle Micipsa, il fit assassiner successivement ses co-héritiers Adherbal et Hiempsal pour s'emparer du royaume entier. La guerre qui suivit (111-104 av. J.-C.), brillamment racontée par Salluste dans son Bellum Jugurthinum, révéla la corruption profonde de la noblesse romaine que Jugurtha avait systématiquement achetée. Capturé finalement par trahison grâce à son beau-père Bocchus de Maurétanie, il fut exhibé dans le triomphe de Marius à Rome en 104 et mourut en prison.`,
    contexteMondial: "Contemporain de la réforme de l'armée romaine par Marius, des Gracques, de la crise de la République",
    iconographie: "Aucun portrait certain. Monnaies débattues. Représentation dans l'arc de triomphe de Salluste — source à vérifier.",
    sourcePrimaire: "Salluste, Bellum Jugurthinum (source principale, avec ses biais rhétoriques)",
    noteMethodologique: "Salluste écrit plusieurs décennies après les faits avec un agenda politique (critique de la noblesse romaine). Ses informations sur Jugurtha restent précieuses mais doivent être utilisées avec prudence critique.",
    sourceSecondaire: "Gsell (1918), Syme (1964), Brett & Fentress (1996)",
    couleurPeriode: "#B8860B"
  },
  {
    id: "augustin",
    nom: "Augustin d'Hippone",
    variantes: ["Aurelius Augustinus Hipponensis", "Saint Augustin"],
    dates: "354 — 430 ap. J.-C.",
    periode: "Afrique romaine — Antiquité tardive",
    statut: "Évêque, théologien, philosophe",
    lieu: "Thagaste (Souk Ahras), Carthage, Milan, Hippone (Annaba)",
    niveauCertitude: "bien_documente",
    biographie: `Augustin est né à Thagaste (l'actuelle Souk Ahras, en Algérie orientale) dans une famille mixte : père Patricius, probable Romain romanisé, mère Monica, amazighe chrétienne fervente. Son œuvre, considérable (plus de 5 millions de mots), fonda une grande part de la théologie chrétienne occidentale. Ses Confessions constituent l'un des premiers textes autobiographiques de la littérature mondiale. Évêque d'Hippone pendant trente-cinq ans, il mourut lors du siège de la ville par les Vandales. Son identification comme "Algérien" est anachronique — il se vivait comme Africain et Romain — mais son enracinement dans le sol de l'actuelle Algérie est incontestable.`,
    noteMethodologique: "L'appartenance d'Augustin à une identité nationale quelconque est un anachronisme. Cette notice traite son enracinement africain comme un fait géographique et culturel, non comme une revendication nationale.",
    iconographie: "Nombreux portraits médiévaux et modernes, tous conventionnels et postérieurs. Aucun portrait de son vivant. Portraits les plus anciens : mosaïque de Latran (VIe s. ?) — authenticité débattue.",
    sourcePrimaire: "Augustin, Confessions ; De Civitate Dei ; Epistulae",
    sourceSecondaire: "Brown (1967/2000), Mandouze (1968)",
    couleurPeriode: "#8B1A1A"
  },
  {
    id: "kahina",
    nom: "La Kâhina",
    variantes: ["Dihya", "Daya", "Al-Kāhina (l'arabe : la devineresse)"],
    dates: "Fin VIIe siècle ap. J.-C. — date de mort incertaine",
    periode: "Conquête arabe",
    statut: "Cheffe de guerre — figure de résistance",
    lieu: "Aurès (Algérie orientale) — localisation approximative",
    niveauCertitude: "tres_incertain",
    niveauLabel: "PERSONNAGE À SOURCES TRÈS TARDIVES — TRAITER AVEC PRUDENCE MAXIMALE",
    biographie: `La Kâhina est l'une des figures les plus célèbres et les plus incertaines de l'histoire nord-africaine. Cheffe de guerre berbère qui aurait résisté à la conquête arabe dans les Aurès à la fin du VIIe siècle, elle est connue quasi exclusivement par des sources arabes médiévales rédigées plusieurs siècles après les faits : principalement Ibn Abd al-Hakam (IXe s.), Ibn al-Athir (XIIe-XIIIe s.), et Ibn Khaldoun (XIVe s.). Ces sources sont contradictoires sur ses origines (berbère chrétienne ? juive ? polythéiste ?), sur la durée de sa résistance, et même sur son nom véritable (Dihya semble plus proche d'une tradition orale amazighe). Son existence historique est probable mais non certaine au sens documentaire. Sa biographie précise est inaccessible.`,
    noteMethodologique: "PRÉCAUTION ABSOLUE. Toute affirmation biographique précise sur la Kâhina relève de la reconstruction ou de la tradition narrative, non de l'histoire documentée. Cette fiche présente l'état des sources, non une biographie établie.",
    iconographie: "Aucune iconographie contemporaine. Toutes les représentations visuelles existantes sont des créations modernes ou contemporaines sans valeur documentaire historique.",
    sourcePrimaire: "Ibn Abd al-Hakam (IXe s. — tardif), Ibn Khaldoun (XIVe s. — très tardif)",
    sourceSecondaire: "Modéran (2003), Benabbès (2004), Camps (Encyclopédie berbère)",
    couleurPeriode: "#2E1A6B"
  },
  {
    id: "ibn_khaldoun",
    nom: "Ibn Khaldoun",
    variantes: ["Abu Zayd Abd al-Rahman ibn Muhammad ibn Khaldun"],
    dates: "1332 — 1406",
    periode: "Dynasties médiévales — XIVe siècle",
    statut: "Historien, philosophe, sociologue, homme politique",
    lieu: "Tunis (naissance), Tlemcen, Béjaïa, Biskra, Grenade, Fès, Le Caire",
    niveauCertitude: "bien_documente",
    biographie: `Ibn Khaldoun est l'un des plus grands intellectuels de l'histoire mondiale. Son œuvre maîtresse, le Kitāb al-ʿIbar (Livre des Exemples), et sa célèbre Muqaddima (Prolégomènes), constituent une tentative sans précédent de fonder une science de l'histoire humaine sur des bases rationnelles et sociologiques. Sa théorie de l'asabiyya (cohésion sociale des groupes, moteur des cycles dynastiques) préfigure des concepts des sciences sociales modernes. Né à Tunis dans une famille d'origine andalouse, il vécut une grande partie de sa vie active dans ce qui constitue aujourd'hui l'Algérie : à Tlemcen à la cour des Zianides, à Béjaïa, à Biskra. Il rencontra Tamerlan devant les murs de Damas en 1401. Il mourut au Caire.`,
    iconographie: "Aucun portrait contemporain certain. Représentations modernes multiples, toutes conventionnelles.",
    sourcePrimaire: "Ibn Khaldoun, Muqaddima (trad. Rosenthal, Princeton) ; Kitāb al-ʿIbar",
    sourceSecondaire: "Lacoste (1966), Mahdi (1957), Al-Azmeh (1982)",
    sitesLies: ["tlemcen", "bejaia", "biskra"],
    couleurPeriode: "#2D5A27"
  },
  {
    id: "abdelkader",
    nom: "L'Émir Abdelkader",
    variantes: ["Abd al-Qādir ibn Muhyī al-Dīn al-Hasanī al-Jazāʾirī"],
    dates: "1808 — 1883",
    periode: "XIXe siècle — Résistance à la colonisation",
    statut: "Émir, chef militaire et politique, poète, philosophe soufi",
    lieu: "El Guetna (Mascara) — Damas",
    niveauCertitude: "bien_documente",
    biographie: `Abdelkader est la figure centrale de la résistance algérienne à la conquête française. Fils d'un chef religieux de la confrérie Qadiriyya, il fut proclamé émir par les tribus de l'Ouest algérien en 1832 et construisit en quelques années un véritable État avec une administration, une armée régulière, des ateliers de fabrication d'armes et une diplomatie internationale. Il négocia plusieurs traités avec la France (Desmichels 1834, Tafna 1837) avant que la politique du gouverneur général Bugeaud ne rende toute coexistence impossible. Après sa reddition en 1847, exilé à Damas, il sauva en 1860 des milliers de chrétiens menacés par des émeutes intercommunautaires, ce qui lui valut des décorations de nombreux gouvernements européens. Il était aussi poète en arabe classique et penseur soufi.`,
    iconographie: "Nombreux portraits peints par des artistes français contemporains (Ary Scheffer, Horace Vernet). Photographies à Damas (après 1856). Valeur documentaire réelle mais regard colonial à signaler.",
    sourcePrimaire: "Correspondances diplomatiques, Archives nationales d'Algérie, Archives du Ministère de la Guerre (Paris)",
    sourceSecondaire: "Aouli, Redjala, Zoummeroff (1994) ; Churchill (1867 — source primaire britannique) ; Stora (2004)",
    couleurPeriode: "#6B3E26"
  },
  {
    id: "ibn_badis",
    nom: "Abd al-Hamid Ibn Badis",
    variantes: ["Abdelhamid Ben Badis"],
    dates: "1889 — 1940",
    periode: "Mouvement national algérien",
    statut: "Savant religieux, réformateur, éducateur",
    lieu: "Constantine",
    niveauCertitude: "bien_documente",
    biographie: `Ibn Badis est le fondateur en 1931 de l'Association des Oulémas Musulmans Algériens (AOMA), mouvement de réforme religieuse et culturelle qui joua un rôle déterminant dans la résistance identitaire à la colonisation. Sa devise — "L'islam est ma religion, l'arabe est ma langue, l'Algérie est ma patrie" — synthétisa un projet national fondé sur l'identité islamique et arabophone. Il développa un réseau d'écoles libres enseignant l'arabe et l'islam, formant une génération de cadres nationalistes. Il mourut en 1940, avant l'indépendance, mais son œuvre éducative nourrit directement le mouvement national.`,
    iconographie: "Photographies documentées. Collections familiales et archives de l'AOMA.",
    sourcePrimaire: "Al-Shihab (revue fondée par Ibn Badis), archives de l'AOMA",
    sourceSecondaire: "Merad (1967), Ageron (1964)",
    couleurPeriode: "#6B3E26"
  },
  {
    id: "kateb_yacine",
    nom: "Kateb Yacine",
    variantes: ["كاتب ياسين"],
    dates: "1929 — 1989",
    periode: "Littérature algérienne",
    statut: "Écrivain, dramaturge",
    lieu: "Guelma — Sidi Aïch — Paris — Grenoble",
    niveauCertitude: "bien_documente",
    biographie: `Kateb Yacine est l'auteur de Nedjma (1956), roman fondateur de la littérature algérienne de langue française, œuvre labyrinthique et polyphonique souvent comparée à Faulkner. Arrêté à 16 ans lors des manifestations de mai 1945 à Guelma, cette expérience traumatique marqua toute son œuvre. Il développa une conception du français comme "butin de guerre" — langue conquise sur le colonisateur et retournée comme arme littéraire. Dans la seconde partie de sa vie, il abandonna le français pour l'arabe dialectal et le kabyle, souhaitant toucher directement les classes populaires algériennes avec son théâtre.`,
    iconographie: "Photographies documentées. Portraits par des photographes littéraires (Archives INA, presse française).",
    sourcePrimaire: "Nedjma (1956), Le Cadavre encerclé, L'Homme aux sandales de caoutchouc",
    sourceSecondaire: "Bonn (1985), Arnaud (1986)",
    couleurPeriode: "#2D5A27"
  }
];

export const VILLES = [
  {
    id: "alger",
    nom: "Alger",
    nomsAnciens: ["Icosium (romain)", "Jazāʾir Banī Mazghanna (médiéval)", "El Djazaïr"],
    coordonnees: { lat: 36.73, lon: 3.09 },
    periodes: ["Antiquité", "Moyen Âge", "Régence ottomane", "Colonisation", "Contemporain"],
    resume: "Capitale de l'Algérie, fondée sur une presqu'île par les Berbères, développée par les Romains sous le nom d'Icosium, fortifiée par les Hammadides au XIe siècle, capitale de la régence ottomane à partir de 1516, puis capitale coloniale française. Sa Casbah est classée UNESCO.",
    monuments: ["La Casbah (classée UNESCO 1992)", "Grande Mosquée (Djamaa el-Kebir, XIe s.)", "Mosquée Ketchaoua", "Palais de la Princesse (Dar Aziza)", "Fort l'Amiral"],
    iconographie: "Gravures du XVIIIe s. (BnF-Gallica), photographies coloniales ANOM, vues aériennes contemporaines",
    niveauCertitude: "bien_documente"
  },
  {
    id: "constantine",
    nom: "Constantine",
    nomsAnciens: ["Cirta", "Qacentina", "Cirtha Regia"],
    coordonnees: { lat: 36.37, lon: 6.62 },
    periodes: ["Royaumes numides", "Afrique romaine", "Moyen Âge", "Régence ottomane", "Colonisation"],
    resume: "Ancienne capitale des rois numides, perchée sur un rocher entaillé de gorges vertigineuses, traversée par le Rhumel. Cirta fut la capitale de Massinissa. Détruite lors des guerres civiles romaines, reconstruite et rebaptisée Constantina par l'empereur Constantin Ier.",
    monuments: ["Ponts suspendus (XIXe s.)", "Musée Cirta", "Vieux pont romain", "Palais du Bey (Ahmed Bey)"],
    niveauCertitude: "bien_documente"
  },
  {
    id: "tlemcen",
    nom: "Tlemcen",
    nomsAnciens: ["Pomaria (romain)", "Agadir (berbère)", "Tilimsan"],
    coordonnees: { lat: 34.88, lon: -1.32 },
    periodes: ["Antiquité", "Dynasties médiévales", "Régence ottomane"],
    resume: "Capitale des Zianides (XIIIe-XVIe s.), surnommée 'Perle du Maghreb'. Ville de cour, de poésie, de théologie et d'artisanat raffiné. Longtemps disputée entre Mérinides du Maroc et Hafsides de Tunis.",
    monuments: ["Grande Mosquée (XIe s.)", "Mosquée Sidi Belhassan", "Minaret de Mansourah", "Médersa Tachfiniya"],
    niveauCertitude: "bien_documente"
  },
  {
    id: "timgad",
    nom: "Timgad",
    nomsAnciens: ["Thamugadi (romain)", "Timgad"],
    coordonnees: { lat: 35.48, lon: 6.47 },
    periodes: ["Afrique romaine"],
    resume: "Ville romaine fondée en 100 ap. J.-C. par l'empereur Trajan pour les vétérans de la légion III Augusta. Plan orthogonal parfait (cardo/decumanus), l'une des mieux conservées d'Afrique. Classée UNESCO en 1982.",
    monuments: ["Arc de Trajan", "Théâtre romain", "Temple du Capitole", "Forum", "Bibliothèque"],
    statut_patrimoine: "UNESCO 1982",
    niveauCertitude: "bien_documente"
  },
  {
    id: "ghardaia",
    nom: "Ghardaïa",
    nomsAnciens: ["Taghardayt (berbère)"],
    coordonnees: { lat: 32.49, lon: 3.67 },
    periodes: ["Dynasties médiévales (fondation XIe s.)", "Contemporain"],
    resume: "Cœur de la Pentapole du M'zab, fondée au XIe siècle par des Ibadites fuyant les persécutions. Architecture mozabite unique, profondément adaptée au Sahara : maisons blanches, mosquées à minarets coniques, organisation sociale religieuse. Classée UNESCO en 1982.",
    statut_patrimoine: "UNESCO 1982",
    niveauCertitude: "bien_documente"
  },
  {
    id: "oran",
    nom: "Oran",
    nomsAnciens: ["Wahran", "Ifri"],
    coordonnees: { lat: 35.70, lon: -0.63 },
    periodes: ["Moyen Âge", "Régence ottomane", "Colonisation", "Contemporain"],
    resume: "Deuxième ville d'Algérie, fondée au Xe siècle par des marins andalous. Occupée par les Espagnols de 1509 à 1792, elle conserve le Fort Santa Cruz et des vestiges de l'architecture coloniale espagnole puis française.",
    monuments: ["Fort Santa Cruz", "Mosquée du Pacha", "Théâtre d'Oran", "Cathédrale du Sacré-Cœur"],
    niveauCertitude: "bien_documente"
  },
  {
    id: "bejaia",
    nom: "Béjaïa",
    nomsAnciens: ["Saldae (romain)", "Bgayet (berbère)", "Bougie"],
    coordonnees: { lat: 36.75, lon: 5.08 },
    periodes: ["Antiquité", "Dynasties médiévales", "Régence ottomane"],
    resume: "Port méditerranéen important depuis l'Antiquité. Capitale des Hammadides au XIe siècle, centre intellectuel majeur. C'est de Béjaïa que le mathématicien Fibonacci rapporta les chiffres arabes en Europe.",
    monuments: ["Porte Sarrasine", "Fort de Gouraya", "Musée de Béjaïa"],
    niveauCertitude: "bien_documente"
  },
  {
    id: "annaba",
    nom: "Annaba",
    nomsAnciens: ["Hippo Regius (romain)", "Bône"],
    coordonnees: { lat: 36.90, lon: 7.77 },
    periodes: ["Antiquité", "Afrique romaine", "Moyen Âge", "Colonisation"],
    resume: "Ancienne Hippone, siège épiscopal de saint Augustin. Important port romain puis ville coloniale française. Les ruines romaines d'Hippone sont parmi les mieux conservées d'Algérie.",
    monuments: ["Ruines d'Hippone", "Basilique Saint-Augustin (XIXe s.)", "Théâtre romain"],
    niveauCertitude: "bien_documente"
  }
];

export const SITES = [
  { 
    id: "tassili", 
    nom: "Tassili n'Ajjer", 
    type: "Art rupestre / Parc national", 
    statut: "UNESCO 1982", 
    region: "Sahara", 
    resume: "Plateau désertique de l'extrême sud-est algérien, riche du plus grand ensemble d'art rupestre préhistorique du monde. Plusieurs milliers de gravures et peintures rupestres, datées de manière très approximative entre 10 000 et 1 500 ans av. J.-C.", 
    noteMethodologique: "Les datations de l'art rupestre du Tassili sont des estimations fondées sur la faune représentée et les styles, non des datations absolues. Les 'périodes' (Têtes rondes, Pasteurs, etc.) sont des dénominations de travail.", 
    coordonnees: { lat: 25.5, lon: 8.5 } 
  },
  { 
    id: "djemila", 
    nom: "Djemila (Cuicul)", 
    type: "Ville romaine", 
    statut: "UNESCO 1982", 
    region: "Kabylie/Sétifois", 
    resume: "Cité romaine fondée au Ier siècle ap. J.-C., remarquablement conservée. Son forum, ses temples, ses thermes et son arc de triomphe font partie des ensembles romains les mieux préservés d'Afrique du Nord.", 
    coordonnees: { lat: 36.32, lon: 5.74 } 
  },
  { 
    id: "qalat_beni_hammad", 
    nom: "Qal'at Bani Hammad", 
    type: "Capitale médiévale en ruines", 
    statut: "UNESCO 1980", 
    region: "M'sila", 
    resume: "Ancienne capitale des Hammadides (début XIe - XIIe s.), première capitale du Maghreb central. Ses ruines imposantes incluent une tour de 20 mètres et la grande mosquée. L'un des sites médiévaux islamiques les mieux préservés d'Algérie.", 
    coordonnees: { lat: 35.82, lon: 4.79 } 
  },
  {
    id: "medracen",
    nom: "Médracen",
    type: "Mausolée royal numide",
    statut: "Monument historique",
    region: "Batna",
    resume: "Mausolée royal numide, probablement celui d'un roi massyle du IIIe siècle av. J.-C. Structure cylindrique de 59 mètres de diamètre surmontée d'un cône à gradins. L'un des monuments préromains les mieux conservés d'Afrique du Nord.",
    coordonnees: { lat: 35.67, lon: 6.33 }
  },
  {
    id: "tipaza",
    nom: "Tipaza",
    type: "Ville romaine et chrétienne",
    statut: "UNESCO 1982",
    region: "Tipaza",
    resume: "Comptoir punique devenu colonie romaine, puis important centre chrétien. Ses ruines face à la mer, célébrées par Albert Camus dans 'Noces', comprennent basiliques, nécropoles et villas romaines.",
    coordonnees: { lat: 36.59, lon: 2.45 }
  }
];

export const PERIODES = [
  {
    id: "prehistoire",
    nom: "Préhistoire",
    dates: "-2 000 000 — -10 000",
    dateDebut: -2000000,
    dateFin: -10000,
    couleur: "#8B7355",
    icone: "circle",
    resume: "Les plus anciennes traces humaines d'Algérie remontent à plus d'un million d'années. Les sites d'Aïn Hanech et de Ternifine témoignent de la présence d'Homo erectus. Le Sahara, alors verdoyant, abritait une riche faune et des populations de chasseurs-cueilleurs.",
    description: `La préhistoire algérienne couvre une période immense, des premiers hominidés aux sociétés néolithiques. Les découvertes d'Aïn Hanech (près de Sétif) ont livré des outils en pierre taillée parmi les plus anciens d'Afrique du Nord, datés de 1,8 million d'années. Ternifine (Tighenif) a fourni des restes d'Homo erectus associés à une industrie acheuléenne.

Le Sahara, qui connut plusieurs phases d'humidification au cours du Quaternaire, fut un espace de peuplement majeur. L'art rupestre du Tassili n'Ajjer et de l'Ahaggar témoigne de sociétés de chasseurs puis de pasteurs qui ont laissé des milliers de représentations gravées et peintes sur les parois rocheuses.`,
    evenementsCles: [
      { date: -1800000, label: "Premiers outils à Aïn Hanech" },
      { date: -700000, label: "Homo erectus à Ternifine" },
      { date: -50000, label: "Art rupestre au Tassili" }
    ]
  },
  {
    id: "royaumes_numides",
    nom: "Royaumes Numides",
    dates: "IIIe s. — 46 av. J.-C.",
    dateDebut: -300,
    dateFin: -46,
    couleur: "#B8860B",
    icone: "crown",
    resume: "Les royaumes numides représentent la première grande expérience étatique amazighe. Sous Massinissa, la Numidie unifia les confédérations berbères et devint un acteur majeur de la Méditerranée occidentale.",
    description: `Entre le IIIe et le Ier siècle avant notre ère, le territoire de l'actuelle Algérie fut le théâtre de l'une des expériences politiques les plus remarquables du monde antique : la construction d'un État amazigh autonome, la Numidie.

Sous l'impulsion de Massinissa — dont le règne de près d'un demi-siècle reste l'un des plus longs et des plus transformateurs de l'Antiquité méditerranéenne — les confédérations berbères des Massyles et des Masaesyles fusionnèrent en un royaume unifié, avec une capitale à Cirta (l'actuelle Constantine), une armée, une administration et une politique agricole volontariste qui transforma des populations nomades en agriculteurs sédentaires.

La Numidie ne fut pas une périphérie de Rome. Ce fut un partenaire, parfois allié, parfois adversaire, mais toujours acteur de sa propre histoire.`,
    evenementsCles: [
      { date: -238, label: "Naissance de Massinissa", lien: "massinissa" },
      { date: -202, label: "Bataille de Zama" },
      { date: -112, label: "Guerre jugurthine", lien: "jugurtha" },
      { date: -46, label: "Fin du royaume (Thapsus)" }
    ]
  },
  {
    id: "afrique_romaine",
    nom: "Afrique Romaine",
    dates: "46 av. J.-C. — 430 ap. J.-C.",
    dateDebut: -46,
    dateFin: 430,
    couleur: "#8B1A1A",
    icone: "columns",
    resume: "Pendant près de cinq siècles, l'Afrique du Nord fit partie intégrante de l'Empire romain. L'Algérie actuelle comprenait les provinces de Numidie et de Maurétanie Césarienne, parsemées de cités prospères.",
    description: `L'intégration de l'Afrique du Nord à l'Empire romain transforma profondément le territoire. Les villes se multiplièrent selon le modèle romain : forum, thermes, théâtres, basiliques. Timgad, fondée en 100 ap. J.-C. par Trajan, offre aujourd'hui l'exemple le mieux conservé de cette urbanisation.

L'agriculture se développa considérablement. L'Afrique devint l'un des greniers à blé de Rome. De grandes propriétés (latifundia) produisaient céréales, huile d'olive et vin pour l'exportation.

Le christianisme se répandit précocement. Au IVe siècle, l'Afrique était l'une des régions les plus christianisées de l'Empire. Augustin d'Hippone, né à Thagaste, devint l'un des Pères de l'Église. Le donatisme, schisme né d'un conflit sur les évêques compromis lors des persécutions, révéla les tensions sociales et identitaires de la société romano-africaine.`,
    evenementsCles: [
      { date: 100, label: "Fondation de Timgad", lien: "timgad" },
      { date: 354, label: "Naissance d'Augustin", lien: "augustin" },
      { date: 430, label: "Mort d'Augustin — Siège d'Hippone" }
    ]
  },
  {
    id: "antiquite_tardive",
    nom: "Antiquité tardive & Vandales",
    dates: "430 — 647",
    dateDebut: 430,
    dateFin: 647,
    couleur: "#6B3E26",
    icone: "cross",
    resume: "La conquête vandale (429-534) puis la reconquête byzantine marquent une période de transition. Le christianisme reste dominant, mais les structures romaines s'effritent.",
    description: `En 429, les Vandales, peuple germanique converti à l'arianisme, traversèrent le détroit de Gibraltar et conquirent progressivement l'Afrique du Nord. Ils établirent un royaume centré sur Carthage qui dura un siècle.

La reconquête byzantine (533-534), menée par le général Bélisaire pour le compte de Justinien, rétablit l'autorité impériale mais ne put restaurer la prospérité passée. Les révoltes berbères se multiplièrent dans l'intérieur du pays.

Cette période vit le maintien du christianisme mais aussi l'émergence de pouvoirs locaux berbères dans les zones montagneuses et désertiques, préfigurant les résistances à la conquête arabe.`
  },
  {
    id: "conquete_arabe",
    nom: "Conquête arabe & Islamisation",
    dates: "647 — 900",
    dateDebut: 647,
    dateFin: 900,
    couleur: "#2D5A27",
    icone: "moon",
    resume: "La conquête arabe du Maghreb, étalée sur plus d'un demi-siècle, transforma durablement la région. L'islamisation et l'arabisation furent progressives mais profondes.",
    description: `La conquête arabe du Maghreb ne fut pas un événement unique mais un processus long et complexe, marqué par des avancées, des reculs et des résistances acharnées.

Les premières expéditions arabes atteignirent l'Ifriqiya (actuelle Tunisie) dès 647. La fondation de Kairouan en 670 établit une base permanente. La résistance berbère, dont la figure de la Kâhina est devenue emblématique malgré l'incertitude des sources, retarda la conquête définitive jusqu'au début du VIIIe siècle.

L'islamisation fut rapide dans les villes mais plus lente dans les campagnes et les montagnes. L'arabisation linguistique prit des siècles et resta incomplète : le berbère se maintint dans de nombreuses régions.`,
    evenementsCles: [
      { date: 647, label: "Première expédition arabe" },
      { date: 670, label: "Fondation de Kairouan" },
      { date: 700, label: "Résistance de la Kâhina", lien: "kahina" }
    ]
  },
  {
    id: "dynasties_medievales",
    nom: "Dynasties médiévales",
    dates: "900 — 1516",
    dateDebut: 900,
    dateFin: 1516,
    couleur: "#2E1A6B",
    icone: "mosque",
    resume: "Six siècles de dynasties amazighes et arabes : Rustumides, Fatimides, Hammadides, Almoravides, Almohades, Zianides. Le Maghreb central oscille entre unité et fragmentation.",
    description: `Le Moyen Âge algérien vit l'émergence et la chute de nombreuses dynasties, souvent d'origine berbère, parfois arabisées, toujours musulmanes.

Les Rustumides de Tahert (778-909) fondèrent le premier État ibadite d'Afrique du Nord. Les Fatimides, chiites ismaéliens, partirent de Kabylie pour conquérir l'Égypte. Les Hammadides (1014-1152) établirent leur capitale à la Qal'a puis à Béjaïa.

Les grandes confédérations almohades puis mérinides englobèrent temporairement tout le Maghreb. Les Zianides de Tlemcen (1235-1556) maintinrent un royaume indépendant face à la pression mérinide à l'ouest et hafside à l'est. Tlemcen devint une capitale de haute culture.`,
    evenementsCles: [
      { date: 909, label: "Fin des Rustumides" },
      { date: 1014, label: "Fondation des Hammadides" },
      { date: 1235, label: "Début des Zianides" },
      { date: 1332, label: "Naissance d'Ibn Khaldoun", lien: "ibn_khaldoun" }
    ]
  },
  {
    id: "regence_ottomane",
    nom: "Régence d'Alger",
    dates: "1516 — 1830",
    dateDebut: 1516,
    dateFin: 1830,
    couleur: "#1A3A5C",
    icone: "anchor",
    resume: "Pendant trois siècles, l'Algérie fut une régence de l'Empire ottoman, gouvernée par des deys à Alger. Puissance maritime, elle fut aussi un État structuré avec ses institutions propres.",
    description: `En 1516, les frères Barberousse, corsaires au service de l'Empire ottoman, s'emparèrent d'Alger et intégrèrent progressivement le territoire à la sphère ottomane. La régence d'Alger, tout en reconnaissant la suzeraineté du sultan de Constantinople, jouit d'une large autonomie.

Le pouvoir était exercé par le dey, élu par les janissaires (milice d'origine turque). Le territoire était divisé en trois beyliks (provinces) : l'Ouest, le Titteri et l'Est, chacun administré par un bey.

La course (corsariat) fit la fortune et la réputation d'Alger. Les prises sur les navires chrétiens et le rachat des captifs alimentaient une économie florissante. Cette activité suscita les expéditions punitives européennes et contribua à la décision française d'envahir en 1830.`,
    evenementsCles: [
      { date: 1516, label: "Arrivée de Barberousse" },
      { date: 1541, label: "Échec de Charles Quint devant Alger" },
      { date: 1830, label: "Prise d'Alger par la France" }
    ]
  },
  {
    id: "colonisation",
    nom: "Colonisation française",
    dates: "1830 — 1954",
    dateDebut: 1830,
    dateFin: 1954,
    couleur: "#4A4A4A",
    icone: "flag",
    resume: "132 ans de domination coloniale française transformèrent profondément l'Algérie. Colonie de peuplement, elle fut administrativement intégrée à la France tout en maintenant une ségrégation de fait.",
    description: `La conquête française, commencée en 1830, ne s'acheva qu'au début du XXe siècle avec la « pacification » du Sahara. Elle fut marquée par une violence extrême : razzia, enfumades, destructions de villages, confiscations de terres.

La résistance de l'Émir Abdelkader (1832-1847) constitua la première grande opposition organisée. D'autres révoltes suivirent : insurrection de 1871 menée par Mokrani et cheikh El-Haddad, résistances sahariennes.

L'Algérie devint une colonie de peuplement. Les « pieds-noirs » (Français et Européens) s'installèrent sur les meilleures terres. La population « indigène » fut soumise au Code de l'indigénat (1881-1944), privée de droits politiques et cantonnée à un statut de seconde zone.`,
    evenementsCles: [
      { date: 1830, label: "Prise d'Alger" },
      { date: 1832, label: "Émir Abdelkader proclamé", lien: "abdelkader" },
      { date: 1871, label: "Révolte Mokrani-Haddad" },
      { date: 1931, label: "Association des Oulémas", lien: "ibn_badis" },
      { date: 1945, label: "Massacres de Sétif" }
    ]
  },
  {
    id: "guerre_independance",
    nom: "Guerre d'indépendance",
    dates: "1954 — 1962",
    dateDebut: 1954,
    dateFin: 1962,
    couleur: "#6B3E26",
    icone: "star",
    resume: "La guerre d'Algérie (1954-1962) fut l'une des guerres de décolonisation les plus violentes du XXe siècle. Elle aboutit à l'indépendance le 5 juillet 1962.",
    description: `Le 1er novembre 1954, le Front de Libération Nationale (FLN) déclencha l'insurrection armée contre la présence française. La guerre qui s'ensuivit dura près de huit ans et fit des centaines de milliers de morts.

La France engagea jusqu'à 400 000 soldats. La torture, les exécutions sommaires, les regroupements de populations et les bombardements de villages furent systématiques. Du côté algérien, le FLN imposa son autorité par la violence contre les populations civiles et les militants rivaux.

Les Accords d'Évian (18 mars 1962) mirent fin aux combats. Le référendum d'autodétermination du 1er juillet 1962 aboutit à l'indépendance, proclamée le 5 juillet.`,
    evenementsCles: [
      { date: 1954, label: "1er novembre — Déclenchement" },
      { date: 1956, label: "Congrès de la Soummam" },
      { date: 1962, label: "Accords d'Évian — Indépendance" }
    ]
  },
  {
    id: "algerie_independante",
    nom: "Algérie indépendante",
    dates: "1962 — aujourd'hui",
    dateDebut: 1962,
    dateFin: 2024,
    couleur: "#1A5C1A",
    icone: "circle-dot",
    resume: "Depuis 1962, l'Algérie a connu des périodes de construction nationale, de crise économique, de guerre civile (années 1990) et de renouveau. C'est aujourd'hui le plus grand pays d'Afrique.",
    description: `L'indépendance ouvrit une période de construction nationale sous la direction du FLN, parti unique jusqu'en 1989. Ahmed Ben Bella puis Houari Boumediene présidèrent aux premières décennies, marquées par le socialisme, l'industrialisation et la réforme agraire.

La chute des prix du pétrole dans les années 1980 provoqua une crise économique et sociale. Les émeutes d'octobre 1988 aboutirent au multipartisme. La victoire électorale du Front Islamique du Salut (FIS) en 1991 et l'annulation du scrutin déclenchèrent une guerre civile qui fit plus de 100 000 morts.

Le XXIe siècle a vu une relative stabilisation sous Abdelaziz Bouteflika, puis le mouvement populaire du Hirak (2019) qui réclama un changement de système politique.`
  }
];

export const GLOSSAIRE = [
  { terme: "Amazigh", categorie: "ethnonyme", definition: "Terme autodesignatif des populations berbérophones d'Afrique du Nord. Pluriel : Imazighen. Signification étymologique débattue (homme libre ? homme de la terre ?). Préféré au terme 'berbère' d'origine gréco-latine péjorative dans les usages contemporains.", sources: "Chaker (1989), Encyclopédie berbère" },
  { terme: "Asabiyya", categorie: "concept", definition: "Concept central de la pensée d'Ibn Khaldoun (XIVe s.) désignant la cohésion sociale, la solidarité de groupe (lien tribal, communautaire) qui, selon lui, constitue le moteur des cycles de montée et de déclin des dynasties.", sources: "Ibn Khaldoun, Muqaddima ; Lacoste (1966)" },
  { terme: "Beylik", categorie: "institution", definition: "Division administrative de la régence d'Alger sous domination ottomane. La régence était divisée en trois beyliks (provinces) : l'Ouest (Mascara puis Oran), le Titteri (Médéa) et l'Est (Constantine), chacun dirigé par un bey nommé par le dey d'Alger.", sources: "Devoulx, Merouche (2002)" },
  { terme: "Casbah", categorie: "terme_architectural", definition: "De l'arabe qasba : citadelle, forteresse, puis par extension le quartier ancien fortifié qui l'entoure. La Casbah d'Alger désigne la médina ottomane classée au patrimoine mondial de l'UNESCO en 1992.", sources: "Encyclopédie de l'Islam (Brill)" },
  { terme: "Donatisme", categorie: "terme_religieux", definition: "Schisme chrétien africain du IVe-Ve siècle, né d'un conflit sur la légitimité des évêques ayant collaboré avec les persécutions romaines. Le mouvement, très implanté en Numidie, avait une forte dimension sociale et identitaire anti-romaine. Combattu par Augustin d'Hippone.", sources: "Frend (1952), Brown (1967)" },
  { terme: "Ibadisme", categorie: "terme_religieux", definition: "École théologique et juridique islamique, troisième grande branche de l'islam après le sunnisme et le chiisme. Présent aujourd'hui principalement au Sultanat d'Oman, en Libye (Djabal Nafusa) et dans le M'zab algérien (Ghardaïa). Les Rustumides de Tahert (IXe s.) furent le premier État ibadite d'Afrique du Nord.", sources: "Encyclopaedia of Islam (Brill), Lewicki" },
  { terme: "Ksar (pl. Ksour)", categorie: "terme_architectural", definition: "Terme d'origine berbère (ighrem en tamazight) désignant un village fortifié du Sahara et des steppes, organisé autour de ruelles couvertes et de greniers collectifs. Les ksour constituent un type architectural spécifique à l'Afrique du Nord saharienne.", sources: "Côte (1988), Encyclopédie berbère" },
  { terme: "Libyque", categorie: "terme_historique", definition: "Terme utilisé par les sources grecques et latines pour désigner les populations non phéniciennes et non grecques d'Afrique du Nord. Il recouvre une réalité très diverse. On parle aussi d'alphabet libyque pour désigner l'écriture ancêtre du tifinagh contemporain.", sources: "Camps (1995), Brett & Fentress (1996)" },
  { terme: "Tifinagh", categorie: "terme_linguistique", definition: "Système d'écriture utilisé par les Touaregs pour noter le tamasheq. Forme contemporaine dérivée de l'alphabet libyque antique. Un tifinagh modernisé (IRCAM/néo-tifinagh) est aujourd'hui utilisé pour noter l'ensemble des variantes du tamazight.", sources: "Chaker (1989), Aghali-Zakara" },
  { terme: "Dey", categorie: "institution", definition: "Titre du chef de la régence d'Alger à partir de 1671. Élu par les janissaires, le dey exerçait le pouvoir exécutif et représentait la régence auprès de la Sublime Porte ottomane.", sources: "Merouche (2002)" },
  { terme: "Janissaires", categorie: "institution", definition: "Corps d'élite de l'armée ottomane, présent à Alger comme milice de garnison. Les janissaires d'Alger, d'origine turque ou levantine, formaient la classe dirigeante de la régence et élisaient le dey.", sources: "Encyclopédie de l'Islam" },
  { terme: "Limes", categorie: "terme_historique", definition: "Frontière fortifiée de l'Empire romain. En Afrique du Nord, le limes séparait les provinces pacifiées des territoires non contrôlés au sud. Il comprenait fossés, murs et forts (castella).", sources: "Trousset (1984)" },
  { terme: "Numidie", categorie: "terme_géographique", definition: "Nom donné par les Romains au territoire correspondant approximativement à l'est de l'Algérie actuelle, du royaume numide (IIIe-Ier s. av. J.-C.) à la province romaine de Numidie (Ier-Ve s. ap. J.-C.).", sources: "Gsell, Brett & Fentress" }
];

export const FRISES_DATA = {
  generale: {
    titre: "Frise générale de l'Algérie",
    periodes: [
      { debut: -2000000, fin: -10000, label: "Préhistoire", couleur: "#8B7355", icone: "circle" },
      { debut: -10000, fin: -800, label: "Néolithique & Protohistoire", couleur: "#A0845C", icone: "triangle" },
      { debut: -800, fin: -146, label: "Peuples libyques & Carthage", couleur: "#C4A35A", icone: "hexagon" },
      { debut: -238, fin: -46, label: "Royaumes numides", couleur: "#B8860B", icone: "crown" },
      { debut: -46, fin: 430, label: "Afrique romaine", couleur: "#8B1A1A", icone: "star" },
      { debut: 430, fin: 647, label: "Antiquité tardive", couleur: "#6B3E26", icone: "cross" },
      { debut: 647, fin: 900, label: "Conquête arabe & islamisation", couleur: "#2D5A27", icone: "moon" },
      { debut: 900, fin: 1516, label: "Dynasties médiévales", couleur: "#2E1A6B", icone: "mosque" },
      { debut: 1516, fin: 1830, label: "Régence d'Alger", couleur: "#1A3A5C", icone: "anchor" },
      { debut: 1830, fin: 1954, label: "Colonisation française", couleur: "#4A4A4A", icone: "flag" },
      { debut: 1954, fin: 1962, label: "Guerre d'indépendance", couleur: "#6B3E26", icone: "star" },
      { debut: 1962, fin: 2024, label: "Algérie indépendante", couleur: "#1A5C1A", icone: "circle-dot" }
    ],
    evenements: [
      { date: -238, label: "Naissance de Massinissa", lien: "massinissa" },
      { date: -202, label: "Bataille de Zama", lien: null },
      { date: -112, label: "Guerre jugurthine", lien: "jugurtha" },
      { date: -46, label: "Fin du royaume de Numidie (Thapsus)", lien: null },
      { date: 100, label: "Fondation de Timgad", lien: "timgad" },
      { date: 354, label: "Naissance d'Augustin à Thagaste", lien: "augustin" },
      { date: 647, label: "Première expédition arabe", lien: null },
      { date: 1332, label: "Naissance d'Ibn Khaldoun", lien: "ibn_khaldoun" },
      { date: 1516, label: "Arrivée de Barberousse", lien: null },
      { date: 1830, label: "Prise d'Alger", lien: null },
      { date: 1832, label: "Émir Abdelkader proclamé", lien: "abdelkader" },
      { date: 1871, label: "Révolte Mokrani-Haddad", lien: null },
      { date: 1889, label: "Naissance d'Ibn Badis", lien: "ibn_badis" },
      { date: 1945, label: "Massacres de Sétif", lien: null },
      { date: 1954, label: "1er novembre — Déclenchement de la guerre", lien: null },
      { date: 1962, label: "Indépendance — 5 juillet", lien: null }
    ]
  }
};

export const ARTS_CULTURE = {
  architecture: {
    titre: "Architecture",
    elements: [
      { nom: "Architecture numide", periode: "Antiquité", description: "Mausolées royaux (Médracen, Tombeau de la Chrétienne), témoins d'une synthèse entre traditions locales et influences méditerranéennes." },
      { nom: "Architecture romaine", periode: "Antiquité", description: "Villes orthogonales (Timgad, Djemila), forums, thermes, théâtres. L'Algérie conserve certains des sites romains les mieux préservés du monde." },
      { nom: "Architecture islamique", periode: "Moyen Âge", description: "Mosquées à plans arabes puis maghrébins, minarets carrés, médersas, palais. La Grande Mosquée d'Alger (XIe s.) et la Qal'a des Beni Hammad sont des exemples majeurs." },
      { nom: "Architecture mozabite", periode: "Moyen Âge — Contemporain", description: "Urbanisme communautaire adapté au désert. Maisons blanches à terrasses, mosquées à minarets coniques, système d'irrigation sophistiqué." },
      { nom: "Architecture coloniale", periode: "XIXe-XXe siècles", description: "Style haussmannien à Alger, néo-mauresque, Art déco. Transformation radicale du tissu urbain." }
    ]
  },
  musique: {
    titre: "Musique",
    elements: [
      { nom: "Chaâbi", region: "Alger", description: "Musique populaire algéroise née dans la Casbah au début du XXe siècle. Maître fondateur : El Hadj M'Hamed El Anka." },
      { nom: "Raï", region: "Oran", description: "Genre musical né dans l'Oranie, mêlant traditions bédouines et influences occidentales. Figures : Cheikha Remitti, Cheb Khaled, Cheb Mami." },
      { nom: "Musique kabyle", region: "Kabylie", description: "Tradition poétique et musicale amazighe. Figures : Slimane Azem, Aït Menguellet, Idir, Matoub Lounès." },
      { nom: "Musique arabo-andalouse", region: "Alger, Tlemcen, Constantine", description: "Patrimoine UNESCO. Héritage de l'Andalousie médiévale. Trois écoles : algéroise, tlemcénienne, constantinoise." },
      { nom: "Musique saharienne", region: "Sahara", description: "Traditions touarègues (imzad, tindé) et musiques gnawa du sud." }
    ]
  },
  litterature: {
    titre: "Littérature",
    auteurs: [
      { nom: "Mohammed Dib", dates: "1920-2003", oeuvres: "La Grande Maison, L'Incendie, Le Métier à tisser (trilogie Algérie)" },
      { nom: "Mouloud Feraoun", dates: "1913-1962", oeuvres: "Le Fils du pauvre, La Terre et le Sang. Assassiné par l'OAS." },
      { nom: "Kateb Yacine", dates: "1929-1989", oeuvres: "Nedjma (1956), Le Cadavre encerclé. Figure majeure.", lien: "kateb_yacine" },
      { nom: "Assia Djebar", dates: "1936-2015", oeuvres: "L'Amour, la fantasia. Première femme maghrébine à l'Académie française." },
      { nom: "Mouloud Mammeri", dates: "1917-1989", oeuvres: "La Colline oubliée. Défenseur de la culture amazighe." },
      { nom: "Tahar Djaout", dates: "1954-1993", oeuvres: "Les Vigiles. Assassiné par des islamistes." }
    ]
  },
  cinema: {
    titre: "Cinéma",
    elements: [
      { nom: "La Bataille d'Alger", annee: 1966, realisateur: "Gillo Pontecorvo", description: "Film italien sur la guerre d'indépendance. Palme d'or à Cannes." },
      { nom: "Chronique des années de braise", annee: 1975, realisateur: "Mohammed Lakhdar-Hamina", description: "Palme d'or à Cannes. Fresque historique de l'Algérie coloniale." },
      { nom: "Omar Gatlato", annee: 1976, realisateur: "Merzak Allouache", description: "Portrait de la jeunesse algéroise post-indépendance." }
    ]
  }
};

export const CARTES_DATA = [
  {
    id: "geographie_physique",
    titre: "Géographie physique de l'Algérie",
    type: "synthese",
    periode: "Contemporain",
    description: "Carte de référence montrant les principales régions naturelles : Tell, Hauts Plateaux, Sahara."
  },
  {
    id: "royaumes_numides",
    titre: "Royaumes numides (IIe-Ier s. av. J.-C.)",
    type: "restitution",
    periode: "Antiquité",
    description: "Territoires approximatifs des royaumes numides de Massinissa et de ses successeurs."
  },
  {
    id: "provinces_romaines",
    titre: "Provinces romaines d'Afrique",
    type: "restitution",
    periode: "Afrique romaine",
    description: "Africa Proconsularis, Numidie, Maurétanie Césarienne et réseau de villes romaines."
  },
  {
    id: "dynasties_medievales",
    titre: "Dynasties médiévales (XIIe-XVe s.)",
    type: "restitution",
    periode: "Moyen Âge",
    description: "Zones d'influence des Zianides, Hafsides et Mérinides au Maghreb central."
  },
  {
    id: "regence_alger",
    titre: "Régence d'Alger (XVIe-XIXe s.)",
    type: "restitution",
    periode: "Régence ottomane",
    description: "Division en beyliks : Ouest, Titteri, Est. Ports et villes ottomanes."
  }
];

export const BIBLIOGRAPHIE = [
  {
    categorie: "Ouvrages généraux",
    references: [
      "BRETT, Michael & FENTRESS, Elizabeth, The Berbers, Oxford, Blackwell, 1996.",
      "LACOSTE, Yves, Ibn Khaldoun, naissance de l'histoire, passé du Tiers monde, Paris, Maspero, 1966.",
      "JULIEN, Charles-André, Histoire de l'Afrique du Nord, Paris, Payot, 1931 (rééd.).",
      "CAMPS, Gabriel, Les Berbères. Mémoire et identité, Paris, Errance, 1995."
    ]
  },
  {
    categorie: "Antiquité",
    references: [
      "GSELL, Stéphane, Histoire ancienne de l'Afrique du Nord, 8 vol., Paris, 1913-1928.",
      "BROWN, Peter, Augustine of Hippo: A Biography, Londres, Faber, 1967 (rééd. 2000).",
      "MANDOUZE, André, Saint Augustin. L'aventure de la raison et de la grâce, Paris, 1968."
    ]
  },
  {
    categorie: "Période islamique et ottomane",
    references: [
      "MEROUCHE, Lemnouar, Recherches sur l'Algérie à l'époque ottomane, Paris, Bouchène, 2002.",
      "ENCYCLOPÉDIE BERBÈRE, Aix-en-Provence, Édisud puis Peeters, 1984-."
    ]
  },
  {
    categorie: "Période coloniale et contemporaine",
    references: [
      "AGERON, Charles-Robert, Histoire de l'Algérie contemporaine, Paris, PUF, 1964.",
      "STORA, Benjamin, Histoire de l'Algérie coloniale (1830-1954), Paris, La Découverte, 1991.",
      "MEYNIER, Gilbert, Histoire intérieure du FLN, Paris, Fayard, 2002."
    ]
  }
];
