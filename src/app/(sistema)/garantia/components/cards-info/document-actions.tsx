import { Button } from "./button-action"

export function DocumentActions() {
    return (
        <div className="px-8 py-2 flex gap-2">
            <Button
                className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-3 py-2 rounded"
            >
                <i className="bi bi-file-earmark-pdf"></i>
            </Button>

            <Button
                className="bg-teal-400 hover:bg-teal-500 cursor-pointer text-white px-3 py-2 rounded"
            >
                <i className="fa fa-ticket" aria-hidden="true"></i>
            </Button>

            <Button
                className="bg-gray-500 hover:bg-gray-600 cursor-pointer text-white px-3 py-2 rounded"
            >
                <i className="fa fa-envelope" aria-hidden="true"></i>
            </Button>

            <Button
                className="bg-blue-700 hover:bg-[#190FCE] cursor-pointer text-white px-3 py-2 rounded"
            >
                <i className="fa fa-print fa-lg" aria-hidden="true"></i>
            </Button>

            <Button
                className="bg-green-700 hover:bg-green-600 cursor-pointer text-white px-3 py-2 rounded"
            >
                <i className="bi bi-whatsapp"></i>
            </Button>
        </div>
    )
}