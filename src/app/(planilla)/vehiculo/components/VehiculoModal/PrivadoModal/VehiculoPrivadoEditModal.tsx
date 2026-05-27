import Modal from "../../../../components/Modal/Modal"

import SearchItem from "../../../../components/Modal/SearchItem"
import SelectItem from "../../../../components/Modal/SelectItem"
import InputItem from "../../../../components/Modal/InputItem"
import ButtonItem from "../../../../components/Modal/ButtonItem"

import { Privado } from "@/app/(planilla)/interfaces/vehiculo/privado"
import { useState } from "react"

type Props = {
    vehiculo: Privado
    onSave: (updatedVehiculo: Privado) => void
    onClose: () => void
}

export default function VehiculoPrivadoEditModal({
    vehiculo,
    onSave,
    onClose
}: Props) {
    const [formData, setFormData] = useState(vehiculo);

    return (
        <Modal
            title="Vehículo Privado"
            header="Editar Vehículo Privado"
            onClose={onClose}
        >
            <div className="space-y-6">
                <div className="flex justify-center mb-10">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center">
                        <i className="fa fa-truck text-[#1a5eb3]" style={{ fontSize: "150px" }}></i>
                    </div>
                </div>
                <SelectItem
                    label="Tipo de Vehículo"
                    value={formData.tipo}
                    onChange={(e) => setFormData({
                        ...formData,
                        tipo: e.target.value
                    })}
                    options={[
                        "Categoría L (Vehículo con menos de cuatro ruedas)",
                        "Categoría M (Vehículo de 3 o 4 ruedas y es utilizado para el transporte de pasajeros)",
                        "Categoría M1 (Autos, taxis y SUV)",
                        "Categoría N (Vehículo de 4 ruedas y sea para transporte de carga.)",
                        "Categoría O (Semirremolques y volquetes)"
                    ]}
                />
                <div className="grid grid-cols-2 gap-6">
                    <InputItem
                        label="Placa"
                        value={formData.placa}
                        onChange={(e) => setFormData({
                            ...formData,
                            placa: e.target.value
                        })}
                    />
                    <InputItem
                        label="Marca"
                        value={formData.marca}
                        onChange={(e) => setFormData({
                            ...formData,
                            marca: e.target.value
                        })}
                    />
                    <InputItem
                        label="Modelo"
                        value={formData.modelo}
                        onChange={(e) => setFormData({
                            ...formData,
                            modelo: e.target.value
                        })}
                    />
                    <InputItem
                        label="Año"
                        value={String(formData.año)}
                        onChange={(e) => setFormData({
                            ...formData,
                            año: Number(e.target.value)
                        })}
                    />
                </div>
                <InputItem
                    label="Certificado"
                    value={formData.certificado}
                    onChange={(e) => setFormData({
                        ...formData,
                        certificado: e.target.value
                    })}
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