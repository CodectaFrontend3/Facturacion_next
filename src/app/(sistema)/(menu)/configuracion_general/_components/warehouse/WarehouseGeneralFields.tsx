import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";

import { CboData } from "@/components/common/CboData";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { warehouseResponsibleOptions } from "../../data/warehouses";
import type { WarehouseFormValues } from "../../schemas/warehouse.schema";

interface WarehouseGeneralFieldsProps {
  form: UseFormReturn<WarehouseFormValues>;
  disabled: boolean;
}

const inputClassName =
  "h-9 rounded-none border-gray-300 bg-white px-3 text-[12px] text-[#676a6c] shadow-none focus-visible:border-[#18a689] focus-visible:ring-0 disabled:bg-gray-100";

const labelClassName = "text-[12px] font-bold text-[#676a6c]";

export function WarehouseGeneralFields({
  form,
  disabled,
}: WarehouseGeneralFieldsProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
      <FieldGroup className="gap-3">
        <Field className="gap-1.5" data-invalid={!!errors.nombre}>
          <FieldLabel htmlFor="warehouse-name" className={labelClassName}>
            Nombre:<span className="text-[#ed5565]">*</span>
          </FieldLabel>
          <Input
            id="warehouse-name"
            {...register("nombre")}
            disabled={disabled}
            className={inputClassName}
          />
          {errors.nombre?.message && (
            <FieldError className="text-[11px] text-[#ed5565]">
              {errors.nombre.message}
            </FieldError>
          )}
        </Field>

        <Field className="gap-1.5" data-invalid={!!errors.direccion}>
          <FieldLabel htmlFor="warehouse-address" className={labelClassName}>
            Dirección:<span className="text-[#ed5565]">*</span>
          </FieldLabel>
          <Input
            id="warehouse-address"
            {...register("direccion")}
            disabled={disabled}
            className={inputClassName}
          />
          {errors.direccion?.message && (
            <FieldError className="text-[11px] text-[#ed5565]">
              {errors.direccion.message}
            </FieldError>
          )}
        </Field>

        <Field className="gap-1.5" data-invalid={!!errors.codigoUbigeo}>
          <FieldLabel htmlFor="warehouse-ubigeo" className={labelClassName}>
            Código Ubigeo:<span className="text-[#ed5565]">*</span>
          </FieldLabel>
          <Input
            id="warehouse-ubigeo"
            {...register("codigoUbigeo")}
            disabled={disabled}
            className={inputClassName}
          />
          {errors.codigoUbigeo?.message && (
            <FieldError className="text-[11px] text-[#ed5565]">
              {errors.codigoUbigeo.message}
            </FieldError>
          )}
        </Field>

        <Field className="gap-1.5" data-invalid={!!errors.descripcion}>
          <FieldLabel
            htmlFor="warehouse-description"
            className={labelClassName}
          >
            Descripción:<span className="text-[#ed5565]">*</span>
          </FieldLabel>
          <Input
            id="warehouse-description"
            {...register("descripcion")}
            disabled={disabled}
            className={inputClassName}
          />
          {errors.descripcion?.message && (
            <FieldError className="text-[11px] text-[#ed5565]">
              {errors.descripcion.message}
            </FieldError>
          )}
        </Field>
      </FieldGroup>

      <FieldGroup className="mt-3 gap-3 md:mt-0">
        <Field className="gap-1.5" data-invalid={!!errors.responsableId}>
          <FieldLabel className={labelClassName}>
            Responsable:<span className="text-[#ed5565]">*</span>
          </FieldLabel>
          <Controller
            name="responsableId"
            control={control}
            render={({ field }) => (
              <CboData
                items={warehouseResponsibleOptions}
                value={field.value}
                onChange={field.onChange}
                placeholder="Seleccionar Responsable"
                searchPlaceholder="Buscar responsable..."
                disabled={disabled}
                className="h-9 min-h-9 text-[12px]"
              />
            )}
          />
          {errors.responsableId?.message && (
            <FieldError className="text-[11px] text-[#ed5565]">
              {errors.responsableId.message}
            </FieldError>
          )}
        </Field>

        <Field className="gap-1.5" data-invalid={!!errors.abreviatura}>
          <FieldLabel
            htmlFor="warehouse-abbreviation"
            className={labelClassName}
          >
            Abreviatura:<span className="text-[#ed5565]">*</span>
          </FieldLabel>
          <Input
            id="warehouse-abbreviation"
            {...register("abreviatura")}
            disabled={disabled}
            className={inputClassName}
          />
          {errors.abreviatura?.message && (
            <FieldError className="text-[11px] text-[#ed5565]">
              {errors.abreviatura.message}
            </FieldError>
          )}
        </Field>

        <Field className="gap-1.5" data-invalid={!!errors.codigoSunat}>
          <FieldLabel htmlFor="warehouse-sunat" className={labelClassName}>
            Código Sunat:<span className="text-[#ed5565]">*</span>
          </FieldLabel>
          <Input
            id="warehouse-sunat"
            {...register("codigoSunat")}
            disabled={disabled}
            className={inputClassName}
          />
          {errors.codigoSunat?.message && (
            <FieldError className="text-[11px] text-[#ed5565]">
              {errors.codigoSunat.message}
            </FieldError>
          )}
        </Field>
      </FieldGroup>
    </div>
  );
}
