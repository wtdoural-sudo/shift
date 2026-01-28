import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Softboard - Gestion des réponses aux appels d'offres",
  description: "Structurez vos réponses aux appels d'offres, réduisez le temps perdu et capitalisez sur votre travail.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="font-sans">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
