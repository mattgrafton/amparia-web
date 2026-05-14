import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  const { error, count } = await supabase
    .from('waitlist')
    .insert([{ email }])
    .select('*', { count: 'exact' })

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Already on the list' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { count: total } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true })

  await resend.emails.send({
    from: 'AMPARIA <onboarding@resend.dev>',
    to: 'matt@grafton.es',
    subject: `🔔 Nueva solicitud — ${email}`,
    html: `
      <div style="font-family: helvetica, sans-serif; color: #000; padding: 32px;">
        <h2 style="margin: 0 0 8px;">Nueva solicitud de acceso anticipado</h2>
        <p style="margin: 0 0 24px; color: #666;">alguien quiere unirse a AMPARIA</p>
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #999; width: 120px;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #999;">Fecha</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #999;">Total en lista</td>
            <td style="padding: 12px 0; font-weight: bold;">${total ?? '—'}</td>
          </tr>
        </table>
      </div>
    `,
  })

  return NextResponse.json({ success: true })
}
