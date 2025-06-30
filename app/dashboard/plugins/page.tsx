"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Download,
  Star,
  Shield,
  Zap,
  Palette,
  ShoppingCart,
  BarChart3,
  Settings,
  Trash2,
  CheckCircle,
} from "lucide-react"

interface Plugin {
  id: string
  name: string
  description: string
  version: string
  author: string
  rating: number
  downloads: number
  category: string
  price: number
  installed: boolean
  active: boolean
  icon: any
}

const AVAILABLE_PLUGINS: Plugin[] = [
  {
    id: "elementor",
    name: "Elementor Pro",
    description: "Editor visual avançado com drag & drop para criar páginas profissionais",
    version: "3.18.0",
    author: "Elementor Team",
    rating: 4.8,
    downloads: 5000000,
    category: "Editor",
    price: 0,
    installed: false,
    active: false,
    icon: Palette,
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    description: "Transforme seu site em uma loja online completa",
    version: "8.2.1",
    author: "Automattic",
    rating: 4.6,
    downloads: 3000000,
    category: "E-commerce",
    price: 0,
    installed: true,
    active: true,
    icon: ShoppingCart,
  },
  {
    id: "yoast-seo",
    name: "Yoast SEO",
    description: "Otimize seu site para mecanismos de busca",
    version: "21.5",
    author: "Team Yoast",
    rating: 4.5,
    downloads: 2500000,
    category: "SEO",
    price: 0,
    installed: true,
    active: false,
    icon: BarChart3,
  },
  {
    id: "duplicator",
    name: "Duplicator Pro",
    description: "Backup, migração e clonagem de sites",
    version: "4.5.12",
    author: "Snap Creek",
    rating: 4.7,
    downloads: 1500000,
    category: "Backup",
    price: 59,
    installed: false,
    active: false,
    icon: Shield,
  },
  {
    id: "wp-rocket",
    name: "WP Rocket",
    description: "Plugin de cache e otimização de performance",
    version: "3.15.4",
    author: "WP Media",
    rating: 4.9,
    downloads: 800000,
    category: "Performance",
    price: 49,
    installed: false,
    active: false,
    icon: Zap,
  },
]

export default function PluginsPage() {
  const [plugins, setPlugins] = useState<Plugin[]>(AVAILABLE_PLUGINS)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "Editor", "E-commerce", "SEO", "Backup", "Performance"]

  const filteredPlugins = plugins.filter((plugin) => {
    const matchesSearch =
      plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || plugin.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const installedPlugins = plugins.filter((p) => p.installed)
  const availablePlugins = plugins.filter((p) => !p.installed)

  const handleInstall = (pluginId: string) => {
    setPlugins(
      plugins.map((plugin) => (plugin.id === pluginId ? { ...plugin, installed: true, active: true } : plugin)),
    )
  }

  const handleToggleActive = (pluginId: string) => {
    setPlugins(plugins.map((plugin) => (plugin.id === pluginId ? { ...plugin, active: !plugin.active } : plugin)))
  }

  const handleUninstall = (pluginId: string) => {
    setPlugins(
      plugins.map((plugin) => (plugin.id === pluginId ? { ...plugin, installed: false, active: false } : plugin)),
    )
  }

  const PluginCard = ({ plugin, showInstallButton = true }: { plugin: Plugin; showInstallButton?: boolean }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <plugin.icon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{plugin.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                por {plugin.author} • v{plugin.version}
                {plugin.installed && (
                  <Badge variant={plugin.active ? "default" : "secondary"}>{plugin.active ? "Ativo" : "Inativo"}</Badge>
                )}
              </CardDescription>
            </div>
          </div>
          {plugin.price > 0 && <Badge variant="outline">${plugin.price}</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{plugin.description}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{plugin.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>{plugin.downloads.toLocaleString()} downloads</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {plugin.category}
          </Badge>
        </div>

        <div className="flex gap-2">
          {!plugin.installed && showInstallButton && (
            <Button onClick={() => handleInstall(plugin.id)} className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              {plugin.price > 0 ? `Comprar $${plugin.price}` : "Instalar"}
            </Button>
          )}

          {plugin.installed && (
            <>
              <Button
                variant={plugin.active ? "secondary" : "default"}
                onClick={() => handleToggleActive(plugin.id)}
                className="flex-1"
              >
                {plugin.active ? (
                  <>
                    <Settings className="mr-2 h-4 w-4" />
                    Desativar
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Ativar
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleUninstall(plugin.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Plugins</h1>
        <p className="text-gray-600 mt-2">Estenda as funcionalidades do seu site com plugins profissionais</p>
      </div>

      <Tabs defaultValue="available" className="space-y-6">
        <TabsList>
          <TabsTrigger value="available">Disponíveis</TabsTrigger>
          <TabsTrigger value="installed">Instalados ({installedPlugins.length})</TabsTrigger>
        </TabsList>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar plugins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "Todas as categorias" : category}
              </option>
            ))}
          </select>
        </div>

        <TabsContent value="available" className="space-y-6">
          {availablePlugins.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Download className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum plugin disponível</h3>
                <p className="text-gray-600">
                  Todos os plugins já estão instalados ou não há plugins correspondentes à sua busca.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredPlugins
                .filter((p) => !p.installed)
                .map((plugin) => (
                  <PluginCard key={plugin.id} plugin={plugin} />
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="installed" className="space-y-6">
          {installedPlugins.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Settings className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum plugin instalado</h3>
                <p className="text-gray-600 mb-6">Instale plugins para estender as funcionalidades do seu site.</p>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Explorar Plugins
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredPlugins
                .filter((p) => p.installed)
                .map((plugin) => (
                  <PluginCard key={plugin.id} plugin={plugin} showInstallButton={false} />
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
