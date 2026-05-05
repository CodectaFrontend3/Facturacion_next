import { SummaryCard } from "../../../components/ui/shared/SummaryCards";
import { summaryItems } from "./cards/cards-summary";

export default function SummaryCards() {
    const today = new Date();

    const month = today.toLocaleDateString("es-ES", {
        month: "long",
    });
    const mayus = month.charAt(0).toUpperCase() + month.slice(1);

    return (
        <div className="bg-white p-6 rounded shadow mb-5">
            <h3 className="text-xs font-semibold text-gray-500 border-b border-gray-200 pb-1 mb-3">Resumen de {mayus} 2026</h3>

            <div className="grid grid-cols-3 gap-10">
                {summaryItems.map((item, i) => (
                    <SummaryCard key={i} items={[item]} />
                ))}
            </div>
        </div>
    );
}
