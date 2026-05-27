import DataGrid from "../DataGrid"

import InputItem from "../InputItem"
import SelectItem from "../SelectItem"
import ButtonItem from "../ButtonItem"

import { PersonalGeneral } from "../../types/personal"

type Props = {
    personal: any
    setPersonalData: React.Dispatch<
        React.SetStateAction<any>
    >
    onSave: () => void
}

export default function EditGeneralData({
    personal,
    setPersonalData,
    onSave
}: Props) {
    return (
        <DataGrid>
            <SelectItem
                label="Documento"
                value={personal.documento}
                options={[
                    "DNI",
                    "Pasaporte"
                ]}
                onChange={(e) =>
                    setPersonalData({
                        ...personal,
                        documento: e.target.value
                    })
                }
            />
            <InputItem
                label="Número Documento"
                value={personal.n_documento}
                onChange={(e) => setPersonalData({
                    ...personal,
                    n_documento: e.target.value
                })}
            />
            <InputItem
                type="date"
                label="Fecha Nacimiento"
                value={personal.fecha_nacimiento}
                onChange={(e) => setPersonalData({
                    ...personal,
                    fecha_nacimiento: e.target.value
                })}
            />
            <SelectItem
                label="Género"
                value={personal.genero}
                options={[
                    "Femenino",
                    "Masculino"
                ]}
                onChange={(e) =>
                    setPersonalData({
                        ...personal,
                        genero: e.target.value
                    })
                }
            />
            <InputItem
                label="Celular"
                value={personal.celular}
                onChange={(e) => setPersonalData({
                    ...personal,
                    celular: e.target.value
                })}
            />
            <InputItem
                label="Teléfono"
                value={personal.telefono}
                onChange={(e) => setPersonalData({
                    ...personal,
                    telefono: e.target.value
                })}
            />
            <InputItem
                label="Correo"
                value={personal.correo}
                onChange={(e) => setPersonalData({
                    ...personal,
                    correo: e.target.value
                })}
            />
            <InputItem
                label="Dirección"
                value={personal.direccion}
                onChange={(e) => setPersonalData({
                    ...personal,
                    direccion: e.target.value
                })}
            />
            <SelectItem
                label="Nivel Educativo"
                value={personal.nivel_educativo}
                options={[
                    "Primaria",
                    "Secundaria",
                    "Técnico",
                    "Universitario",
                ]}
                onChange={(e) =>
                    setPersonalData({
                        ...personal,
                        nivel_educativo: e.target.value
                    })
                }
            />
            <SelectItem
                label="Carrera Profesional"
                value={personal.carrera_profesional}
                options={[
                    "Sin Carrera",
                    "Contabilidad",
                    "Administración",
                    "Ingeniería",
                    "Ciencias de la Comunicación",
                    "Marketing y Mercadotecnia",
                    "Economía",
                    "Derecho",
                    "Medicina"
                ]}
                onChange={(e) =>
                    setPersonalData({
                        ...personal,
                        carrera_profesional: e.target.value
                    })
                }
            />
            <SelectItem
                label="Estado Civil"
                value={personal.estado_civil}
                options={[
                    "Soltero",
                    "Casado",
                    "Viudo con hijos",
                    "Viudo sin hijos",
                ]}
                onChange={(e) =>
                    setPersonalData({
                        ...personal,
                        estado_civil: e.target.value
                    })
                }
            />
            <InputItem
                label="Licencia de Conducir"
                value={personal.licencia}
                onChange={(e) => setPersonalData({
                    ...personal,
                    licencia: e.target.value
                })}
            />

            <ButtonItem
                title="Foto Perfil"
                buttonText="Seleccionar Foto"
                bgColor="#23c6c8"
                hoverColor="#28b7b9"
                onClick={() => console.log("Foto")}
            />
            <ButtonItem
                title="Actualizar"
                buttonText="Guardar"
                bgColor="#1c84c6"
                hoverColor="#176fa5"
                onClick={onSave}
            />
        </DataGrid>
    );
}