// usePagoDeCuotasForm.ts
"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormPagoSchema,
  type FormPagoValues,
  type FormPagoOutput,
} from "../schema/FormPagoSchema";
import { ComprobanteBase } from "../types/ComprobanteBase";

export const TIPO_CAMBIO_DEL_DIA = 3.33;

interface UsePagoDeCuotasFormParams {
  isOpenExternal?: boolean;
  boletasSeleccionadas: ComprobanteBase[];
  onSuccess: () => void;
}

export function usePagoDeCuotasForm({
  isOpenExternal,
  boletasSeleccionadas,
  onSuccess,
}: UsePagoDeCuotasFormParams) {
  const [isOpenInternal, setIsOpenInternal] = useState(false);

  // El modal NO se abre automáticamente al seleccionar filas.
  // Solo cambia cuando se llama explícitamente a openModal() o se altera isOpenExternal.
  const isOpen = isOpenExternal !== undefined ? isOpenExternal : isOpenInternal;

  const openModal = () => setIsOpenInternal(true);
  const closeModal = () => {
    setIsOpenInternal(false);
    onSuccess();
  };

  const hayBoletasSeleccionadas = boletasSeleccionadas.length > 0;

  const form = useForm<FormPagoValues, any, FormPagoOutput>({
    resolver: zodResolver(FormPagoSchema),
    defaultValues: {
      metodoPago: "cheque",
      boletas: [],
      montoTotal: 0,
      notasAdicionales: "",
      moneda: "S/",
      tipoCambio: TIPO_CAMBIO_DEL_DIA,
      esDiferido: false,
    },
  });

  const { fields, replace } = useFieldArray({
    control: form.control,
    name: "boletas",
  });

  const metodoPagoActivo = form.watch("metodoPago");
  const montoTotalActual = form.watch("montoTotal");
  const watchBoletas = form.watch("boletas");

  // Rellenamos el formulario ÚNICAMENTE si el modal está abierto
  useEffect(() => {
    if (isOpen && hayBoletasSeleccionadas) {
      const boletasFormateadas = boletasSeleccionadas.map((b) => ({
        idBoleta: b.id,
        numeroDocumento: `Nro. ${b.id}`,
        cuotasSeleccionadas: [],
        montoPagar: b.saldo,
      }));
      replace(boletasFormateadas);
      form.setValue("tipoCambio", TIPO_CAMBIO_DEL_DIA);
    }
  }, [isOpen, hayBoletasSeleccionadas, boletasSeleccionadas, replace, form]);

  useEffect(() => {
    if (watchBoletas) {
      const total = watchBoletas.reduce(
        (acc, curr) => acc + (Number(curr?.montoPagar) || 0),
        0,
      );
      form.setValue("montoTotal", Number(total.toFixed(2)));
    }
  }, [watchBoletas, form]);

  const onSubmit: SubmitHandler<FormPagoOutput> = (values) => {
    console.log("Datos para enviar:", values);
    closeModal();
  };

  return {
    isOpen,
    openModal,
    closeModal,
    form,
    fields,
    metodoPagoActivo,
    montoTotalActual,
    onSubmit,
    hayBoletasSeleccionadas,
  };
}

export default usePagoDeCuotasForm;
