import clientesMock from "../data/cliente-mock.json"
import type { CboItem } from "@/components/common/CboData"

export type ClienteMock = (typeof clientesMock)[number]

/** Opciones para CboData derivadas de cliente-mock.json */
export const clientesOptions: CboItem[] = clientesMock.map((c) => ({
  value: String(c.id),
  label: `${c.nombre} | ${c.numeroDocumento}`,
}))

export function getClienteById(id: string): ClienteMock | undefined {
  return clientesMock.find((c) => String(c.id) === id)
}

/** Filtra filas de ventas comparando con el cliente del mock */
export function rowMatchesCliente(
  row: { cliente?: string; rucDni?: string; clienteId?: string },
  clienteId: string
): boolean {
  const cliente = getClienteById(clienteId)
  if (!cliente) return false

  if (row.clienteId && row.clienteId === clienteId) return true

  return (
    row.cliente === cliente.nombre ||
    row.rucDni === cliente.numeroDocumento
  )
}
