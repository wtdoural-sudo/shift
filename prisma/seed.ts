import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding de la base de données...")

  // 1. Créer le workspace démo
  const workspace = await prisma.workspace.upsert({
    where: { slug: "demo-agency" },
    update: {},
    create: {
      name: "Agence Démo",
      slug: "demo-agency",
      description: "Espace de travail de démonstration",
      goNoGoThreshold: 15,
    },
  })
  console.log("✅ Workspace créé:", workspace.name)

  // 2. Créer l'utilisateur admin
  const adminPassword = await hash("admin123", 12)
  const admin = await prisma.user.upsert({
    where: { email: "admin@tenderops.fr" },
    update: {},
    create: {
      email: "admin@tenderops.fr",
      firstName: "Jean",
      lastName: "Dupont",
      passwordHash: adminPassword,
    },
  })
  console.log("✅ Admin créé:", admin.email)

  // Lier l'admin au workspace
  await prisma.workspaceMember.upsert({
    where: {
      userId_workspaceId: {
        userId: admin.id,
        workspaceId: workspace.id,
      },
    },
    update: {},
    create: {
      userId: admin.id,
      workspaceId: workspace.id,
      role: "ADMIN",
    },
  })

  // 3. Créer un utilisateur éditeur
  const editorPassword = await hash("editor123", 12)
  const editor = await prisma.user.upsert({
    where: { email: "editor@tenderops.fr" },
    update: {},
    create: {
      email: "editor@tenderops.fr",
      firstName: "Marie",
      lastName: "Martin",
      passwordHash: editorPassword,
    },
  })

  await prisma.workspaceMember.upsert({
    where: {
      userId_workspaceId: {
        userId: editor.id,
        workspaceId: workspace.id,
      },
    },
    update: {},
    create: {
      userId: editor.id,
      workspaceId: workspace.id,
      role: "EDITOR",
    },
  })
  console.log("✅ Éditeur créé:", editor.email)

  // 4. Créer des preuves réutilisables
  const preuvesData = [
    {
      titre: "Certification ISO 9001:2015",
      description: "Certification qualité obtenue en 2022, renouvelée en 2023",
      type: "CERTIFICATION" as const,
      tags: ["qualité", "iso9001", "certification"],
      workspaceId: workspace.id,
    },
    {
      titre: "CV - Jean Dupont, Directeur de projet",
      description: "15 ans d'expérience en gestion de projets complexes",
      type: "CV" as const,
      tags: ["cv", "direction", "gestion-projet"],
      contenu: `## Jean Dupont
**Directeur de projet senior**

### Expérience
- 15 ans en gestion de projets
- Plus de 50 marchés publics pilotés
- Spécialiste secteur public

### Formation
- MBA Management de projet
- Certification PMP`,
      workspaceId: workspace.id,
    },
    {
      titre: "Référence - Ministère de la Culture 2023",
      description: "Refonte de l'identité visuelle et création de supports de communication",
      type: "REFERENCE" as const,
      tags: ["référence", "ministère", "identité-visuelle"],
      contenu: `## Projet : Refonte identité visuelle
**Client** : Ministère de la Culture
**Année** : 2023
**Montant** : 85 000 €

### Contexte
Modernisation de l'identité visuelle et déclinaison sur l'ensemble des supports.

### Livrables
- Charte graphique complète
- 50 supports de communication
- Guide d'utilisation`,
      workspaceId: workspace.id,
    },
  ]

  for (const preuveData of preuvesData) {
    await prisma.preuve.upsert({
      where: {
        id: `seed-${preuveData.titre.substring(0, 20)}`,
      },
      update: preuveData,
      create: {
        id: `seed-${preuveData.titre.substring(0, 20)}`,
        ...preuveData,
      },
    })
  }
  console.log("✅ Preuves créées")

  // 5. Créer le premier dossier exemple (GO)
  const dossier1 = await prisma.dossier.upsert({
    where: { id: "seed-dossier-1" },
    update: {},
    create: {
      id: "seed-dossier-1",
      reference: "AO-2024-001",
      titre: "Marché de conception graphique - Région Île-de-France",
      client: "Région Île-de-France",
      description: "Accord-cadre pour la réalisation de supports de communication",
      datePublication: new Date("2024-01-15"),
      dateLimite: new Date("2024-03-15"),
      montantEstime: 150000,
      status: "GO",
      workspaceId: workspace.id,
    },
  })

  // Exigences pour le dossier 1
  const exigences1 = [
    { titre: "Références similaires (minimum 3)", priority: "HAUTE", status: "TRAITE" },
    { titre: "Équipe dédiée avec DA senior", priority: "HAUTE", status: "EN_COURS" },
    { titre: "Méthodologie de gestion de projet", priority: "MOYENNE", status: "TRAITE" },
    { titre: "Engagement délais de livraison", priority: "MOYENNE", status: "A_TRAITER" },
    { titre: "Charte développement durable", priority: "BASSE", status: "NON_APPLICABLE" },
  ]

  for (let i = 0; i < exigences1.length; i++) {
    await prisma.exigence.create({
      data: {
        dossierId: dossier1.id,
        ordre: i,
        ...exigences1[i],
        priority: exigences1[i].priority as any,
        status: exigences1[i].status as any,
      },
    })
  }

  // Go/No-Go pour le dossier 1
  await prisma.goNoGoDecision.create({
    data: {
      dossierId: dossier1.id,
      critereFitStrategique: 5,
      critereCapacite: 4,
      critereRentabilite: 4,
      critereDelai: 4,
      critereRisque: 4,
      scoreTotal: 21,
      decision: true,
      commentaire: "Excellent fit stratégique, capacité confirmée",
    },
  })

  // Checklist pour le dossier 1
  const checklist1 = [
    { label: "Documents administratifs complets", status: "CONFORME" },
    { label: "Attestations fiscales et sociales", status: "CONFORME" },
    { label: "Assurance RC professionnelle", status: "CONFORME" },
    { label: "Extrait Kbis < 3 mois", status: "A_VERIFIER" },
    { label: "Références documentées", status: "CONFORME" },
  ]

  for (let i = 0; i < checklist1.length; i++) {
    await prisma.checklistItem.create({
      data: {
        dossierId: dossier1.id,
        ordre: i,
        label: checklist1[i].label,
        status: checklist1[i].status as any,
      },
    })
  }

  // Tâches pour le dossier 1
  await prisma.tache.create({
    data: {
      dossierId: dossier1.id,
      titre: "Finaliser le mémoire technique",
      priority: "HAUTE",
      status: "EN_COURS",
      echeance: new Date("2024-03-10"),
      assigneeId: editor.id,
    },
  })

  // Mémoire technique pour le dossier 1
  await prisma.memoireTechnique.create({
    data: {
      dossierId: dossier1.id,
      sectionPresentation: `## Notre agence

**Agence Démo** est une agence de communication créée en 2010.

### Nos valeurs
- Créativité
- Excellence
- Engagement`,
      sectionComprehension: `## Compréhension du besoin

La Région Île-de-France recherche un partenaire capable de...`,
    },
  })

  console.log("✅ Dossier 1 créé (GO):", dossier1.reference)

  // 6. Créer le deuxième dossier exemple (NO-GO)
  const dossier2 = await prisma.dossier.upsert({
    where: { id: "seed-dossier-2" },
    update: {},
    create: {
      id: "seed-dossier-2",
      reference: "AO-2024-002",
      titre: "Refonte site web institutionnel - Métropole de Lyon",
      client: "Métropole de Lyon",
      description: "Conception et développement du nouveau site web institutionnel",
      datePublication: new Date("2024-02-01"),
      dateLimite: new Date("2024-02-20"),
      montantEstime: 250000,
      status: "NO_GO",
      workspaceId: workspace.id,
    },
  })

  // Go/No-Go pour le dossier 2
  await prisma.goNoGoDecision.create({
    data: {
      dossierId: dossier2.id,
      critereFitStrategique: 3,
      critereCapacite: 2,
      critereRentabilite: 3,
      critereDelai: 1,
      critereRisque: 2,
      scoreTotal: 11,
      decision: false,
      motifNoGo: "Délai de réponse trop court (20 jours), équipe technique non disponible sur la période",
      commentaire: "Marché intéressant mais timing incompatible",
    },
  })

  // Mémoire technique vide pour le dossier 2
  await prisma.memoireTechnique.create({
    data: {
      dossierId: dossier2.id,
    },
  })

  console.log("✅ Dossier 2 créé (NO-GO):", dossier2.reference)

  // 7. Audit log
  await prisma.auditEvent.create({
    data: {
      action: "CREATE",
      entityType: "Workspace",
      entityId: workspace.id,
      description: "Création du workspace de démonstration",
      userId: admin.id,
      workspaceId: workspace.id,
    },
  })

  console.log("\n🎉 Seeding terminé avec succès!")
  console.log("\n📝 Comptes de démonstration:")
  console.log("   Admin:  admin@tenderops.fr / admin123")
  console.log("   Éditeur: editor@tenderops.fr / editor123")
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seeding:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
