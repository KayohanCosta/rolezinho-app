"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface Request {
  id: number
  user: {
    name: string
    avatar: string
  }
  message: string
}

interface RequestsViewProps {
  requests: Request[]
}

export function RequestsView({ requests }: RequestsViewProps) {
  const handleAccept = (id: number) => {
    console.log(`Accepted request ${id}`)
    // Implement accept logic here
  }

  const handleReject = (id: number) => {
    console.log(`Rejected request ${id}`)
    // Implement reject logic here
  }

  return (
    <div className="p-4 space-y-4">
      {requests.map((request) => (
        <div key={request.id} className="flex items-center justify-between space-x-4 p-2 rounded border">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={request.user.avatar} alt={request.user.name} />
              <AvatarFallback>{request.user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{request.user.name}</p>
              <p className="text-sm text-gray-600">{request.message}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => handleAccept(request.id)} variant="outline" size="sm">
              Aceitar
            </Button>
            <Button onClick={() => handleReject(request.id)} variant="outline" size="sm">
              Recusar
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
