import { useState } from "react";
import companyDataRaw from "../data/company.json";
import bankAccountsRaw from "../data/bankAccounts.json";
import { CompanyData } from "../types/company";
import { CompanyFormValues } from "../schema/companySchema";

export interface AccountDetail {
  id: string;
  tipoCuenta: string;
  moneda: string;
  numeroCuenta: string;
  detraccion: boolean;
}

export interface BankAccount {
  id: string;
  nombre: string;
  titular: string;
  activo: boolean;
  logoUrl: string;
  banco: string;
  cuentas: AccountDetail[];
}

export function useCompanyForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyData>(
    companyDataRaw as CompanyData,
  );

  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(
    bankAccountsRaw as BankAccount[],
  );
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(
    null,
  );
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const initialFormValues: Partial<CompanyFormValues> = {
    logoUrl: companyData.logoUrl,
    descripcion: companyData.description,
    movil: companyData.mobile,
    telefono: companyData.phone,
    correo: companyData.email,
    pais: companyData.country,
    calle: companyData.address,
    rubro: companyData.rubro,
    regionProvincia: companyData.province,
    ciudad: companyData.city,
    codigoUbigeo: companyData.ubigeo,
    paginaWeb: companyData.website,
  };

  const handleSave = (formValues: CompanyFormValues) => {
    setCompanyData((prev) => ({
      ...prev,
      logoUrl: formValues.logoUrl || prev.logoUrl,
      description: formValues.descripcion,
      mobile: formValues.movil,
      phone: formValues.telefono || "",
      email: formValues.correo,
      country: formValues.pais,
      address: formValues.calle,
      rubro: formValues.rubro,
      province: formValues.regionProvincia,
      city: formValues.ciudad,
      ubigeo: formValues.codigoUbigeo,
      website: formValues.paginaWeb || "",
    }));
  };

  const openBankModal = (account: BankAccount) => {
    setSelectedAccount(account);
    setIsBankModalOpen(true);
  };

  const closeBankModal = () => {
    setSelectedAccount(null);
    setIsBankModalOpen(false);
  };

  const handleSaveBankAccount = (updatedAccount: BankAccount) => {
    setBankAccounts((prev) =>
      prev.map((acc) => (acc.id === updatedAccount.id ? updatedAccount : acc)),
    );
    closeBankModal();
  };

  return {
    companyData,
    isModalOpen,
    setIsModalOpen,
    openModal,
    closeModal,
    initialFormValues,
    handleSave,
    bankAccounts,
    selectedAccount,
    isBankModalOpen,
    openBankModal,
    closeBankModal,
    handleSaveBankAccount,
  };
}
