import { ReactNode } from "react";

interface TopProps {
    children: ReactNode
}

interface InfoProps {
    codigo: string
    ruc: string
}

interface DocumentProps {
    title: string
}

export function TopHeader({
    children
}: TopProps) {
    return (
        <div className="border-b border-t border-gray-300 flex items-center justify-between">
            {children}
        </div>
    )
}

export function InfoUser({
    codigo,
    ruc
}: InfoProps) {
    return (
        <div className="px-8 py-2">
            <h3 className="font-bold text-gray-700">EP-{codigo}</h3>
            <p className="text-gray-500"><strong>R.U.C: {ruc}</strong></p>
        </div>
    )
}

export function DocumentTitle({
    title
}: DocumentProps) {
    return (
        <h1 className="text-2xl text-gray-500">{title}</h1>
    )
}