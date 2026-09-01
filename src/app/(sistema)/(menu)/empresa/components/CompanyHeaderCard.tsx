import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CompanyHeaderCardProps {
  logoUrl?: string;
  name: string;
  ruc: string;
  description: string;
  onEdit: () => void;
}

export function CompanyHeaderCard({
  logoUrl = "/logo-placeholder.png",
  name,
  ruc,
  description,
  onEdit,
}: CompanyHeaderCardProps) {
  return (
    <Card className="w-full bg-white border border-slate-200 rounded-none shadow-none">
      <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo & Info Principal */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
          {/* Contenedor del Logo */}
          <div className="flex-shrink-0 max-w-[220px] max-h-[80px] flex items-center justify-center">
            <img
              src={logoUrl}
              alt={`Logo de ${name}`}
              className="w-full h-auto object-contain max-h-[80px]"
            />
          </div>

          {/* Detalles de la empresa */}
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-base font-bold tracking-tight text-slate-900 uppercase">
              {name}
            </h2>
            <p className="text-xs font-bold text-slate-800">{ruc}</p>
            <p className="text-xs text-slate-500 max-w-xl">{description}</p>
          </div>
        </div>

        {/* Botón de Acción */}
        <div className="flex-shrink-0 w-full sm:w-auto flex justify-end">
          <Button
            onClick={onEdit}
            className="bg-[#0B42AC] hover:bg-[#083386] text-white font-medium px-5 h-9 text-xs rounded transition-colors cursor-pointer"
          >
            Editar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
