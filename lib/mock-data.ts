// =============================================================================
// INSIGNIA LINK — Centralized mock data (Etapa 1, Método VForge)
// Plataforma integral para radiocomunicación, CCTV y soporte técnico.
// Todos los datos comparten IDs y relaciones coherentes. Sin backend.
// =============================================================================

export type Priority = "alta" | "media" | "baja"
export type TicketStatus = "abierto" | "en-proceso" | "resuelto" | "completado"
export type ServiceStatus = "pendiente" | "en-ruta" | "en-progreso" | "completado"
export type EquipmentStatus = "disponible" | "asignado" | "mantenimiento" | "baja"
export type OpportunityStage = "nuevo" | "cotizacion" | "negociacion" | "ganado" | "perdido"

export interface Client {
  id: string
  name: string
  legalName: string
  city: string
  state: string
  lat: number
  lng: number
  contact: string
  email: string
  phone: string
  account: "activa" | "prospecto" | "suspendida"
  radios: number
  cameras: number
  dvr: number
  sites: number
  since: string
}

export interface Technician {
  id: string
  name: string
  role: string
  avatarColor: string
  initials: string
  services: number
  completed: number
  efficiency: number
  status: "en-campo" | "disponible" | "descanso"
  phone: string
}

export interface Ticket {
  id: string
  title: string
  clientId: string
  priority: Priority
  status: TicketStatus
  category: "CCTV" | "Radio" | "DVR/NVR" | "Acceso" | "Red"
  createdAt: string
  assignedTo: string | null
  description: string
}

export interface Equipment {
  id: string
  name: string
  category: "Radios" | "Cámaras" | "DVR/NVR" | "Accesorios"
  serial: string
  status: EquipmentStatus
  stock: number
  clientId: string | null
}

export interface ServiceVisit {
  id: string
  ticketId: string
  clientId: string
  technicianId: string
  window: string
  status: ServiceStatus
  order: number
}

export interface Opportunity {
  id: string
  name: string
  clientId: string
  stage: OpportunityStage
  amount: number
  date: string
  summary: string
}

export interface QuoteLine {
  id: string
  name: string
  detail: string
  qty: number
  unitPrice: number
  type: "equipo" | "servicio"
}

export interface Activity {
  id: string
  type: "ticket" | "mantenimiento" | "cotizacion" | "servicio"
  title: string
  meta: string
  time: string
}

