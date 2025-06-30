"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Palette, Download, Bot } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "Criar Novo Site",
    description: "Configure um novo site em minutos",
    icon: Plus,
    href: "/dashboard/sites",
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    title: "Editor Visual",
    description: "Edite páginas com drag & drop",
    icon: Palette,
    href: "/dashboard/editor",
    color: "bg-purple-500 hover:bg-purple-600",
  },
  {
    title: "Assistente IA",
    description: "Crie conteúdo com inteligência artificial",
    icon: Bot,
    href: "/dashboard/ai",
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    title: "Backup Sites",
    description: "Faça backup de todos os seus sites",
    icon: Download,
    href: "/dashboard/backup",
    color: "bg-orange-500 hover:bg-orange-600",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
        <CardDescription>Acesse rapidamente as funcionalidades mais utilizadas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {actions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Button
                variant="outline"
                className="h-auto p-4 flex items-start gap-3 hover:shadow-md transition-shadow w-full bg-transparent"
              >
                <div className={`p-2 rounded-lg text-white ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{action.title}</div>
                  <div className="text-sm text-gray-600">{action.description}</div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
