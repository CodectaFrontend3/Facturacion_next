import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CompanyLogoCardProps {
  logoUrl?: string;
}

export function CompanyLogoCard({
  logoUrl = "/logo-placeholder.png",
}: CompanyLogoCardProps) {
  return (
    <Card className="w-full h-[260px] bg-white rounded-none border border-slate-200 shadow-sm flex flex-col justify-between">
      <CardHeader className="py-2 px-4 border-b border-slate-100 flex-shrink-0">
        <CardTitle className="text-center text-ls font-bold text-slate-800 tracking-wider uppercase">
          LOGO DE LA EMPRESA
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt="Logo de la Empresa"
            className="max-h-36 max-w-full object-contain"
          />
        ) : (
          <p className="text-xs text-slate-400">Sin logo disponible</p>
        )}
      </CardContent>
    </Card>
  );
}
