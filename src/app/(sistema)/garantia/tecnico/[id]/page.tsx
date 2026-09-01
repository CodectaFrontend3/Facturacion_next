"use client"
import { use } from "react";
import { useRouter } from "next/navigation";
import { TecnicoProps } from "../../interfaces";

import { ContactInfoCard, InfoCard } from "../../components/cards-info/cards-info";
import { GridContent } from "../../components/cards-info/detail-grid";
import { HeaderSectionGarantia } from "../../components/cards-info/detail-header";

import { DocumentDetailTemplate } from "@/components/shared/DocumentDetailTemplate";

import garantiaMock from "../../data/garantia-mock.json";
import 'font-awesome/css/font-awesome.min.css';

export default function TecnicoDetallePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();

    const garantia = garantiaMock.find(
        (item) => item.id === Number(id)
    );

    if (!garantia) {
        return <div>No encontrado</div>
    }

    const isCheckOrAnulado = ["en_revision", "reparado", "anulado"].includes(garantia.estadoActual || "");

    return (
        <div className="p-4 bg-[#f5f5f5]">
            <DocumentDetailTemplate
                onClose={() => router.back()}
                topHeader={
                    <HeaderSectionGarantia
                        numero={`EP-${garantia.codigo || "000000"}`}
                        documentTitle="INFORME TÉCNICO"
                        ruc={garantia.cliente.ruc}
                        celular={garantia.cliente.telefono}
                        correo={garantia.cliente.correo}
                        showEtiqueta={false}
                        showEdit={isCheckOrAnulado}
                        onEdit={() => router.push(`/garantia/tecnico/edit/${garantia.id}`)}
                    />
                }
                topBody={
                    <div className="mt-2 grid grid-cols-2 gap-8 items-start">
                        <InfoCard title="Contacto Cliente" className="">
                            <div>
                                <p><strong>Empresa: </strong>{garantia.cliente.empresa}</p>
                                <p><strong>RUC: </strong>{garantia.cliente.ruc}</p>
                                <p><strong>Teléfono: </strong>{garantia.cliente.telefono}</p>
                                <p><strong>Dirección: </strong>{garantia.cliente.direccion}</p>
                            </div>
                            <div>
                                <p><strong>Contacto: </strong>{garantia.cliente.nombre}</p>
                                <p><strong>Fecha: </strong>{garantia.fechas.revision || garantia.fechas.ingreso}</p>
                                <p><strong>Correo: </strong>{garantia.cliente.correo}</p>
                            </div>
                        </InfoCard>

                        <InfoCard title="Condiciones Generales" className="">
                            <div>
                                <p><strong>Técnico Asignado: </strong>{garantia.tecnico.asignado}</p>
                                <p><strong>Marca: </strong>{garantia.equipo.marca}</p>
                            </div>
                        </InfoCard>
                    </div>
                }
                tableBody={
                    <GridContent className="grid grid-cols-6 gap-8 items-start -mx-5">
                        <InfoCard
                            title="Datos del Equipo"
                            className="col-span-6"
                        >
                            <div>
                                <p><strong>Modelo: </strong>{garantia.equipo.modelo}</p>
                                <p><strong>Número de serie: </strong>{garantia.equipo.serie}</p>
                                <p><strong>Descripcion del Problema: </strong>{garantia.ingreso.problemaReportado}</p>
                            </div>
                            <div>
                                <p><strong>Código Interno: </strong>{garantia.codigo}</p>
                                <p><strong>Fecha de Compra: </strong>{garantia.equipo.fechaCompra}</p>
                                <p><strong>Revisión y Diagnóstico: </strong>{garantia.tecnico.revision}</p>
                            </div>
                        </InfoCard>

                        <InfoCard title="Estética" className="col-span-3">
                            <div className="col-span-2">
                                <p>{garantia.ingreso.estetica}</p>
                            </div>
                        </InfoCard>

                        <InfoCard title="Revisión y diagnóstico" className="col-span-3">
                            <div className="col-span-2">
                                <p>{garantia.tecnico.revision}</p>
                            </div>
                        </InfoCard>

                        <InfoCard title="Causas del Problema" className="col-span-3">
                            <div className="col-span-2">
                                <p>{garantia.ingreso.problemaReportado}</p>
                            </div>
                        </InfoCard>

                        <InfoCard title="Solución" className="col-span-3">
                            <div className="col-span-2">
                                <p>{garantia.tecnico.solucion}</p>
                            </div>
                        </InfoCard>
                    </GridContent>
                }
                actions={
                    <ContactInfoCard title="Centro de Atención" />
                }
            />
        </div>
    );
}