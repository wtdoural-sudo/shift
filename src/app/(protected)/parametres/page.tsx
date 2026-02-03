"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Users, Settings, Trash2 } from "lucide-react"

const roleLabels = {
  ADMIN: "Administrateur",
  EDITOR: "Éditeur",
  VIEWER: "Lecteur",
}

const roleColors = {
  ADMIN: "destructive",
  EDITOR: "default",
  VIEWER: "secondary",
} as const

export default function ParametresPage() {
  const { data: session } = useSession()
  const { toast } = useToast()

  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddMember, setShowAddMember] = useState(false)

  const workspace = session?.user?.workspaces?.[0]
  const currentUserRole = workspace?.role

  const fetchMembers = async () => {
    try {
      const response = await fetch("/api/workspace/members")
      const data = await response.json()
      setMembers(data)
    } catch {
      toast({ title: "Erreur de chargement", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleDeleteMember = async (memberId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) return

    try {
      const response = await fetch(`/api/workspace/members?memberId=${memberId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || "Erreur")
      }

      toast({ title: "Membre supprimé" })
      fetchMembers()
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur inconnue",
        variant: "destructive",
      })
    }
  }

  const handleAddMember = async (data: any) => {
    try {
      const response = await fetch("/api/workspace/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || "Erreur")
      }

      toast({ title: "Membre ajouté" })
      setShowAddMember(false)
      fetchMembers()
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur inconnue",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Paramètres</h1>
        <p className="text-gray-500">Gérez votre espace de travail</p>
      </div>

      {/* Informations workspace */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Espace de travail
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500">Nom</Label>
              <p className="font-medium">{workspace?.name || "—"}</p>
            </div>
            <div>
              <Label className="text-gray-500">Identifiant</Label>
              <p className="font-mono text-sm">{workspace?.slug || "—"}</p>
            </div>
          </div>
          <div>
            <Label className="text-gray-500">Votre rôle</Label>
            <div className="mt-1">
              <Badge variant={roleColors[currentUserRole as keyof typeof roleColors] || "secondary"}>
                {roleLabels[currentUserRole as keyof typeof roleLabels] || currentUserRole}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Membres */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Membres de l'équipe
            </CardTitle>
            <CardDescription>
              {members.length} membre(s) dans l'espace de travail
            </CardDescription>
          </div>
          {currentUserRole === "ADMIN" && (
            <Button onClick={() => setShowAddMember(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un membre
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-gray-500 py-8">Chargement...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  {currentUserRole === "ADMIN" && <TableHead></TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      {member.user.firstName} {member.user.lastName}
                    </TableCell>
                    <TableCell>{member.user.email}</TableCell>
                    <TableCell>
                      <Badge variant={roleColors[member.role as keyof typeof roleColors]}>
                        {roleLabels[member.role as keyof typeof roleLabels]}
                      </Badge>
                    </TableCell>
                    {currentUserRole === "ADMIN" && (
                      <TableCell>
                        {member.user.id !== session?.user?.id && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleDeleteMember(member.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Paramètres Go/No-Go */}
      <Card>
        <CardHeader>
          <CardTitle>Paramètres Go / No-Go</CardTitle>
          <CardDescription>
            Configurez le seuil de décision pour vos évaluations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label>Seuil de décision (sur 25 points)</Label>
              <p className="text-sm text-gray-500">
                Un score supérieur ou égal à ce seuil déclenche un GO
              </p>
            </div>
            <div className="w-24">
              <Input type="number" min="0" max="25" defaultValue="15" disabled={currentUserRole !== "ADMIN"} />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Modification disponible prochainement
          </p>
        </CardContent>
      </Card>

      {/* Dialog Ajout membre */}
      <AddMemberDialog
        open={showAddMember}
        onOpenChange={setShowAddMember}
        onSubmit={handleAddMember}
      />
    </div>
  )
}

function AddMemberDialog({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  onSubmit: (data: any) => void
}) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "VIEWER",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await onSubmit(formData)
    setFormData({ email: "", firstName: "", lastName: "", password: "", role: "VIEWER" })
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un membre</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Prénom *</Label>
              <Input
                value={formData.firstName}
                onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Nom *</Label>
              <Input
                value={formData.lastName}
                onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email *</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Mot de passe *</Label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
              minLength={6}
              required
            />
            <p className="text-xs text-gray-500">Minimum 6 caractères</p>
          </div>

          <div className="space-y-2">
            <Label>Rôle</Label>
            <Select
              value={formData.role}
              onValueChange={(v) => setFormData((p) => ({ ...p, role: v }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">Administrateur</SelectItem>
                <SelectItem value="EDITOR">Éditeur</SelectItem>
                <SelectItem value="VIEWER">Lecteur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Ajout..." : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
