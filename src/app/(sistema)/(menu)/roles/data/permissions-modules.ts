import type { PermissionModule } from "../types/role-permissions";

export const PERMISSION_MODULES: PermissionModule[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    permissions: [{ id: "inicio", label: "Inicio" }],
  },
  {
    id: "ventas",
    title: "Ventas",
    permissions: [
      { id: "cotizacion", label: "Cotizacion" },
      { id: "cotizacion_m", label: "Cotizacion_M" },
      { id: "nota_venta", label: "Nota_Venta" },
      { id: "clientes", label: "Clientes" },
      { id: "guia_remision_v", label: "Guia_Remision" },
    ],
  },
  {
    id: "tesoreria",
    title: "Tesoreria",
    permissions: [{ id: "caja_chica", label: "Caja-Chica" }],
  },
  {
    id: "comprobantes",
    title: "Comprobantes",
    permissions: [
      { id: "factura", label: "Factura" },
      { id: "factura_m", label: "Factura_M" },
      { id: "boleta", label: "Boleta" },
      { id: "boleta_m", label: "Boleta_M" },
      { id: "nota_credito", label: "Nota_Credito" },
      { id: "nota_debito", label: "Nota_Debito" },
      { id: "guia_remision_c", label: "Guia_Remision" },
      { id: "guia_remision_m_c", label: "Guia_Remision_M" },
    ],
  },
  {
    id: "garantias",
    title: "Garantias",
    permissions: [
      { id: "guia_ingreso", label: "Guia_Ingreso" },
      { id: "guia_egreso", label: "Guia_Egreso" },
      { id: "informe_tecnico", label: "Informe_Tecnico" },
    ],
  },
  {
    id: "inventario",
    title: "Inventario",
    permissions: [
      { id: "kardex_entrada", label: "Kardex_Entrada" },
      { id: "kardex_distribucion", label: "Kardex_Distribucion" },
      { id: "kardex_traslado", label: "Kardex_Traslado" },
      { id: "kardex_salida", label: "Kardex_Salida" },
      { id: "inventario_rep", label: "Inventario" },
      { id: "cierre_periodo", label: "Cierre_Periodo" },
    ],
  },
  {
    id: "creditos_cobranzas",
    title: "Creditos Cobranzas",
    permissions: [
      { id: "cc_factura", label: "Factura" },
      { id: "cc_factura_m", label: "Factura_M" },
      { id: "cc_boleta", label: "Boleta" },
      { id: "cc_boleta_m", label: "Boleta_M" },
      { id: "cc_nota_venta", label: "Nota_Venta" },
    ],
  },
  {
    id: "servicio_tecnico",
    title: "Servicio Tecnico",
    permissions: [{ id: "servicio_tecnico_p", label: "Servicio_Tecnico" }],
  },
  {
    id: "personal",
    title: "Personal",
    permissions: [
      { id: "personal_m", label: "Personal" },
      { id: "vendedores", label: "Vendedores" },
      { id: "transporte_publico", label: "Transporte_Publico" },
      { id: "transporte_privado", label: "Transporte_Privado" },
    ],
  },
  {
    id: "consultas",
    title: "Consultas",
    permissions: [{ id: "consultas_p", label: "Consultas" }],
  },
  {
    id: "registro_sunat",
    title: "Registro Sunat",
    permissions: [
      { id: "rs_factura", label: "Factura" },
      { id: "rs_factura_m", label: "Factura_M" },
      { id: "rs_detraccion", label: "Detraccion_Factura" },
      { id: "rs_boleta", label: "Boleta" },
      { id: "rs_boleta_m", label: "Boleta_M" },
      { id: "rs_guia_remision", label: "Guia_Remision" },
      { id: "rs_guia_remision_m", label: "Guia_Remision_M" },
      { id: "rs_nota_credito", label: "Nota_Credito" },
      { id: "rs_nota_debito", label: "Nota_Debito" },
    ],
  },
  {
    id: "productos_servicios",
    title: "Productos Servicios",
    permissions: [
      { id: "ps_productos", label: "Productos" },
      { id: "ps_servicios", label: "Servicios" },
    ],
  },
  {
    id: "proyectos_pwb",
    title: "Proyectos Pwb",
    permissions: [{ id: "proyectos_pwb_p", label: "Proyectos_Pwb" }],
  },
  {
    id: "correo",
    title: "Correo",
    permissions: [{ id: "correo_p", label: "Correo" }],
  },
  {
    id: "auxiliar",
    title: "Auxiliar",
    permissions: [{ id: "proveedor", label: "Proveedor" }],
  },
  {
    id: "perfil_usuario",
    title: "Perfil Usuario",
    permissions: [{ id: "perfil_usuario_p", label: "Perfil_Usuario" }],
  },
  {
    id: "empresa",
    title: "Empresa",
    permissions: [
      { id: "empresa_p", label: "Empresa" },
      { id: "bancos", label: "Bancos" },
      { id: "moneda", label: "Moneda" },
    ],
  },
  {
    id: "configuracion_general",
    title: "Configuracion General",
    permissions: [
      { id: "cg_almacen", label: "Almacen" },
      { id: "cg_apariencia", label: "Apariencia" },
      { id: "cg_familia", label: "Familia" },
      { id: "cg_subfamilia", label: "Subfamilia" },
      { id: "cg_garantia_doc", label: "Garantia_Doc" },
      { id: "cg_marcas", label: "Marcas" },
      { id: "cg_motivos", label: "Motivos" },
      { id: "cg_tipo_cambio", label: "Tipo_Cambio" },
      { id: "cg_unidad_m", label: "Unidad_M" },
      { id: "cg_usuarios", label: "Usuarios" },
      { id: "cg_roles", label: "Roles" },
      { id: "cg_validez", label: "Validez" },
      { id: "cg_alarma", label: "Alarma" },
    ],
  },
];
