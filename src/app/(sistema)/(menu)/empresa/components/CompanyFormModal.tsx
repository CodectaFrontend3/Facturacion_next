"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HelpCircle, Upload } from "lucide-react";

import { companySchema, CompanyFormValues } from "../schema/companySchema";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CompanyFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: Partial<CompanyFormValues>;
  onSubmit: (data: CompanyFormValues) => void;
}

export function CompanyFormModal({
  open,
  onOpenChange,
  initialValues,
  onSubmit,
}: CompanyFormModalProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(
    initialValues?.logoUrl || null,
  );

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      descripcion: "",
      movil: "",
      telefono: "",
      correo: "",
      pais: "Peru",
      calle: "",
      rubro: "",
      regionProvincia: "",
      ciudad: "",
      codigoUbigeo: "",
      paginaWeb: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.reset({
        descripcion: initialValues.descripcion || "",
        movil: initialValues.movil || "",
        telefono: initialValues.telefono || "",
        correo: initialValues.correo || "",
        pais: initialValues.pais || "Peru",
        calle: initialValues.calle || "",
        rubro: initialValues.rubro || "",
        regionProvincia: initialValues.regionProvincia || "",
        ciudad: initialValues.ciudad || "",
        codigoUbigeo: initialValues.codigoUbigeo || "",
        paginaWeb: initialValues.paginaWeb || "",
      });
      if (initialValues.logoUrl) {
        setLogoPreview(initialValues.logoUrl);
      }
    }
  }, [initialValues, form, open]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
    }
  };

  const handleSubmit = (data: CompanyFormValues) => {
    onSubmit({ ...data, logoUrl: logoPreview || "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[760px] w-full max-h-[90vh] overflow-y-auto p-6 bg-white rounded-md border-none shadow-lg"
      >
        <DialogHeader className="p-0 mb-4">
          <DialogTitle className="text-sm font-bold text-slate-800 tracking-tight">
            Información de la Empresa
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-3"
          >
            {/* Logo de la empresa (Grande y centrado igual a la 2da foto) */}
            <div className="flex flex-col items-center justify-center my-2">
              <label
                htmlFor="logo-upload"
                className="cursor-pointer group flex flex-col items-center"
              >
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo Empresa"
                    className="h-24 sm:h-28 object-contain"
                  />
                ) : (
                  <div className="w-56 h-24 bg-slate-50 border border-dashed border-slate-300 rounded flex flex-col items-center justify-center text-slate-400">
                    <Upload className="w-5 h-5 mb-1" />
                    <span className="text-xs">Subir imagen</span>
                  </div>
                )}
                <span className="text-[11px] text-slate-400 mt-1">
                  (Click para cambiar la imagen)
                </span>
              </label>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            {/* Descripción */}
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-bold text-slate-800">
                    Descripción:
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Empresa dedicada en optimización de energías y eficiencia energética"
                      className="resize-none min-h-[60px] text-xs border-slate-200 rounded focus-visible:ring-1 focus-visible:ring-slate-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            {/* Grid Form Fields - 2 Columnas anchas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              <FormField
                control={form.control}
                name="movil"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-bold text-slate-800">
                      Móvil:
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-8 text-xs border-slate-200 rounded focus-visible:ring-1 focus-visible:ring-slate-300"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-bold text-slate-800">
                      Teléfono:
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-8 text-xs border-slate-200 rounded focus-visible:ring-1 focus-visible:ring-slate-300"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="correo"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-bold text-slate-800">
                      Correo:
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="h-8 text-xs border-slate-200 rounded focus-visible:ring-1 focus-visible:ring-slate-300"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pais"
                render={({ field }) => (
                  <FormItem className="space-y-1 w-full">
                    <FormLabel className="text-xs font-bold text-slate-800">
                      País:
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full h-8 text-xs border-slate-200 rounded focus:ring-1 focus:ring-slate-300">
                          <SelectValue placeholder="Seleccione País" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Peru">Peru</SelectItem>
                        <SelectItem value="Colombia">Colombia</SelectItem>
                        <SelectItem value="Chile">Chile</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="calle"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-bold text-slate-800">
                      Calle:
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none min-h-[34px] h-8 text-xs border-slate-200 rounded focus-visible:ring-1 focus-visible:ring-slate-300"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rubro"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-bold text-slate-800">
                      Rubro:
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-8 text-xs border-slate-200 rounded focus-visible:ring-1 focus-visible:ring-slate-300"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="regionProvincia"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-bold text-slate-800">
                      Región/Provincia:
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-8 text-xs border-slate-200 rounded focus-visible:ring-1 focus-visible:ring-slate-300"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ciudad"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-bold text-slate-800">
                      Ciudad:
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-8 text-xs border-slate-200 rounded focus-visible:ring-1 focus-visible:ring-slate-300"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="codigoUbigeo"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <div className="flex items-center gap-1">
                      <FormLabel className="text-xs font-bold text-slate-800">
                        Código Ubigeo:
                      </FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger type="button">
                            <HelpCircle className="w-3.5 h-3.5 text-blue-500 fill-blue-500 text-white" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Código de 6 dígitos</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <Input
                        className="h-8 text-xs border-slate-200 rounded focus-visible:ring-1 focus-visible:ring-slate-300"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paginaWeb"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-bold text-slate-800">
                      Página Web:
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-8 text-xs border-slate-200 rounded focus-visible:ring-1 focus-visible:ring-slate-300"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Footer con los colores exactos del diseño 2 */}
            <DialogFooter className="pt-4 flex gap-2 justify-end">
              <Button
                type="button"
                onClick={() => onOpenChange(false)}
                className="bg-[#6C757D] text-white hover:bg-[#5a6268] text-xs font-semibold px-4 h-8 rounded"
              >
                Cerrar
              </Button>
              <Button
                type="submit"
                className="bg-[#1D61E0] text-white hover:bg-[#1852bd] text-xs font-semibold px-4 h-8 rounded"
              >
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
