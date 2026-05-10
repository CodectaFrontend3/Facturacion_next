import { type ElementType } from "react"

export interface SummaryCardTone {
    ring: string
<<<<<<< HEAD
    icon?: string
=======
    icon: string
>>>>>>> origin/rodrigo
    amount?: string
}

export interface SummaryCardMeta {
    label: string
    value?: string
}

export interface SummaryCardSlide {
    icon: ElementType
    label?: string
    count?: string | number
    amount?: string | number
    tone: SummaryCardTone
    meta?: SummaryCardMeta
}

export interface SummaryCardProps {
    items: SummaryCardSlide[]
    size?: "sm" | "md" | "lg"
    className?: string
    formatAmount?: (amount: number | string) => string
    formatCount?: (count: number | string) => string
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/rodrigo
