# TenderOps

**Structurez vos réponses aux appels d'offres.**

TenderOps est un outil SaaS destiné aux agences (design, communication, conseil) qui répondent à des appels d'offres publics ou privés. Ce n'est pas un outil qui promet de "faire gagner" des marchés, mais un système de pilotage qui permet de :

- Structurer la réponse
- Réduire le temps perdu
- Éviter les non-conformités
- Capitaliser le travail déjà fait
- Donner de la visibilité au pilotage

## Fonctionnalités

### 1. Gestion des dossiers
- Création et suivi des dossiers d'appels d'offres
- Upload et analyse des DCE (Documents de Consultation)
- Extraction automatique des exigences

### 2. Décision Go / No-Go
- Scoring sur 5 critères stratégiques
- Seuil paramétrable par workspace
- Historique des décisions avec justification

### 3. Conformité et pilotage
- Checklist de conformité personnalisable
- Gestion des tâches avec échéances
- Vue pré-dépôt des points bloquants

### 4. Bibliothèque de preuves
- Centralisation des références, CV, certifications
- Tags et recherche
- Réutilisation entre dossiers

### 5. Mémoire technique
- Éditeur Markdown par sections
- Insertion de preuves
- Export PDF (à venir)

## Stack technique

- **Frontend** : Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend** : Next.js API Routes
- **Base de données** : PostgreSQL + Prisma
- **Authentification** : NextAuth.js (Credentials)
- **Architecture** : Multi-tenant avec isolation par workspace

## Installation

### Prérequis
- Node.js 18+
- Docker et Docker Compose
- pnpm, npm ou yarn

### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/wtdoural-sudo/shift.git
cd shift
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer l'environnement**
```bash
cp .env.example .env
```

4. **Démarrer PostgreSQL**
```bash
docker-compose up -d
```

5. **Initialiser la base de données**
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

6. **Lancer le serveur de développement**
```bash
npm run dev
```

7. **Accéder à l'application**
Ouvrir [http://localhost:3000](http://localhost:3000)

## Comptes de démonstration

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Admin | admin@tenderops.fr | admin123 |
| Éditeur | editor@tenderops.fr | editor123 |

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | Vérification ESLint |
| `npm run db:generate` | Génère le client Prisma |
| `npm run db:push` | Pousse le schéma en base |
| `npm run db:migrate` | Crée une migration |
| `npm run db:seed` | Peuple la base avec des données de démo |
| `npm run db:studio` | Interface Prisma Studio |
| `npm run test` | Lance les tests |

## Structure du projet

```
├── prisma/
│   ├── schema.prisma      # Schéma de la base de données
│   └── seed.ts            # Données de démonstration
├── src/
│   ├── app/
│   │   ├── (protected)/   # Pages authentifiées
│   │   ├── (public)/      # Pages publiques
│   │   └── api/           # Routes API
│   ├── components/
│   │   ├── layout/        # Composants de layout
│   │   └── ui/            # Composants shadcn/ui
│   ├── lib/               # Utilitaires et configurations
│   └── types/             # Types TypeScript
├── storage/               # Stockage local des fichiers
└── docker-compose.yml     # Configuration PostgreSQL
```

## Rôles et permissions

| Action | Admin | Editor | Viewer |
|--------|-------|--------|--------|
| Voir les dossiers | ✅ | ✅ | ✅ |
| Créer/Modifier dossiers | ✅ | ✅ | ❌ |
| Supprimer dossiers | ✅ | ❌ | ❌ |
| Gérer les membres | ✅ | ❌ | ❌ |

## Licence

Projet privé - Tous droits réservés.
