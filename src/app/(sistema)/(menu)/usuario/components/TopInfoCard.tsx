import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TopInfoCardProps {
  systemEmail: string;
  assignedWarehouse: string | number;
}

export function TopInfoCard({ systemEmail, assignedWarehouse }: TopInfoCardProps) {
  return (
    <Card className="w-full bg-white border border-slate-200/50 !rounded-none shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6 transition-all">
      <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <Label htmlFor="systemEmail" className="font-bold text-xs text-slate-600">
            Correo:
          </Label>
          <Input
            id="systemEmail"
            value={systemEmail}
            readOnly
            className="bg-slate-50/60 border border-slate-200/60 text-xs text-slate-700 h-9 !rounded-none focus-visible:ring-0"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="assignedWarehouse" className="font-bold text-xs text-slate-600">
            Almacén Asignado:
          </Label>
          <Input
            id="assignedWarehouse"
            value={assignedWarehouse}
            readOnly
            className="bg-slate-50/60 border border-slate-200/60 text-xs text-slate-700 h-9 !rounded-none focus-visible:ring-0"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default TopInfoCard;