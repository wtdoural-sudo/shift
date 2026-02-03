"use client"

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer"

// Styles PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 30,
    borderBottom: 1,
    borderBottomColor: "#333",
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  meta: {
    fontSize: 10,
    color: "#888",
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    borderBottom: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 5,
  },
  sectionContent: {
    lineHeight: 1.6,
    textAlign: "justify",
  },
  emptySection: {
    color: "#999",
    fontStyle: "italic",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 9,
    color: "#888",
    textAlign: "center",
    borderTop: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
  },
  pageNumber: {
    position: "absolute",
    bottom: 30,
    right: 40,
    fontSize: 9,
    color: "#888",
  },
})

interface MemoirePDFProps {
  dossier: {
    reference: string
    titre: string
    client: string
    memoireTechnique?: {
      sectionPresentation?: string | null
      sectionComprehension?: string | null
      sectionMethodologie?: string | null
      sectionEquipe?: string | null
      sectionReferences?: string | null
      sectionPlanning?: string | null
      sectionEngagements?: string | null
    } | null
  }
}

const sections = [
  { key: "sectionPresentation", title: "1. Presentation de l'entreprise" },
  { key: "sectionComprehension", title: "2. Comprehension du besoin" },
  { key: "sectionMethodologie", title: "3. Methodologie proposee" },
  { key: "sectionEquipe", title: "4. Equipe dediee" },
  { key: "sectionReferences", title: "5. References" },
  { key: "sectionPlanning", title: "6. Planning previsionnel" },
  { key: "sectionEngagements", title: "7. Engagements" },
]

export function MemoirePDF({ dossier }: MemoirePDFProps) {
  const memoire = dossier.memoireTechnique || {}
  const date = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tete */}
        <View style={styles.header}>
          <Text style={styles.title}>Memoire Technique</Text>
          <Text style={styles.subtitle}>{dossier.titre}</Text>
          <Text style={styles.subtitle}>Client : {dossier.client}</Text>
          <Text style={styles.meta}>
            Reference : {dossier.reference} | Genere le {date}
          </Text>
        </View>

        {/* Sections */}
        {sections.map((section) => {
          const content = memoire[section.key as keyof typeof memoire]
          return (
            <View key={section.key} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={content ? styles.sectionContent : styles.emptySection}>
                {content || "Section non renseignee"}
              </Text>
            </View>
          )
        })}

        {/* Pied de page */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  )
}
