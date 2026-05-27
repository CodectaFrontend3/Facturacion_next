"use client";
import { useState } from "react";

import ProfileHeader from "../../components/PersonalCards/ProfileHeader";
import InfoSection from "../../components/PersonalCards/InfoSection";

import ViewGeneralData from "../../components/PersonalCards/general/ViewGeneralData";
import EditGeneralData from "../../components/PersonalCards/general/EditGeneralData";

import ViewLaboralData from "../../components/PersonalCards/laboral/ViewLaboralData";
import EditLaboralData from "../../components/PersonalCards/laboral/EditLaboralData";

type Props = {
    inactivo: any
}

export default function InactivoDetalleClient({
    inactivo
}: Props) {
    const [editingGeneral, setEditingGeneral] = useState(false);
    const [editingLaboral, setEditingLaboral] = useState(false);
    const [personalData, setPersonalData] = useState(inactivo);

    return (
        <div className="bg-gray-100 p-5 min-h-screen">
            <ProfileHeader personal={personalData} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mt-3">
                <InfoSection
                    title="Datos Generales"
                    isEditing={editingGeneral}
                    onToggle={() =>
                        setEditingGeneral(!editingGeneral)
                    }
                >
                    {
                        editingGeneral ? (
                            <EditGeneralData
                                personal={personalData}
                                setPersonalData={setPersonalData}
                                onSave={() => setEditingGeneral(false)}
                            />
                        ) : (
                            <ViewGeneralData
                                personal={personalData}
                            />
                        )
                    }
                </InfoSection>
                <InfoSection
                    title="Datos Laborales"
                    isEditing={editingLaboral}
                    onToggle={() =>
                        setEditingLaboral(!editingLaboral)
                    }
                >
                    {
                        editingLaboral ? (
                            <EditLaboralData
                                personal={personalData}
                                setPersonalData={setPersonalData}
                                onSave={() => setEditingLaboral(false)}
                            />
                        ) : (
                            <ViewLaboralData
                                personal={personalData}
                            />
                        )
                    }
                </InfoSection>
            </div>
        </div>
    );
}