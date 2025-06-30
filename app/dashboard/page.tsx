"use client" // transforma essa página em uma client component

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivity } from "@/components/recent-activity"
import { QuickActions } from "@/components/quick-actions"
import { AIAssistant } from "@/components/ai-assistant"

export default function DashboardPage() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Bem-vindo, {user?.user_metadata?.full_name || user?.email || "visitante"}!
        </h1>
        <p className="text-gray-600 mt-2">
          Gerencie seus sites e projetos de forma inteligente
        </p>
      </div>

      <DashboardStats />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <QuickActions />
          <RecentActivity />
        </div>
        <div>
          <AIAssistant />
        </div>
      </div>
    </div>
  )
}
