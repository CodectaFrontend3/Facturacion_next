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
import { KardexEntradaFormProps } from "../../../types/kardex";
import {
  KardexEntradaFormValues,
  kardexEntradaSchema,
} from "../../../types/kardex.schema";

export default function GenerarKardexEntrada({
  motivos,
  tiposComprobante,
  tiposTransporte,
  proveedores,
  monedas,
  productos,
  defaultValues,
  onSubmit,
}: KardexEntradaFormProps) {
  const router = useRouter();

  const form = useForm<KardexEntradaFormValues>({
    resolver: zodResolver(kardexEntradaSchema) as any,
    defaultValues: {
      motivo: "",
      tipoComprobante: "",
      numeroComprobante: "",
      fechaComprobante: "",
      tipoTransporte: "",
      categoria: "PRODUCTOS",
      fechaCompra: "",
      proveedor: "",
      moneda: "",
      informacion: "",
      guiaRemision: "",
      productos: [{ idProducto: "", unidad: "1", cantidad: 0, precio: 0 }],
      ...defaultValues,
    },
  });

  const { control, handleSubmit, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "productos",
  });

  const calcularTotal = (index: number) => {
    const cantidad = Number(watch(`productos.${index}.cantidad`)) || 0;
    const precio = Number(watch(`productos.${index}.precio`)) || 0;
    return (cantidad * precio).toFixed(2);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-6 py-4 bg-[#fcfcfc] min-h-screen font-sans text-[#333]"
      >
        <div className="w-full border border-gray-200 rounded-sm bg-white shadow-sm">
          {/* Cabecera */}
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <h1 className="text-[13px] font-bold text-gray-700">
              Kardex de Entrada
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
            {/* Fecha y Código de Almacén */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-[12px] font-bold text-gray-700">
                {new Date().toLocaleDateString("es-PE")}
              </span>
              <span className="text-[12px] font-bold text-gray-700 bg-gray-50 px-2 py-0.5 border border-gray-200">
                ALM2 - 2
              </span>
            </div>

            {/* GRID PRINCIPAL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4 mb-10">
              {/* --- SECCIÓN IZQUIERDA --- */}
              <div className="space-y-4">
                {/* Motivo */}
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
                              <SelectValue placeholder="Seleccionar Motivo" />
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

                {/* Tipo de Comprobante compuesto */}
                <div className="flex items-start">
                  <span className="w-36 text-[12px] font-bold shrink-0 pt-1.5">
                    Tipo de Comprobante:
                  </span>
                  <div className="flex-1 flex items-start gap-2">
                    <FormField
                      control={control}
                      name="tipoComprobante"
                      render={({ field }) => (
                        <FormItem className="w-44 space-y-0">
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full text-[12px]">
                                <SelectValue placeholder="Sin Comprobante" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {tiposComprobante.map((t) => (
                                <SelectItem key={t.value} value={t.value}>
                                  {t.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <span className="text-[12px] font-bold whitespace-nowrap px-1 pt-2">
                      N° y Fecha:
                    </span>
                    <FormField
                      control={control}
                      name="numeroComprobante"
                      render={({ field }) => (
                        <FormItem className="flex-1 min-w-0 space-y-0">
                          <FormControl>
                            <Input
                              placeholder="N° comprobante"
                              className="text-[12px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Fecha de comprobante */}
                <FormField
                  control={control}
                  name="fechaComprobante"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-0 space-y-0">
                      <FormLabel className="w-36 text-[12px] font-bold shrink-0">
                        Fecha Comprobante:
                      </FormLabel>
                      <div className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="dd/mm/aaaa"
                            className="text-[12px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Tipo de Transporte */}
                <FormField
                  control={control}
                  name="tipoTransporte"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-0 space-y-0">
                      <FormLabel className="w-36 text-[12px] font-bold shrink-0">
                        Tipo de transporte:
                      </FormLabel>
                      <div className="flex-1">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full text-[12px]">
                              <SelectValue placeholder="Escoge el tipo de Transporte" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {tiposTransporte.map((t) => (
                              <SelectItem key={t.value} value={t.value}>
                                {t.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Categoría (bloqueada) */}
                <FormField
                  control={control}
                  name="categoria"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-0 space-y-0">
                      <FormLabel className="w-36 text-[12px] font-bold shrink-0">
                        Categoría:
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          className="flex-1 bg-[#e9ecef] text-[12px] text-gray-600"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Fecha de compra */}
                <FormField
                  control={control}
                  name="fechaCompra"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-0 space-y-0">
                      <FormLabel className="w-36 text-[12px] font-bold shrink-0">
                        Fecha de compra:
                      </FormLabel>
                      <div className="w-1/2">
                        <FormControl>
                          <Input
                            placeholder="dd/mm/aaaa"
                            className="text-[12px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* --- SECCIÓN DERECHA --- */}
              <div className="space-y-4">
                {/* Proveedor */}
                <FormField
                  control={control}
                  name="proveedor"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-0 space-y-0">
                      <FormLabel className="w-24 text-[12px] font-bold shrink-0">
                        Proveedor:
                      </FormLabel>
                      <div className="flex-1">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full text-[12px]">
                              <SelectValue placeholder="Selecciona un proveedor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {proveedores.map((p) => (
                              <SelectItem key={p.value} value={p.value}>
                                {p.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Moneda */}
                <FormField
                  control={control}
                  name="moneda"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-0 space-y-0">
                      <FormLabel className="w-24 text-[12px] font-bold shrink-0">
                        Moneda:
                      </FormLabel>
                      <div className="flex-1">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full text-[12px]">
                              <SelectValue placeholder="Seleccionar Moneda" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {monedas.map((m) => (
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

                {/* Información */}
                <FormField
                  control={control}
                  name="informacion"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-0 space-y-0">
                      <FormLabel className="w-24 text-[12px] font-bold shrink-0">
                        Información:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingreso de productos al almacen"
                          className="flex-1 text-[12px]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* G. Remisión */}
                <FormField
                  control={control}
                  name="guiaRemision"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-0 space-y-0">
                      <FormLabel className="w-24 text-[12px] font-bold shrink-0">
                        G. Remisión:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0"
                          className="flex-1 text-[12px]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Archivo */}
                <FormField
                  control={control}
                  name="archivo"
                  render={({ field: { onChange, name, ref } }) => (
                    <FormItem className="flex items-center gap-0 space-y-0">
                      <FormLabel className="w-24 text-[12px] font-bold shrink-0">
                        Archivo:
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          name={name}
                          ref={ref}
                          className="flex-1 text-[11px]"
                          onChange={(e) => onChange(e.target.files?.[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* TABLA DE PRODUCTOS */}
            <div className="relative">
              <div className="flex gap-4 items-center mb-4 border-b border-gray-100 pb-2">
                <div className="w-8 flex justify-center">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      append({
                        idProducto: "",
                        unidad: "1",
                        cantidad: 0,
                        precio: 0,
                      })
                    }
                  >
                    <Plus size={18} />
                  </Button>
                </div>
                <div className="flex-1 flex gap-4 text-[12px] font-bold text-gray-700 px-1">
                  <div className="flex-1 pl-1">Producto</div>
                  <div className="w-20 text-center shrink-0">Unidad</div>
                  <div className="w-24 text-center shrink-0">Cantidad</div>
                  <div className="w-24 text-center shrink-0">Precio</div>
                  <div className="w-28 text-center shrink-0">Total</div>
                </div>
              </div>

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-4 items-start">
                    <Button
                      type="button"
                      size="icon"
                      className="bg-[#1A5EB3] hover:opacity-90"
                      disabled={fields.length === 1}
                      onClick={() => remove(index)}
                    >
                      <Trash2 size={16} />
                    </Button>

                    <div className="flex-1 flex gap-4 items-start">
                      {/* Producto */}
                      <FormField
                        control={control}
                        name={`productos.${index}.idProducto`}
                        render={({ field }) => (
                          <FormItem className="flex-1 space-y-0">
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

                      {/* Unidad */}
                      <FormField
                        control={control}
                        name={`productos.${index}.unidad`}
                        render={({ field }) => (
                          <FormItem className="w-20 shrink-0 space-y-0">
                            <FormControl>
                              <Input
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
                          <FormItem className="w-24 shrink-0 space-y-0">
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

                      {/* Precio */}
                      <FormField
                        control={control}
                        name={`productos.${index}.precio`}
                        render={({ field }) => (
                          <FormItem className="w-24 shrink-0 space-y-0">
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

                      {/* Total (calculado, solo lectura) */}
                      <div className="w-28 shrink-0">
                        <Input
                          disabled
                          value={calcularTotal(index)}
                          className="text-center bg-[#e9ecef] text-[12px]"
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
                className="bg-[#1A5EB3] px-8 text-[12px] font-medium hover:opacity-95"
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
