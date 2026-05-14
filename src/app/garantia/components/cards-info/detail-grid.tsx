import { GridProps } from "../../interfaces/info-view"

export function GridContent({
    children
}: GridProps) {
    return (
        <div className="grid grid-cols-6 gap-5 p-5">
            {children}
        </div>
    )
}
