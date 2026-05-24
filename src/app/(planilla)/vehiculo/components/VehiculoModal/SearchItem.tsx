type Props = {
    label: string
}

export default function SearchItem({
    label
}: Props) {
    return (
        <div className="grid grid-cols-[120px_1fr_50px] items-center gap-4">
            <label className="text-gray-600">{label}</label>
            <input
                type="text"
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