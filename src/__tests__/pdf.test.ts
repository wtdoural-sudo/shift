import { describe, it, expect } from "vitest"
import { extractPotentialRequirements } from "@/lib/pdf"

describe("extractPotentialRequirements", () => {
  it("extrait les phrases avec 'le candidat devra'", () => {
    const text = `
      Introduction au marché.
      Le candidat devra fournir une attestation de capacité technique.
      Autres informations.
    `
    const results = extractPotentialRequirements(text)
    expect(results.length).toBe(1)
    expect(results[0]).toContain("candidat devra")
  })

  it("extrait les phrases avec 'il est demandé'", () => {
    const text = `
      Contexte du marché.
      Il est demandé de présenter au minimum trois références similaires dans le domaine concerné.
      Suite du document.
    `
    const results = extractPotentialRequirements(text)
    expect(results.length).toBe(1)
  })

  it("extrait les phrases avec 'obligation de'", () => {
    const text = `
      Article 5.
      Obligation de respecter les délais de livraison indiqués dans le CCTP.
      Article 6.
    `
    const results = extractPotentialRequirements(text)
    expect(results.length).toBe(1)
  })

  it("ignore les phrases trop courtes", () => {
    const text = "Le candidat doit."
    const results = extractPotentialRequirements(text)
    expect(results.length).toBe(0)
  })

  it("limite le nombre de résultats à 50", () => {
    const phrases = Array(100)
      .fill(null)
      .map((_, i) => `Le candidat devra respecter l'exigence numéro ${i} du cahier des charges.`)
      .join(" ")

    const results = extractPotentialRequirements(phrases)
    expect(results.length).toBeLessThanOrEqual(50)
  })

  it("retourne un tableau vide pour un texte sans exigences", () => {
    const text = "Ceci est un texte normal sans aucune exigence identifiable."
    const results = extractPotentialRequirements(text)
    expect(results.length).toBe(0)
  })
})