// ----------------------------------------------------------------------------
// CLIENTES
// ----------------------------------------------------------------------------
export const clients: Client[] = [
  {
    id: "CL-01",
    name: "Hotel Xcaret México",
    legalName: "Experiencias Xcaret S.A. de C.V.",
    city: "Playa del Carmen",
    state: "Quintana Roo",
    lat: 20.58,
    lng: -87.12,
    contact: "Mariana Cruz",
    email: "mcruz@xcaret.com",
    phone: "+52 984 100 2233",
    account: "activa",
    radios: 45,
    cameras: 16,
    dvr: 3,
    sites: 3,
    since: "2021-04-10",
  },
  {
    id: "CL-02",
    name: "Plaza Galerías Monterrey",
    legalName: "Inmobiliaria Galerías S.A. de C.V.",
    city: "Monterrey",
    state: "Nuevo León",
    lat: 25.65,
    lng: -100.36,
    contact: "Jorge Salinas",
    email: "jsalinas@galerias.mx",
    phone: "+52 81 220 4455",
    account: "activa",
    radios: 22,
    cameras: 64,
    dvr: 5,
    sites: 2,
    since: "2022-01-22",
  },
  {
    id: "CL-03",
    name: "Grupo Bafar",
    legalName: "Grupo Bafar S.A.B. de C.V.",
    city: "Chihuahua",
    state: "Chihuahua",
    lat: 28.63,
    lng: -106.07,
    contact: "Ana Treviño",
    email: "atrevino@bafar.com",
    phone: "+52 614 330 1100",
    account: "activa",
    radios: 38,
    cameras: 28,
    dvr: 4,
    sites: 5,
    since: "2020-09-15",
  },
  {
    id: "CL-04",
    name: "Aeropuerto Cancún",
    legalName: "ASUR Cancún S.A. de C.V.",
    city: "Cancún",
    state: "Quintana Roo",
    lat: 21.04,
    lng: -86.87,
    contact: "Luis Pacheco",
    email: "lpacheco@asur.mx",
    phone: "+52 998 880 9090",
    account: "activa",
    radios: 120,
    cameras: 210,
    dvr: 18,
    sites: 4,
    since: "2019-06-01",
  },
  {
    id: "CL-05",
    name: "Hospital Ángeles",
    legalName: "Grupo Ángeles Servicios de Salud",
    city: "Ciudad de México",
    state: "CDMX",
    lat: 19.43,
    lng: -99.16,
    contact: "Dra. Patricia León",
    email: "pleon@angeles.mx",
    phone: "+52 55 510 7788",
    account: "activa",
    radios: 30,
    cameras: 88,
    dvr: 6,
    sites: 1,
    since: "2022-08-30",
  },
  {
    id: "CL-06",
    name: "Universidad Anáhuac",
    legalName: "Universidad Anáhuac México",
    city: "Huixquilucan",
    state: "Estado de México",
    lat: 19.41,
    lng: -99.29,
    contact: "Ricardo Mena",
    email: "rmena@anahuac.mx",
    phone: "+52 55 627 3344",
    account: "prospecto",
    radios: 12,
    cameras: 40,
    dvr: 3,
    sites: 2,
    since: "2024-02-18",
  },
  {
    id: "CL-07",
    name: "Walmart Cancún",
    legalName: "Walmart de México S.A.B. de C.V.",
    city: "Cancún",
    state: "Quintana Roo",
    lat: 21.16,
    lng: -86.85,
    contact: "Sofía Robles",
    email: "srobles@walmart.mx",
    phone: "+52 998 445 6677",
    account: "activa",
    radios: 18,
    cameras: 52,
    dvr: 4,
    sites: 1,
    since: "2023-05-12",
  },
  {
    id: "CL-08",
    name: "Resort Secrets",
    legalName: "AMResorts Operaciones S. de R.L.",
    city: "Riviera Maya",
    state: "Quintana Roo",
    lat: 20.5,
    lng: -87.22,
    contact: "Daniel Ortiz",
    email: "dortiz@secrets.com",
    phone: "+52 984 770 1212",
    account: "prospecto",
    radios: 24,
    cameras: 70,
    dvr: 5,
    sites: 3,
    since: "2024-04-03",
  },
]

// ----------------------------------------------------------------------------
// TÉCNICOS
// ----------------------------------------------------------------------------
export const technicians: Technician[] = [
  {
    id: "TEC-01",
    name: "Juan Pérez",
    role: "Técnico CCTV Senior",
    avatarColor: "var(--chart-1)",
    initials: "JP",
    services: 18,
    completed: 15,
    efficiency: 93,
    status: "en-campo",
    phone: "+52 998 111 2200",
  },
  {
    id: "TEC-02",
    name: "Carlos Ramírez",
    role: "Técnico Radiocomunicación",
    avatarColor: "var(--chart-2)",
    initials: "CR",
    services: 16,
    completed: 13,
    efficiency: 81,
    status: "en-campo",
    phone: "+52 998 111 2201",
  },
  {
    id: "TEC-03",
    name: "Miguel López",
    role: "Técnico de Redes",
    avatarColor: "var(--chart-3)",
    initials: "ML",
    services: 14,
    completed: 11,
    efficiency: 79,
    status: "disponible",
    phone: "+52 998 111 2202",
  },
  {
    id: "TEC-04",
    name: "Andrea Gómez",
    role: "Técnico de Instalación",
    avatarColor: "var(--chart-5)",
    initials: "AG",
    services: 12,
    completed: 10,
    efficiency: 88,
    status: "descanso",
    phone: "+52 998 111 2203",
  },
]

