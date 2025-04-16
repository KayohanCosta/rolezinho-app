"use client"
import { PageContainer } from "@/components/ui/page-container"
import { InstagramFeedPost } from "@/components/instagram-feed-post"

const MOCK_POSTS = [
  {
    id: 1,
    user: {
      username: "um_surto",
      avatar: "/placeholder.svg?height=40&width=40&text=US",
      verified: true,
    },
    media: {
      type: "image" as const,
      url: "/placeholder.svg?height=500&width=500&text=Meme",
    },
    caption: "Triste Muito Triste :(",
    overlayText: "acho que tô pagando por todas as vezes que tentei m4tar meu pou",
    likes: 142,
    commentCount: 18,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: 2,
    user: {
      username: "_marvin.hol",
      avatar: "/placeholder.svg?height=40&width=40&text=MH",
      verified: false,
    },
    media: {
      type: "image" as const,
      url: "/placeholder.svg?height=500&width=500&text=Moto",
    },
    caption: "Black Sabbath - Paranoid 🎵",
    likes: 87,
    commentCount: 5,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
  },
  {
    id: 3,
    user: {
      username: "rolezim_oficial",
      avatar: "/placeholder.svg?height=40&width=40&text=RO",
      verified: true,
    },
    media: {
      type: "image" as const,
      url: "/placeholder.svg?height=500&width=500&text=Festa",
    },
    caption: "Quem vai estar no rolê de hoje? 🎉🔥",
    likes: 253,
    commentCount: 42,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
]

export default function Feed() {
  return (
    <PageContainer className="bg-gray-50">
      <div className="max-w-md mx-auto">
        {MOCK_POSTS.map((post) => (
          <InstagramFeedPost key={post.id} {...post} />
        ))}
      </div>
    </PageContainer>
  )
}
