import VehiculoModal from "./Modal"

import SearchItem from "./SearchItem"
import SelectItem from "./SelectItem"
import InputItem from "./InputItem"
import ButtonItem from "./ButtonItem"

type Props = {
    onClose: () => void
}

export default function VehiculoPublicoModal({
    onClose
}: Props) {
    return (
        <VehiculoModal
            title="Vehículo Privado"
            header="Agregar Vehículo Privado"
            onClose={onClose}
        >
            <div className="space-y-6">
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
        </VehiculoModal>
    )
}