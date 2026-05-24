type Props = {
    label: string
    type?: string
}

export default function InputItem({
    label,
    type = "text"
}: Props) {
    return (
        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <label className="text-gray-600">{label}</label>
            <input
                type={type}
                className="border border-gray-300 px-3 py-2 outline-none w-full focus:border-green-600"
            />
        </div>
    );
}