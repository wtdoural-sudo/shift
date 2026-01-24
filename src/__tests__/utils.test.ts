import { describe, it, expect } from "vitest"
import { cn, slugify, truncate, formatDate } from "@/lib/utils"

describe("cn (classnames)", () => {
  it("fusionne les classes correctement", () => {
    expect(cn("foo", "bar")).toBe("foo bar")
  })

  it("gère les conditions", () => {
    expect(cn("base", true && "active", false && "hidden")).toBe("base active")
  })

  it("merge les classes Tailwind", () => {
    expect(cn("px-4", "px-8")).toBe("px-8")
  })
})

describe("slugify", () => {
  it("convertit en slug", () => {
    expect(slugify("Mon Titre")).toBe("mon-titre")
  })

  it("gère les accents", () => {
    expect(slugify("Café éléphant")).toBe("cafe-elephant")
  })

  it("gère les caractères spéciaux", () => {
    expect(slugify("Test & essai !")).toBe("test-essai")
  })
})

describe("truncate", () => {
  it("tronque le texte long", () => {
    expect(truncate("Ceci est un texte très long", 15)).toBe("Ceci est un...")
  })

  it("ne tronque pas le texte court", () => {
    expect(truncate("Court", 10)).toBe("Court")
  })
})

describe("formatDate", () => {
  it("formate une date", () => {
    const result = formatDate(new Date("2024-03-15"))
    expect(result).toBe("15/03/2024")
  })

  it("gère les valeurs null", () => {
    expect(formatDate(null)).toBe("-")
  })

  it("gère les chaînes de date", () => {
    const result = formatDate("2024-03-15")
    expect(result).toBe("15/03/2024")
  })
})
