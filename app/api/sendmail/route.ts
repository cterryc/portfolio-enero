import {
  sendTransactionalEmail,
  sendAutomaticAsnwerEmail
} from '@/services/sendMail.service'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const sendEmail = await sendTransactionalEmail(data)
    console.log('sendEmail', sendEmail)

    const automaticAnswer = await sendAutomaticAsnwerEmail(data)
    console.log(automaticAnswer)

    return NextResponse.json({
      message: `Enviado, recibiras un mensaje automatico al correo ${data.email}`
    })
  } catch (error) {
    console.error('Error obteniendo configuración de fotos:', error)
    const errorMessge =
      error instanceof Error
        ? error.message
        : 'Error desconocido al enviar el correo'
    return NextResponse.json({ error: errorMessge }, { status: 500 })
  }
}
