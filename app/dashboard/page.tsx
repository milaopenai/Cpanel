import { createClient } from "@/lib/supabase/server"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivity } from "@/components/recent-activity"
import { QuickActions } from "@/components/quick-actions"
import { AIAssistant } from "@/components/ai-assistant"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Bem-vindo, {user?.user_metadata?.full_name || user?.email}!
        </h1>
        <p className="text-gray-600 mt-2">Gerencie seus sites e projetos de forma inteligente</p>
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
