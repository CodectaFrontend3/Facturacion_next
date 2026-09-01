export interface BankAccount {
  id: string;
  bankName: string;
  accountType: "Cuenta Corriente" | "Cuenta Ahorros";
  accountNumber?: string;
  currency: "PEN" | "USD";
  logoUrl: string;
}

export interface CompanyCurrencies {
  national: string;
  foreign: string;
}

export interface CompanyData {
  id: string;
  name: string;
  ruc: string;
  logoUrl: string;
  description: string;
  phone: string;
  mobile: string;
  email: string;
  website: string;
  rubro: string;
  country: string;
  province: string;
  city: string;
  address: string;
  ubigeo: string;
  currencies: CompanyCurrencies;
  bankAccounts: BankAccount[];
}