// ----------------------------------------------------------------------------
// TICKETS  (mesa de ayuda)
// ----------------------------------------------------------------------------
export const tickets: Ticket[] = [
  {
    id: "TK-1208",
    title: "Falla en cámara recepción",
    clientId: "CL-01",
    priority: "alta",
    status: "en-proceso",
    category: "CCTV",
    createdAt: "Hoy, 10:32 a.m.",
    assignedTo: "TEC-01",
    description: "Cámara de domo en recepción sin señal de video. Cliente reporta pantalla en negro.",
  },
  {
    id: "TK-1207",
    title: "Radio no enciende",
    clientId: "CL-03",
    priority: "media",
    status: "abierto",
    category: "Radio",
    createdAt: "Hoy, 09:15 a.m.",
    assignedTo: "TEC-02",
    description: "Radio Motorola DP400 no responde al encender. Posible falla de batería o tarjeta.",
  },
  {
    id: "TK-1206",
    title: "Pérdida de señal DVR",
    clientId: "CL-02",
    priority: "alta",
    status: "abierto",
    category: "DVR/NVR",
    createdAt: "Hoy, 08:40 a.m.",
    assignedTo: null,
    description: "DVR de Plaza Galerías pierde señal de forma intermitente en 4 canales.",
  },
  {
    id: "TK-1205",
    title: "Acceso denegado sistema",
    clientId: "CL-05",
    priority: "baja",
    status: "abierto",
    category: "Acceso",
    createdAt: "Ayer, 05:20 p.m.",
    assignedTo: "TEC-03",
    description: "Usuarios de control de acceso no pueden ingresar al portal administrativo.",
  },
  {
    id: "TK-1195",
    title: "Interferencia en radio canal 3",
    clientId: "CL-04",
    priority: "media",
    status: "resuelto",
    category: "Radio",
    createdAt: "12 Jun, 02:10 p.m.",
    assignedTo: "TEC-02",
    description: "Interferencia constante en canal 3 de operaciones. Reprogramación de frecuencia.",
  },
  {
    id: "TK-1187",
    title: "Mantenimiento preventivo",
    clientId: "CL-01",
    priority: "baja",
    status: "completado",
    category: "CCTV",
    createdAt: "10 Jun, 11:00 a.m.",
    assignedTo: "TEC-01",
    description: "Mantenimiento preventivo trimestral del sistema principal de CCTV.",
  },
]

// ----------------------------------------------------------------------------
// INVENTARIO
// ----------------------------------------------------------------------------
export const equipment: Equipment[] = [
  {
    id: "EQ-01",
    name: "Radio Motorola DP400",
    category: "Radios",
    serial: "123A8C455",
    status: "disponible",
    stock: 12,
    clientId: null,
  },
  {
    id: "EQ-02",
    name: "Cámara Hikvision DS-2CD",
    category: "Cámaras",
    serial: "9817YX331",
    status: "disponible",
    stock: 8,
    clientId: null,
  },
  {
    id: "EQ-03",
    name: "DVR Hikvision DS-7208",
    category: "DVR/NVR",
    serial: "451DS7768",
    status: "asignado",
    stock: 4,
    clientId: "CL-02",
  },
  {
    id: "EQ-04",
    name: "Switch TP-Link TL-SG1016",
    category: "Accesorios",
    serial: "3DGsrt654",
    status: "disponible",
    stock: 6,
    clientId: null,
  },
  {
    id: "EQ-05",
    name: "Cámara Hikvision 2MP DS-2CD2185",
    category: "Cámaras",
    serial: "7741CA221",
    status: "mantenimiento",
    stock: 20,
    clientId: null,
  },
  {
    id: "EQ-06",
    name: "Disco duro WD Purple 2TB",
    category: "Accesorios",
    serial: "WDX22118",
    status: "disponible",
    stock: 15,
    clientId: null,
  },
]

export const inventorySummary = {
  radios: 320,
  cameras: 215,
  dvr: 48,
  accessories: 620,
}

// ----------------------------------------------------------------------------
// RUTA / VISITAS DE SERVICIO (técnico en campo)
// ----------------------------------------------------------------------------
export const serviceVisits: ServiceVisit[] = [
  {
    id: "SV-01",
    ticketId: "TK-1208",
    clientId: "CL-01",
    technicianId: "TEC-01",
    window: "10:30 a.m. - 12:30 p.m.",
    status: "en-progreso",
    order: 1,
  },
  {
    id: "SV-02",
    ticketId: "TK-1206",
    clientId: "CL-02",
    technicianId: "TEC-01",
    window: "02:00 p.m. - 04:00 p.m.",
    status: "pendiente",
    order: 2,
  },
  {
    id: "SV-03",
    ticketId: "TK-1187",
    clientId: "CL-05",
    technicianId: "TEC-01",
    window: "05:00 p.m. - 06:00 p.m.",
    status: "pendiente",
    order: 3,
  },
]

