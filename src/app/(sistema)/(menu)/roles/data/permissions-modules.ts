import type { PermissionModule, PermissionSection } from "../types/role-permissions";

function createStandardActions(
  prefix: string,
  sectionName: string,
  customActions?: { label: string; desc: string }[],
) {
  if (customActions) {
    return customActions.map((act) => ({
      id: `${prefix}_${act.label.toLowerCase()}`,
      label: act.label,
      description: act.desc,
    }));
  }

  return [
    {
      id: `${prefix}_listar`,
      label: "Listar",
      description: `Lista de ${sectionName}`,
    },
    {
      id: `${prefix}_crear`,
      label: "Crear",
      description: `Crear ${sectionName}`,
    },
    {
      id: `${prefix}_ver`,
      label: "Ver",
      description: `Ver detalle de ${sectionName}`,
    },
    {
      id: `${prefix}_editar`,
      label: "Editar",
      description: `Editar ${sectionName}`,
    },
    {
      id: `${prefix}_procesar`,
      label: "Procesar",
      description: `Procesar ${sectionName}`,
    },
    {
      id: `${prefix}_duplicar`,
      label: "Duplicar",
      description: `Duplicar ${sectionName}`,
    },
  ];
}

function createCrudActions(prefix: string, sectionName: string) {
  return [
    {
      id: `${prefix}_listar`,
      label: "Listar",
      description: `Lista de ${sectionName}`,
    },
    {
      id: `${prefix}_crear`,
      label: "Crear",
      description: `Crear ${sectionName}`,
    },
    {
      id: `${prefix}_ver`,
      label: "Ver",
      description: `Ver detalle de ${sectionName}`,
    },
    {
      id: `${prefix}_editar`,
      label: "Editar",
      description: `Editar ${sectionName}`,
    },
    {
      id: `${prefix}_eliminar`,
      label: "Eliminar",
      description: `Eliminar ${sectionName}`,
    },
  ];
}

