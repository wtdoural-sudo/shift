// Quiz data for EHIA Encyclopedia
export const QUIZ_QUESTIONS = [
  // Personnages
  {
    id: 1,
    categorie: "Personnages",
    difficulte: "facile",
    question: "Quel roi numide a unifié les confédérations berbères des Massyles et des Masaesyles ?",
    options: ["Jugurtha", "Massinissa", "Syphax", "Micipsa"],
    reponseCorrect: 1,
    explication: "Massinissa (vers 238-148 av. J.-C.) est le premier grand roi unifié de Numidie. Il a rassemblé les deux grandes confédérations numides après des années de luttes complexes.",
    lien: { type: "personnage", id: "massinissa" }
  },
  {
    id: 2,
    categorie: "Personnages",
    difficulte: "moyen",
    question: "Qui a écrit 'Nedjma', roman fondateur de la littérature algérienne de langue française ?",
    options: ["Mohammed Dib", "Mouloud Feraoun", "Kateb Yacine", "Assia Djebar"],
    reponseCorrect: 2,
    explication: "Kateb Yacine a publié 'Nedjma' en 1956, une œuvre labyrinthique et polyphonique souvent comparée à Faulkner.",
    lien: { type: "personnage", id: "kateb_yacine" }
  },
  {
    id: 3,
    categorie: "Personnages",
    difficulte: "moyen",
    question: "Dans quelle ville actuelle est né Saint Augustin ?",
    options: ["Annaba", "Constantine", "Souk Ahras", "Alger"],
    reponseCorrect: 2,
    explication: "Augustin est né à Thagaste (l'actuelle Souk Ahras, en Algérie orientale) en 354 ap. J.-C.",
    lien: { type: "personnage", id: "augustin" }
  },
  {
    id: 4,
    categorie: "Personnages",
    difficulte: "difficile",
    question: "Quel historien du XIVe siècle a développé le concept d'asabiyya (cohésion sociale) ?",
    options: ["Al-Idrisi", "Ibn Battuta", "Ibn Khaldoun", "Al-Masudi"],
    reponseCorrect: 2,
    explication: "Ibn Khaldoun (1332-1406) a développé ce concept dans sa célèbre Muqaddima (Prolégomènes), constituant une tentative sans précédent de fonder une science de l'histoire humaine.",
    lien: { type: "personnage", id: "ibn_khaldoun" }
  },
  {
    id: 5,
    categorie: "Personnages",
    difficulte: "facile",
    question: "Quel émir algérien a résisté à la conquête française à partir de 1832 ?",
    options: ["Ahmed Bey", "Mokrani", "Abdelkader", "Boubaghla"],
    reponseCorrect: 2,
    explication: "L'Émir Abdelkader (1808-1883) est la figure centrale de la résistance algérienne à la conquête française. Il a construit un véritable État avec une administration et une armée régulière.",
    lien: { type: "personnage", id: "abdelkader" }
  },
  
  // Villes et Sites
  {
    id: 6,
    categorie: "Villes & Sites",
    difficulte: "facile",
    question: "Quelle ville était la capitale des rois numides ?",
    options: ["Alger", "Oran", "Constantine", "Tlemcen"],
    reponseCorrect: 2,
    explication: "Constantine, anciennement Cirta, fut la capitale de Massinissa et des rois numides. Elle est perchée sur un rocher entaillé de gorges vertigineuses.",
    lien: { type: "ville", id: "constantine" }
  },
  {
    id: 7,
    categorie: "Villes & Sites",
    difficulte: "moyen",
    question: "Quelle ville romaine d'Algérie, fondée par Trajan en 100 ap. J.-C., est classée UNESCO ?",
    options: ["Djemila", "Tipaza", "Timgad", "Cherchell"],
    reponseCorrect: 2,
    explication: "Timgad (Thamugadi) a été fondée en 100 ap. J.-C. pour les vétérans de la légion III Augusta. Son plan orthogonal parfait en fait l'une des villes romaines les mieux conservées.",
    lien: { type: "ville", id: "timgad" }
  },
  {
    id: 8,
    categorie: "Villes & Sites",
    difficulte: "moyen",
    question: "Quelle ville était la capitale des Zianides (XIIIe-XVIe siècle) ?",
    options: ["Béjaïa", "Tlemcen", "Constantine", "Médéa"],
    reponseCorrect: 1,
    explication: "Tlemcen, surnommée 'Perle du Maghreb', fut la capitale des Zianides. C'était une ville de cour, de poésie, de théologie et d'artisanat raffiné.",
    lien: { type: "ville", id: "tlemcen" }
  },
  {
    id: 9,
    categorie: "Villes & Sites",
    difficulte: "difficile",
    question: "Le Tassili n'Ajjer est classé UNESCO pour quel type de patrimoine ?",
    options: ["Architecture islamique", "Art rupestre préhistorique", "Ville romaine", "Oasis saharienne"],
    reponseCorrect: 1,
    explication: "Le Tassili n'Ajjer abrite le plus grand ensemble d'art rupestre préhistorique du monde, avec des milliers de gravures et peintures datées entre 10 000 et 1 500 ans av. J.-C.",
    lien: { type: "site", id: "tassili" }
  },
  {
    id: 10,
    categorie: "Villes & Sites",
    difficulte: "moyen",
    question: "Quelle ville algérienne a donné son nom aux 'bougies' (chandelles) ?",
    options: ["Alger", "Oran", "Béjaïa", "Annaba"],
    reponseCorrect: 2,
    explication: "Béjaïa (anciennement Bougie) était un centre important d'exportation de cire. Le mot français 'bougie' vient directement du nom de cette ville.",
    lien: { type: "ville", id: "bejaia" }
  },

  // Périodes historiques
  {
    id: 11,
    categorie: "Périodes",
    difficulte: "facile",
    question: "En quelle année l'Algérie a-t-elle obtenu son indépendance ?",
    options: ["1954", "1958", "1962", "1965"],
    reponseCorrect: 2,
    explication: "L'Algérie a obtenu son indépendance le 5 juillet 1962, après les Accords d'Évian signés le 18 mars 1962.",
    lien: { type: "periode", id: "algerie_independante" }
  },
  {
    id: 12,
    categorie: "Périodes",
    difficulte: "moyen",
    question: "La régence d'Alger sous domination ottomane a duré de 1516 jusqu'à quelle année ?",
    options: ["1792", "1815", "1830", "1848"],
    reponseCorrect: 2,
    explication: "La régence d'Alger a pris fin avec la prise d'Alger par les troupes françaises en 1830, mettant fin à trois siècles de présence ottomane.",
    lien: { type: "periode", id: "regence_ottomane" }
  },
  {
    id: 13,
    categorie: "Périodes",
    difficulte: "difficile",
    question: "Quelle bataille en 202 av. J.-C. a vu Massinissa combattre aux côtés de Rome contre Carthage ?",
    options: ["Bataille de Cannes", "Bataille de Zama", "Bataille de Thapsus", "Bataille du Métaure"],
    reponseCorrect: 1,
    explication: "À la bataille de Zama, Massinissa combattit aux côtés de Scipion l'Africain contre Hannibal, ce qui lui valut la reconnaissance de Rome pour son royaume étendu.",
    lien: { type: "personnage", id: "massinissa" }
  },
  {
    id: 14,
    categorie: "Périodes",
    difficulte: "moyen",
    question: "Quel événement tragique s'est produit le 8 mai 1945 en Algérie ?",
    options: ["Déclenchement de la guerre d'indépendance", "Massacres de Sétif", "Signature des Accords d'Évian", "Arrivée de De Gaulle"],
    reponseCorrect: 1,
    explication: "Le 8 mai 1945, jour de la victoire en Europe, des manifestations nationalistes à Sétif et dans la région ont été violemment réprimées, faisant des milliers de victimes.",
    lien: { type: "periode", id: "colonisation" }
  },
  {
    id: 15,
    categorie: "Périodes",
    difficulte: "facile",
    question: "Quelle date marque le début de la guerre d'indépendance algérienne ?",
    options: ["8 mai 1945", "1er novembre 1954", "13 mai 1958", "19 mars 1962"],
    reponseCorrect: 1,
    explication: "Le 1er novembre 1954, le Front de Libération Nationale (FLN) a déclenché l'insurrection armée contre la présence française, marquant le début de la guerre d'Algérie.",
    lien: { type: "periode", id: "guerre_independance" }
  },

  // Culture
  {
    id: 16,
    categorie: "Culture",
    difficulte: "facile",
    question: "Quel genre musical est originaire d'Oran ?",
    options: ["Chaâbi", "Raï", "Gnawa", "Andalou"],
    reponseCorrect: 1,
    explication: "Le Raï est un genre musical né dans l'Oranie, mêlant traditions bédouines et influences occidentales. Ses figures emblématiques incluent Cheikha Remitti et Cheb Khaled.",
    lien: null
  },
  {
    id: 17,
    categorie: "Culture",
    difficulte: "moyen",
    question: "Quel film algérien a remporté la Palme d'Or à Cannes en 1975 ?",
    options: ["La Bataille d'Alger", "Omar Gatlato", "Chronique des années de braise", "Z"],
    reponseCorrect: 2,
    explication: "Chronique des années de braise de Mohammed Lakhdar-Hamina a remporté la Palme d'Or en 1975. C'est une fresque historique de l'Algérie coloniale.",
    lien: null
  },
  {
    id: 18,
    categorie: "Culture",
    difficulte: "difficile",
    question: "Quel système d'écriture ancien est l'ancêtre du tifinagh contemporain ?",
    options: ["Phénicien", "Punique", "Libyque", "Grec"],
    reponseCorrect: 2,
    explication: "L'alphabet libyque est l'écriture ancêtre du tifinagh, utilisé aujourd'hui par les Touaregs et officialisé pour noter l'ensemble des variantes du tamazight.",
    lien: { type: "glossaire", id: "Tifinagh" }
  },
  {
    id: 19,
    categorie: "Culture",
    difficulte: "moyen",
    question: "La Casbah d'Alger est classée au patrimoine mondial de l'UNESCO depuis quelle année ?",
    options: ["1980", "1982", "1992", "2002"],
    reponseCorrect: 2,
    explication: "La Casbah d'Alger, médina ottomane, a été classée au patrimoine mondial de l'UNESCO en 1992.",
    lien: { type: "ville", id: "alger" }
  },
  {
    id: 20,
    categorie: "Culture",
    difficulte: "difficile",
    question: "Qui a fondé l'Association des Oulémas Musulmans Algériens en 1931 ?",
    options: ["Messali Hadj", "Ferhat Abbas", "Ibn Badis", "Ahmed Ben Bella"],
    reponseCorrect: 2,
    explication: "Abd al-Hamid Ibn Badis a fondé l'AOMA en 1931. Sa devise était : 'L'islam est ma religion, l'arabe est ma langue, l'Algérie est ma patrie'.",
    lien: { type: "personnage", id: "ibn_badis" }
  }
];

export const QUIZ_CATEGORIES = [
  { id: "tous", label: "Toutes catégories", icon: "star" },
  { id: "Personnages", label: "Personnages", icon: "user" },
  { id: "Villes & Sites", label: "Villes & Sites", icon: "map-pin" },
  { id: "Périodes", label: "Périodes", icon: "clock" },
  { id: "Culture", label: "Culture", icon: "palette" }
];

export const DIFFICULTY_LEVELS = [
  { id: "tous", label: "Tous niveaux", color: "#C4A35A" },
  { id: "facile", label: "Facile", color: "#2D5A27" },
  { id: "moyen", label: "Moyen", color: "#B8860B" },
  { id: "difficile", label: "Difficile", color: "#8B1A1A" }
];
