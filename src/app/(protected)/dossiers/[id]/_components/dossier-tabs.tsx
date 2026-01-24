"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TabDceExigences } from "./tab-dce-exigences"
import { TabGoNoGo } from "./tab-go-nogo"
import { TabConformite } from "./tab-conformite"
import { TabMemoire } from "./tab-memoire"
import { TabExports } from "./tab-exports"

interface DossierTabsProps {
  dossier: any
  members: { id: string; firstName: string; lastName: string; email: string }[]
  preuves: any[]
  threshold: number
}

export function DossierTabs({ dossier, members, preuves, threshold }: DossierTabsProps) {
  return (
    <Tabs defaultValue="dce" className="space-y-4">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="dce">DCE et Exigences</TabsTrigger>
        <TabsTrigger value="gonogo">Go / No-Go</TabsTrigger>
        <TabsTrigger value="conformite">Conformité</TabsTrigger>
        <TabsTrigger value="memoire">Mémoire technique</TabsTrigger>
        <TabsTrigger value="exports">Exports</TabsTrigger>
      </TabsList>

      <TabsContent value="dce">
        <TabDceExigences dossier={dossier} members={members} />
      </TabsContent>

      <TabsContent value="gonogo">
        <TabGoNoGo dossier={dossier} threshold={threshold} />
      </TabsContent>

      <TabsContent value="conformite">
        <TabConformite dossier={dossier} members={members} />
      </TabsContent>

      <TabsContent value="memoire">
        <TabMemoire dossier={dossier} preuves={preuves} />
      </TabsContent>

      <TabsContent value="exports">
        <TabExports dossier={dossier} />
      </TabsContent>
    </Tabs>
  )
}
