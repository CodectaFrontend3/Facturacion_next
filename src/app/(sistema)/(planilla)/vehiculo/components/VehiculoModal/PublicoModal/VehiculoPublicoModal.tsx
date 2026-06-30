import Modal from "../../../../components/Modal/Modal"

import SearchItem from "../../../../components/Modal/SearchItem"
import SelectItem from "../../../../components/Modal/SelectItem"
import InputItem from "../../../../components/Modal/InputItem"
import ButtonItem from "../../../../components/Modal/ButtonItem"

type Props = {
    onClose: () => void
}

export default function VehiculoPublicoModal({
    onClose
}: Props) {
    return (
        <Modal
            title="Vehículo Público"
            header="Agregar Vehículo Público"
            onClose={onClose}
        >
            <div className="space-y-6">
                <div className="flex justify-center mb-10">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center">
                        <i className="fa fa-truck text-[#2C1FF3]" style={{ fontSize: "150px" }}></i>
                    </div>
                </div>
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
        </Modal>
    )
}