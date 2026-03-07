import { GoogleGenerativeAI } from '@google/generative-ai'
import prisma from '@/lib/prisma'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export const maxDuration = 30

// Tipos para el historial de mensajes
interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Message[] } = await req.json()

    if (!messages || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No se recibieron mensajes.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY no configurada')
    }

    // Obtener el último mensaje del usuario
    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === 'user')
    const userMessage = lastUserMessage?.content?.trim() || ''

    // Consultar datos desde PostgreSQL en paralelo
    const [projects, skills, commits] = await Promise.all([
      prisma.project.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          longDescription: true,
          liveUrl: true,
          repoUrl: true,
          technologies: true,
          features: true,
          stats: true
        }
      }),
      prisma.skill.findMany({
        select: {
          category: true,
          label: true,
          status: true,
          val: true,
          color: true
        }
      }),
      prisma.commit.findMany({
        select: {
          hash: true,
          role: true,
          company: true,
          date: true,
          branch: true,
          details: true
        },
        orderBy: { date: 'desc' }
      })
    ])

    // Construir contexto detallado de proyectos
    const projectsContext = projects
      .map(
        (p) => `
### Proyecto: "${p.title}"
- Descripción corta: ${p.description}
- Descripción larga: ${p.longDescription ?? 'N/A'}
- Tecnologías: ${(p.technologies as string[]).join(', ')}
- Live URL: ${p.liveUrl ?? 'No disponible'}
- Repositorio: ${p.repoUrl ?? 'No disponible'}
- Características: ${(p.features as string[]).join(', ')}
- Stats: ${JSON.stringify(p.stats ?? {})}
`
      )
      .join('\n')

    // Construir contexto de habilidades agrupadas por categoría
    const skillsByCategory = skills.reduce<Record<string, typeof skills>>(
      (acc, skill) => {
        const cat = skill.category ?? 'General'
        if (!acc[cat]) acc[cat] = []
        acc[cat].push(skill)
        return acc
      },
      {}
    )
    const skillsContext = Object.entries(skillsByCategory)
      .map(
        ([category, items]) =>
          `**${category}:** ${items.map((s) => `${s.label} (nivel ${s.val}, ${s.status})`).join(' | ')}`
      )
      .join('\n')

    // Construir contexto de experiencia laboral
    const experienceContext = commits
      .map((c) => {
        const details = c.details as any
        return `
### ${c.role} en ${c.company}
- Fecha: ${c.date}
- Rama / Área: ${c.branch}
- Proyecto/Tarea: ${details?.title ?? 'N/A'}
- Descripción: ${details?.description ?? 'N/A'}
- Tecnologías usadas: ${details?.technologies?.join(', ') ?? 'N/A'}
`
      })
      .join('\n')

    // Historial completo de conversación (todos los mensajes previos excepto el último)
    const previousMessages = messages.slice(0, -1)
    const conversationHistory =
      previousMessages.length > 0
        ? previousMessages
            .map((m) =>
              m.role === 'user'
                ? `**Usuario:** ${m.content}`
                : `**Asistente:** ${m.content}`
            )
            .join('\n\n')
        : 'Sin historial previo.'

    // Prompt principal con instrucciones de longitud adaptativa
    const systemPrompt = `Eres el asistente virtual del portafolio de Daniel Martel, un Desarrollador Web Full Stack con 2 años de experiencia basado en Lima, Perú.

---

## 🧠 TU IDENTIDAD Y TONO
- Representas a Daniel Martel de manera profesional y cercana.
- Usas un tono amigable, claro y técnico cuando el tema lo requiere.
- Siempre respondes en **español**.
- Tu objetivo es ayudar a visitantes del portafolio: reclutadores, clientes o colegas desarrolladores.

---

## 👤 SOBRE DANIEL MARTEL
- **Ubicación:** Lima, Perú
- **Experiencia:** 2 años en desarrollo web full stack
- **Educación:** Técnico en Redes (IDAT, 2016-2018) · Full Stack Web Developer (Henry Bootcamp, 2022-2023)
- **Intereses:** Desarrollo web, ensamblaje de computadoras, tecnología
- **LinkedIn:** https://www.linkedin.com/in/developer-martel/
- **GitHub:** https://github.com/cterryc
- **Email:** danyel.martel@gmail.com
- **CV:** https://drive.google.com/file/d/1IHo3a7SkvjJBa7GKRWfPrF68oJZvQ3QN/view

---

## 💼 EXPERIENCIA LABORAL
${experienceContext}

---

## 🚀 PROYECTOS
${projectsContext}

---

## 🛠️ HABILIDADES TÉCNICAS
${skillsContext}

---

## 📜 HISTORIAL DE CONVERSACIÓN
${conversationHistory}

---

## 📏 REGLAS DE LONGITUD DE RESPUESTA (MUY IMPORTANTE)
Adapta la longitud de tu respuesta según el tipo de pregunta:

- **Saludo o pregunta casual** (ej: "hola", "¿qué puedes hacer?") → Respuesta breve, 1-2 oraciones.
- **Pregunta directa y concreta** (ej: "¿qué tecnologías usa Daniel?") → Respuesta media, 2-4 oraciones o una lista corta.
- **Pregunta detallada o técnica** (ej: "explícame el proyecto X en detalle") → Respuesta larga con secciones y ejemplos si aplica.
- **Pregunta de comparación o análisis** → Respuesta estructurada con secciones claras.

Nunca rellenes la respuesta innecesariamente. Si la respuesta correcta es una sola oración, usa solo una oración.

---

## 🚫 REGLAS DE COMPORTAMIENTO
1. Responde **SOLO** basándote en la información de este prompt.
2. Si te preguntan algo fuera del contexto del portafolio, responde: *"Solo tengo información sobre el portafolio y experiencia de Daniel Martel. ¿Hay algo sobre sus proyectos, habilidades o experiencia que quieras saber?"*
3. No inventes datos, URLs, empresas ni tecnologías que no estén aquí.
4. Usa **markdown** (negrita, listas, encabezados pequeños) solo cuando mejore la legibilidad.
5. Para contacto, menciona siempre: danyel.martel@gmail.com

---

## 💬 MENSAJE ACTUAL DEL USUARIO
${userMessage}

## ✍️ RESPUESTA:`

    const model = genAI.getGenerativeModel({
      model: 'gemini-3.1-flash-lite-preview',
      generationConfig: {
        temperature: 0.7, // Creatividad balanceada
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 2048, // Suficiente para respuestas largas sin desperdiciar tokens
        candidateCount: 1
      }
    })

    const result = await model.generateContent(systemPrompt)
    const responseText = result.response.text()?.trim()

    if (!responseText) {
      throw new Error('La IA no devolvió una respuesta válida.')
    }

    return new Response(
      JSON.stringify({
        message: responseText,
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error en chat API:', error)
    return new Response(
      JSON.stringify({
        error: 'Error procesando tu consulta. Por favor intenta nuevamente.',
        details: error instanceof Error ? error.message : 'Error desconocido'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
