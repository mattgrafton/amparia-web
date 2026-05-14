
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

  // Notify you when someone signs up

  await resend.emails.send({

    from: 'AMPARIA <onboarding@resend.dev>',

    to: 'mattgraftonie@gmail.com',

    subject: '🔔 New waitlist signup',

    html: `<p><strong>${email}</strong> just joined the AMPARIA waitlist.</p>`,

  })

  return NextResponse.json({ success: true })

}

