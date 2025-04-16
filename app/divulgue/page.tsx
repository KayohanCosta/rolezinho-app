"use client"

import type React from "react"

import { useState } from "react"
import { PageContainer } from "@/components/ui/page-container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImagePlus } from "lucide-react"

export default function Divulgue() {
  const [formData, setFormData] = useState({
    nome: "",
    data: "",
    horaInicio: "",
    horaFim: "",
    local: "",
    valor: "",
    descricao: "",
    imagem: null as File | null,
    isGratis: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, imagem: file }))
    }
  }

  const handleGratisChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isGratis = e.target.checked
    setFormData((prev) => ({
      ...prev,
      isGratis,
      valor: isGratis ? "Grátis" : prev.valor,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the formData to your backend
    console.log(formData)
    alert("Evento submetido com sucesso!")
  }

  return (
    <PageContainer>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Divulgue sua festa ou evento</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do evento ou show</Label>
              <Input id="nome" name="nome" value={formData.nome} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="data">Data</Label>
              <Input id="data" name="data" type="date" value={formData.data} onChange={handleInputChange} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="horaInicio">Hora de início</Label>
                <Input
                  id="horaInicio"
                  name="horaInicio"
                  type="time"
                  value={formData.horaInicio}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="horaFim">Hora de fim</Label>
                <Input
                  id="horaFim"
                  name="horaFim"
                  type="time"
                  value={formData.horaFim}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="local">Local</Label>
              <Input id="local" name="local" value={formData.local} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isGratis"
                  checked={formData.isGratis}
                  onChange={handleGratisChange}
                  className="rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                />
                <Label htmlFor="isGratis">Evento gratuito</Label>
              </div>
              <Input
                id="valor"
                name="valor"
                value={formData.valor}
                onChange={handleInputChange}
                disabled={formData.isGratis}
                placeholder={formData.isGratis ? "Grátis" : "Valor do evento"}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição do evento</Label>
              <Textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imagem">Imagem do evento</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="imagem"
                  name="imagem"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Label
                  htmlFor="imagem"
                  className="cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md hover:border-gray-400 transition-colors"
                >
                  {formData.imagem ? (
                    <img
                      src={URL.createObjectURL(formData.imagem) || "/placeholder.svg"}
                      alt="Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                      <span className="mt-2 block text-sm font-medium text-gray-900">Adicionar imagem</span>
                    </div>
                  )}
                </Label>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Enviar
            </Button>
          </form>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
