interface ConfirmModalProps {
    title: string
    description: string
    onConfirm: () => void
}

export function ConfirmModal({
    title,
    description,
    onConfirm
}: ConfirmModalProps) {
    return (
        <div className="modal-content fixed inset-0 bg-black-40 z-20">
            <div className="bg-white p-3 rounded shadow w-120 modal-box text-gray-500 p-2">
                <div className="p-4 border border-gray-300 space-y-3">
                    <h3 className="font-bold text-center">{title}</h3>
                    <p className="text-xs text-center">{description}</p>
                    <button
                        className="danger-btn w-30 mx-auto p-2 bg-[#ed5565] text-white flex items-center justify-center cursor-pointer rounded text-xs"
                        onClick={onConfirm}
                    >
                        Anular
                    </button>
                </div>
            </div>
        </div>
    )
}