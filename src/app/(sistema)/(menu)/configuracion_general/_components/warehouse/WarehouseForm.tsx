"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ActionButton } from "@/components/common/ActionButton";
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs";

import { createEmptyWarehouseForm } from "../../data/warehouses";
import type { WarehouseManager } from "../../hooks/useWarehouseManager";
import {
  warehouseSchema,
  type WarehouseFormValues,
} from "../../schemas/warehouse.schema";
import { warehouseToForm } from "../../state/warehouse-reducer";
import { WarehouseFormIntro } from "./WarehouseFormIntro";
import { WarehouseGeneralFields } from "./WarehouseGeneralFields";
import { WarehouseSunatFields } from "./WarehouseSunatFields";
import { WarehouseTabsNav } from "./WarehouseTabsNav";

interface WarehouseFormProps {
  manager: WarehouseManager;
}

export function WarehouseForm({ manager }: WarehouseFormProps) {
  const isReadOnly = manager.mode === "view";

  const form = useForm<WarehouseFormValues>({
    resolver: zodResolver(warehouseSchema),
    defaultValues: manager.selectedWarehouse
      ? warehouseToForm(manager.selectedWarehouse)
      : createEmptyWarehouseForm(),
    mode: "onTouched",
  });

  useEffect(() => {
    if (manager.selectedWarehouse) {
      form.reset(warehouseToForm(manager.selectedWarehouse));
    } else {
      form.reset(createEmptyWarehouseForm());
    }
  }, [manager.selectedWarehouse, manager.mode, form]);

  const onSubmit = form.handleSubmit(
    (data) => {
      manager.saveWarehouse(data);
    },
    (errors) => {
      const hasGeneralErrors =
        errors.nombre ||
        errors.abreviatura ||
        errors.direccion ||
        errors.responsableId ||
        errors.codigoUbigeo ||
        errors.descripcion ||
        errors.codigoSunat;

      if (hasGeneralErrors) {
        manager.setActiveTab("general");
      }
    },
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:flex-row">
      <WarehouseFormIntro mode={manager.mode} onCancel={manager.goToList} />

      <div className="min-w-0 flex-1 p-4">
        <form onSubmit={onSubmit} noValidate>
          <Tabs
            value={manager.activeTab}
            onValueChange={manager.setActiveTab}
            className="flex-col gap-0"
          >
            <WarehouseTabsNav activeTab={manager.activeTab} />

            <div className="border-x border-b border-gray-200 p-4">
              <TabsContent value="general">
                <WarehouseGeneralFields
                  form={form}
                  disabled={isReadOnly}
                />
              </TabsContent>
              <TabsContent value="sunat">
                <WarehouseSunatFields
                  form={form}
                  disabled={isReadOnly}
                />
              </TabsContent>

              {!isReadOnly && (
                <div className="mt-4 flex justify-center">
                  <ActionButton
                    type="submit"
                    text="Guardar"
                    onClick={onSubmit}
                    className="h-9 min-w-[220px] rounded-[2px] bg-[#2C1FF3] text-[12px] text-white hover:bg-[#190FCE]"
                  />
                </div>
              )}
            </div>
          </Tabs>
        </form>
      </div>
    </div>
  );
}
