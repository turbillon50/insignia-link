import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ShieldCheck,
  Radio,
  Cctv,
  Headset,
  Activity,
  Clock,
  MapPin,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function LandingHero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      <Image
        src="/images/hero-control-room.png"
        alt="Centro de control de operaciones INSIGNIA LINK"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e1626]/85 via-[#0e1626]/80 to-[#0e1626]/95" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Radiocomunicación · CCTV · Soporte técnico
          </span>
          <h1 className="mt-6 text-balance font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Conectamos tu mundo.
            <span className="block text-primary">Protegemos lo que te importa.</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
            La plataforma integral que centraliza tu operación de radiocomunicación,
            videovigilancia y soporte técnico en tiempo real. Control total desde
            cualquier lugar.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button render={<Link href="/admin" />} size="lg" className="h-12 text-base">
              Explorar plataforma
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              render={<Link href="/app" />}
              size="lg"
              variant="outline"
              className="h-12 border-white/25 bg-white/5 text-base text-white hover:bg-white/10 hover:text-white"
            >
              Ver portal cliente
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> +150 clientes activos
            </span>
            <span className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" /> Monitoreo 24/7
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> Cobertura nacional
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

const values = [
  {
    icon: ShieldCheck,
    title: "Control total",
    desc: "Visibilidad completa de tu operación, equipos y servicios desde un solo lugar.",
  },
  {
    icon: Clock,
    title: "Atención más rápida",
    desc: "Mesa de ayuda con tickets, asignación inteligente y seguimiento en vivo.",
  },
  {
    icon: Activity,
    title: "Tiempo real",
    desc: "Información actualizada al instante desde campo, inventario y reportes.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad y confianza",
    desc: "Cada servicio documentado, auditable y protegido de extremo a extremo.",
  },
]

export function LandingValues() {
  return (
    <section id="beneficios" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Una operación conectada, no fragmentada
        </h2>
        <p className="mt-4 text-pretty text-muted-foreground">
          INSIGNIA LINK reemplaza hojas de cálculo y sistemas dispersos con una
          plataforma diseñada para empresas de tecnología y seguridad.
        </p>
      </div>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v) => (
          <Card
            key={v.title}
            className="group gap-0 border-border/70 p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <v.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-heading text-lg font-semibold">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}

const services = [
  {
    icon: Radio,
    image: "/images/feature-radio.png",
    title: "Radiocomunicación",
    desc: "Venta, instalación y mantenimiento de radios profesionales y repetidores. Gestión de frecuencias y flotas.",
    tags: ["Motorola", "Repetidores", "Frecuencias"],
  },
  {
    icon: Cctv,
    image: "/images/feature-cctv.png",
    title: "Videovigilancia CCTV",
    desc: "Diseño e implementación de sistemas de cámaras, DVR/NVR y monitoreo centralizado para tus instalaciones.",
    tags: ["Hikvision", "DVR/NVR", "Monitoreo"],
  },
  {
    icon: Headset,
    image: "/images/feature-support.png",
    title: "Soporte técnico",
    desc: "Mesa de ayuda especializada, técnicos en campo y mantenimiento preventivo con tiempos de respuesta garantizados.",
    tags: ["Tickets", "Campo", "Preventivo"],
  },
]

export function LandingServices() {
  return (
    <section id="servicios" className="border-y border-border/60 bg-card/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="text-sm font-semibold text-primary">Nuestros servicios</span>
            <h2 className="mt-2 text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Todo lo que tu infraestructura necesita
            </h2>
          </div>
          <Button render={<Link href="/admin" />} variant="ghost" className="self-start sm:self-auto">
            Ver módulos <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <Card key={s.title} className="overflow-hidden p-0 transition-all hover:shadow-xl hover:shadow-primary/5">
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="p-6 pt-2">
                <h3 className="font-heading text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const stats = [
  { value: "150+", label: "Clientes activos" },
  { value: "12k+", label: "Servicios completados" },
  { value: "4.2 h", label: "Tiempo de respuesta" },
  { value: "98%", label: "Satisfacción" },
]

export function LandingStats() {
  return (
    <section id="estadisticas" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <Card className="overflow-hidden border-primary/20 bg-primary p-8 sm:p-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <p className="font-heading text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm font-medium text-primary-foreground/70">{s.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  )
}

const testimonials = [
  {
    quote:
      "Centralizamos el monitoreo de nuestras 4 terminales. Los tiempos de respuesta bajaron a la mitad.",
    name: "Luis Pacheco",
    role: "Coord. Seguridad, Aeropuerto Cancún",
  },
  {
    quote:
      "La mesa de ayuda y el técnico en campo en una sola app cambió por completo nuestra operación.",
    name: "Mariana Cruz",
    role: "Gerente TI, Hotel Xcaret México",
  },
  {
    quote:
      "Visibilidad total de inventario y contratos. Las cotizaciones que tomaban días ahora salen en minutos.",
    name: "Jorge Salinas",
    role: "Director, Plaza Galerías Monterrey",
  },
]

export function LandingTestimonials() {
  return (
    <section id="testimonios" className="border-t border-border/60 bg-card/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Empresas líderes confían en nosotros
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="gap-0 p-6">
              <div className="flex gap-1 text-warning">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-pretty leading-relaxed text-foreground/90">
                {"\u201C"}
                {t.quote}
                {"\u201D"}
              </p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function LandingCTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 text-center sm:p-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Lleva tu operación al siguiente nivel
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Explora la plataforma completa con datos de demostración. Sin registro,
            sin compromisos.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button render={<Link href="/admin" />} size="lg" className="h-12 text-base">
              Abrir panel administrativo <ArrowRight className="h-5 w-5" />
            </Button>
            <Button render={<Link href="/app" />} size="lg" variant="outline" className="h-12 text-base">
              Ver portal cliente
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
