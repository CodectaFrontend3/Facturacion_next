import { ReactNode } from "react";

interface GridProps {
    children: ReactNode
}

export function GridContent({
    children
}: GridProps) {
    return (
        <div className="grid grid-cols-6 gap-5 p-5">
            {children}
        </div>
    )
}
