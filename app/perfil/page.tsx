"use client"

import { useState } from "react"
import { PageContainer } from "@/components/ui/page-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Briefcase, GraduationCap, Heart, Wine, Cigarette, Dumbbell, Pencil } from "lucide-react"
import Image from "next/image"

const MOCK_USER = {
  name: "Ana Silva",
  age: 28,
  bio: "Apaixonada por música, viagens e boa comida. Sempre em busca de novas aventuras!",
  location: "São Paulo, SP",
  job: "Designer Gráfica",
  company: "Creative Studios",
  school: "Universidade de São Paulo",
  interests: ["Música", "Viagens", "Fotografia", "Culinária", "Yoga"],
  photos: [
    "/placeholder.svg?height=400&width=300&text=Foto+Principal",
    "/placeholder.svg?height=400&width=300&text=Foto+2",
    "/placeholder.svg?height=400&width=300&text=Foto+3",
    "/placeholder.svg?height=400&width=300&text=Foto+4",
    "/placeholder.svg?height=400&width=300&text=Foto+5",
    "/placeholder.svg?height=400&width=300&text=Foto+6",
  ],
  sexualOrientation: "Heterossexual",
  relationshipStatus: "Solteira",
  distance: 5,
  education: "Graduação em Design",
  lifestyle: "Urbano",
  physicalActivity: "3-4 vezes por semana",
  smoking: "Não fumante",
  drinking: "Socialmente",
}

export default function Perfil() {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState(MOCK_USER)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [isImageEnlarged, setIsImageEnlarged] = useState(false)

  const renderEditButton = (section: string) => (
    <Button variant="ghost" size="sm" onClick={() => setEditingSection(section)} className="absolute top-0 right-0">
      <Pencil className="h-4 w-4" />
    </Button>
  )

  const handleSave = () => {
    setIsEditing(false)
    setEditingSection(null)
    console.log("Saving user data:", user)
  }

  return (
    <PageContainer className="pb-16">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="flex flex-col p-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={user.photos[0]}
                alt={user.name}
                onClick={() => setIsImageEnlarged(true)}
                className="cursor-pointer"
              />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">
                {user.name}, {user.age}
              </h1>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{user.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-2xl mx-auto px-4 space-y-4">
        <Card>
          <CardContent className="p-4">
            <section className="relative">
              <h2 className="text-lg font-semibold mb-2">Sobre mim</h2>
              {editingSection === "bio" ? (
                <textarea
                  className="w-full p-2 border rounded"
                  value={user.bio}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                />
              ) : (
                <p>{user.bio}</p>
              )}
              {renderEditButton("bio")}
            </section>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <section className="relative">
              <h2 className="text-lg font-semibold mb-2">Fotos</h2>
              <div className="grid grid-cols-3 gap-2">
                {user.photos.slice(1).map((photo, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      src={photo || "/placeholder.svg"}
                      alt={`Foto ${index + 2}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </section>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <section className="relative">
              <h2 className="text-lg font-semibold mb-2">Trabalho e Educação</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span>
                    {user.job} em {user.company}
                  </span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  <span>{user.school}</span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  <span>{user.education}</span>
                </div>
              </div>
              {renderEditButton("workEducation")}
            </section>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <section className="relative">
              <h2 className="text-lg font-semibold mb-2">Relacionamento</h2>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                <span>
                  {user.sexualOrientation}, {user.relationshipStatus}
                </span>
              </div>
              {renderEditButton("relationship")}
            </section>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <section className="relative">
              <h2 className="text-lg font-semibold mb-2">Localização</h2>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>A {user.distance} km de distância</span>
              </div>
              {renderEditButton("location")}
            </section>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <section className="relative">
              <h2 className="text-lg font-semibold mb-2">Estilo de Vida</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Dumbbell className="w-4 h-4 mr-2" />
                  <span>Atividade física: {user.physicalActivity}</span>
                </div>
                <div className="flex items-center">
                  <Cigarette className="w-4 h-4 mr-2" />
                  <span>{user.smoking}</span>
                </div>
                <div className="flex items-center">
                  <Wine className="w-4 h-4 mr-2" />
                  <span>Bebe: {user.drinking}</span>
                </div>
              </div>
              {renderEditButton("lifestyle")}
            </section>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <section className="relative">
              <h2 className="text-lg font-semibold mb-2">Interesses</h2>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest, index) => (
                  <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                    {interest}
                  </span>
                ))}
              </div>
              {renderEditButton("interests")}
            </section>
          </CardContent>
        </Card>

        {isEditing && (
          <Button onClick={handleSave} className="w-full mt-4">
            Salvar Alterações
          </Button>
        )}
      </div>
      {isImageEnlarged && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsImageEnlarged(false)}
        >
          <div className="relative">
            <Image
              src={user.photos[0] || "/placeholder.svg"}
              alt={user.name}
              width={300}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </PageContainer>
  )
}
