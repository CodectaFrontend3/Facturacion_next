import { FileText } from "lucide-react";

export const summaryItems = [
    {
        icon: FileText,
        label: "Guía de Ingreso",
        count: "1 Documento",
        meta: {
            label: "Última actualización",
            value: "hace 1 día",
        }, 
        tone: {
            ring: "border-teal-500",
            amount: "text-teal-600",
        },
    },
    {
        icon: FileText,
        label: "Guía de Egreso",
        count: "0 Documentos",
        meta: {
            label: "Última actualización",
            value: "hace 1 hora",
        },
        tone: {
            ring: "border-blue-500",
            amount: "text-blue-600",
        },
    },
    {
        icon: FileText,
        label: "Guía de Informe Técnico",
        count: "1 Documento",
        meta: {
            label: "Última actualización",
            value: "hace 2 días",
        },
        tone: {
            ring: "border-orange-400",
            amount: "text-orange-500",
        },
    },
]