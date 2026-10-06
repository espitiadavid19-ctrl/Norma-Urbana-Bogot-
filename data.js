/**
 * data.js — Base de datos normativa de "Norma Urbana Bogotá"
 * ------------------------------------------------------------------
 * FUENTE NORMATIVA DE REFERENCIA:
 *   Decreto Distrital 555 de 2021 (Plan de Ordenamiento Territorial - POT)
 *   https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=119582
 *   Secretaría Distrital de Planeación (SDP) — https://www.sdp.gov.co
 *
 * IMPORTANTE — LEE ESTO ANTES DE PONER LA APP EN PRODUCCIÓN:
 *   Los registros de UPZ_DATABASE son un EJEMPLO DE ESTRUCTURA con datos
 *   ilustrativos (marcados `fuente: "ejemplo"`). La app está diseñada
 *   para que reemplaces esos valores con la ficha normativa real de cada
 *   predio/UPZ, tal como la emite la Secretaría Distrital de Planeación
 *   (SDP) o la curaduría urbana. NO se debe presentar a un cliente como
 *   "norma oficial" ningún registro cuyo campo `fuente` diga "ejemplo".
 *
 * CÓMO ALIMENTAR ESTO CON DATOS REALES: ver INTEGRACIONES.md.
 */

// -----------------------------------------------------------------
// 1. Catálogo general de Tratamientos Urbanísticos del Decreto 555 de
//    2021 (texto conceptual, no específico de un predio).
// -----------------------------------------------------------------
const TRATAMIENTOS_POT_555 = {
  consolidacion: {
    nombre: "Consolidación",
    resumen:
      "Aplica a sectores urbanísticamente desarrollados y consolidados. Busca " +
      "equilibrar la densificación con la capacidad de la infraestructura " +
      "existente, permitiendo modificaciones moderadas de edificabilidad.",
  },
  desarrollo: {
    nombre: "Desarrollo",
    resumen:
      "Aplica a predios urbanizables no urbanizados (o urbanizados sin " +
      "licencia) que requieren procesos de urbanización y dotación de " +
      "infraestructura antes de construir.",
  },
  renovacion_urbana: {
    nombre: "Renovación Urbana",
    resumen:
      "Aplica a sectores con potencial de transformación, densificación o " +
      "recualificación, usualmente en modalidad de \"Reactivación\" o " +
      "\"Redesarrollo\", según el Decreto 555 de 2021.",
  },
  mejoramiento_integral: {
    nombre: "Mejoramiento Integral",
    resumen:
      "Aplica a sectores de origen informal, orientado a la regularización " +
      "urbanística, el mejoramiento de infraestructura y equipamientos, y la " +
      "legalización predial.",
  },
  conservacion: {
    nombre: "Conservación",
    resumen:
      "Aplica a inmuebles y sectores con valores patrimoniales, históricos " +
      "o arquitectónicos (BIC — Bienes de Interés Cultural), con " +
      "restricciones específicas de intervención.",
  },
};

// -----------------------------------------------------------------
// 2. Entidades de control y regulación urbanística de Bogotá.
//    Lista general (no depende de la dirección consultada).
// -----------------------------------------------------------------
const ENTIDADES_CONTROL = [
  {
    sigla: "SDP",
    nombre: "Secretaría Distrital de Planeación",
    url: "https://www.sdp.gov.co/"
  },

  {
    sigla: "UAECD",
    nombre: "Unidad Administrativa Especial de Catastro Distrital",
    url: "https://www.catastrobogota.gov.co/"
  },

  {
    sigla: "IDU",
    nombre: "Instituto de Desarrollo Urbano",
    url: "https://www.idu.gov.co/"
  },

  {
    sigla: "IDPC",
    nombre: "Instituto Distrital de Patrimonio Cultural",
    url: "https://idpc.gov.co/"
  },

  {
    sigla: "Curaduría",
    nombre: "Curadurías Urbanas de Bogotá",
    url: "https://www.curaduriaurbana1.com/"
  },

  {
    sigla: "ICANH",
    nombre: "Instituto Colombiano de Antropología e Historia",
    url: "https://www.icanh.gov.co/"
  },

  {
    sigla: "DADEP",
    nombre: "Departamento Administrativo de la Defensoría del Espacio Público",
    url: "https://www.dadep.gov.co/"
  },

  {
    sigla: "MinVivienda",
    nombre: "Ministerio de Vivienda, Ciudad y Territorio",
    url: "https://www.minvivienda.gov.co/"
  }
];

