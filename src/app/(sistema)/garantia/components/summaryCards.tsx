import { SummaryCard } from "@/components/shared/SummaryCard";
import { summaryItems } from "./cards-summary";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function SummaryCards() {
    const today = new Date();

    const month = today.toLocaleDateString("es-ES", {
        month: "long",
    });
    const mayus = month.charAt(0).toUpperCase() + month.slice(1);
    const title = `Resumen de ${mayus} ${today.getFullYear()}`;

    return (
        <section className="bg-white rounded-none border border-gray-200 shadow-sm mb-4">
            <Accordion type="single" collapsible defaultValue="resumen">
                <AccordionItem value="resumen" className="border-none">
                    <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 rounded-none bg-white">
                        <span className="text-sm font-semibold text-[#676a6c]">{title}</span>
                        <AccordionTrigger className="p-1 cursor-pointer bg-white hover:bg-white hover:no-underline rounded-none [&>svg]:!hidden">
                            <i className="bi bi-chevron-up text-[#c4c4c4] [-webkit-text-stroke:1px_#c4c4c4] transition-transform duration-200 group-data-[state=closed]/accordion-trigger:rotate-180" />
                        </AccordionTrigger>
                    </div>

                    <AccordionContent className="pb-0">
                        <div className="relative flex items-center px-4 pt-5 pb-6">
                            <div className="flex flex-1 justify-around gap-4 px-8 items-center">
                                {summaryItems.map((item, i) => (
                                    <div key={i} className="min-w-[150px]">
                                        <SummaryCard items={[item]} size="lg" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    );
}
