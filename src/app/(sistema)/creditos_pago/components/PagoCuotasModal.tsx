// PagoCuotasModal.tsx
"use client";

import { usePagoDeCuotasForm } from "../hooks/usePagoDeCuotasForm";
import { ComprobanteBase } from "../types/ComprobanteBase";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { useForm } from "react-hook-form";
import type { FormPagoValues } from "../schema/FormPagoSchema";

const BANCOS = [
  "BCP",
  "BBVA",
  "Interbank",
  "Scotiabank",
  "Banco de la Nación",
  "Banco Pichincha",
  "Banco Falabella",
];

const CUENTAS_EMPRESA = [
  { value: "cta-001", label: "Cuenta Corriente S/ - 191-xxxxxxx" },
  { value: "cta-002", label: "Cuenta Corriente $ - 191-xxxxxxx" },
];

interface PagoCuotasModalProps {
  isOpen: boolean;
  onClose: () => void;
  boletasSeleccionadas: ComprobanteBase[];
}

export function PagoCuotasModal({
  isOpen,
  onClose,
  boletasSeleccionadas,
}: PagoCuotasModalProps) {
  const {
    form,
    fields,
    metodoPagoActivo,
    montoTotalActual,
    onSubmit,
    hayBoletasSeleccionadas,
  } = usePagoDeCuotasForm({
    isOpenExternal: isOpen,
    boletasSeleccionadas,
    onSuccess: onClose,
  });

  // Si el modal es activado por el botón pero no hay nada seleccionado, mostramos la alerta preventiva
  if (isOpen && !hayBoletasSeleccionadas) {
    return (
      <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ninguna boleta seleccionada</AlertDialogTitle>
            <AlertDialogDescription>
              Debes seleccionar al menos una fila de la tabla para poder
              registrar un pago de cuotas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={onClose}>Entendido</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl font-sans">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-700">
            Pago de Cuotas
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Accordion type="single" collapsible defaultValue="boletas">
              {/* SECCIÓN 1: BOLETAS A PAGAR */}
              <AccordionItem
                value="boletas"
                className="!border-b-0 border border-gray-300 rounded-md mb-2 overflow-hidden"
              >
                <AccordionTrigger className="bg-gray-100 px-4 py-3 font-semibold text-gray-800 hover:no-underline hover:bg-gray-200 rounded-t-md">
                  Boletas a Pagar
                </AccordionTrigger>
                <AccordionContent className="p-4 space-y-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="space-y-2 border-b border-gray-200 pb-4 last:border-b-0"
                    >
                      <p className="font-bold text-[13px] text-gray-700">
                        {field.numeroDocumento} - Cliente:{" "}
                        {boletasSeleccionadas[index]?.cliente || "N/A"}
                      </p>

                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-8">
                          <Select
                            onValueChange={(val) => {
                              form.setValue(
                                `boletas.${index}.cuotasSeleccionadas`,
                                [val],
                              );
                              form.setValue(
                                `boletas.${index}.montoPagar`,
                                boletasSeleccionadas[index]?.saldo || 0,
                              );
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Seleccionar Cuotas" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cuota-unica">
                                Pago Total (Saldo: S/{" "}
                                {boletasSeleccionadas[index]?.saldo.toFixed(2)})
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="col-span-4 flex items-center gap-2">
                          <span className="text-gray-500 font-semibold text-[13px]">
                            S/
                          </span>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="text-right"
                            {...form.register(`boletas.${index}.montoPagar`)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end items-center gap-4 pt-4 border-t border-gray-200">
                    <span className="font-bold text-gray-700 text-sm">
                      Total a Pagar:
                    </span>
                    <div className="flex items-center gap-2 w-1/3">
                      <span className="text-gray-500 font-semibold text-[13px]">
                        S/
                      </span>
                      <Input
                        type="number"
                        readOnly
                        className="bg-gray-100 text-right font-bold"
                        {...form.register("montoTotal")}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* SECCIÓN 2: MÉTODO DE PAGO */}
              <AccordionItem
                value="metodo"
                className="!border-b-0 border border-gray-300 rounded-md overflow-hidden"
              >
                <AccordionTrigger className="bg-gray-100 px-4 py-3 font-semibold text-gray-800 hover:no-underline hover:bg-gray-200 rounded-t-md">
                  Método de Pago
                </AccordionTrigger>
                <AccordionContent className="p-4 space-y-4">
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {(
                      [
                        "cheque",
                        "tarjeta",
                        "efectivo",
                        "transferencia",
                      ] as const
                    ).map((metodo) => {
                      const activo = metodoPagoActivo === metodo;
                      const colorActivo =
                        metodo === "cheque"
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-[#1db092] hover:bg-[#19967d] text-white";

                      return (
                        <Button
                          key={metodo}
                          type="button"
                          variant={activo ? "default" : "outline"}
                          className={`capitalize font-bold border-blue-600 ${
                            activo
                              ? colorActivo
                              : "text-blue-600 hover:text-blue-700 bg-white"
                          }`}
                          onClick={() => {
                            form.reset({
                              ...form.getValues(),
                              metodoPago: metodo,
                            });
                          }}
                        >
                          {metodo}
                        </Button>
                      );
                    })}
                  </div>

                  {/* FORMULARIOS DINÁMICOS */}
                  {metodoPagoActivo === "cheque" && (
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="numeroCheque"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-gray-700">
                              N° de Cheque
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Número de Cheque"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="fechaCobro"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-gray-700">
                              Fecha de Cobro
                            </FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bancoEmisor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-gray-700">
                              Banco Emisor
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Seleccionar Banco" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {BANCOS.map((banco) => (
                                  <SelectItem key={banco} value={banco}>
                                    {banco}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="beneficiario"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-gray-700">
                              Beneficiario
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Beneficiario" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <MonedaTipoCambioRow
                        form={form}
                        montoTotalActual={montoTotalActual}
                        showDiferido
                      />

                      <FormField
                        control={form.control}
                        name="fechaEmisionCheque"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-gray-700">
                              Fecha de Emisión de Cheque
                            </FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="bancoEmpresa"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-gray-700">
                              Banco de la Empresa
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {BANCOS.map((banco) => (
                                  <SelectItem key={banco} value={banco}>
                                    {banco}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="numeroCuenta"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-gray-700">
                              N° de Cuenta
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {CUENTAS_EMPRESA.map((cuenta) => (
                                  <SelectItem
                                    key={cuenta.value}
                                    value={cuenta.value}
                                  >
                                    {cuenta.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="comprobanteArchivo"
                        render={({ field: { onChange, value, ...rest } }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-gray-700">
                              Comprobantes (opcional)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                onChange={(e) => onChange(e.target.files)}
                                {...rest}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {metodoPagoActivo === "tarjeta" && (
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="titularTarjeta"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-gray-700">
                              Titular de la tarjeta
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Titular de la Tarjeta"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="banco"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-gray-700">
                              Banco
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Seleccionar Banco" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {BANCOS.map((banco) => (
                                  <SelectItem key={banco} value={banco}>
                                    {banco}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <MonedaTipoCambioRow
                        form={form}
                        montoTotalActual={montoTotalActual}
                      />

                      <FormField
                        control={form.control}
                        name="fechaPago"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-gray-700">
                              Fecha de Pago
                            </FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="comprobanteArchivo"
                        render={({ field: { onChange, value, ...rest } }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-gray-700">
                              Comprobante (opcional)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                onChange={(e) => onChange(e.target.files)}
                                {...rest}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {metodoPagoActivo === "efectivo" && (
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="personaCancela"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-gray-700">
                              Persona que Cancela
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Nombre del titular"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="fechaPago"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-gray-700">
                              Fecha de Pago
                            </FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <MonedaTipoCambioRow
                        form={form}
                        montoTotalActual={montoTotalActual}
                      />
                    </div>
                  )}

                  {metodoPagoActivo === "transferencia" && (
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="titular"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-gray-700">
                              Titular
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Titular" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="fecha"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-gray-700">
                              Fecha
                            </FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <MonedaTipoCambioRow
                        form={form}
                        montoTotalActual={montoTotalActual}
                      />

                      <FormField
                        control={form.control}
                        name="bancoEmpresa"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-gray-700">
                              Banco de la Empresa
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {BANCOS.map((banco) => (
                                  <SelectItem key={banco} value={banco}>
                                    {banco}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cuentaBancaria"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-gray-700">
                              N° de Cuenta Bancaria
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {CUENTAS_EMPRESA.map((cuenta) => (
                                  <SelectItem
                                    key={cuenta.value}
                                    value={cuenta.value}
                                  >
                                    {cuenta.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="numeroOperacion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-gray-700">
                              N° de Operación
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Número de Operación"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="comprobanteArchivo"
                        render={({ field: { onChange, value, ...rest } }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-gray-700">
                              Comprobante
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                onChange={(e) => onChange(e.target.files)}
                                {...rest}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="notasAdicionales"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel className="text-xs font-bold text-gray-700">
                          Notas Adicionales
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={3}
                            placeholder="Ingrese comentarios extras..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <DialogFooter className="flex justify-end gap-2 pt-4 border-t border-gray-200">
              <Button type="button" variant="outline" onClick={onClose}>
                Cerrar
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
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

function MonedaTipoCambioRow({
  form,
  montoTotalActual,
  showDiferido = false,
}: {
  form: ReturnType<typeof useForm<FormPagoValues>>;
  montoTotalActual: number;
  showDiferido?: boolean;
}) {
  return (
    <div
      className={`col-span-2 grid gap-4 ${
        showDiferido ? "grid-cols-3" : "grid-cols-2"
      }`}
    >
      <FormField
        control={form.control}
        name="moneda"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-bold text-gray-700">
              Moneda de Pago y monto
            </FormLabel>
            <div className="flex gap-2">
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-20 shrink-0">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="S/">S/</SelectItem>
                  <SelectItem value="$">$</SelectItem>
                </SelectContent>
              </Select>
              <Input
                readOnly
                className="bg-gray-100 text-right"
                value={montoTotalActual?.toFixed(2) ?? "0.00"}
              />
            </div>
            <p className="text-[11px] text-gray-400">
              En base al tipo de cambio del día de pago
            </p>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tipoCambio"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-bold text-gray-700">
              Tipo cambio
            </FormLabel>
            <FormControl>
              <Input readOnly className="bg-gray-100" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {showDiferido && (
        <FormField
          control={form.control}
          name="esDiferido"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold text-gray-700">
                ¿Es Diferido?
              </FormLabel>
              <FormControl>
                <EsDiferidoToggle
                  checked={!!field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </div>
  );
}

function EsDiferidoToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2 h-9">
      <span
        className={`text-xs ${
          !checked ? "font-semibold text-gray-700" : "text-gray-400"
        }`}
      >
        No
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 ${
          checked ? "bg-red-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-4" : "translate-x-1"
          }`}
        />
      </button>

      <span
        className={`text-xs ${
          checked ? "font-semibold text-gray-700" : "text-gray-400"
        }`}
      >
        Si
      </span>
    </div>
  );
}
