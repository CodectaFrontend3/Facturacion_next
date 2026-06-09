import Modal from "../../components/Modal/Modal"

import InputItem from "../../components/Modal/InputItem"
import SelectItem from "../../components/Modal/SelectItem"
import ButtonItem from "../../components/Modal/ButtonItem"

import { Vendedores } from "../../interfaces/vendedor/vendedores"
import { useState } from "react"

type Props = {
    vendedor: Vendedores
    onSave?: (updatedVendedor: Vendedores) => void
    onClose: () => void
}

export default function VendedorEditModal({
    vendedor,
    onSave,
    onClose
}: Props) {
    const [formData, setFormData] = useState(vendedor);

    return (
        <Modal
            title="Editar Vendedor"
            onClose={onClose}
        >
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <InputItem
                        type="readonly"
                        label="Código Vendedor"
                        value="VEN-001"
                        onChange={(e) => setFormData({
                            ...formData,
                            codigo_c: e.target.value
                        })}
                    />
                    <InputItem
                        type="readonly"
                        label="Nombre Vendedor"
                        value="Nombre"
                        onChange={(e) => setFormData({
                            ...formData,
                            codigo_c: e.target.value
                        })}
                    />
                    <InputItem
                        type="readonly"
                        label="Tipo de Comisión"
                        value="Porcentaje de venta"
                        onChange={(e) => setFormData({
                            ...formData,
                            codigo_c: e.target.value
                        })}
                    />
                    <InputItem
                        type="readonly"
                        label="Comisión"
                        value="100"
                        onChange={(e) => setFormData({
                            ...formData,
                            codigo_c: e.target.value
                        })}
                    />
                </div>
                <SelectItem
                    label="Estado"
                    onChange={(e) => setFormData({
                        ...formData,
                        estado: e.target.value
                    })}
                    options={[
                        "Activo",
                        "Inactivo"
                    ]}
                />
            </div>
            <div className="flex justify-center">
                <div className="col-start-2">
                    <ButtonItem
                        buttonText="Guardar"
                        onClick={onClose}
                    />
                </div>
            </div>
        </Modal>
    )
}