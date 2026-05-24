type Props = {
    label: string
    options: string[]
}

export default function SelectItem({
    label,
    options
}: Props) {
    return (
        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <label className="text-gray-600">{label}</label>
            <select className="border border-gray-300 px-3 py-2 outline-none w-full text-gray-500 focus:border-green-600">
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