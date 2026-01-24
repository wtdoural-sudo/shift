# CLAUDE.md - Guide pour les assistants IA

Ce document décrit la structure, les conventions et les pratiques de développement du projet **TenderOps** pour guider les assistants IA dans leurs contributions.

## Vue d'ensemble du projet

**TenderOps** est un "Procurement Response OS" - un outil SaaS B2B pour les agences qui répondent aux appels d'offres. Le produit aide à :
- Structurer les réponses aux appels d'offres
- Réduire le temps perdu et éviter les non-conformités
- Capitaliser le travail déjà fait
- Donner de la visibilité au pilotage (bid coach)

**Important** : Le produit ne promet PAS de faire gagner des appels d'offres. Il s'agit d'un outil de structuration et de pilotage.

## Stack technique

| Composant | Technologie |
|-----------|-------------|
| Frontend | Next.js 14 (App Router), TypeScript, React 18 |
| Styling | Tailwind CSS, shadcn/ui |
| Backend | Next.js API Routes |
| Base de données | PostgreSQL 16, Prisma ORM |
| Authentification | NextAuth.js (Credentials provider) |
| Tests | Vitest |
| Conteneurisation | Docker Compose |

## Architecture

### Multi-tenant
- L'entité centrale est le **Workspace**
- Toutes les données sont isolées par workspace
- Les utilisateurs sont liés aux workspaces via `WorkspaceMember`

### RBAC (Role-Based Access Control)
- **ADMIN** : Accès complet, gestion des membres
- **EDITOR** : Création et modification des contenus
- **VIEWER** : Lecture seule

### Structure des dossiers

```
/home/user/shift/
├── prisma/
│   ├── schema.prisma          # Schéma Prisma complet
│   └── seed.ts                # Données de démonstration
├── src/
│   ├── app/
│   │   ├── (protected)/       # Routes authentifiées
│   │   │   ├── dossiers/      # Gestion des appels d'offres
│   │   │   ├── preuves/       # Bibliothèque de preuves
│   │   │   ├── parametres/    # Paramètres workspace
│   │   │   └── tableau-de-bord/
│   │   ├── (public)/          # Routes publiques
│   │   │   └── connexion/     # Page de login
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # NextAuth
│   │   │   ├── dossiers/      # CRUD dossiers
│   │   │   ├── preuves/       # CRUD preuves
│   │   │   └── workspace/     # Gestion workspace
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── providers.tsx
│   ├── components/
│   │   ├── layout/            # Sidebar, Header
│   │   └── ui/                # Composants shadcn/ui
│   ├── lib/
│   │   ├── api-utils.ts       # Helpers API (withAuth, etc.)
│   │   ├── audit.ts           # Logging d'audit
│   │   ├── auth.ts            # Configuration NextAuth
│   │   ├── pdf.ts             # Extraction texte PDF
│   │   ├── prisma.ts          # Client Prisma singleton
│   │   ├── storage.ts         # Gestion fichiers locaux
│   │   └── utils.ts           # Utilitaires généraux
│   ├── types/
│   │   └── next-auth.d.ts     # Types NextAuth étendus
│   └── __tests__/             # Tests Vitest
├── storage/                   # Stockage fichiers (gitignore)
├── docker-compose.yml
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Entités métier (Prisma)

| Entité | Description |
|--------|-------------|
| `Workspace` | Organisation/tenant |
| `User` | Utilisateur avec email/password |
| `WorkspaceMember` | Liaison User-Workspace avec rôle |
| `Dossier` | Appel d'offres |
| `DCE` | Document de consultation uploadé |
| `Exigence` | Exigence extraite du DCE |
| `GoNoGoDecision` | Décision Go/No-Go avec scoring |
| `ChecklistItem` | Item de checklist conformité |
| `Tache` | Tâche avec assignation |
| `Preuve` | Document réutilisable (CV, référence, etc.) |
| `DossierPreuve` | Liaison Dossier-Preuve |
| `MemoireTechnique` | Contenu du mémoire par sections |
| `Export` | Historique des exports PDF |
| `AuditEvent` | Log d'audit |

## Conventions de code

### Langue
- **Code** : Anglais (variables, fonctions, commentaires techniques)
- **UI/UX** : Français (labels, messages, contenus affichés)
- **Commits** : Français ou anglais

### TypeScript
- Mode strict activé
- Utiliser les types Prisma générés
- Éviter `any`, préférer `unknown` si nécessaire

### Composants React
- Composants serveur par défaut (RSC)
- `"use client"` uniquement si nécessaire (hooks, événements)
- Props typées avec interfaces

### API Routes
- Utiliser le wrapper `withAuth()` de `lib/api-utils.ts`
- Validation avec Zod
- Réponses via `apiSuccess()` / `apiError()`

```typescript
// Exemple d'API route
export const GET = withAuth(async (req, { workspaceId }) => {
  const data = await prisma.dossier.findMany({
    where: { workspaceId },
  })
  return apiSuccess(data)
})

