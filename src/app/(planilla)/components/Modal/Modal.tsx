import { useState } from "react"

type Props = {
    title?: string
    header?: string
    children: React.ReactNode
    onClose: () => void
}

export default function Modal({
    title,
    header,
    children,
    onClose
}: Props) {
    const [closing, setClosing] = useState(false);
    const handleClose = () => {
        setClosing(true);

        setTimeout(() => {
            onClose();
        }, 300);
    }

    return (
        <div
            className="modal-content fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={handleClose}
        >
            <div
                className={`modal-box bg-white w-full max-w-xl rounded shadow-lg overflow-hidden ${closing ? "closing" : ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="border-b border-gray-200 px-5 py-8">
                    <h3 className="text-gray-600 font-semibold">{title}</h3>
                </div>
                <div className="px-10 py-4">
                    <h2 className="text-3xl font-light text-center text-gray-600 mb-10">{header}</h2>
                    {children}
                </div>
            </div>
        </div>
    );
}