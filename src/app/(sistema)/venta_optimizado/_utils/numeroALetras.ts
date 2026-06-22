// _utils/numeroALetras.ts

/**
 * Convierte un monto numérico a su representación en letras en español,
 * usado en la frase "Son: ... Soles/Dólares" de la vista de detalle.
 * Portado de ventas/utils/document-detail-utils.ts sin cambios de lógica.
 */

function unidades(u: number): string {
  switch (u) {
    case 1: return "un"
    case 2: return "dos"
    case 3: return "tres"
    case 4: return "cuatro"
    case 5: return "cinco"
    case 6: return "seis"
    case 7: return "siete"
    case 8: return "ocho"
    case 9: return "nueve"
    default: return ""
  }
}

function decenas(d: number): string {
  switch (d) {
    case 10: return "diez"
    case 11: return "once"
    case 12: return "doce"
    case 13: return "trece"
    case 14: return "catorce"
    case 15: return "quince"
    case 20: return "veinte"
    default: {
      if (d > 15 && d < 20) return "dieci" + unidades(d - 10)
      if (d > 20 && d < 30) return "veinti" + unidades(d - 20)
      const u = d % 10
      const dec = Math.floor(d / 10)
      let text = ""
      switch (dec) {
        case 3: text = "treinta"; break
        case 4: text = "cuarenta"; break
        case 5: text = "cincuenta"; break
        case 6: text = "sesenta"; break
        case 7: text = "setenta"; break
        case 8: text = "ochenta"; break
        case 9: text = "noventa"; break
      }
      if (u > 0) return text + " y " + unidades(u)
      return text
    }
  }
}

function centenas(c: number): string {
  const cent = Math.floor(c / 100)
  const resto = c % 100
  let text = ""
  switch (cent) {
    case 1: text = resto === 0 ? "cien" : "ciento"; break
    case 2: text = "doscientos"; break
    case 3: text = "trescientos"; break
    case 4: text = "cuatrocientos"; break
    case 5: text = "quinientos"; break
    case 6: text = "seiscientos"; break
    case 7: text = "setecientos"; break
    case 8: text = "ochocientos"; break
    case 9: text = "novecientos"; break
  }
  if (resto > 0) {
    if (resto < 10) return text + " " + unidades(resto)
    return text + " " + decenas(resto).toLowerCase()
  }
  return text
}

function miles(m: number): string {
  const mil = Math.floor(m / 1000)
  const resto = m % 1000
  let text = ""
  if (mil === 1) text = "mil"
  else if (mil > 1) {
    if (mil < 10) text = unidades(mil) + " mil"
    else if (mil < 100) text = decenas(mil) + " mil"
    else text = centenas(mil) + " mil"
  }
  if (resto > 0) {
    if (resto < 10) text += " " + unidades(resto)
    else if (resto < 100) text += " " + decenas(resto).toLowerCase()
    else text += " " + centenas(resto).toLowerCase()
  }
  return text
}

function millones(m: number): string {
  const mill = Math.floor(m / 1000000)
  const resto = m % 1000000
  let text = ""

  if (mill === 1) {
    text = "un millón"
  } else if (mill > 1) {
    const prefix =
      mill < 10 ? unidades(mill) :
      mill < 100 ? decenas(mill) :
      mill < 1000 ? centenas(mill) :
      miles(mill)
    text = `${prefix} millones`
  }

  if (resto > 0) {
    text += ` ${miles(resto).toLowerCase()}`
  }

  return text.trim()
}

function numeroEnteroALetras(entero: number): string {
  if (entero === 0) return "cero"
  if (entero < 10) return unidades(entero)
  if (entero < 100) return decenas(entero)
  if (entero < 1000) return centenas(entero)
  if (entero < 1000000) return miles(entero)
  if (entero < 1000000000) return millones(entero)
  return "monto grande"
}

/**
 * @param numero Monto a convertir (acepta number o string con/sin comas)
 * @param moneda "soles" | "dolares" — determina el sufijo final
 */
export function numeroALetras(numero: number | string, moneda: "soles" | "dolares" = "soles"): string {
  const num = typeof numero === "number" ? numero : parseFloat((numero || "0").replace(/,/g, ""))
  if (isNaN(num)) return ""

  const formatDecimals = (val: number) => {
    const decimals = Math.round((val - Math.floor(val)) * 100)
    return `${decimals.toString().padStart(2, "0")}/100`
  }

  const entero = Math.floor(num)
  let letras = numeroEnteroALetras(entero)
  letras = letras.trim()
  letras = letras.charAt(0).toUpperCase() + letras.slice(1)

  const decs = formatDecimals(num)
  const monName = moneda === "soles" ? "Soles" : "Dólares"
  return `${letras} con ${decs} ${monName}`
}
