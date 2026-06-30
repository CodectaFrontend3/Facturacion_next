import Modal from "../../../../components/Modal/Modal"

import SearchItem from "../../../../components/Modal/SearchItem"
import SelectItem from "../../../../components/Modal/SelectItem"
import InputItem from "../../../../components/Modal/InputItem"
import ButtonItem from "../../../../components/Modal/ButtonItem"

type Props = {
    onClose: () => void
}

export default function VehiculoPrivadoModal({
    onClose
}: Props) {
    return (
        <Modal
            title="Vehículo Privado"
            header="Agregar Vehículo Privado"
            onClose={onClose}
        >
            <div className="space-y-6">
                <div className="flex justify-center mb-10">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center">
                        <i className="fa fa-truck text-[#2C1FF3]" style={{ fontSize: "150px" }}></i>
                    </div>
                </div>
                <SelectItem
                    label="Tipo de Vehículo"
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
                    />
                    <InputItem
                        label="Marca"
                    />
                    <InputItem
                        label="Modelo"
                    />
                    <InputItem
                        label="Año"
                    />
                </div>
                <InputItem
                    label="Certificado"
                />
                <div className="flex justify-center">
                    <div className="col-start-2">
                        <ButtonItem
                            buttonText="Guardar"
                            onClick={onClose}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}