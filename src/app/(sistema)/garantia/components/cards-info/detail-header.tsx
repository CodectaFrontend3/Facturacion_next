import { TopHeaderProps } from "../../interfaces/info-view"
import { WhatsappShareButton } from "../../../ventas/_components/shared/WhatsappShareButton"
import { CorreoShareButton } from "../CorreoShareButton"

// Usado por los create pages
export function TopHeader({ children }: TopHeaderProps) {
    return (
        <div className="border-b border-t border-gray-300 flex items-center justify-between">
            {children}
        </div>
    )
}

// Botón de acción reutilizado en la barra superior del detalle
export function ActionBtn({ icon, color, title, onClick }: { icon: string; color: string; title?: string; onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`flex h-[32px] w-[32px] items-center justify-center rounded-[4px] ${color} text-white transition-all hover:brightness-95 active:brightness-90`}
            title={title}
        >
            <i className={`bi ${icon} text-[14px]`} />
        </button>
    )
}

interface HeaderSectionProps {
    numero: string;
    documentTitle: string;
    ruc?: string;
    celular?: string;
    correo?: string;
    showEtiqueta?: boolean;
    showEdit?: boolean;
    onEdit?: () => void;
}

export function HeaderSectionGarantia({
    numero,
    documentTitle,
    ruc,
    celular,
    correo,
    showEtiqueta = true,
    showEdit,
    onEdit,
}: HeaderSectionProps) {
    return (
        <div className="relative flex items-center justify-between border-b border-gray-200 pb-4">
            <div>
                <h2 className="font-bold text-[16px] tracking-wide text-[#676a6c]">{numero}</h2>
                {ruc && (
                    <p className="text-[13px] text-[#676a6c]">
                        <span className="font-bold">R.U.C : </span>
                        <span className="font-light">{ruc}</span>
                    </p>
                )}
            </div>

            <h1 className="absolute left-1/2 top-0 -translate-x-1/2 text-[24px] tracking-tight font-thin uppercase tracking-[0.2em] text-[#676a6c] whitespace-nowrap">
                {documentTitle}
            </h1>

            <div className="flex items-center gap-1 transition-all duration-300 ease-out z-10 relative">
                <ActionBtn icon="bi-file-earmark-pdf" color="bg-[#1b86c9]" title="PDF" />
                {showEtiqueta && (
                    <ActionBtn icon="bi-tag" color="bg-[#27c7c9]" title="Etiqueta" />
                )}
                <ActionBtn icon="bi-printer" color="bg-[#1b86c9]" title="Imprimir" />
                <CorreoShareButton
                    correo={correo}
                    numeroDoc={numero}
                    className="flex h-[32px] w-[32px] items-center justify-center rounded-[4px] bg-[#6c757d] text-white transition-all hover:brightness-95 active:brightness-90"
                />
                <WhatsappShareButton 
                    celular={celular} 
                    numeroDoc={numero} 
                    className="flex h-[32px] w-[32px] items-center justify-center rounded-[4px] bg-[#28a745] text-white transition-all hover:brightness-95 active:brightness-90"
                />
                {showEdit && (
                    <ActionBtn icon="bi-pencil-square" color="bg-[#f6a041]" title="Editar" onClick={onEdit} />
                )}
            </div>
        </div>
    )
}