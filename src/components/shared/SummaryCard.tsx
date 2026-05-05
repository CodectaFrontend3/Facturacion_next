"use client"

import { cn } from "@/lib/utils"
import { type SummaryCardSlide, type SummaryCardProps } from "@/types/summary-card"
import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const sizeMap = {
    sm: { circle: "w-20 h-20", icon: "size-8", circlePx: 80 },
    md: { circle: "w-24 h-24", icon: "size-10", circlePx: 96 },
    lg: { circle: "w-28 h-28", icon: "size-12", circlePx: 112 },
}

function CardContent({ 
    item, 
    circle, 
    iconSize,
    formatAmount,
    formatCount
}: {
    item: SummaryCardSlide
    circle: string
    iconSize: string
    formatAmount?: (v: string | number) => string
    formatCount?: (v: string | number) => string
}) {
    const Icon = item.icon
    
    // Preparar valores si se pasan funciones de formato
    const displayCount = item.count !== undefined 
        ? (formatCount ? formatCount(item.count) : item.count)
        : null
        
    const displayAmount = item.amount !== undefined
        ? (formatAmount ? formatAmount(item.amount) : item.amount)
        : null

    return (
        <div className="flex flex-col items-center gap-1.5">
            <div className={cn(
                circle,
                "rounded-full border-[3px] bg-white flex items-center justify-center",
                item.tone.ring,
            )}>
                <Icon className={cn(iconSize, "text-gray-900")} strokeWidth={1.5} />
            </div>
            {item.label && (
                <span className="text-sm font-bold text-gray-800 text-center leading-tight">
                    {item.label}
                </span>
            )}
            {displayCount !== null && (
                <span className="text-xs text-gray-500 text-center">
                    {displayCount}
                </span>
            )}
            {displayAmount !== null && (
                <span className={cn("text-sm font-bold text-center", item.tone.amount)}>
                    {displayAmount}
                </span>
            )}
            {item.meta && (
                <span className="text-xs text-gray-500 text-center">
                    <span className="font-medium">{item.meta.label}</span>
                    {item.meta.value && (
                        <span className="font-bold text-gray-700"> {item.meta.value}</span>
                    )}
                </span>
            )}
        </div>
    )
}

export function SummaryCard({ items, size = "lg", className, formatAmount, formatCount }: SummaryCardProps) {
    const hasCarousel = items.length > 1
    const { circle, icon: iconSize} = sizeMap[size]

    if (!hasCarousel) {
        return (
            <div className={cn("flex w-full flex-col items-center gap-1.5", className)}>
                <CardContent 
                    item={items[0]} 
                    circle={circle} 
                    iconSize={iconSize}
                    formatAmount={formatAmount}
                    formatCount={formatCount}
                />
            </div>
        )
    }

    return (
        <div className={cn("flex w-full flex-col items-center", className)}>
            <div className="relative w-full">
                <Carousel
                    opts={{ align: "center", loop: true }}
                    plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
                    className="w-full"
                >
                    <CarouselContent className="m-0">
                        {items.map((item, i) => (
                            <CarouselItem key={i} className="p-0">
                                <CardContent 
                                    item={item} 
                                    circle={circle} 
                                    iconSize={iconSize}
                                    formatAmount={formatAmount}
                                    formatCount={formatCount}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Botones con z-20 flotan encima centrados verticalmente */}
                    <CarouselPrevious
                        className={cn(
                            "z-20 border-none shadow-md",
                            "w-8 h-8 rounded-full bg-gray-400! text-white! hover:bg-gray-600! hover:text-white! cursor-pointer",
                            "ring-1 ring-gray-200 backdrop-blur-sm",
                            "left-0 top-1/2 -translate-y-1/2",
                            // Pseudo-elemento para expandir el área clickeable al alto de la card
                            "before:absolute before:-top-16 before:-bottom-16 before:-left-2 before:-right-2 before:content-['']"
                        )}
                    />
                    <CarouselNext
                        className={cn(
                            "z-20 border-none shadow-md",
                            "w-8 h-8 rounded-full bg-gray-400! text-white! hover:bg-gray-600! hover:text-white! cursor-pointer",
                            "ring-1 ring-gray-200 backdrop-blur-sm",
                            "right-0 top-1/2 -translate-y-1/2",
                            // Pseudo-elemento para expandir el área clickeable al alto de la card
                            "before:absolute before:-top-16 before:-bottom-16 before:-left-2 before:-right-2 before:content-['']"
                        )}
                    />
                </Carousel>
            </div>
        </div>
    )
}