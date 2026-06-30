"use client";

import { Plus, Trash2, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { KardexDistribucionFormProps } from "../../../types/kardex";
import {
  KardexDistribucionFormValues,
  kardexDistribucionSchema,
} from "../../../types/kardex.schema";

export default function GenerarKardexDistribucion({
  motivos = [],
  categorias = [],
  almacenes = [],
  productos = [],
  defaultValues,
  onSubmit,
}: KardexDistribucionFormProps) {
  const router = useRouter();

  const form = useForm<KardexDistribucionFormValues>({
    resolver: zodResolver(kardexDistribucionSchema) as any,
    defaultValues: {
      motivo: "",
      puntoPartida: "",
      categoria: "",
      almacen: "",
      puntoLlegada: "",
      observaciones: "",
      generarGuia: false,
      productos: [{ idProducto: "", stock: 0, unidades: 1, cantidad: 0 }],
      ...defaultValues,
    },
  });

  const { control, handleSubmit, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "productos",
  });

  const calcularTotal = (index: number) => {
    const unidades = Number(watch(`productos.${index}.unidades`)) || 0;
    const cantidad = Number(watch(`productos.${index}.cantidad`)) || 0;
    return (unidades * cantidad).toFixed(2);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-6 py-4 bg-[#fcfcfc] min-h-screen font-sans text-[#333]"
      >
        <div className="w-full border border-gray-200 rounded-sm bg-white shadow-sm">
          {/* Cabecera Principal */}
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <h1 className="text-[13px] font-bold text-gray-700">
              Kardex de Distribucion
            </h1>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-gray-400 cursor-pointer"
              onClick={() => router.back()}
            >
              <X width={16} height={16} />
            </Button>
          </div>

          <div className="p-6">
            {/* Fecha y Switch de Guía de Remisión */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-[12px] font-bold text-gray-700">
                {new Date().toLocaleDateString("es-PE")}
              </span>
              <FormField
                control={control}
                name="generarGuia"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormLabel className="text-[12px] font-medium text-gray-600">
                      Generar Guia de Remision
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* GRID DE ENTRADAS SUPERIORES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4 mb-10">
              {/* --- SECCIÓN IZQUIERDA --- */}
              <div className="space-y-4">
                <FormField
                  control={control}
                  name="motivo"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-0 space-y-0">
                      <FormLabel className="w-36 text-[12px] font-bold shrink-0">
                        Motivo:
                      </FormLabel>
                      <div className="flex-1">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full text-[12px]">
                              <SelectValue placeholder="Selecciona motivo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {motivos.map((m) => (
                              <SelectItem key={m.value} value={m.value}>
                                {m.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="puntoPartida"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-0 space-y-0">
                      <FormLabel className="w-36 text-[12px] font-bold shrink-0">
                        Punto partida:
                      </FormLabel>
                      <div className="flex-1">
                        <FormControl>
                          <Input className="text-[12px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="categoria"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-0 space-y-0">
                      <FormLabel className="w-36 text-[12px] font-bold shrink-0">
                        Categoría:
                      </FormLabel>
                      <div className="flex-1">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full text-[12px]">
                              <SelectValue placeholder="Selecciona categoria" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categorias.map((c) => (
                              <SelectItem key={c.value} value={c.value}>
                                {c.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* --- SECCIÓN DERECHA --- */}
              <div className="space-y-4">
                <FormField
                  control={control}
                  name="almacen"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-0 space-y-0">
                      <FormLabel className="w-28 text-[12px] font-bold shrink-0">
                        Almacen:
                      </FormLabel>
                      <div className="flex-1">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full text-[12px]">
                              <SelectValue placeholder="Selecciona almacen" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {almacenes.map((a) => (
                              <SelectItem key={a.value} value={a.value}>
                                {a.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="puntoLlegada"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-0 space-y-0">
                      <FormLabel className="w-28 text-[12px] font-bold shrink-0">
                        Punto llegada:
                      </FormLabel>
                      <div className="flex-1">
                        <FormControl>
                          <Input className="text-[12px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="observaciones"
                  render={({ field }) => (
                    <FormItem className="flex items-start gap-0 space-y-0">
                      <FormLabel className="w-28 text-[12px] font-bold shrink-0 pt-1.5">
                        Observaciones:
                      </FormLabel>
                      <div className="flex-1">
                        <FormControl>
                          <Textarea
                            rows={1}
                            className="text-[12px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* SECCIÓN TABLA */}
            <div className="w-full mt-10">
              <div className="flex items-center gap-3 mb-3 border-b border-gray-100 pb-2 w-full">
                <div className="w-9 shrink-0 flex justify-center">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      append({
                        idProducto: "",
                        stock: 0,
                        unidades: 1,
                        cantidad: 0,
                      })
                    }
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="flex-1 flex gap-3 text-[12px] font-bold text-gray-700">
                  <div className="flex-1 max-w-[45%] pl-1">Producto</div>
                  <div className="flex-1">Stock</div>
                  <div className="w-16 text-center shrink-0">Unidades</div>
                  <div className="w-20 text-center shrink-0">Cantidad</div>
                  <div className="w-24 text-center shrink-0">Total</div>
                </div>
              </div>

              <div className="space-y-3 w-full">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-3 w-full">
                    <div className="w-9 shrink-0 flex justify-center">
                      <Button
                        type="button"
                        size="icon"
                        className="bg-[#2C1FF3] hover:opacity-90"
                        disabled={fields.length === 1}
                        onClick={() => remove(index)}
                      >
                        <Trash2 size={15} />
                      </Button>
                    </div>

                    <div className="flex-1 flex gap-3 items-start">
                      {/* Producto */}
                      <FormField
                        control={control}
                        name={`productos.${index}.idProducto`}
                        render={({ field }) => (
                          <FormItem className="flex-1 max-w-[45%] space-y-0">
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full text-[12px]">
                                  <SelectValue placeholder="Seleccionar Producto" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {productos.map((p) => (
                                  <SelectItem key={p.value} value={p.value}>
                                    {p.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Stock (bloqueado) */}
                      <div className="flex-1">
                        <Input
                          disabled
                          value={watch(`productos.${index}.stock`) ?? 0}
                          className="bg-[#e9ecef] text-[12px]"
                        />
                      </div>

                      {/* Unidades */}
                      <FormField
                        control={control}
                        name={`productos.${index}.unidades`}
                        render={({ field }) => (
                          <FormItem className="w-16 shrink-0 space-y-0">
                            <FormControl>
                              <Input
                                type="number"
                                step="any"
                                className="text-center text-[12px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Cantidad */}
                      <FormField
                        control={control}
                        name={`productos.${index}.cantidad`}
                        render={({ field }) => (
                          <FormItem className="w-20 shrink-0 space-y-0">
                            <FormControl>
                              <Input
                                type="number"
                                step="any"
                                className="text-center text-[12px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Total (calculado) */}
                      <div className="w-24 shrink-0">
                        <Input
                          disabled
                          value={calcularTotal(index)}
                          className="bg-[#e9ecef] text-[12px]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botón Guardar */}
            <div className="mt-10 flex justify-end">
              <Button
                type="submit"
                className="bg-[#2C1FF3] px-8 text-[12px] font-medium hover:opacity-95"
              >
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