export const PERMISSION_MODULES: PermissionModule[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    sections: [
      {
        id: "inicio",
        label: "Inicio",
        actions: [
          { id: "inicio_ver", label: "Ver", description: "Ver Dashboard" },
          {
            id: "inicio_estadisticas",
            label: "Estadísticas",
            description: "Ver Estadísticas Globales",
          },
        ],
      },
    ],
  },
  {
    id: "ventas",
    title: "Ventas",
    sections: [
      {
        id: "cotizacion",
        label: "Cotizacion",
        actions: createStandardActions("v_coti", "Cotizaciones"),
      },
      {
        id: "cotizacion_m",
        label: "Cotizacion_M",
        actions: [
          {
            id: "v_cotim_listar",
            label: "Listar",
            description: "Lista de Cotizaciones Manuales",
          },
          {
            id: "v_cotim_crear",
            label: "Crear",
            description: "Crear Cotización Manual",
          },
          {
            id: "v_cotim_ver",
            label: "Ver",
            description: "Ver Cotización Manual",
          },
          {
            id: "v_cotim_editar",
            label: "Editar",
            description: "Editar Cotización Manual",
          },
          {
            id: "v_cotim_procesar",
            label: "Procesar",
            description: "Procesar Cotización Manual",
          },
          {
            id: "v_cotim_duplicar",
            label: "Duplicar",
            description: "Duplicar Cotización Manual",
          },
        ],
      },
      {
        id: "nota_venta",
        label: "Nota_Venta",
        actions: createStandardActions("v_nv", "Notas de Venta"),
      },
      {
        id: "clientes",
        label: "Clientes",
        actions: createCrudActions("v_cli", "Clientes"),
      },
      {
        id: "coti_renovacion",
        label: "Coti_Renovacion",
        actions: createStandardActions("v_coti_ren", "Cotizaciones de Renovación"),
      },
      {
        id: "guia_remision",
        label: "Guia_Remision",
        actions: createStandardActions("v_gr", "Guías de Remisión"),
      },
    ],
  },
  {
    id: "tesoreria",
    title: "Tesoreria",
    sections: [
      {
        id: "caja_chica",
        label: "Caja-Chica",
        actions: createCrudActions("tes_cc", "Caja Chica"),
      },
    ],
  },
  {
    id: "comprobantes",
    title: "Comprobantes",
    sections: [
      {
        id: "factura",
        label: "Factura",
        actions: createStandardActions("comp_fac", "Facturas"),
      },
      {
        id: "factura_m",
        label: "Factura_M",
        actions: createStandardActions("comp_facm", "Facturas Manuales"),
      },
      {
        id: "boleta",
        label: "Boleta",
        actions: createStandardActions("comp_bol", "Boletas"),
      },
      {
        id: "boleta_m",
        label: "Boleta_M",
        actions: createStandardActions("comp_bolm", "Boletas Manuales"),
      },
      {
        id: "nota_credito",
        label: "Nota_Credito",
        actions: createStandardActions("comp_nc", "Notas de Crédito"),
      },
      {
        id: "nota_debito",
        label: "Nota_Debito",
        actions: createStandardActions("comp_nd", "Notas de Débito"),
      },
      {
        id: "guia_remision_c",
        label: "Guia_Remision",
        actions: createStandardActions("comp_gr", "Guías de Remisión"),
      },
      {
        id: "guia_remision_m_c",
        label: "Guia_Remision_M",
        actions: createStandardActions("comp_grm", "Guías de Remisión Manuales"),
      },
    ],
  },
  {
    id: "garantias",
    title: "Garantias",
    sections: [
      {
        id: "guia_ingreso",
        label: "Guia_Ingreso",
        actions: createStandardActions("gar_gi", "Guías de Ingreso"),
      },
      {
        id: "guia_egreso",
        label: "Guia_Egreso",
        actions: createStandardActions("gar_ge", "Guías de Egreso"),
      },
      {
        id: "informe_tecnico",
        label: "Informe_Tecnico",
        actions: createStandardActions("gar_it", "Informes Técnicos"),
      },
    ],
  },
  {
    id: "inventario",
    title: "Inventario",
    sections: [
      {
        id: "kardex_entrada",
        label: "Kardex_Entrada",
        actions: createCrudActions("inv_ke", "Kardex Entrada"),
      },
      {
        id: "kardex_distribucion",
        label: "Kardex_Distribucion",
        actions: createCrudActions("inv_kd", "Kardex Distribución"),
      },
      {
        id: "kardex_traslado",
        label: "Kardex_Traslado",
        actions: createCrudActions("inv_kt", "Kardex Traslado"),
      },
      {
        id: "kardex_salida",
        label: "Kardex_Salida",
        actions: createCrudActions("inv_ks", "Kardex Salida"),
      },
      {
        id: "inventario_rep",
        label: "Inventario",
        actions: createCrudActions("inv_rep", "Inventario"),
      },
      {
        id: "cierre_periodo",
        label: "Cierre_Periodo",
        actions: [
          { id: "inv_cp_ver", label: "Ver", description: "Ver Cierre" },
          { id: "inv_cp_ejecutar", label: "Ejecutar", description: "Ejecutar Cierre" },
        ],
      },
    ],
  },
  {
    id: "creditos_cobranzas",
    title: "Creditos Cobranzas",
    sections: [
      {
        id: "cc_factura",
        label: "Factura",
        actions: createStandardActions("cc_fac", "Facturas en Cobranza"),
      },
      {
        id: "cc_factura_m",
        label: "Factura_M",
        actions: createStandardActions("cc_facm", "Facturas Manuales en Cobranza"),
      },
      {
        id: "cc_boleta",
        label: "Boleta",
        actions: createStandardActions("cc_bol", "Boletas en Cobranza"),
      },
      {
        id: "cc_boleta_m",
        label: "Boleta_M",
        actions: createStandardActions("cc_bolm", "Boletas Manuales en Cobranza"),
      },
      {
        id: "cc_nota_venta",
        label: "Nota_Venta",
        actions: createStandardActions("cc_nv", "Notas de Venta en Cobranza"),
      },
    ],
  },
  {
    id: "servicio_tecnico",
    title: "Servicio Tecnico",
    sections: [
      {
        id: "servicio_tecnico_p",
        label: "Servicio_Tecnico",
        actions: createCrudActions("st", "Servicio Técnico"),
      },
    ],
  },
  {
    id: "personal",
    title: "Personal",
    sections: [
      {
        id: "personal_m",
        label: "Personal",
        actions: createCrudActions("pers_p", "Personal"),
      },
      {
        id: "vendedores",
        label: "Vendedores",
        actions: createCrudActions("pers_vend", "Vendedores"),
      },
      {
        id: "transporte_publico",
        label: "Transporte_Publico",
        actions: createCrudActions("pers_tp", "Transporte Público"),
      },
      {
        id: "transporte_privado",
        label: "Transporte_Privado",
        actions: createCrudActions("pers_tpr", "Transporte Privado"),
      },
    ],
  },
  {
    id: "consultas",
    title: "Consultas",
    sections: [
      {
        id: "consultas_p",
        label: "Consultas",
        actions: [
          { id: "cons_ver", label: "Ver", description: "Consultar Documentos" },
          { id: "cons_export", label: "Exportar", description: "Exportar Consultas" },
        ],
      },
    ],
  },
  {
    id: "registro_sunat",
    title: "Registro Sunat",
    sections: [
      {
        id: "rs_factura",
        label: "Factura",
        actions: createStandardActions("rs_fac", "Facturas SUNAT"),
      },
      {
        id: "rs_factura_m",
        label: "Factura_M",
        actions: createStandardActions("rs_facm", "Facturas Manuales SUNAT"),
      },
      {
        id: "rs_detraccion",
        label: "Detraccion_Factura",
        actions: createStandardActions("rs_detr", "Detracciones"),
      },
      {
        id: "rs_boleta",
        label: "Boleta",
        actions: createStandardActions("rs_bol", "Boletas SUNAT"),
      },
      {
        id: "rs_boleta_m",
        label: "Boleta_M",
        actions: createStandardActions("rs_bolm", "Boletas Manuales SUNAT"),
      },
      {
        id: "rs_guia_remision",
        label: "Guia_Remision",
        actions: createStandardActions("rs_gr", "Guías SUNAT"),
      },
      {
        id: "rs_guia_remision_m",
        label: "Guia_Remision_M",
        actions: createStandardActions("rs_grm", "Guías Manuales SUNAT"),
      },
      {
        id: "rs_nota_credito",
        label: "Nota_Credito",
        actions: createStandardActions("rs_nc", "Notas de Crédito SUNAT"),
      },
      {
        id: "rs_nota_debito",
        label: "Nota_Debito",
        actions: createStandardActions("rs_nd", "Notas de Débito SUNAT"),
      },
    ],
  },
  {
    id: "productos_servicios",
    title: "Productos Servicios",
    sections: [
      {
        id: "ps_productos",
        label: "Productos",
        actions: createCrudActions("ps_prod", "Productos"),
      },
      {
        id: "ps_servicios",
        label: "Servicios",
        actions: createCrudActions("ps_serv", "Servicios"),
      },
    ],
  },
  {
    id: "proyectos_pwb",
    title: "Proyectos Pwb",
    sections: [
      {
        id: "proyectos_pwb_p",
        label: "Proyectos_Pwb",
        actions: createCrudActions("proy_pwb", "Proyectos"),
      },
    ],
  },
  {
    id: "correo",
    title: "Correo",
    sections: [
      {
        id: "correo_p",
        label: "Correo",
        actions: [
          { id: "correo_env", label: "Enviar", description: "Enviar Correo" },
          { id: "correo_conf", label: "Configuración", description: "Configuración de Servidor" },
        ],
      },
    ],
  },
  {
    id: "auxiliar",
    title: "Auxiliar",
    sections: [
      {
        id: "proveedor",
        label: "Proveedor",
        actions: createCrudActions("aux_prov", "Proveedores"),
      },
    ],
  },
  {
    id: "perfil_usuario",
    title: "Perfil Usuario",
    sections: [
      {
        id: "perfil_usuario_p",
        label: "Perfil_Usuario",
        actions: [
          { id: "perf_ver", label: "Ver", description: "Ver Perfil" },
          { id: "perf_edit", label: "Editar", description: "Editar Perfil" },
        ],
      },
    ],
  },
  {
    id: "empresa",
    title: "Empresa",
    sections: [
      {
        id: "empresa_p",
        label: "Empresa",
        actions: createCrudActions("emp_data", "Datos de Empresa"),
      },
      {
        id: "bancos",
        label: "Bancos",
        actions: createCrudActions("emp_banc", "Bancos"),
      },
      {
        id: "moneda",
        label: "Moneda",
        actions: createCrudActions("emp_mon", "Monedas"),
      },
    ],
  },
  {
    id: "configuracion_general",
    title: "Configuracion General",
    sections: [
      {
        id: "cg_almacen",
        label: "Almacen",
        actions: createCrudActions("cg_alm", "Almacenes"),
      },
      {
        id: "cg_apariencia",
        label: "Apariencia",
        actions: [
          { id: "cg_ap_ver", label: "Ver", description: "Ver Apariencia" },
          { id: "cg_ap_edit", label: "Editar", description: "Editar Apariencia" },
        ],
      },
      {
        id: "cg_familia",
        label: "Familia",
        actions: createCrudActions("cg_fam", "Familias"),
      },
      {
        id: "cg_subfamilia",
        label: "Subfamilia",
        actions: createCrudActions("cg_subfam", "Subfamilias"),
      },
      {
        id: "cg_garantia_doc",
        label: "Garantia_Doc",
        actions: createCrudActions("cg_gdoc", "Documentos de Garantía"),
      },
      {
        id: "cg_marcas",
        label: "Marcas",
        actions: createCrudActions("cg_marc", "Marcas"),
      },
      {
        id: "cg_motivos",
        label: "Motivos",
        actions: createCrudActions("cg_mot", "Motivos"),
      },
      {
        id: "cg_tipo_cambio",
        label: "Tipo_Cambio",
        actions: createCrudActions("cg_tc", "Tipo de Cambio"),
      },
      {
        id: "cg_unidad_m",
        label: "Unidad_M",
        actions: createCrudActions("cg_um", "Unidades de Medida"),
      },
      {
        id: "cg_usuarios",
        label: "Usuarios",
        actions: createCrudActions("cg_usr", "Usuarios"),
      },
      {
        id: "cg_roles",
        label: "Roles",
        actions: createCrudActions("cg_rol", "Roles"),
      },
      {
        id: "cg_validez",
        label: "Validez",
        actions: createCrudActions("cg_val", "Validez"),
      },
      {
        id: "cg_alarma",
        label: "Alarma",
        actions: createCrudActions("cg_ala", "Alarmas"),
      },
    ],
  },
];
