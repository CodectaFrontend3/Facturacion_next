import { CloudUpload, CloudDownload, Paperclip } from "lucide-react";

export const summaryItems = [
    {
        icon: CloudUpload,
        label: "Guía de Ingreso",
        count: "1 Documento",
        meta: {
            label: "Última actualización",
            value: "hace 1 día",
        },
        tone: {
            ring: "border-[#1ab394] bg-[#1ab394] [&>svg]:!text-white",
            amount: "text-[#1ab394]",
        },
    },
    {
        icon: CloudDownload,
        label: "Guía de Egreso",
        count: "0 Documentos",
        meta: {
            label: "Última actualización",
            value: "hace 1 hora",
        },
        tone: {
            ring: "border-[#1c84c6] bg-[#1c84c6] [&>svg]:!text-white",
            amount: "text-[#1c84c6]",
        },
    },
    {
        icon: Paperclip,
        label: "Guía de Informe Técnico",
        count: "1 Documento",
        meta: {
            label: "Última actualización",
            value: "hace 2 días",
        },
        tone: {
            ring: "border-[#f8ac59] bg-[#f8ac59] [&>svg]:!text-white",
            amount: "text-[#f8ac59]",
        },
    },
]