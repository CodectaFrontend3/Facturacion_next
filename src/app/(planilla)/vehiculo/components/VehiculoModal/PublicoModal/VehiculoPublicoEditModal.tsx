import VehiculoModal from "../Modal"

import SearchItem from "../SearchItem"
import SelectItem from "../SelectItem"
import InputItem from "../InputItem"
import ButtonItem from "../ButtonItem"

import { Publico } from "@/app/(planilla)/interfaces/vehiculo/publico"
import { useState } from "react"

type Props = {
    vehiculo: Publico
    onSave: (updatedVehiculo: Publico) => void
    onClose: () => void
}

export default function VehiculoPublicoEditModal({
    vehiculo,
    onSave,
    onClose
}: Props) {
    const [formData, setFormData] = useState(vehiculo);

    return (
        <VehiculoModal
            title="Vehículo Público"
            header="Editar Vehículo Público"
            onClose={onClose}
        >
            <div className="space-y-6">
                <SearchItem
                    label="Ruc"
                    value={formData.ruc}
                    onChange={(e) => setFormData({
                        ...formData,
                        ruc: e.target.value
                    })}
                />
                <InputItem
                    label="Empresa"
                    value={formData.empresa}
                    onChange={(e) => setFormData({
                        ...formData,
                        empresa: e.target.value
                    })}
                />
                <SelectItem
                    label="Nº de MTC"
                    value={String(formData.mtc)}
                    onChange={(e) => setFormData({
                        ...formData,
                        mtc: Number(e.target.value)
                    })}
                    options={[
                        "Seleccionar"
                    ]}
                />
                <div className="flex justify-center">
                    <div className="col-start-2">
                        <ButtonItem
                            buttonText="Guardar"
                            onClick={() => onSave(formData)}
                        />
                    </div>
                </div>
            </div>
        </VehiculoModal>
    )
}