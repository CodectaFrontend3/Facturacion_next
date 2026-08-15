import type { UseFormReturn } from "react-hook-form";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { sunatSeriesFields } from "../../data/warehouses";
import type { WarehouseFormValues } from "../../schemas/warehouse.schema";

interface WarehouseSunatFieldsProps {
  form: UseFormReturn<WarehouseFormValues>;
  disabled: boolean;
}

const sunatInputClass =
  "h-9 rounded-none border-gray-300 bg-white px-3 text-[12px] text-[#676a6c] shadow-none focus-visible:border-[#18a689] focus-visible:ring-0 disabled:bg-gray-100";

export function WarehouseSunatFields({
  form,
  disabled,
}: WarehouseSunatFieldsProps) {
  const { register } = form;

  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-3 md:grid-cols-2 xl:grid-cols-3">
      {sunatSeriesFields.map((field) => (
        <Field key={field.key} className="gap-1.5">
          <FieldLabel className="text-[12px] font-bold text-[#676a6c]">
            {field.label}
          </FieldLabel>
          <div className="grid grid-cols-2 gap-2">
            <Input
              {...register(`sunat.${field.key}.series`)}
              placeholder={field.seriesPlaceholder}
              disabled={disabled}
              className={sunatInputClass}
            />
            <Input
              {...register(`sunat.${field.key}.correlativo`)}
              placeholder="Correlativo"
              disabled={disabled}
              className={sunatInputClass}
            />
          </div>
        </Field>
      ))}
    </div>
  );
}
