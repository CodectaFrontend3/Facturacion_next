type Props = {
    label: string
    type?: string
    value?: string
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void
}

export default function InputItem({
    label,
    type = "text",
    value,
    onChange
}: Props) {
    return (
        <div className="grid grid-cols-[120px_1fr] text-gray-600 items-center gap-4">
            <label>{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="border border-gray-300 px-3 py-2 outline-none w-full focus:border-green-600"
            />
        </div>
    );
}