export const routeSummary = {
  services: 5,
  completed: 3,
  pending: 2,
}

// ----------------------------------------------------------------------------
// CRM — OPORTUNIDADES
// ----------------------------------------------------------------------------
export const opportunities: Opportunity[] = [
  {
    id: "OP-01",
    name: "Hotel Riviera Maya",
    clientId: "CL-08",
    stage: "nuevo",
    amount: 120000,
    date: "7 Jun 2024",
    summary: "20 cámaras + 10 radios",
  },
  {
    id: "OP-02",
    name: "Universidad Anáhuac",
    clientId: "CL-06",
    stage: "nuevo",
    amount: 80000,
    date: "5 Jun 2024",
    summary: "Radios y repetidor",
  },
  {
    id: "OP-03",
    name: "Grupo Vidanta",
    clientId: "CL-03",
    stage: "cotizacion",
    amount: 250000,
    date: "8 Jun 2024",
    summary: "Sistema integral",
  },
  {
    id: "OP-04",
    name: "Hospital Ángeles",
    clientId: "CL-05",
    stage: "cotizacion",
    amount: 200000,
    date: "6 Jun 2024",
    summary: "CCTV + control de acceso",
  },
  {
    id: "OP-05",
    name: "Resort Secrets",
    clientId: "CL-08",
    stage: "negociacion",
    amount: 180000,
    date: "9 Jun 2024",
    summary: "Expansión CCTV",
  },
  {
    id: "OP-06",
    name: "Corporativo Bimbo",
    clientId: "CL-03",
    stage: "negociacion",
    amount: 140000,
    date: "7 Jun 2024",
    summary: "Radios digitales",
  },
  {
    id: "OP-07",
    name: "Aeropuerto Cancún",
    clientId: "CL-04",
    stage: "ganado",
    amount: 250000,
    date: "1 Jun 2024",
    summary: "Proyecto CCTV",
  },
  {
    id: "OP-08",
    name: "Hotel Xcaret",
    clientId: "CL-01",
    stage: "ganado",
    amount: 130000,
    date: "30 May 2024",
    summary: "Renovación anual",
  },
]

export const crmStages: { stage: OpportunityStage; label: string }[] = [
  { stage: "nuevo", label: "Nuevo" },
  { stage: "cotizacion", label: "En cotización" },
  { stage: "negociacion", label: "Negociación" },
  { stage: "ganado", label: "Ganado" },
]

// ----------------------------------------------------------------------------
// COTIZADOR
// ----------------------------------------------------------------------------
export const quoteLines: QuoteLine[] = [
  {
    id: "QL-01",
    name: "Cámara Hikvision 2MP",
    detail: "DS-2CD2185FWD-I",
    qty: 20,
    unitPrice: 2980,
    type: "equipo",
  },
  {
    id: "QL-02",
    name: "DVR Hikvision 16 Canales",
    detail: "DS-7216HUHI-K2",
    qty: 1,
    unitPrice: 3850,
    type: "equipo",
  },
  {
    id: "QL-03",
    name: "Disco duro 2TB",
    detail: "WD Purple",
    qty: 1,
    unitPrice: 1450,
    type: "equipo",
  },
  {
    id: "QL-04",
    name: "Instalación y configuración",
    detail: "Servicio profesional",
    qty: 1,
    unitPrice: 4500,
    type: "servicio",
  },
]

export const IVA_RATE = 0.16

// ----------------------------------------------------------------------------
// DASHBOARD / KPIs
// ----------------------------------------------------------------------------
export const dashboardKpis = {
  openTickets: 28,
  openTicketsTrend: 12,
  activeTechnicians: 12,
  activeContracts: 45,
  activeContractsTrend: 8,
  monthSales: 850450,
  monthSalesTrend: 15,
}

export const priorityBreakdown = [
  { name: "Alta", value: 12, percent: 43, color: "var(--chart-4)" },
  { name: "Media", value: 10, percent: 36, color: "var(--chart-3)" },
  { name: "Baja", value: 6, percent: 21, color: "var(--chart-2)" },
]

