"use client"

import { cva } from "class-variance-authority"
import type React from "react"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-90 transition-opacity",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600",
      },
      size: {
        default: "px-4 py-2",
        sm: "px-3 py-1",
        lg: "px-6 py-3",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  },
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient"
  size?: "default" | "sm" | "lg"
}

export const Button: React.FC<ButtonProps> = ({ children, variant, size, onClick, disabled, className, ...props }) => {
  return (
    <button
      className={`${buttonVariants({ variant, size })} max-w-full overflow-hidden text-ellipsis whitespace-nowrap ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
