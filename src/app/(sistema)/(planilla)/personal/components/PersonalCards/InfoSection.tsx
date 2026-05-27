type Props = {
    title: string
    children: React.ReactNode
    isEditing?: boolean
    onToggle?: () => void
}

export default function InfoSection({
    title,
    children,
    isEditing,
    onToggle
}: Props) {
    return (
        <div className="bg-white border border-gray-200">
            <div className="border-b border-gray-200 px-10 py-5 justify-between flex items-center">
                <h4 className="text-xl font-light text-gray-400">{title}</h4>
                <button
                    onClick={onToggle}
                    className={
                        isEditing
                            ? "text-gray-500 hover:text-red-400 cursor-pointer"
                            : "text-gray-500 hover:text-yellow-500 cursor-pointer"
                    }
                >
                    <i
                        className={
                            isEditing
                                ? "fa fa-times-circle"
                                : "fa fa-pencil"
                        }
                        aria-hidden="true"
                        style={{ fontSize: "24px" }}
                    />
                </button>
            </div>
            {children}
        </div>
    );
}