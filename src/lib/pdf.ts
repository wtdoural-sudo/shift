import pdfParse from "pdf-parse"

/**
 * Extrait le texte d'un fichier PDF
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const data = await pdfParse(buffer)
    return data.text
  } catch (error) {
    console.error("Erreur lors de l'extraction du texte PDF:", error)
    return ""
  }
}

/**
 * Parse basique pour extraire des exigences potentielles du texte
 * Cette fonction identifie les phrases qui ressemblent à des exigences
 */
export function extractPotentialRequirements(text: string): string[] {
  const requirements: string[] = []

  // Patterns courants dans les DCE pour identifier des exigences
  const patterns = [
    /(?:le\s+candidat|le\s+titulaire|le\s+prestataire)\s+(?:devra|doit|s'engage\s+à|garantit)/gi,
    /(?:il\s+est\s+(?:demandé|exigé|requis|obligatoire))/gi,
    /(?:obligation\s+de|exigence\s*:)/gi,
    /(?:critère\s+(?:obligatoire|éliminatoire))/gi,
  ]

  // Découpe le texte en phrases
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 20)

  for (const sentence of sentences) {
    for (const pattern of patterns) {
      if (pattern.test(sentence)) {
        // Nettoie et ajoute la phrase
        const cleaned = sentence.replace(/\s+/g, ' ').trim()
        if (cleaned.length > 30 && cleaned.length < 500 && !requirements.includes(cleaned)) {
          requirements.push(cleaned)
        }
        break
      }
    }
    // Reset des regex globales
    patterns.forEach(p => p.lastIndex = 0)
  }

  // Limite à 50 exigences max pour éviter les abus
  return requirements.slice(0, 50)
}
