import { useState, useEffect } from "react"
import provedoresData from "../data/provedor.json"

export function useProvedorFilters() {
  const [data, setData] = useState<any[]>([])
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [filters, setFilters] = useState({
    searchValue: "",
    dateFrom: "",
    dateTo: ""
  })

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        // Simulamos una llamada a API
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Mapeamos los datos del JSON para aplanar la estructura si es necesario
        // o generamos un ID para la tabla
        const formattedData = provedoresData.map((item, index) => ({
          ...item,
          id: index + 1,
          acciones: ["edit", "check"] // Acciones por defecto
        }))
        
        setData(formattedData)
        setFilteredData(formattedData)
      } catch (error) {
        console.error("Error al cargar proveedores:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleSearch = () => {
    let result = [...data]

    // Filtro por texto libre
    if (filters.searchValue) {
      const search = filters.searchValue.toLowerCase()
      result = result.filter(item => 
        item.proveedor.empresa?.toLowerCase().includes(search) ||
        item.proveedor.ruc?.includes(search) ||
        item.contacto.nombre?.toLowerCase().includes(search)
      )
    }

    setFilteredData(result)
  }

  const handleReset = () => {
    setFilters({
      searchValue: "",
      dateFrom: "",
      dateTo: ""
    })
    setFilteredData(data)
  }

  const addProveedor = (nuevo: any) => {
    const formatted = {
      ...nuevo,
      id: data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1,
      acciones: ["edit", "check"]
    }
    setData(prev => [...prev, formatted])
    setFilteredData(prev => [...prev, formatted])
  }

  const updateProveedor = (id: number, updated: any) => {
    setData(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item))
    setFilteredData(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item))
  }

  const toggleProveedorAcciones = (id: number, checked: boolean) => {
    const newActions = checked ? ["view", "cancel"] : ["edit", "check"]
    setData(prev => prev.map(item => item.id === id ? { ...item, acciones: newActions } : item))
    setFilteredData(prev => prev.map(item => item.id === id ? { ...item, acciones: newActions } : item))
  }

  return {
    data: filteredData,
    filters,
    isLoading,
    handleFilterChange,
    handleSearch,
    handleReset,
    addProveedor,
    updateProveedor,
    toggleProveedorAcciones
  }
}
