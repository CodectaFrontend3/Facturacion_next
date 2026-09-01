import { Phone, Smartphone, Globe, Mail, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CompanyInfoCardProps {
  telefono?: string;
  celular?: string;
  sitioWeb?: string;
  correo?: string;
  rubro?: string;
}

export function CompanyInfoCard({
  telefono = "0133333333333",
  celular = "970102509",
  sitioWeb = "https://www.demo.com/",
  correo = "eduardohuamanch16@gmail.com",
  rubro = "VentaS.",
}: CompanyInfoCardProps) {
  return (
    <Card className="w-full h-[260px] bg-[#0B42AC] text-white rounded-none border-none shadow-sm flex flex-col justify-between">
      <CardHeader className="py-2 px-4 flex-shrink-0">
        <CardTitle className="text-center text-ls font-bold text-white tracking-wider uppercase">
          INFORMACION DE LA EMPRESA
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center p-3 text-ls">
        <div className="space-y-2.5 max-w-xs w-full">
          {/* Teléfono */}
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-white flex-shrink-0" />
            <p className="truncate">
              <span className="font-bold">Teléfono: </span>
              <span className="font-normal">{telefono}</span>
            </p>
          </div>

          {/* Celular */}
          <div className="flex items-center gap-2">
            <Smartphone className="w-3.5 h-3.5 text-white flex-shrink-0" />
            <p className="truncate">
              <span className="font-bold">Celular: </span>
              <span className="font-normal">{celular}</span>
            </p>
          </div>

          {/* Sitio Web */}
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-white flex-shrink-0" />
            <p className="truncate">
              <span className="font-bold">Sitio Web: </span>
              <a
                href={sitioWeb}
                target="_blank"
                rel="noreferrer"
                className="font-normal hover:underline"
              >
                {sitioWeb}
              </a>
            </p>
          </div>

          {/* Correo */}
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-white flex-shrink-0" />
            <p className="truncate">
              <span className="font-bold">Correo: </span>
              <span className="font-normal">{correo}</span>
            </p>
          </div>

          {/* Rubro */}
          <div className="flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-white flex-shrink-0" />
            <p className="truncate">
              <span className="font-bold">Rubro: </span>
              <span className="font-normal">{rubro}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
