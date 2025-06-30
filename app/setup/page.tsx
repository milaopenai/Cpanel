"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Database, Settings, CheckCircle, Copy } from "lucide-react"
import Link from "next/link"

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Database className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AdminPanel Pro Setup
          </h1>
          <p className="text-xl text-gray-600">Configure seu ambiente em poucos passos</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Step 1: Supabase Setup */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Database className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>1. Configurar Supabase</CardTitle>
                  <CardDescription>Configure o banco de dados e autenticação</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Criar conta no Supabase</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Criar novo projeto</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Copiar URL e chave da API</span>
                </div>
              </div>
              <Button asChild className="w-full">
                <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer">
                  <Settings className="mr-2 h-4 w-4" />
                  Abrir Supabase
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Step 2: Environment Variables */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Settings className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>2. Variáveis de Ambiente</CardTitle>
                  <CardDescription>Configure as chaves de API</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-400"># .env.local</span>
                  <Button size="sm" variant="ghost" className="h-6 text-gray-400 hover:text-white">
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <pre className="whitespace-pre-wrap">
                  {`NEXT_PUBLIC_SUPABASE_URL=sua-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave
OPENAI_API_KEY=sua-chave-openai`}
                </pre>
              </div>
              <p className="text-sm text-gray-600">Crie este arquivo na raiz do projeto com suas chaves reais.</p>
            </CardContent>
          </Card>

          {/* Step 3: Database Setup */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Database className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle>3. Configurar Banco de Dados</CardTitle>
                  <CardDescription>Execute os scripts SQL no Supabase</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">📋 Script 1: Setup</h4>
                  <p className="text-sm text-blue-800 mb-3">Cria tabelas, políticas de segurança e triggers</p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/scripts/database-setup.sql" target="_blank">
                      Ver database-setup.sql
                    </Link>
                  </Button>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">🌱 Script 2: Seed</h4>
                  <p className="text-sm text-green-800 mb-3">Adiciona dados iniciais e plugins</p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/scripts/seed-data.sql" target="_blank">
                      Ver seed-data.sql
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">⚡ Como executar:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-800">
                  <li>Vá para o SQL Editor no dashboard do Supabase</li>
                  <li>Copie e cole o conteúdo do primeiro script</li>
                  <li>Execute o script</li>
                  <li>Repita para o segundo script</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="mb-4">
                <AlertCircle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <h3 className="font-semibold">Configuração Concluída?</h3>
                <p className="text-sm text-gray-600">Recarregue a página após configurar tudo</p>
              </div>
              <Button onClick={() => window.location.reload()} className="w-full">
                Recarregar e Testar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
