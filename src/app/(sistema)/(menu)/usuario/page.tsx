"use client";

import TopInfoCard from "./components/TopInfoCard";
import ProfileAvatarCard from "./components/ProfileAvatarCard";
import UserDataFormCard from "./components/UserDataFormCard";
import userData from "./data/userProfile.json";

export default function page() {
  // Funcion que simula la actualización de datos del usuario
  const handleSave = (updatedData: any) => {
    console.log("Datos para enviar al Backend:", updatedData);
    alert("Datos listos para enviar a la API");
  };
  return (
    <main className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Tarjeta Superior: Correo de Sistema y Almacén Asignado */}
      <TopInfoCard
        systemEmail={userData.systemEmail}
        assignedWarehouse={userData.assignedWarehouse}
      />

      {/* Grid Inferior: Avatar/Logo (Izquierda) + Formulario de Datos (Derecha) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-5">
          <ProfileAvatarCard avatarUrl={userData.avatarUrl} />
        </div>

        <div className="md:col-span-7">
          <UserDataFormCard
            initialData={{
              name: userData.name,
              email: userData.email,
              phone: userData.phone,
            }}
            onSave={handleSave}
          />
        </div>
      </div>
    </main>
  );
}
