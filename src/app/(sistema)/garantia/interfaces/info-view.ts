import { ReactNode } from "react"

// Button
export interface ButtonProps {
    children: ReactNode
    className: string
    onClick?: () => void
}

// Cards
export interface InfoCardProps {
    title: string
    children: ReactNode
    className?: string
}

export interface ContactInfoProps {
    title: string
}

// Grid 
export interface GridProps {
    children: ReactNode
}

// Headers
export interface TopHeaderProps {
    children: ReactNode
}

export interface InfoHeaderProps {
    codigo: string
    ruc: string
}

export interface DocumentHeaderProps {
    title: string
}