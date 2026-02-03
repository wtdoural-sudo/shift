"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TabDceExigences } from "./tab-dce-exigences"
import { TabGoNoGo } from "./tab-go-nogo"
import { TabConformite } from "./tab-conformite"
import { TabMemoire } from "./tab-memoire"
import { TabExports } from "./tab-exports"
import { FileText, Target, CheckSquare, BookOpen, Download } from "lucide-react"

interface DossierTabsProps {
  dossier: any
  members: { id: string; firstName: string; lastName: string; email: string }[]
  preuves: any[]
  threshold: number
}

export function DossierTabs({ dossier, members, preuves, threshold }: DossierTabsProps) {
  return (
    <Tabs defaultValue="dce" className="space-y-6">
      <TabsList className="w-full justify-start gap-1 h-auto p-1 bg-gray-100/80 rounded-lg">
        <TabsTrigger
          value="dce"
          className="flex items-center gap-2 px-4 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
        >
          <FileText className="h-4 w-4" />
          <span>DCE & Exigences</span>
        </TabsTrigger>
        <TabsTrigger
          value="gonogo"
          className="flex items-center gap-2 px-4 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
        >
          <Target className="h-4 w-4" />
          <span>Go / No-Go</span>
        </TabsTrigger>
        <TabsTrigger
          value="conformite"
          className="flex items-center gap-2 px-4 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
        >
          <CheckSquare className="h-4 w-4" />
          <span>Conformite & Taches</span>
        </TabsTrigger>
        <TabsTrigger
          value="memoire"
          className="flex items-center gap-2 px-4 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
        >
          <BookOpen className="h-4 w-4" />
          <span>Memoire technique</span>
        </TabsTrigger>
        <TabsTrigger
          value="exports"
          className="flex items-center gap-2 px-4 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
        >
          <Download className="h-4 w-4" />
          <span>Exports</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="dce" className="mt-6">
        <TabDceExigences dossier={dossier} members={members} />
      </TabsContent>

      <TabsContent value="gonogo" className="mt-6">
        <TabGoNoGo dossier={dossier} threshold={threshold} />
      </TabsContent>

      <TabsContent value="conformite" className="mt-6">
        <TabConformite dossier={dossier} members={members} />
      </TabsContent>

      <TabsContent value="memoire" className="mt-6">
        <TabMemoire dossier={dossier} preuves={preuves} />
      </TabsContent>

      <TabsContent value="exports" className="mt-6">
        <TabExports dossier={dossier} />
      </TabsContent>
    </Tabs>
  )
}
