import React from "react";
import NavigationTabs, { TabItem } from "../../NavigationTabs";

interface Props {
  children: React.ReactNode;
  actions?: React.ReactNode;
}

function FacturasManualTabs({ children, actions }: Props) {
  const creditosTabs: TabItem[] = [
    {
      name: "Sin Pagos",
      href: "/creditos_pago/facturas_manuales/sin-pagos",
      count: 0,
      badgeColor: "#008000", // Verde
    },
    {
      name: "Pagados",
      href: "/creditos_pago/facturas_manuales/pagados",
      count: 0,
      badgeColor: "#FFA500", // Naranja
    },
  ];

  return (
    <NavigationTabs tabs={creditosTabs} actions={actions}>
      {children}
    </NavigationTabs>
  );
}

export default FacturasManualTabs;
