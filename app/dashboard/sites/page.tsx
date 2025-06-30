"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Globe, Settings, BarChart3, Download, Trash2 } from "lucide-react"
import { CreateSiteDialog } from "@/components/create-site-dialog"
import { createClient } from "@/lib/supabase/client"
import { toast } from "@/hooks/use-toast"

interface Site {
  id: string
  name: string
  domain: string
  status: "active" | "inactive" | "maintenance"
  created_at: string
  last_backup: string
  visits_today: number
}

export default function SitesPage() {
  const [sites, setSites] = useState<Site[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchSites()
  }, [])

  const fetchSites = async () => {
    try {
      const { data, error } = await supabase.from("sites").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setSites(data || [])
    } catch (error) {
      toast({
        title: "Erro ao carregar sites",
        description: "Não foi possível carregar a lista de sites.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateSite = async (siteData: any) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const { error } = await supabase.from("sites").insert([
        {
          ...siteData,
          user_id: user?.id,
          status: "active",
          visits_today: 0,
          last_backup: new Date().toISOString(),
        },
      ])

      if (error) throw error

      toast({
        title: "Site criado com sucesso!",
        description: `O site ${siteData.name} foi criado e está ativo.`,
      })

      fetchSites()
      setIsCreateDialogOpen(false)
    } catch (error) {
      toast({
        title: "Erro ao criar site",
        description: "Não foi possível criar o site. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo"
      case "inactive":
        return "Inativo"
      case "maintenance":
        return "Manutenção"
      default:
        return "Desconhecido"
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Meus Sites</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Meus Sites</h1>
          <p className="text-gray-600 mt-2">Gerencie todos os seus sites em um só lugar</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Site
        </Button>
      </div>

      {sites.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Globe className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum site encontrado</h3>
            <p className="text-gray-600 mb-6">Crie seu primeiro site para começar a usar o AdminPanel Pro</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Criar Primeiro Site
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <Card key={site.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{site.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {site.domain}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(site.status)}>{getStatusText(site.status)}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Visitas hoje:</span>
                    <span className="font-semibold">{site.visits_today}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Último backup:</span>
                    <span className="font-semibold">{new Date(site.last_backup).toLocaleDateString("pt-BR")}</span>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Settings className="mr-1 h-3 w-3" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <BarChart3 className="mr-1 h-3 w-3" />
                      Stats
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CreateSiteDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateSite={handleCreateSite}
      />
    </div>
  )
}
