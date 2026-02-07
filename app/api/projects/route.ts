// app/api/projects/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { ENV } from '@/config/env'
import { unstable_cache, revalidatePath } from 'next/cache'

interface StatProps {
  label: string
  val: string
  color: string
  projectId?: string
}

interface ProjectProps {
  id: string
  title: string
  description: string
  longDescription: string
  liveUrl: string
  repoUrl: string
  imageUrl: string
  technologies: string
  features: string
  codeSnippet: string
  stats?: StatProps[]
}

// Función cacheada para obtener proyectos
const getCachedProjects = unstable_cache(
  async () => {
    console.log('🔍 CONSULTANDO BASE DE DATOS') // Solo aparece cuando no hay cache
    return await prisma.project.findMany({
      include: { stats: true },
      orderBy: { createdAt: 'asc' }
    })
  },
  ['projects-list'],
  {
    tags: ['projects']
    // revalidate: 10
  }
)

export async function GET() {
  try {
    // const newPromise = new Promise((res) => {
    //   setTimeout(() => {
    //     res(() => {
    //       return 'Resuelte'
    //     })
    //   }, 1500)
    // })
    // const data = await newPromise
    // console.log(data)
    const projects = await getCachedProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error en la base de datos:', error)
    return NextResponse.json(
      { error: 'Error al obtener proyectos' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.adminPassword || body.adminPassword !== ENV.ADMIN_PASSWORD) {
      console.error('Admin Password Incorrect', body.adminPassword)
      return NextResponse.json(
        { error: `Admin Password Incorrect: "${body.adminPassword}"` },
        { status: 500 }
      )
    }

    // 1. Lógica para múltiples proyectos (Array)
    if (Array.isArray(body.projects)) {
      const arrayStats: StatProps[] = []

      const projects = await prisma.project.createMany({
        data: body.projects.map((project: ProjectProps) => {
          project.stats?.forEach((stat: StatProps) =>
            arrayStats.push({
              projectId: project.id,
              label: stat.label,
              val: stat.val,
              color: stat.color
            })
          )

          return {
            id: project.id, // Opcional si usas @default(cuid()) o uuid()
            title: project.title,
            description: project.description,
            longDescription: project.longDescription,
            liveUrl: project.liveUrl,
            repoUrl: project.repoUrl,
            imageUrl: project.imageUrl,
            technologies: project.technologies,
            features: project.features,
            codeSnippet: project.codeSnippet
          }
        }),
        skipDuplicates: true // Útil para evitar errores si un ID ya existe
      })

      await prisma.projectStat.createMany({
        data: arrayStats.map((item) => ({
          projectId: item.projectId as string,
          label: item.label,
          val: item.val,
          color: item.color
        })),
        skipDuplicates: true
      })

      console.log('♻️ INVALIDANDO CACHE de proyectos')
      revalidatePath('/api/projects')

      return NextResponse.json(projects, { status: 201 })
    }

    // 2. Lógica para un solo proyecto (Objeto)
    const project = await prisma.project.create({
      data: {
        id: body.id,
        title: body.title,
        description: body.description,
        longDescription: body.longDescription,
        liveUrl: body.liveUrl,
        repoUrl: body.repoUrl,
        imageUrl: body.imageUrl,
        technologies: body.technologies,
        features: body.features,
        codeSnippet: body.codeSnippet
      }
    })

    console.log('♻️ INVALIDANDO CACHE de proyectos')
    revalidatePath('/api/projects')

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error al crear proyecto(s):', error)
    return NextResponse.json(
      { error: 'Error al crear proyecto' },
      { status: 500 }
    )
  }
}
