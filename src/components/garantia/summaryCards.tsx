export default function SummaryCards() {
    const today = new Date();

    const month = today.toLocaleDateString("es-ES", {
        month: "long",
    });
    const mayus = month.charAt(0).toUpperCase() + month.slice(1);

    return (
        <div className="bg-white p-6 rounded shadow mb-5">
            <h3 className="text-xs font-semibold text-gray-500 border-b border-gray-200 pb-1 mb-3">Resumen de {mayus} 2026</h3>

            <div className="grid grid-cols-3 gap-4">
                <Card title="Guía de Ingreso" docs={1} days={5}>
                    <Circle color="fill-teal-500"/>
                </Card>
                <Card title="Guía de Egreso" docs={0} days={3}>
                    <Circle color="fill-blue-500"/>
                </Card>
                <Card title="Guía de Informe Técnico" docs={0} days={2}>
                    <Circle color="fill-orange-300"/>
                </Card>
            </div>
        </div>
    );
}

function Card({ title, docs, days, children }: any) {
    return (
        <div className="card bg-white p-6 rounded shadow text-gray-500 flex flex-col items-center gap-3">
            {children}
            <p className="font-semibold text-center">{title}</p>
            <p className="text-sm">{docs} Documentos</p>
            <p className="text-xs">Última actualización: <strong>hace {days} días</strong></p>
        </div>
    );
}

function Circle({ color }: { color: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" className={color} />
        </svg>
    )
}