"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Edit, Download, Users, Clock } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "site_created",
    title: "Novo site criado",
    description: 'Site "Loja Virtual" foi criado com sucesso',
    time: "2 minutos atrás",
    icon: Globe,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    type: "page_edited",
    title: "Página editada",
    description: 'Homepage do site "Portfolio" foi atualizada',
    time: "15 minutos atrás",
    icon: Edit,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    type: "backup_completed",
    title: "Backup concluído",
    description: "Backup automático de 3 sites realizado",
    time: "1 hora atrás",
    icon: Download,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    type: "user_registered",
    title: "Novo usuário",
    description: 'Cliente "João Silva" se registrou',
    time: "2 horas atrás",
    icon: Users,
    color: "bg-orange-100 text-orange-600",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
        <CardDescription>Acompanhe as últimas ações realizadas no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900">{activity.title}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
