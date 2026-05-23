type Props = {
    children: React.ReactNode
}

export default function DataGrid({
    children
}: Props) {
    return (
        <div className="grid grid-cols-3">
            {children}
        </div>
    );
}