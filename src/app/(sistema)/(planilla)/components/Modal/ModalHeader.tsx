type Props = {
    title: string
}

export default function ModalHeader({
    title
}: Props) {
    return (
        <div className="border-b border-gray-200 px-5 py-4">
            <h3 className="text-gray-600 font-semibold">{title}</h3>
        </div>
    );
}