"use client"

import type React from "react"
import { useState } from "react"
import { PageContainer } from "@/components/ui/page-container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const MOCK_EVENT = {
  id: "1",
  title: "Festival de Verão 2024",
  price: 150.0,
}

export default function Checkout({ params }: { params: { id: string } }) {
  const [paymentMethod, setPaymentMethod] = useState("credit_card")
  const event = MOCK_EVENT // Em uma aplicação real, você buscaria os detalhes do evento com base no ID

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você trataria o processo de pagamento
    alert("Pagamento processado com sucesso!")
  }

  return (
    <PageContainer>
      <div className="space-y-6 px-4">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <Card>
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">Total: R$ {event.price.toFixed(2)}</p>
          </CardContent>
        </Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input id="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label>Método de Pagamento</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit_card" id="credit_card" />
                <Label htmlFor="credit_card">Cartão de Crédito</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pix" id="pix" />
                <Label htmlFor="pix">PIX</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="boleto" id="boleto" />
                <Label htmlFor="boleto">Boleto</Label>
              </div>
            </RadioGroup>
          </div>
          {paymentMethod === "credit_card" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="card_number">Número do Cartão</Label>
                <Input id="card_number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card_name">Nome no Cartão</Label>
                <Input id="card_name" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Data de Expiração</Label>
                  <Input id="expiry" placeholder="MM/AA" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" required />
                </div>
              </div>
            </>
          )}
          <Button type="submit" className="w-full">
            Finalizar Compra
          </Button>
        </form>
      </div>
    </PageContainer>
  )
}