// -----------------------------------------------------------------
// 3. Base de datos por UPZ (Unidad de Planeamiento Zonal).
//    *** DATOS DE EJEMPLO — reemplazar por ficha oficial SDP ***
// -----------------------------------------------------------------
const UPZ_DATABASE = [
  {
    upz: "88",
    upzNombre: "El Refugio",
    localidad: "Chapinero",
    barrio: "El Refugio",
    codigoCatastral: "01-00-002-0002",
    tratamiento: "consolidacion",
    usoSuelo: "Residencial Múltiple / Comercial Sectorial",
    indices: {
      ocupacion: "0.50",
      construccion: "3.0",
      alturaMaxima: "5 pisos",
      alturaMetros: "18 metros",
      aisFrontal: "5 m",
      aisLateral: "3 m",
      aisPosterior: "3 m",
      areaMinimaLote: "120 m²",
      frenteMinimo: "8 m",
      cesionPublica: "15%",
    },
    decretosAplicables: [
      "Plan de Ordenamiento Territorial – Decreto Distrital 555 de 2021",
      "Norma de UPZ No. 88 El Refugio – ficha reglamentaria SDP",
      "Código de Construcción de Bogotá D.C.",
    ],
    restricciones: [
      "Verificar afectación por reserva vial o ronda hídrica.",
      "Verificar si el predio está en sector de interés cultural.",
    ],
    observacionesTecnicas:
      "Sector con dinámica comercial sobre ejes principales. Verificar norma específica para predios de esquina.",
    fuente: "ejemplo",
  },
  {
    upz: "97",
    upzNombre: "Chico Lago",
    localidad: "Chapinero",
    barrio: "El Chicó",
    codigoCatastral: "01-00-001-0001",
    tratamiento: "consolidacion",
    usoSuelo: "Residencial Múltiple / Comercial Sectorial",
    indices: {
      ocupacion: "0.55",
      construccion: "3.5",
      alturaMaxima: "6 pisos",
      alturaMetros: "21 metros",
      aisFrontal: "5 m",
      aisLateral: "3 m",
      aisPosterior: "3 m",
      areaMinimaLote: "120 m²",
      frenteMinimo: "8 m",
      cesionPublica: "17%",
    },
    decretosAplicables: [
      "Plan de Ordenamiento Territorial – Decreto Distrital 555 de 2021",
      "Norma de UPZ No. 97 Chico Lago – Decreto 075 de 2003",
      "Código de Construcción de Bogotá D.C.",
    ],
    restricciones: [
      "Verificar norma específica para predios de esquina.",
      "Verificar norma específica para predios de más de 1.000 m².",
    ],
    observacionesTecnicas:
      "Zona de interés para renovación en sectores cercanos a la Calle 100. Consultar norma específica para predios en esquina y predios de más de 1.000 m².",
    fuente: "ejemplo",
  },
  {
    upz: "71",
    upzNombre: "Tibabuyes",
    localidad: "Suba",
    barrio: "Tibabuyes",
    codigoCatastral: "05-00-014-0009",
    tratamiento: "mejoramiento_integral",
    usoSuelo: "Residencial / Comercio de proximidad",
    indices: {
      ocupacion: "0.70",
      construccion: "2.0",
      alturaMaxima: "3 pisos",
      alturaMetros: "10 metros",
      aisFrontal: "3 m",
      aisLateral: "0 m",
      aisPosterior: "2 m",
      areaMinimaLote: "60 m²",
      frenteMinimo: "6 m",
      cesionPublica: "10%",
    },
    decretosAplicables: [
      "Plan de Ordenamiento Territorial – Decreto Distrital 555 de 2021",
      "Norma de UPZ No. 71 Tibabuyes – ficha reglamentaria SDP",
      "Código de Construcción de Bogotá D.C.",
    ],
    restricciones: [
      "Posible afectación por ronda del río Bogotá / Humedal Juan Amarillo: verificar.",
    ],
    observacionesTecnicas:
      "Sector de origen informal en proceso de regularización. Verificar legalización del predio ante Catastro (UAECD).",
    fuente: "ejemplo",
  },
  {
    upz: "44",
    upzNombre: "Américas",
    localidad: "Kennedy",
    barrio: "Américas",
    codigoCatastral: "08-00-021-0014",
    tratamiento: "renovacion_urbana",
    usoSuelo: "Comercio y Servicios / Residencial",
    indices: {
      ocupacion: "0.60",
      construccion: "4.5",
      alturaMaxima: "9 pisos",
      alturaMetros: "30 metros",
      aisFrontal: "5 m",
      aisLateral: "3 m",
      aisPosterior: "3 m",
      areaMinimaLote: "200 m²",
      frenteMinimo: "10 m",
      cesionPublica: "20%",
    },
    decretosAplicables: [
      "Plan de Ordenamiento Territorial – Decreto Distrital 555 de 2021",
      "Norma de UPZ No. 44 Américas – ficha reglamentaria SDP",
      "Código de Construcción de Bogotá D.C.",
    ],
    restricciones: ["Verificar modalidad: Reactivación o Redesarrollo."],
    observacionesTecnicas:
      "Corredor comercial en transformación. Verificar plan parcial de renovación urbana vigente para la manzana.",
    fuente: "ejemplo",
  },
];

// -----------------------------------------------------------------
// 4. Índice simple dirección → UPZ.
//    *** DATOS DE EJEMPLO — en producción esto lo debe resolver un
//    geocodificador real (ver INTEGRACIONES.md). ***
// -----------------------------------------------------------------
const DIRECCIONES_DEMO = [
  { patron: "carrera 13", localidad: "Chapinero", upz: "88" },
  { patron: "cra 13", localidad: "Chapinero", upz: "88" },
  { patron: "calle 82", localidad: "Chapinero", upz: "88" },
  { patron: "carrera 7", localidad: "Chapinero", upz: "97" },
  { patron: "cra 7", localidad: "Chapinero", upz: "97" },
  { patron: "calle 140", localidad: "Usaquén", upz: "97" },
  { patron: "suba", localidad: "Suba", upz: "71" },
  { patron: "tibabuyes", localidad: "Suba", upz: "71" },
  { patron: "kennedy", localidad: "Kennedy", upz: "44" },
  { patron: "américas", localidad: "Kennedy", upz: "44" },
  { patron: "americas", localidad: "Kennedy", upz: "44" },
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { TRATAMIENTOS_POT_555, ENTIDADES_CONTROL, UPZ_DATABASE, DIRECCIONES_DEMO };
}
