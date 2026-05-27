import { InfoCardProps } from "../../interfaces/info-view"
import { ContactInfoProps } from "../../interfaces/info-view"

export function InfoCard({
    title,
    children,
    className = "col-span-3"
}: InfoCardProps) {
    return (
        <div className={`${className} border border-gray-200 p-5 text-gray-600`} style={{
            fontSize: "13px"
        }}>
            <h3 className="text-lg mb-4 text-center font-semibold">
                {title}
            </h3>

            <div className="grid grid-cols-2 gap-5">
                {children}
            </div>
        </div>
    )
}

export function ContactInfoCard({
    title
}: ContactInfoProps) {
    return (
        <div className="px-5 text-gray-600 text-xs" style={{ fontSize: "13px" }}>
            <p style={{
                textDecoration: "underline",
                paddingBottom: "10px"
            }}><strong>{title}</strong></p>
            
            <p><strong>Dirección: </strong>LIMA - LIMA</p>
            <p><strong>Teléfonos: </strong>900 800 700 | 999 888 777</p>

            <p><strong>MARCA 01:</strong></p>
            <p><strong>Email: </strong>ejemploemail@gmail.com</p>
            <p><strong>Web: </strong>https://www.demo.com/</p>
        </div>
    )
}