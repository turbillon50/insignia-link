// =====================================================================
// Insignia Link — Envío de correo vía Resend.
// Falla en silencio (log) si no hay API key, para no romper flujos.
// =====================================================================
import { Resend } from "resend"

const apiKey = process.env.RESEND_API_KEY || ""
const FROM = process.env.EMAIL_FROM || "Insignia Link <onboarding@resend.dev>"

const resend = apiKey ? new Resend(apiKey) : null

export async function sendEmail(opts: { to: string | string[]; subject: string; html: string }) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY ausente — correo omitido:", opts.subject)
    return { ok: false, skipped: true }
  }
  try {
    const r = await resend.emails.send({ from: FROM, to: opts.to, subject: opts.subject, html: opts.html })
    return { ok: !r.error, id: r.data?.id, error: r.error?.message }
  } catch (err: any) {
    console.error("[email] error:", err?.message)
    return { ok: false, error: String(err?.message || err) }
  }
}

const shell = (title: string, body: string) => `
<div style="background:#0e1626;padding:32px;font-family:system-ui,Segoe UI,Roboto,sans-serif">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden">
    <div style="background:#0e1626;padding:20px 28px;color:#fff">
      <span style="font-weight:800;letter-spacing:-.3px;font-size:18px">INSIGNIA <span style="color:#3b82f6">LINK</span></span>
    </div>
    <div style="padding:28px">
      <h1 style="margin:0 0 12px;font-size:20px;color:#0e1626">${title}</h1>
      ${body}
    </div>
    <div style="padding:16px 28px;background:#f1f5f9;color:#64748b;font-size:12px">
      Insignia Radiocomunicación S.A. de C.V. · Cancún, Q.R. · Radiocomunicación · CCTV · Soporte técnico
    </div>
  </div>
</div>`

export function welcomeEmail(name: string) {
  return shell(
    `Bienvenido, ${name}`,
    `<p style="color:#334155;line-height:1.6">Tu cuenta en la plataforma Insignia Link quedó activa. Desde aquí podrás dar seguimiento a tus equipos, tickets de soporte y servicios en tiempo real.</p>`,
  )
}

export function ticketEmail(ticket: { id: string; title: string; priority: string; status: string }, clientName: string) {
  return shell(
    `Ticket ${ticket.id} registrado`,
    `<p style="color:#334155;line-height:1.6">Hola ${clientName}, registramos tu ticket de soporte:</p>
     <table style="width:100%;border-collapse:collapse;margin-top:8px">
       <tr><td style="padding:8px 0;color:#64748b">Folio</td><td style="padding:8px 0;font-weight:600">${ticket.id}</td></tr>
       <tr><td style="padding:8px 0;color:#64748b">Asunto</td><td style="padding:8px 0;font-weight:600">${ticket.title}</td></tr>
       <tr><td style="padding:8px 0;color:#64748b">Prioridad</td><td style="padding:8px 0;font-weight:600;text-transform:capitalize">${ticket.priority}</td></tr>
       <tr><td style="padding:8px 0;color:#64748b">Estado</td><td style="padding:8px 0;font-weight:600;text-transform:capitalize">${ticket.status}</td></tr>
     </table>
     <p style="color:#334155;line-height:1.6;margin-top:16px">Nuestro equipo técnico ya fue notificado y dará atención a la brevedad.</p>`,
  )
}
