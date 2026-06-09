type Props = {
    label: string
    type?: string
    value?: string
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void
}

export default function SearchItem({
    label,
    type = "text",
    value,
    onChange
}: Props) {
    return (
        <div className="grid grid-cols-[120px_1fr_50px] text-gray-600 items-center gap-4">
            <label>{label}</label>
            <input
                type="text"
                value={value}
                onChange={onChange} 
                className="border border-gray-300 px-4 py-2 outline-none mr-[-18px] focus:border-green-600"
            />
            <button
                className="bg-[#1a5eb3] hover:bg-[#1a3bb3] text-white h-full transition cursor-pointer"
            >
                <i className="fa fa-search" aria-hidden="true"></i>
            </button>
        </div>
    );
}