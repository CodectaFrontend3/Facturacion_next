type Props = {
    title: string
    children: React.ReactNode
}

export default function InfoSection({
    title,
    children
}: Props) {
    return (
        <div className="bg-white border border-gray-200">
            <div className="border-b border-gray-200 px-10 py-8">
                <h4 className="text-xl font-light text-gray-400">{title}</h4>
            </div>
            {children}
        </div>
    );
}