// EHIA - Base relationnelle - DYNASTIES
// Structure complète avec relations

export const DYNASTIES = [
  // ============ ROYAUMES BERBÈRES ANTIQUES ============
  {
    id: "massyles",
    name: "Royaume des Massyles",
    start_year: -300,
    end_year: -46,
    capital: "cirta",
    territory: "Numidie orientale (est algérien actuel)",
    description: "Confédération berbère de l'est de la Numidie, unifiée par Massinissa avec les Masaesyles pour former le royaume de Numidie. Les Massyles fournirent la lignée royale principale jusqu'à la conquête romaine.",
    important_rulers: ["massinissa", "micipsa", "jugurtha", "juba_i"],
    related_events: ["unification_numidie", "guerre_jugurthine", "bataille_thapsus"],
    related_cities: ["cirta", "zama", "hippo_regius"],
    map_reference: "carte_royaumes_numides",
    sources: ["gsell_1918", "camps_1960"]
  },
  {
    id: "masaesyles",
    name: "Royaume des Masaesyles",
    start_year: -300,
    end_year: -203,
    capital: "siga",
    territory: "Numidie occidentale (ouest algérien actuel)",
    description: "Confédération berbère de l'ouest de la Numidie, rivale puis intégrée aux Massyles. Syphax en fut le dernier roi indépendant avant sa défaite face à Massinissa et Rome.",
    important_rulers: ["syphax"],
    related_events: ["bataille_grandes_plaines"],
    related_cities: ["siga"],
    map_reference: "carte_royaumes_numides",
    sources: ["gsell_1918"]
  },
  {
    id: "mauretanie",
    name: "Royaume de Maurétanie",
    start_year: -300,
    end_year: 40,
    capital: "caesarea",
    territory: "Maghreb occidental (Maroc et ouest algérien)",
    description: "Grand royaume berbère occidental, divisé à la mort de Bocchus II entre Maurétanie Tingitane (Maroc) et Maurétanie Césarienne (ouest algérien). Juba II, placé par Auguste, fut son dernier grand roi avant l'annexion romaine.",
    important_rulers: ["bocchus_i", "bocchus_ii", "juba_ii"],
    related_events: ["trahison_bocchus", "annexion_mauretanie"],
    related_cities: ["caesarea", "iol", "tipaza"],
    map_reference: "carte_mauretanie",
    sources: ["gsell_1918"]
  },

  // ============ DOMINATION ROMAINE ============
  {
    id: "rome_afrique",
    name: "Empire romain (provinces africaines)",
    start_year: -146,
    end_year: 430,
    capital: "carthage",
    territory: "Africa Proconsularis, Numidie, Maurétanies",
    description: "Domination romaine sur l'Afrique du Nord pendant près de six siècles. Les provinces africaines (Proconsularis, Numidie, Maurétanie Césarienne et Sitifienne) furent parmi les plus prospères de l'Empire, fournissant blé, huile et intellectuels.",
    important_rulers: [],
    related_events: ["destruction_carthage", "fondation_timgad"],
    related_cities: ["carthage", "cirta", "timgad", "djemila", "tipaza"],
    map_reference: "carte_provinces_romaines",
    sources: ["lepelley_1979"]
  },

  // ============ PÉRIODE VANDALE ET BYZANTINE ============
  {
    id: "vandales",
    name: "Royaume vandale",
    start_year: 429,
    end_year: 534,
    capital: "carthage",
    territory: "Afrique du Nord (Tunisie, est algérien)",
    description: "Royaume germanique arien établi après la traversée du détroit de Gibraltar. Les Vandales contrôlèrent l'Afrique du Nord pendant un siècle avant la reconquête byzantine. Leur domination fut marquée par des persécutions religieuses et le déclin des villes.",
    important_rulers: ["genseric"],
    related_events: ["prise_carthage_vandale", "sac_rome_455"],
    related_cities: ["carthage", "hippo_regius"],
    map_reference: "carte_vandales",
    sources: ["modéran_2014"]
  },
  {
    id: "byzantins",
    name: "Empire byzantin (Afrique)",
    start_year: 534,
    end_year: 698,
    capital: "carthage",
    territory: "Afrique du Nord (zones côtières)",
    description: "Reconquête de l'Afrique par Justinien menée par Bélisaire (533-534). L'autorité byzantine resta fragile, contestée par les révoltes berbères et finalement supplantée par la conquête arabe.",
    important_rulers: ["belisaire"],
    related_events: ["reconquete_byzantine", "conquete_arabe"],
    related_cities: ["carthage"],
    map_reference: "carte_byzantine",
    sources: ["pringle_1981"]
  },

  // ============ DYNASTIES ISLAMIQUES ============
  {
    id: "rostomides",
    name: "Dynastie rostémide",
    start_year: 761,
    end_year: 909,
    capital: "tahert",
    territory: "Maghreb central",
    description: "Premier État ibadite d'Afrique du Nord, fondé par Abd al-Rahman ibn Rostom. Tahert devint 'l'Irak du Maghreb', carrefour commercial et intellectuel entre Méditerranée et Sahara. La dynastie fut renversée par les Fatimides.",
    important_rulers: ["ibn_rostom"],
    related_events: ["fondation_tahert", "destruction_rostomides"],
    related_cities: ["tahert"],
    map_reference: "carte_rostomides",
    sources: ["lewicki_1976"]
  },
  {
    id: "fatimides",
    name: "Dynastie fatimide",
    start_year: 909,
    end_year: 1171,
    capital: "mahdia",
    territory: "Ifriqiya, puis Égypte",
    description: "Dynastie chiite ismaélienne fondée en Ifriqiya qui conquit l'Égypte (969) et fonda Le Caire. Ils laissèrent le gouvernement du Maghreb aux Zirides. Leur doctrine hétérodoxe suscita des résistances.",
    important_rulers: ["ubayd_allah_mahdi", "al_muizz"],
    related_events: ["proclamation_fatimide", "conquete_egypte"],
    related_cities: ["mahdia", "kairouan", "le_caire"],
    map_reference: "carte_fatimides",
    sources: ["halm_1991"]
  },
  {
    id: "zirides",
    name: "Dynastie ziride",
    start_year: 972,
    end_year: 1152,
    capital: "kairouan",
    territory: "Ifriqiya, Maghreb central",
    description: "Dynastie berbère sanhadjienne, vassale puis indépendante des Fatimides. La rupture avec Le Caire (1048) entraîna l'envoi des tribus hilaliennes qui dévastèrent l'Ifriqiya. Les Zirides se replièrent sur Mahdia.",
    important_rulers: ["ziri_ibn_manad", "bologhine_ibn_ziri", "al_muizz_ibn_badis"],
    related_events: ["rupture_fatimides", "invasion_hilalienne"],
    related_cities: ["achir", "kairouan", "mahdia"],
    map_reference: "carte_zirides",
    sources: ["idris_1962"]
  },
  {
    id: "hammadides",
    name: "Dynastie hammadide",
    start_year: 1014,
    end_year: 1152,
    capital: "qalat_beni_hammad",
    territory: "Maghreb central",
    description: "Branche dissidente des Zirides fondée par Hammad ibn Bologhine. La Qal'a des Beni Hammad puis Béjaïa furent des capitales brillantes. Les Hammadides furent absorbés par les Almohades.",
    important_rulers: ["hammad_ibn_bologhine", "en_nasir"],
    related_events: ["fondation_qalat_hammad", "transfert_bejaia"],
    related_cities: ["qalat_beni_hammad", "bejaia"],
    map_reference: "carte_hammadides",
    sources: ["golvin_1957"]
  },
  {
    id: "almoravides",
    name: "Empire almoravide",
    start_year: 1040,
    end_year: 1147,
    capital: "marrakech",
    territory: "Maghreb occidental, Al-Andalus",
    description: "Empire berbère sanhadjien saharien fondé sur un rigorisme religieux malékite. Ils conquirent le Maroc, l'ouest algérien et l'Espagne musulmane. Leur influence au Maghreb central resta limitée.",
    important_rulers: ["yusuf_ibn_tashfin"],
    related_events: ["bataille_zallaqa"],
    related_cities: ["marrakech", "tlemcen"],
    map_reference: "carte_almoravides",
    sources: ["bosch_vila_1956"]
  },
  {
    id: "almohades",
    name: "Empire almohade",
    start_year: 1121,
    end_year: 1269,
    capital: "marrakech",
    territory: "Maghreb entier, Al-Andalus",
    description: "Empire berbère masmoudien fondé sur la doctrine du tawhid (unicité divine) d'Ibn Tumart. Ils unifièrent le Maghreb pour la dernière fois, de l'Atlantique à la Tripolitaine. Leur défaite à Las Navas de Tolosa (1212) marqua le début du déclin.",
    important_rulers: ["ibn_tumart", "abd_al_mumin"],
    related_events: ["prise_marrakech", "bataille_navas_tolosa"],
    related_cities: ["tinmel", "marrakech", "rabat", "bejaia"],
    map_reference: "carte_almohades",
    sources: ["le_tourneau_1969"]
  },
  {
    id: "hafsides",
    name: "Dynastie hafside",
    start_year: 1229,
    end_year: 1574,
    capital: "tunis",
    territory: "Ifriqiya (Tunisie, est algérien)",
    description: "Successeurs des Almohades en Ifriqiya. Leur longue durée (trois siècles et demi) en fit l'une des dynasties les plus stables du Maghreb. Constantine et l'est algérien relevaient souvent de leur zone d'influence.",
    important_rulers: ["abu_zakariya"],
    related_events: [],
    related_cities: ["tunis", "constantine", "bejaia"],
    map_reference: "carte_hafsides",
    sources: ["brunschvig_1940"]
  },
  {
    id: "zianides",
    name: "Dynastie zianide (Abdalwadides)",
    start_year: 1235,
    end_year: 1556,
    capital: "tlemcen",
    territory: "Maghreb central",
    description: "Dynastie berbère zénète fondée par Yaghmoracen ibn Zyan. Leur royaume de Tlemcen, coincé entre Mérinides et Hafsides, connut une histoire tumultueuse mais un grand rayonnement culturel. Tlemcen devint 'la perle du Maghreb'.",
    important_rulers: ["yaghmurasen_ibn_zyan", "abu_hammu_musa_ii"],
    related_events: ["fondation_tlemcen", "sieges_merinides"],
    related_cities: ["tlemcen", "mansourah", "oran"],
    map_reference: "carte_zianides",
    sources: ["yahia_ibn_khaldoun"]
  },
  {
    id: "merinides",
    name: "Dynastie mérinide",
    start_year: 1244,
    end_year: 1465,
    capital: "fes",
    territory: "Maroc, incursions au Maghreb central",
    description: "Dynastie berbère zénète du Maroc, rivale acharnée des Zianides. Ils assiégèrent Tlemcen à plusieurs reprises, fondant le camp fortifié de Mansourah. Leurs interventions au Maghreb central furent récurrentes mais jamais durables.",
    important_rulers: ["abu_al_hasan_ali"],
    related_events: ["siege_tlemcen_1299", "siege_tlemcen_1335"],
    related_cities: ["fes", "mansourah", "tlemcen"],
    map_reference: "carte_merinides",
    sources: ["kably_1999"]
  },

  // ============ PÉRIODE OTTOMANE ============
  {
    id: "regence_alger",
    name: "Régence d'Alger",
    start_year: 1516,
    end_year: 1830,
    capital: "alger",
    territory: "Algérie actuelle (hors Sahara profond)",
    description: "État vassal puis autonome de l'Empire ottoman, gouverné par des pachas puis des deys élus par les janissaires. La régence était divisée en trois beyliks (Ouest, Titteri, Est). Puissance maritime redoutée, elle fut conquise par la France en 1830.",
    important_rulers: ["aroudj_barberousse", "khayr_ad_din_barberousse", "hassan_agha"],
    related_events: ["prise_alger_1516", "expedition_charles_quint", "prise_alger_1830"],
    related_cities: ["alger", "constantine", "oran", "medea"],
    map_reference: "carte_regence_alger",
    sources: ["merouche_2007"]
  },

  // ============ PÉRIODE COLONIALE ============
  {
    id: "france_coloniale",
    name: "Algérie française",
    start_year: 1830,
    end_year: 1962,
    capital: "alger",
    territory: "Algérie actuelle",
    description: "Colonie de peuplement française, administrativement intégrée comme départements français. 132 ans de domination marqués par la confiscation des terres, le Code de l'indigénat, les révoltes et la guerre d'indépendance (1954-1962).",
    important_rulers: [],
    related_events: ["prise_alger_1830", "insurrection_1871", "massacres_setif", "toussaint_rouge", "accords_evian"],
    related_cities: ["alger", "oran", "constantine"],
    map_reference: "carte_algerie_francaise",
    sources: ["ageron_1979", "stora_1991"]
  },

  // ============ ALGÉRIE INDÉPENDANTE ============
  {
    id: "algerie_independante",
    name: "République algérienne",
    start_year: 1962,
    end_year: null,
    capital: "alger",
    territory: "Algérie actuelle",
    description: "État indépendant depuis le 5 juillet 1962. République à parti unique (FLN) jusqu'en 1989, puis multipartisme marqué par la guerre civile des années 1990. Plus grand pays d'Afrique par la superficie.",
    important_rulers: ["ben_bella", "boumediene"],
    related_events: ["independance_1962", "coup_etat_1965", "emeutes_1988", "guerre_civile"],
    related_cities: ["alger"],
    map_reference: "carte_algerie_contemporaine",
    sources: ["stora_2001"]
  }
];

export default DYNASTIES;
