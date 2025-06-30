"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Users, BarChart3, Zap } from "lucide-react"

const stats = [
  {
    title: "Sites Ativos",
    value: "12",
    change: "+2 este mês",
    icon: Globe,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Visitantes Hoje",
    value: "2,847",
    change: "+12% vs ontem",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Performance",
    value: "98%",
    change: "Excelente",
    icon: Zap,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Conversões",
    value: "156",
    change: "+8% esta semana",
    icon: BarChart3,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-gray-600 mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
