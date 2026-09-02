import Image from "next/image";

import type { ConfigurationSection } from "../types/configuration-section";

interface CardContentProps {
  section: ConfigurationSection;
}

export function CardContent({ section }: CardContentProps) {
  return (
    <>
      <div className="relative h-[140px] overflow-hidden sm:h-[150px] xl:h-[158px]">
        <Image
          src={section.backgroundImage}
          alt=""
          fill
          priority={section.id === "almacen"}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(2,20,73,0.22),rgba(0,99,255,0.08))]" />
        <div className="absolute inset-3 sm:inset-4">
          <Image
            src={section.image}
            alt=""
            fill
            unoptimized
            sizes="(max-width: 640px) 60vw, (max-width: 1024px) 30vw, 15vw"
            className="object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.16)] transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="flex h-13 items-center justify-center px-3">
        <span className="text-center text-[15px] font-medium leading-tight text-[#4b4d50]">
          {section.label}
        </span>
      </div>
    </>
  );
}
