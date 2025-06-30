"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Palette, ShoppingCart, FileText, Camera } from "lucide-react"

interface CreateSiteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateSite: (siteData: any) => void
}

const siteTemplates = [
  {
    id: "business",
    name: "Site Empresarial",
    description: "Perfeito para empresas e serviços profissionais",
    icon: Globe,
    color: "bg-blue-100 text-blue-600",
    features: ["Página inicial", "Sobre", "Serviços", "Contato"],
  },
  {
    id: "ecommerce",
    name: "Loja Virtual",
    description: "Complete e-commerce com carrinho e pagamentos",
    icon: ShoppingCart,
    color: "bg-green-100 text-green-600",
    features: ["Catálogo", "Carrinho", "Checkout", "Painel admin"],
  },
  {
    id: "blog",
    name: "Blog/Notícias",
    description: "Plataforma de conteúdo e artigos",
    icon: FileText,
    color: "bg-purple-100 text-purple-600",
    features: ["Posts", "Categorias", "Comentários", "Newsletter"],
  },
  {
    id: "portfolio",
    name: "Portfólio",
    description: "Showcase para criativos e freelancers",
    icon: Camera,
    color: "bg-orange-100 text-orange-600",
    features: ["Galeria", "Projetos", "Sobre", "Contato"],
  },
  {
    id: "landing",
    name: "Landing Page",
    description: "Página de conversão focada em resultados",
    icon: Palette,
    color: "bg-pink-100 text-pink-600",
    features: ["Hero", "Benefícios", "Depoimentos", "CTA"],
  },
]

export function CreateSiteDialog({ open, onOpenChange, onCreateSite }: CreateSiteDialogProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    description: "",
    template: "",
    category: "",
  })

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    onCreateSite(formData)
    setStep(1)
    setFormData({
      name: "",
      domain: "",
      description: "",
      template: "",
      category: "",
    })
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name && formData.domain
      case 2:
        return formData.template
      case 3:
        return true
      default:
        return false
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Site</DialogTitle>
          <DialogDescription>Configure seu novo site em 3 passos simples</DialogDescription>
        </DialogHeader>

        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepNumber ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-12 h-1 mx-2 ${step > stepNumber ? "bg-blue-500" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Informações Básicas</h3>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">Nome do Site</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Minha Empresa"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="domain">Domínio</Label>
                  <Input
                    id="domain"
                    placeholder="Ex: minhaempresa.com"
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descrição (opcional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva brevemente seu site..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business">Empresarial</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="blog">Blog/Notícias</SelectItem>
                      <SelectItem value="portfolio">Portfólio</SelectItem>
                      <SelectItem value="personal">Pessoal</SelectItem>
                      <SelectItem value="nonprofit">ONG/Sem fins lucrativos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Template Selection */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Escolha um Template</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {siteTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      formData.template === template.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                    }`}
                    onClick={() => setFormData({ ...formData, template: template.id })}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${template.color}`}>
                          <template.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{template.name}</CardTitle>
                          <CardDescription className="text-sm">{template.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        {template.features.map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Revisar Configurações</h3>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Nome:</span>
                      <span>{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Domínio:</span>
                      <span>{formData.domain}</span>
                    </div>
                    {formData.description && (
                      <div className="flex justify-between">
                        <span className="font-medium">Descrição:</span>
                        <span className="text-right max-w-xs">{formData.description}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="font-medium">Categoria:</span>
                      <span className="capitalize">{formData.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Template:</span>
                      <span>{siteTemplates.find((t) => t.id === formData.template)?.name}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        <DialogFooter>
          <div className="flex justify-between w-full">
            <div>
              {step > 1 && (
                <Button variant="outline" onClick={handleBack}>
                  Voltar
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              {step < 3 ? (
                <Button onClick={handleNext} disabled={!isStepValid()}>
                  Próximo
                </Button>
              ) : (
                <Button onClick={handleSubmit}>Criar Site</Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
