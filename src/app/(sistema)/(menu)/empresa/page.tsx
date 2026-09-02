"use client";

import { CompanyFormModal } from "./components/CompanyFormModal";
import { CompanyHeaderCard } from "./components/CompanyHeaderCard";
import { CompanyLogoCard } from "./components/CompanyLogoCard";
import { CompanyInfoCard } from "./components/CompanyInfoCard";
import { useCompanyForm } from "./hooks/useCompanyForm";
import { CompanyCurrencyCard } from "./components/CompanyCurrencyCard";
import { BankAccountsCard } from "./components/BankAccountsCard";
import { LocationCard } from "./components/LocationCard";

export default function CompanyPage() {
  const {
    companyData,
    isModalOpen,
    setIsModalOpen,
    openModal,
    initialFormValues,
    handleSave,
    bankAccounts,
    selectedAccount,
    isBankModalOpen,
    openBankModal,
    closeBankModal,
    handleSaveBankAccount,
  } = useCompanyForm();

  return (
    <div className="p-6 space-y-6 bg-slate-100 min-h-screen">
      {/* Header Directo sin bordes redondeados */}
      <CompanyHeaderCard
        logoUrl={companyData.logoUrl}
        name={companyData.name}
        ruc={companyData.ruc}
        description={companyData.description}
        onEdit={openModal}
      />

      {/* Modal Formulario */}
      <CompanyFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialValues={initialFormValues}
        onSubmit={handleSave}
      />

      {/* Grid Principal de 2 Columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* COLUMNA IZQUIERDA */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* Componente Logo */}
          <CompanyLogoCard logoUrl={companyData.logoUrl} />

          <LocationCard
            country={companyData.country}
            province={companyData.province}
            city={companyData.city}
            address={companyData.address}
            ubigeo={companyData.ubigeo}
          />
        </div>

        {/* COLUMNA DERECHA */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* Componente Información de la Empresa */}
          <CompanyInfoCard
            telefono={companyData.phone}
            celular={companyData.mobile}
            sitioWeb={companyData.website}
            correo={companyData.email}
            rubro={companyData.rubro}
          />

          <CompanyCurrencyCard
            initialCurrency="soles"
            onCurrencyChange={(newCurrency) => {
              console.log("Moneda actualizada a:", newCurrency);
            }}
          />

          <BankAccountsCard
            accounts={bankAccounts}
            selectedAccount={selectedAccount}
            isOpen={isBankModalOpen}
            onSelectAccount={openBankModal}
            onClose={closeBankModal}
            onSave={handleSaveBankAccount}
          />
        </div>
      </div>
    </div>
  );
}
