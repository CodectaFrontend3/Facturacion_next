import { GridProps } from "../../interfaces/info-view"

export function GridContent({
    children,
    className = "grid grid-cols-6 gap-5 p-5"
}: GridProps) {
    return (
        <div className={className}>
            {children}
        </div>
    )
}
