import Image from "next/image";

import type { ConfigurationSection } from "../types/configuration-section";

interface CardContentProps {
  section: ConfigurationSection;
}

export function CardContent({ section }: CardContentProps) {
  return (
    <>
      <div className="relative h-[176px] overflow-hidden sm:h-[190px] xl:h-[200px]">
        <Image
          src={section.backgroundImage}
          alt=""
          fill
          priority={section.id === "almacen"}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(2,20,73,0.22),rgba(0,99,255,0.08))]" />
        <div className="absolute inset-4">
          <Image
            src={section.image}
            alt=""
            fill
            unoptimized
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 34vw, 17vw"
            className="object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="flex h-16 items-center justify-center px-4">
        <span className="text-center text-[17px] font-medium leading-tight">
          {section.label}
        </span>
      </div>
    </>
  );
}
