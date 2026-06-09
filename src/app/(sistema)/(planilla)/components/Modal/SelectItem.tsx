type Props = {
    label: string
    options: string[]
    value?: string
    onChange?: (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => void
}

export default function SelectItem({
    label,
    options,
    value,
    onChange
}: Props) {
    return (
        <div className="grid grid-cols-[120px_1fr] text-gray-600 items-center gap-4">
            <label >{label}</label>
            <select
                value={value}
                onChange={onChange}
                className="border border-gray-300 px-3 py-2 outline-none w-full text-gray-500 focus:border-green-600"
            >
                {options.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}