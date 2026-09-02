"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Flag, MapPin, Building2, Map, FileText } from "lucide-react";

interface LocationCardProps {
  country: string;
  province: string;
  city: string;
  address: string;
  ubigeo: string;
}

export function LocationCard({
  country,
  province,
  city,
  address,
  ubigeo,
}: LocationCardProps) {
  // Construimos la dirección completa para el buscador de Google Maps
  const fullAddress = `${address}, ${city}, ${province}, ${country}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    fullAddress,
  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <Card className="w-full bg-[#0000FF] border-none rounded-none shadow-sm text-white overflow-hidden py-6 px-8">
      {/* Título de la Sección */}
      <h3 className="text-center text-[15px] font-extrabold tracking-wide uppercase mb-6">
        DATOS DE UBICACIÓN
      </h3>

      {/* Lista de Datos */}
      <div className="flex flex-col items-center justify-center space-y-2 text-xs font-semibold mb-6">
        <div className="flex items-center gap-2">
          <Flag className="w-4 h-4 fill-white text-[#0000FF] shrink-0" />
          <span>
            <strong className="font-bold">País:</strong> {country}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-white fill-white shrink-0" />
          <span>
            <strong className="font-bold">Provincia:</strong> {province}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-white shrink-0" />
          <span>
            <strong className="font-bold">Ciudad:</strong> {city}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Map className="w-4 h-4 text-white shrink-0" />
          <span>
            <strong className="font-bold">Dirección:</strong> {address}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-white shrink-0" />
          <span>
            <strong className="font-bold">Código Ubigeo:</strong> {ubigeo}
          </span>
        </div>
      </div>

      {/* Mapa Embed de Google */}
      <CardContent className="p-0 w-full h-[280px] bg-white rounded-sm overflow-hidden">
        <iframe
          title="Google Map Location"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={mapEmbedUrl}
        />
      </CardContent>
    </Card>
  );
}
