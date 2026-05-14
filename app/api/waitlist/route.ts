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

  const { error } = await supabase
    .from('waitlist')
    .insert([{ email }])

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Already on the list' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { count: total } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true })

  const date = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })

  const { data, error: emailError } = await resend.emails.send({
    from: 'AMPARIA <no-reply@amparia.app>',
    to: 'mattgraftonie@gmail.com',
    subject: `Nueva solicitud — ${email}`,
    html: `<div style="font-family:helvetica,sans-serif;padding:32px;color:#000">
      <h2 style="margin:0 0 24px">Nueva solicitud de acceso anticipado</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Fecha:</strong> ${date}</p>
      <p><strong>Total en lista:</strong> ${total ?? '—'}</p>
    </div>`,
  })

  if (emailError) {
    console.error('Resend error:', emailError)
  } else {
    console.log('Email sent:', data)
  }

  return NextResponse.json({ success: true })
}
