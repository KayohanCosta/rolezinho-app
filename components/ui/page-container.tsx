import type React from "react"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return <div className={`max-w-2xl mx-auto pb-16 ${className}`}>{children}</div>
}
