"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Landmark, X } from "lucide-react";
import { BankAccount, AccountDetail } from "../hooks/useCompanyForm";

interface BankAccountsCardProps {
  accounts: BankAccount[];
  onSelectAccount: (account: BankAccount) => void;
  selectedAccount: BankAccount | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (account: BankAccount) => void;
}

export function BankAccountsCard({
  accounts,
  onSelectAccount,
  selectedAccount,
  isOpen,
  onClose,
  onSave,
}: BankAccountsCardProps) {
  const [formData, setFormData] = useState<BankAccount | null>(null);

  useEffect(() => {
    if (selectedAccount) {
      const defaultCuentas = selectedAccount.cuentas?.length
        ? selectedAccount.cuentas
        : [
            {
              id: Date.now().toString(),
              tipoCuenta: "Cuenta Corriente",
              moneda: "soles",
              numeroCuenta: "",
              detraccion: false,
            },
          ];

      setFormData({ ...selectedAccount, cuentas: defaultCuentas });
    }
  }, [selectedAccount]);

  const handleHeaderChange = (field: keyof BankAccount, value: any) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleRowChange = (
    index: number,
    field: keyof AccountDetail,
    value: any,
  ) => {
    if (!formData) return;
    const updatedCuentas = [...formData.cuentas];
    updatedCuentas[index] = {
      ...updatedCuentas[index],
      [field]: value,
    };
    setFormData({ ...formData, cuentas: updatedCuentas });
  };

  const handleAddRow = () => {
    if (!formData) return;
    const newRow: AccountDetail = {
      id: Date.now().toString(),
      tipoCuenta: "Cuenta Corriente",
      moneda: "soles",
      numeroCuenta: "",
      detraccion: false,
    };
    setFormData({
      ...formData,
      cuentas: [...formData.cuentas, newRow],
    });
  };

  const handleRemoveRow = (index: number) => {
    if (!formData) return;
    if (formData.cuentas.length === 1) return;
    const updatedCuentas = formData.cuentas.filter((_, i) => i !== index);
    setFormData({ ...formData, cuentas: updatedCuentas });
  };

  // Mapeo explicito para grilla de 3 columnas x 2 filas
  const gridItems: Array<
    { type: "account"; data: BankAccount } | { type: "decorative"; id: string }
  > = [
    accounts[0]
      ? { type: "account", data: accounts[0] }
      : { type: "decorative", id: "dec-0" },
    { type: "decorative", id: "dec-center-1" },
    accounts[1]
      ? { type: "account", data: accounts[1] }
      : { type: "decorative", id: "dec-1" },
    accounts[2]
      ? { type: "account", data: accounts[2] }
      : { type: "decorative", id: "dec-2" },
    { type: "decorative", id: "dec-center-2" },
    accounts[3]
      ? { type: "account", data: accounts[3] }
      : { type: "decorative", id: "dec-3" },
  ];

  return (
    <TooltipProvider>
      <Card className="w-full bg-white rounded-none border border-slate-200 shadow-sm py-4 px-12">
        <p className="text-center text-[13px] font-extrabold text-[#0033FF] tracking-wide uppercase mb-8">
          CUENTAS BANCARIAS
        </p>

        <CardContent className="p-0 grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-8 items-center justify-items-center">
          {gridItems.map((item) => {
            // Renderizado exclusivo para la columna central (solo icono)
            if (item.type === "decorative") {
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-center w-full h-full min-h-[64px] pointer-events-none select-none"
                >
                  <Landmark className="w-9 h-9 text-[#0033FF]" />
                </div>
              );
            }

            // Renderizado de tarjetas reales de bancos
            const acc = item.data;
            return (
              <Tooltip key={acc.id} delayDuration={100}>
                <TooltipTrigger asChild>
                  <div
                    onClick={() => onSelectAccount(acc)}
                    className="flex flex-col items-center justify-center cursor-pointer group w-full max-w-[220px]"
                  >
                    <p className="text-[12px] font-bold text-slate-800 mb-2 h-4 text-center">
                      {acc.nombre || acc.banco}
                    </p>

                    <div className="relative flex items-center justify-center w-full h-10 px-2">
                      <span
                        className={`absolute left-0 w-2.5 h-2.5 rounded-full shrink-0 ${
                          acc.activo ? "bg-[#00BCD4]" : "bg-slate-300"
                        }`}
                      />

                      <div className="flex items-center justify-center h-full">
                        {acc.logoUrl ? (
                          <img
                            src={acc.logoUrl}
                            alt={acc.banco}
                            className="h-9 max-w-[140px] object-contain transition-transform group-hover:scale-105"
                          />
                        ) : (
                          <Landmark className="w-8 h-8 text-[#0033FF] transition-transform group-hover:scale-105" />
                        )}
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-700 text-white text-xs py-1 px-2.5 rounded shadow">
                  <p>{acc.activo ? "Activado" : "Desactivado"}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </CardContent>
      </Card>

      {/* Modal Formulario de Edición */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-[62%] !w-[720px] !max-w-none bg-white p-8 rounded-none border border-slate-200 shadow-2xl overflow-hidden [&>button]:hidden"
        >
          <DialogHeader className="absolute top-3 right-3 p-0 z-10">
            <button
              onClick={onClose}
              type="button"
              className="p-1 text-slate-400 hover:text-slate-700 focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
            <DialogTitle className="sr-only">
              Editar Cuenta Bancaria
            </DialogTitle>
          </DialogHeader>

          {formData && (
            <div className="space-y-6 text-xs text-slate-800">
              <div className="grid grid-cols-2 gap-6 items-stretch">
                <div className="space-y-3 flex flex-col justify-center">
                  <div>
                    <label className="block text-center font-bold text-slate-900 mb-1.5 text-xs">
                      Nombre
                    </label>
                    <Input
                      value={formData.nombre}
                      onChange={(e) =>
                        handleHeaderChange("nombre", e.target.value)
                      }
                      className="h-9 text-xs rounded-none border-slate-200 bg-[#F8FAFC] text-slate-800 text-center font-medium focus-visible:ring-0"
                    />
                  </div>
                  <div>
                    <label className="block text-center font-bold text-slate-900 mb-1.5 text-xs">
                      Titular
                    </label>
                    <Input
                      value={formData.titular}
                      onChange={(e) =>
                        handleHeaderChange("titular", e.target.value)
                      }
                      className="h-9 text-xs rounded-none border-slate-200 bg-[#F8FAFC] text-slate-800 text-center font-medium focus-visible:ring-0"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center border border-slate-200/60 rounded-none p-3 bg-[#F8FAFC] min-h-[120px]">
                  <span className="text-xs font-bold text-slate-900 mb-1">
                    Imagen
                  </span>
                  {formData.logoUrl ? (
                    <img
                      src={formData.logoUrl}
                      alt={formData.banco}
                      className="h-12 object-contain my-1 max-w-[160px]"
                    />
                  ) : (
                    <Landmark className="w-10 h-10 text-[#0033FF] my-1" />
                  )}
                  <span className="text-[10px] text-slate-400">
                    (Click para cambiar la imagen)
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-2 text-center font-bold text-slate-900 text-xs">
                  <div className="w-[140px] shrink-0">Tipo de Cuenta</div>
                  <div className="w-[100px] shrink-0">Moneda</div>
                  <div className="flex-1">N° de Cuenta</div>
                  <div className="w-[100px] shrink-0">¿Detracción?</div>
                  <div className="w-[36px] shrink-0"></div>
                </div>

                {formData.cuentas.map((row, index) => (
                  <div
                    key={row.id || index}
                    className="flex items-center gap-2"
                  >
                    <div className="w-[140px] shrink-0">
                      <select
                        value={row.tipoCuenta}
                        onChange={(e) =>
                          handleRowChange(index, "tipoCuenta", e.target.value)
                        }
                        className="w-full h-9 border border-slate-200 bg-[#F8FAFC] px-2 text-xs rounded-none focus:outline-none text-slate-800"
                      >
                        <option value="Cuenta Corriente">
                          Cuenta Corriente
                        </option>
                        <option value="Cuenta Ahorros">Cuenta Ahorros</option>
                      </select>
                    </div>

                    <div className="w-[100px] shrink-0">
                      <select
                        value={row.moneda}
                        onChange={(e) =>
                          handleRowChange(index, "moneda", e.target.value)
                        }
                        className="w-full h-9 border border-slate-200 bg-[#F8FAFC] px-2 text-xs rounded-none focus:outline-none text-slate-800"
                      >
                        <option value="soles">soles</option>
                        <option value="Dolares">Dolares</option>
                      </select>
                    </div>

                    <div className="flex-1">
                      <Input
                        value={row.numeroCuenta}
                        onChange={(e) =>
                          handleRowChange(index, "numeroCuenta", e.target.value)
                        }
                        className="h-9 text-xs rounded-none border-slate-200 bg-[#F8FAFC] text-slate-800 focus-visible:ring-0 px-2"
                      />
                    </div>

                    <div className="w-[100px] shrink-0 flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={row.detraccion}
                        onChange={(e) =>
                          handleRowChange(index, "detraccion", e.target.checked)
                        }
                        className="h-4 w-4 rounded-none border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                      />
                    </div>

                    <div className="w-[36px] shrink-0 flex items-center justify-center">
                      {index === 0 ? (
                        <Button
                          type="button"
                          onClick={handleAddRow}
                          size="icon"
                          className="h-7 w-7 bg-[#00BCD4] hover:bg-[#00ACC1] text-white rounded-none p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={() => handleRemoveRow(index)}
                          size="icon"
                          className="h-7 w-7 bg-[#78909C] hover:bg-[#607D8B] text-white rounded-none p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900 text-xs">
                    Activo/Desactivo:
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleHeaderChange("activo", !formData.activo)
                    }
                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      formData.activo ? "bg-[#0066FF]" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        formData.activo ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <Button
                  type="button"
                  onClick={() => onSave(formData)}
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 h-9 text-xs rounded-none font-bold tracking-wide transition-colors"
                >
                  Guardar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
