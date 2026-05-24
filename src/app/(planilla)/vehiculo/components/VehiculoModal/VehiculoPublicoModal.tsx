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
            title="Vehículo Público"
            header="Agregar Vehículo Público"
            onClose={onClose}
        >
            <div className="space-y-6">
                <SearchItem
                    label="Ruc"
                />
                <InputItem
                    label="Empresa"
                />
                <SelectItem
                    label="Nº de MTC"
                    options={[
                        "Seleccionar"
                    ]}
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