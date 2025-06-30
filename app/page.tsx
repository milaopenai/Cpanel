"use client"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Database, Settings } from "lucide-react"
import Link from "next/link"

export default async function HomePage() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      redirect("/dashboard")
    } else {
      redirect("/auth/login")
    }
  } catch (error) {
    // If Supabase is not configured, show setup page
    return <SetupPage />
  }
}

function SetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Database className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AdminPanel Pro
          </h1>
          <p className="text-xl text-gray-600 mb-8">Sistema completo de gerenciamento web com IA integrada</p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <CardTitle>Configuração Necessária</CardTitle>
                <CardDescription>Configure o Supabase para começar a usar o AdminPanel Pro</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Passos para configuração:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>
                  Crie uma conta gratuita no{" "}
                  <a
                    href="https://supabase.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Supabase
                  </a>
                </li>
                <li>Crie um novo projeto</li>
                <li>Vá para Settings → API</li>
                <li>Copie a URL do projeto e a chave anônima</li>
                <li>
                  Crie um arquivo <code className="bg-gray-200 px-1 rounded">.env.local</code> na raiz do projeto
                </li>
                <li>Adicione as variáveis de ambiente conforme o exemplo abaixo</li>
              </ol>
            </div>

            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-green-400"># .env.local</h4>
              <pre className="text-sm">
                {`NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-aqui

# OpenAI (opcional - para funcionalidades de IA)
OPENAI_API_KEY=sua-chave-openai-aqui`}
              </pre>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">📋 Scripts SQL</h4>
              <p className="text-sm text-blue-800 mb-3">
                Após configurar as variáveis, execute os scripts SQL no painel do Supabase:
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-white p-2 rounded border">
                  <span className="text-sm font-mono">scripts/database-setup.sql</span>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/scripts/database-setup.sql" target="_blank">
                      Ver Script
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between bg-white p-2 rounded border">
                  <span className="text-sm font-mono">scripts/seed-data.sql</span>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/scripts/seed-data.sql" target="_blank">
                      Ver Script
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button asChild className="flex-1">
                <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer">
                  <Settings className="mr-2 h-4 w-4" />
                  Abrir Supabase Dashboard
                </a>
              </Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Recarregar Página
              </Button>
            </div>

            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                Precisa de ajuda? Consulte a{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  documentação completa
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
