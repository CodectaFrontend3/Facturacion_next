"use client"

import { 
        Carousel,
        CarouselContent,
        CarouselItem,
        CarouselNext,
        CarouselPrevious
    } from "@/components/ui/carousel";

import { NotepadText, UserRound } from "lucide-react";

export default function carruselPagination(){
    return (
        <div>
            <Carousel>
                <CarouselContent className="ml-4">
                    <CarouselItem className="basis-1/4"><NotepadText className="w-6 h-6"/></CarouselItem>
                    <CarouselItem className="basis-1/4"><NotepadText className="w-6 h-6"/></CarouselItem>
                    <CarouselItem className="basis-1/4"><NotepadText className="w-6 h-6"/></CarouselItem>
                    <CarouselItem className="basis-1/4"><UserRound className="w-6 h-6"/></CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}