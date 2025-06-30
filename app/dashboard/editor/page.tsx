"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Type,
  ImageIcon,
  Layout,
  Square,
  Play,
  Save,
  Eye,
  Smartphone,
  Tablet,
  Monitor,
  Plus,
  Settings,
  Trash2,
} from "lucide-react"

interface Block {
  id: string
  type: "text" | "image" | "button" | "container" | "video"
  content: string
  styles: Record<string, any>
}

const BLOCK_TYPES = [
  { type: "text", icon: Type, label: "Texto", color: "bg-blue-100 text-blue-600" },
  { type: "image", icon: ImageIcon, label: "Imagem", color: "bg-green-100 text-green-600" },
  { type: "button", icon: Square, label: "Botão", color: "bg-purple-100 text-purple-600" },
  { type: "container", icon: Layout, label: "Container", color: "bg-orange-100 text-orange-600" },
  { type: "video", icon: Play, label: "Vídeo", color: "bg-red-100 text-red-600" },
]

export default function EditorPage() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")

  const addBlock = (type: Block["type"]) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      styles: getDefaultStyles(type),
    }
    setBlocks([...blocks, newBlock])
  }

  const getDefaultContent = (type: Block["type"]): string => {
    switch (type) {
      case "text":
        return "Clique para editar este texto"
      case "image":
        return "/placeholder.svg?height=200&width=400"
      case "button":
        return "Clique aqui"
      case "container":
        return "Container"
      case "video":
        return "https://example.com/video.mp4"
      default:
        return ""
    }
  }

  const getDefaultStyles = (type: Block["type"]) => {
    const baseStyles = {
      padding: "16px",
      margin: "8px 0",
      borderRadius: "8px",
    }

    switch (type) {
      case "text":
        return { ...baseStyles, fontSize: "16px", color: "#000000" }
      case "button":
        return { ...baseStyles, backgroundColor: "#3b82f6", color: "#ffffff", textAlign: "center" }
      case "container":
        return { ...baseStyles, border: "2px dashed #e5e7eb", minHeight: "100px" }
      default:
        return baseStyles
    }
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(blocks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setBlocks(items)
  }

  const deleteBlock = (blockId: string) => {
    setBlocks(blocks.filter((block) => block.id !== blockId))
    if (selectedBlock === blockId) {
      setSelectedBlock(null)
    }
  }

  const renderBlock = (block: Block, index: number) => {
    const isSelected = selectedBlock === block.id

    return (
      <Draggable key={block.id} draggableId={block.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`
              relative group cursor-pointer transition-all
              ${isSelected ? "ring-2 ring-blue-500" : ""}
              ${snapshot.isDragging ? "opacity-50" : ""}
            `}
            onClick={() => setSelectedBlock(block.id)}
          >
            <div style={block.styles} className="relative">
              {block.type === "text" && (
                <div contentEditable suppressContentEditableWarning>
                  {block.content}
                </div>
              )}
              {block.type === "image" && (
                <img src={block.content || "/placeholder.svg"} alt="Block image" className="max-w-full h-auto" />
              )}
              {block.type === "button" && <button className="px-4 py-2 rounded">{block.content}</button>}
              {block.type === "container" && (
                <div className="min-h-[100px] flex items-center justify-center text-gray-500">{block.content}</div>
              )}
              {block.type === "video" && (
                <div className="bg-gray-200 h-48 flex items-center justify-center rounded">
                  <Play className="h-12 w-12 text-gray-400" />
                </div>
              )}

              {/* Block controls */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-1">
                  <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
                    <Settings className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteBlock(block.id)
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    )
  }

  const getViewportClass = () => {
    switch (viewMode) {
      case "mobile":
        return "max-w-sm"
      case "tablet":
        return "max-w-2xl"
      default:
        return "max-w-full"
    }
  }

  return (
    <div className="h-full flex">
      {/* Sidebar - Block Library */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Blocos</h3>
        <div className="space-y-2">
          {BLOCK_TYPES.map((blockType) => (
            <Button
              key={blockType.type}
              variant="outline"
              className="w-full justify-start bg-transparent"
              onClick={() => addBlock(blockType.type)}
            >
              <div className={`p-1 rounded mr-2 ${blockType.color}`}>
                <blockType.icon className="h-4 w-4" />
              </div>
              {blockType.label}
            </Button>
          ))}
        </div>

        <Separator className="my-6" />

        <h3 className="font-semibold text-gray-900 mb-4">Layouts Prontos</h3>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
            <Layout className="mr-2 h-4 w-4" />
            Header + Hero
          </Button>
          <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
            <Layout className="mr-2 h-4 w-4" />
            Sobre + CTA
          </Button>
          <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
            <Layout className="mr-2 h-4 w-4" />
            Footer
          </Button>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="font-semibold text-gray-900">Editor Visual</h2>
            <Badge variant="secondary">Não salvo</Badge>
          </div>

          <div className="flex items-center gap-2">
            {/* Viewport toggles */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("desktop")}
                className="rounded-r-none"
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "tablet" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("tablet")}
                className="rounded-none border-x"
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("mobile")}
                className="rounded-l-none"
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6" />

            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button size="sm">
              <Save className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-gray-100 p-8 overflow-auto">
          <div className={`mx-auto bg-white min-h-screen shadow-lg ${getViewportClass()}`}>
            {blocks.length === 0 ? (
              <div className="h-96 flex flex-col items-center justify-center text-gray-500">
                <Layout className="h-12 w-12 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Canvas vazio</h3>
                <p className="text-center mb-4">Arraste blocos da barra lateral para começar a construir sua página</p>
                <Button onClick={() => addBlock("text")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar primeiro bloco
                </Button>
              </div>
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="canvas">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-full">
                      {blocks.map((block, index) => renderBlock(block, index))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>
        </div>
      </div>

      {/* Properties Panel */}
      {selectedBlock && (
        <div className="w-80 bg-white border-l border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Propriedades</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Tipo</label>
              <p className="text-sm text-gray-500 capitalize">{blocks.find((b) => b.id === selectedBlock)?.type}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Padding</label>
              <input
                type="text"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                defaultValue="16px"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Margin</label>
              <input
                type="text"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                defaultValue="8px 0"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Background</label>
              <input
                type="color"
                className="w-full mt-1 h-10 border border-gray-300 rounded-md"
                defaultValue="#ffffff"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
