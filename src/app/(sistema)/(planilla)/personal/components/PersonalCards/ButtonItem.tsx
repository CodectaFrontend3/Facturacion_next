type Props = {
    title: string
    buttonText: string
    bgColor: string
    hoverColor: string
    onClick: () => void
}

export default function ButtonItem({
    title,
    buttonText,
    bgColor,
    hoverColor,
    onClick
}: Props) {
    return (
        <div className="border-b border-gray-200 px-6 py-5" style={{ fontSize: "12px" }}>
            <h3 className="font-semibold text-gray-700 text-center">{title}</h3>
            <button
                onClick={onClick}
                className="w-full rounded px-3 mt-2 py-1 text-white transition duration-200 cursor-pointer hover:translate-y-[-3px]"
                style={{
                    backgroundColor: bgColor
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = bgColor}
            >
                {buttonText}
            </button>
        </div>
    )
}