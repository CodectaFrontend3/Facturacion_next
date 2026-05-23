type Props = {
    label: string
    value: string | number
}

export default function DataItem({
    label,
    value
}: Props) {
    return (
        <div className="border-b border-gray-200 px-6 py-5 text-center" style={{ fontSize: "14px" }}>
            <h3 className="font-semibold text-gray-600">{label}</h3>
            <p className="text-gray-500 mt-1">{value}</p>
        </div>
    );
}