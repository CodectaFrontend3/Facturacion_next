type Props = {
    buttonText: string
    onClick: () => void
}

export default function ButtonItem({
    buttonText,
    onClick
}: Props) {
    return (
        <div className="border-b border-gray-200 px-6 py-5">
            <button
                onClick={onClick}
                className="w-full rounded bg-[#2C1FF3] hover:bg-[#190FCE] p-2 px-4 rounded text-white transition duration-200 cursor-pointer active:bg-[#18a689] hover:translate-y-[-3px]"
            >
                {buttonText}
            </button>
        </div>
    )
}