import Modal from "../../../../components/Modal/Modal"

import SearchItem from "../../../../components/Modal/SearchItem"
import SelectItem from "../../../../components/Modal/SelectItem"
import InputItem from "../../../../components/Modal/InputItem"
import ButtonItem from "../../../../components/Modal/ButtonItem"

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
        <Modal
            title="Vehículo Público"
            header="Editar Vehículo Público"
            onClose={onClose}
        >
            <div className="space-y-6">
                <div className="flex justify-center mb-10">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center">
                        <i className="fa fa-truck text-[#1a5eb3]" style={{ fontSize: "150px" }}></i>
                    </div>
                </div>
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
        </Modal>
    )
}