export const POST = withAuth(async (req, { workspaceId, session }) => {
  const body = await req.json()
  const validation = schema.safeParse(body)
  if (!validation.success) {
    return apiError(validation.error.errors[0].message)
  }
  // ...
}, ["ADMIN", "EDITOR"]) // Rôles autorisés
```

### Styles
- Tailwind CSS uniquement
- Composants shadcn/ui pour l'UI
- Variables CSS dans `globals.css`
- Design sobre et professionnel (pas de marketing flashy)

### Gestion des erreurs
- `try/catch` dans les API routes
- Toast pour feedback utilisateur côté client
- Logging console côté serveur

## Commandes utiles

```bash
# Développement
npm run dev                # Serveur dev sur :3000
npm run db:studio          # Interface Prisma

# Base de données
npm run db:generate        # Génère client Prisma
npm run db:push           # Pousse schéma (dev)
npm run db:migrate        # Crée migration
npm run db:seed           # Seed données démo
npm run db:reset          # Reset complet

# Tests et build
npm run test              # Tests Vitest
npm run lint              # ESLint
npm run build             # Build production
```

## Patterns récurrents

### Récupération du workspace courant
```typescript
const session = await getSession()
const workspaceId = session?.user?.workspaces?.[0]?.id
```

### Vérification d'appartenance au workspace
```typescript
const dossier = await prisma.dossier.findFirst({
  where: { id: params.id, workspaceId },
})
if (!dossier) return apiError("Non trouvé", 404)
```

### Audit logging
```typescript
await logAuditEvent({
  action: "CREATE",
  entityType: "Dossier",
  entityId: dossier.id,
  description: `Création du dossier ${dossier.reference}`,
  userId: session.user.id,
  workspaceId,
})
```

### Composant page protégée
```typescript
export default async function Page() {
  const session = await getSession()
  const workspaceId = session?.user?.workspaces?.[0]?.id

  if (!workspaceId) {
    return <div>Aucun workspace</div>
  }

  const data = await fetchData(workspaceId)
  return <Component data={data} />
}
```

## Points d'attention

### Sécurité
- Toujours vérifier l'appartenance au workspace
- Ne jamais exposer d'ID utilisateur sans vérification
- Validation Zod sur toutes les entrées API
- Hash bcrypt pour les mots de passe

### Performance
- Utiliser `include` Prisma avec parcimonie
- Préférer les requêtes parallèles (`Promise.all`)
- Composants serveur pour les données statiques

### Multi-tenant
- TOUJOURS filtrer par `workspaceId`
- Jamais d'accès cross-workspace
- Isolation stricte des données

## Fonctionnalités à développer

Les fonctionnalités suivantes ne sont pas encore implémentées :
- Export PDF réel (actuellement simulé)
- Upload S3 (abstraction prête, implémentation locale)
- Modification du seuil Go/No-Go en interface
- Suppression de membres du workspace
- Réorganisation drag & drop des exigences/checklist
- Notifications et alertes email
- Intégration IA pour extraction d'exigences améliorée

## Variables d'environnement

| Variable | Description | Défaut |
|----------|-------------|--------|
| `DATABASE_URL` | URL PostgreSQL | - |
| `NEXTAUTH_SECRET` | Secret JWT | - |
| `NEXTAUTH_URL` | URL de l'app | http://localhost:3000 |
| `STORAGE_PATH` | Chemin stockage fichiers | ./storage |

## Tests

Les tests sont écrits avec Vitest. Exécuter :

```bash
npm run test        # Mode watch
npm run test:run    # Exécution unique
```

Fichiers de test dans `src/__tests__/`.

## Déploiement

Pour un déploiement production :

1. Configurer les variables d'environnement
2. `npm run db:migrate:prod` pour les migrations
3. `npm run build` pour le build
4. `npm run start` pour démarrer

## Contact et support

Projet TenderOps - Gestion des réponses aux appels d'offres.
