import { ENV } from '@/config/env'

const { EMAIL_FROM, USER_FROM, API_KEY_BREVO } = ENV

// 1. Interfaces mejoradas
interface ContactFormData {
  name: string
  email: string
  subject?: string // Opcional
  message: string
}

interface SendEmailResponse {
  messageId: string
}

const brevoURL = 'https://api.brevo.com/v3/smtp/email'

export async function sendTransactionalEmail(
  data: ContactFormData // Usamos la interfaz de los datos del formulario
) {
  const emailData = {
    // El remitente puedes ser tú mismo o un nombre genérico
    sender: {
      name: 'Portfolio Contact Form',
      email: 'no-reply@marteldev.com'
    },
    // Te lo envías a ti mismo
    to: [
      {
        name: USER_FROM as string,
        email: EMAIL_FROM as string
      },
      {
        name: USER_FROM as string,
        email: data.email as string
      }
    ],
    // El asunto puede incluir el nombre de quien escribe
    subject: data?.subject || `Nuevo mensaje de contacto de ${data.name}`,

    // Generamos el HTML con los datos del parámetro 'data'
    htmlContent: `
      <html>
        <head>
          <style>
            body { font-family: sans-serif; line-height: 1.6; color: #333; }
            .container { border: 1px solid #eee; padding: 20px; border-radius: 10px; }
            .header { border-bottom: 2px solid #0052e2; padding-bottom: 10px; margin-bottom: 20px; }
            .label { font-weight: bold; color: #555; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Nuevo mensaje desde tu Portfolio</h2>
            </div>
            <p><span class="label">Nombre:</span> ${data?.name || 'Test Name'}</p>
            <p><span class="label">Email:</span> ${data?.email || 'Test Email'}</p>
            <p><span class="label">Mensaje:</span></p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
              ${data?.message.replace(/\n/g, '<br>') || 'Test Message'}
            </div>
          </div>
        </body>
      </html>
    `
  }

  try {
    const response = await fetch(brevoURL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': API_KEY_BREVO as string,
        'content-type': 'application/json'
      },
      body: JSON.stringify(emailData)
    })

    if (!response.ok) {
      const errorBody = await response.json()
      throw new Error(`Error ${response.status}: ${JSON.stringify(errorBody)}`)
    }

    const result = (await response.json()) as SendEmailResponse
    console.log('Notificación enviada con éxito:', result.messageId)
    return result
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al enviar el email:', error.message)
      throw new Error(error.message)
    } else {
      throw new Error('Error al enviar Email')
    }
  }
}

export async function sendAutomaticAsnwerEmail(data: ContactFormData) {
  const emailData = {
    // El remitente puedes ser tú mismo o un nombre genérico
    sender: {
      name: 'Respuesta Automatica de MartelDev',
      email: EMAIL_FROM
    },
    // Te lo envías a ti mismo
    to: [
      {
        name: data.name as string,
        email: data.email as string
      }
    ],
    // El asunto puede incluir el nombre de quien escribe
    subject:
      data?.subject || `Email Automatico de MartelDev, Formulario de Contacto`,

    // Generamos el HTML con los datos del parámetro 'data'
    htmlContent: `
      <html>
        <head>
          <style>
            body { font-family: sans-serif; line-height: 1.6; color: #333; }
            .container { border: 1px solid #eee; padding: 20px; border-radius: 10px; }
            .header { border-bottom: 2px solid #0052e2; padding-bottom: 10px; margin-bottom: 20px; }
            .label { font-weight: bold; color: #555; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Esta es una respuesta automatica</h2>
            </div>
            <p><span class="label">Nombre:</span> ${data?.name || 'Test Name'}</p>
            <p><span class="label">Email:</span> ${data?.email || 'Test Email'}</p>
            <p><span class="label">Mensaje:</span></p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
              Hola 👋 ${data.name}, este es una respuesta automatica, me comunicare contigo a la brevedad, gracias por ponerte en contacto 👍.
            </div>
          </div>
        </body>
      </html>
    `
  }

  try {
    const response = await fetch(brevoURL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': API_KEY_BREVO as string,
        'content-type': 'application/json'
      },
      body: JSON.stringify(emailData)
    })

    if (!response.ok) {
      const errorBody = await response.json()
      throw new Error(`Error ${response.status}: ${JSON.stringify(errorBody)}`)
    }

    const result = (await response.json()) as SendEmailResponse
    console.log('Notificación enviada con éxito:', result.messageId)
    return result
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al enviar el email:', error.message)
      throw new Error(error.message)
    } else {
      throw new Error('Error al enviar Email')
    }
  }
}
