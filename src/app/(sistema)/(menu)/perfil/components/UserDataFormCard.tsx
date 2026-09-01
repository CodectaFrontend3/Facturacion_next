"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserDataFormProps {
  initialData: {
    name: string;
    email: string;
    phone: string;
  };
  onSave?: (data: any) => void;
}

export function UserDataFormCard({ initialData, onSave }: UserDataFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [password, setPassword] = useState("************");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Card className="w-full bg-white border border-slate-200/50 !rounded-none shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden !p-0">
      <div className="pt-5 pb-3 px-6 border-b border-slate-100">
        <h3 className="text-xs font-bold text-slate-700 m-0 p-0 leading-none">
          Datos Usuario
        </h3>
      </div>

      <div className="px-10 pt-6 pb-8 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs text-slate-700 font-bold">
            Nombre:
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-white border border-slate-200/80 text-xs text-slate-700 h-9 !rounded-none focus-visible:ring-0"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs text-slate-700 font-bold">
            Correo:
          </Label>
          <Input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-white border border-slate-200/80 text-xs text-slate-700 h-9 !rounded-none focus-visible:ring-0"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-xs text-slate-700 font-bold">
            Celular:
          </Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="bg-white border border-slate-200/80 text-xs text-slate-700 h-9 !rounded-none focus-visible:ring-0"
          />
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="password"
            className="text-xs text-slate-700 font-bold"
          >
            Contraseña:
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#e9ecef]/80 border border-slate-200/80 text-xs text-slate-700 h-9 !rounded-none focus-visible:ring-0"
          />
        </div>

        <div className="pt-3">
          <Button
            className="bg-[#1067b8] hover:bg-[#0c5294] text-white text-xs px-5 py-2 h-auto rounded-sm font-semibold shadow-none"
            onClick={() => onSave?.({ ...formData, password })}
          >
            Guardar
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default UserDataFormCard;
