# EHIA — Encyclopédie Historique Illustrée de l'Algérie
## Product Requirements Document

### Original Problem Statement
Créer une application web encyclopédique illustrée sur l'histoire de l'Algérie, couvrant de la préhistoire à nos jours. Direction artistique inspirée d'un grand atlas historique du XVIIIe siècle avec parchemin, encres sépia et or antique.

### Architecture
- **Frontend**: React avec Context API pour state management
- **Backend**: FastAPI (minimal, app statique avec données intégrées)
- **Database**: MongoDB (non utilisé pour cette version statique)
- **Design System**: Style atlas historique avec palette personnalisée (parchment, sand, earth, ink, gold, etc.)
- **Typography**: Cinzel Decorative, Cormorant Garamond, Source Serif 4, Crimson Pro, Josefin Sans

### User Personas
1. **Étudiants en histoire** - Recherchent des informations fiables et sourcées
2. **Chercheurs** - Besoin d'indicateurs de certitude historiographique
3. **Grand public cultivé** - Navigation intuitive et visuelle
4. **Passionnés d'histoire algérienne** - Contenu approfondi avec sources

### Core Requirements (Static)
- [x] Frise chronologique interactive
- [x] Drawer latéral pour fiches détaillées
- [x] Cartes SVG interactives de l'Algérie
- [x] Moteur de recherche fulltext
- [x] Indicateurs de niveau de certitude historiographique
- [x] Navigation par sections thématiques
- [x] Design d'atlas historique XVIIIe siècle

### What's Been Implemented (December 2024)
- **HomePage**: Hero section, frise chronologique, grille de sections, articles vedettes
- **PeriodesPage**: Liste des 10 périodes historiques avec détails et événements clés
- **PersonnagesPage**: 8 personnages majeurs avec biographies complètes
- **VillesPage**: 8 villes historiques + carte SVG interactive
- **AtlasPage**: Carte interactive + catalogue de cartes
- **ArtsPage**: 4 onglets (Architecture, Musique, Littérature, Cinéma)
- **GlossairePage**: 12 termes organisés alphabétiquement
- **FrisesPage**: Frise chronologique étendue
- **PeuplesPage**: 8 groupes ethniques/populations
- **BibliographiePage**: Sources et crédits
- **Drawer**: Panneau latéral avec navigation en fil d'Ariane
- **Header**: Navigation responsive avec recherche
- **Footer**: Navigation et crédits

### Prioritized Backlog

#### P0 (Critical) - Completed
- [x] Structure de navigation complète
- [x] Toutes les données encyclopédiques intégrées
- [x] Drawer fonctionnel pour toutes les entités
- [x] Recherche fulltext

#### P1 (High Priority) - Future
- [ ] Ajouter plus de personnages historiques (50+)
- [ ] Enrichir le glossaire (100+ termes)
- [ ] Ajouter plus de villes et sites (30+)
- [ ] Cartes SVG par période historique

#### P2 (Medium Priority) - Future
- [ ] Mode sombre/clair
- [ ] Export PDF des fiches
- [ ] Partage social des fiches
- [ ] Favoris/signets utilisateur

### Next Tasks
1. Enrichir la base de données avec plus de personnages
2. Ajouter des images historiques (domaine public)
3. Créer des cartes par période historique
4. Implémenter un système de commentaires/contributions
5. Ajouter des sources bibliographiques détaillées par fiche