export const recentActivity: Activity[] = [
  {
    id: "AC-01",
    type: "ticket",
    title: "Nuevo ticket #TK-1208",
    meta: "Hotel Xcaret México",
    time: "10:32 a.m.",
  },
  {
    id: "AC-02",
    type: "mantenimiento",
    title: "Mantenimiento completado",
    meta: "Plaza Galerías Monterrey",
    time: "09:15 a.m.",
  },
  {
    id: "AC-03",
    type: "cotizacion",
    title: "Cotización enviada",
    meta: "Grupo Bafar",
    time: "Ayer",
  },
  {
    id: "AC-04",
    type: "servicio",
    title: "Servicio iniciado",
    meta: "Aeropuerto Cancún",
    time: "Ayer",
  },
]

// ----------------------------------------------------------------------------
// ANALYTICS
// ----------------------------------------------------------------------------
export const analyticsKpis = {
  totalTickets: 128,
  totalTicketsTrend: 15,
  resolved: 96,
  resolvedTrend: 22,
  avgTime: "4.2 h",
  avgTimeTrend: -8,
  satisfaction: 4.8,
  satisfactionTrend: 5,
}

export const ticketsPerDay = [
  { day: "Lun", tickets: 14, resueltos: 11 },
  { day: "Mar", tickets: 18, resueltos: 15 },
  { day: "Mié", tickets: 22, resueltos: 17 },
  { day: "Jue", tickets: 16, resueltos: 14 },
  { day: "Vie", tickets: 24, resueltos: 19 },
  { day: "Sáb", tickets: 19, resueltos: 13 },
  { day: "Dom", tickets: 15, resueltos: 7 },
]

export const monthlyGrowth = [
  { month: "Ene", clientes: 32, ingresos: 540 },
  { month: "Feb", clientes: 35, ingresos: 580 },
  { month: "Mar", clientes: 38, ingresos: 610 },
  { month: "Abr", clientes: 41, ingresos: 690 },
  { month: "May", clientes: 44, ingresos: 760 },
  { month: "Jun", clientes: 48, ingresos: 850 },
]

// ----------------------------------------------------------------------------
// NOTIFICACIONES
// ----------------------------------------------------------------------------
export interface Notification {
  id: string
  title: string
  body: string
  time: string
  type: "ticket" | "servicio" | "sistema" | "cotizacion"
  read: boolean
}

export const notifications: Notification[] = [
  {
    id: "NT-01",
    title: "Ticket de alta prioridad",
    body: "#TK-1208 — Falla en cámara recepción asignado a Juan Pérez.",
    time: "Hace 12 min",
    type: "ticket",
    read: false,
  },
  {
    id: "NT-02",
    title: "Servicio en ruta",
    body: "Carlos Ramírez se dirige a Grupo Bafar para atender #TK-1207.",
    time: "Hace 40 min",
    type: "servicio",
    read: false,
  },
  {
    id: "NT-03",
    title: "Cotización aprobada",
    body: "Aeropuerto Cancún aprobó la cotización por $250,000.",
    time: "Hace 2 h",
    type: "cotizacion",
    read: true,
  },
  {
    id: "NT-04",
    title: "Mantenimiento programado",
    body: "Mantenimiento preventivo CCTV agendado para el 12 de julio.",
    time: "Ayer",
    type: "sistema",
    read: true,
  },
]

// ----------------------------------------------------------------------------
// HELPERS
// ----------------------------------------------------------------------------
export const formatCurrency = (n: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n)

export const getClient = (id: string) => clients.find((c) => c.id === id)
export const getTechnician = (id: string) => technicians.find((t) => t.id === id)
export const getTicket = (id: string) => tickets.find((t) => t.id === id)

export const priorityMeta: Record<Priority, { label: string; class: string }> = {
  alta: { label: "Alta", class: "bg-destructive/15 text-destructive border-destructive/30" },
  media: { label: "Media", class: "bg-warning/15 text-warning border-warning/30" },
  baja: { label: "Baja", class: "bg-success/15 text-success border-success/30" },
}

export const ticketStatusMeta: Record<TicketStatus, { label: string; class: string }> = {
  abierto: { label: "Abierto", class: "bg-primary/15 text-primary border-primary/30" },
  "en-proceso": { label: "En proceso", class: "bg-warning/15 text-warning border-warning/30" },
  resuelto: { label: "Resuelto", class: "bg-success/15 text-success border-success/30" },
  completado: { label: "Completado", class: "bg-success/15 text-success border-success/30" },
}
