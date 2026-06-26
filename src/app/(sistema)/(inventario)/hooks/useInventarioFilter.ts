import { useState, useMemo } from "react";
import { isWithinInterval, startOfDay, endOfDay, parseISO } from "date-fns";

interface UseFiltroConfig<T> {
  dataOriginal: T[];
  dateKey: keyof T; // Propiedad que tiene la fecha en tus objetos (ej. 'fecha')
}

export function useFiltroInventario<T>({
  dataOriginal,
  dateKey,
}: UseFiltroConfig<T>) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [almacen, setAlmacen] = useState<string>("todos");
  const [categoria, setCategoria] = useState<string>("seleccion");

  // Almacena el resultado tras hacer click en "Consultar"
  const [dataFiltrada, setDataFiltrada] = useState<T[]>([]);

  // Lógica de filtrado por fechas
  const ejecutarFiltro = () => {
    if (!dataOriginal || dataOriginal.length === 0) {
      setDataFiltrada([]);
      return;
    }

    const resultado = dataOriginal.filter((item) => {
      if (!startDate && !endDate) return true;

      const dateValue = item[dateKey];
      if (!dateValue) return false;

      // Normalizar la fecha del item (soporta string ISO o instancia Date)
      const itemDate =
        typeof dateValue === "string"
          ? parseISO(dateValue)
          : (dateValue as unknown as Date);
      const normalizedItemDate = startOfDay(itemDate);

      const start = startDate ? startOfDay(startDate) : null;
      const end = endDate ? endOfDay(endDate) : null;

      if (start && end) {
        return isWithinInterval(normalizedItemDate, { start, end });
      } else if (start) {
        return normalizedItemDate >= start;
      } else if (end) {
        return normalizedItemDate <= end;
      }

      return true;
    });

    setDataFiltrada(resultado);
  };

  // Función para segmentar la data filtrada actual por un criterio/campo específico
  const separarPorTipo = (key: keyof T, value: string | number) => {
    return dataFiltrada.filter((item) => String(item[key]) === String(value));
  };

  return {
    // Estados y setters compartidos con el componente visual
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    almacen,
    setAlmacen,
    categoria,
    setCategoria,
    // Acciones y Resultados
    dataFiltrada,
    ejecutarFiltro,
    separarPorTipo,
  };
}
