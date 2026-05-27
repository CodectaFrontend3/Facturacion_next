type Props = {
    label: string
    value: string
    type?: string
    onChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void
}

export default function InputItem({
    label,
    value,
    type = "text",
    onChange
}: Props) {
    return (
        <div className="border-b border-gray-200 px-6 py-5" style={{ fontSize: "14px" }}>
            <h3 className="font-semibold text-gray-700 text-center">{label}</h3>
            <input
                type={type}
                value={value}
                className="w-full border border-gray-300 text-gray-500 rounded px-3 mt-2 py-1 text-center"
                onChange={onChange}
            />
        </div>
    );
}