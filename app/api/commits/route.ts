import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { ENV } from '@/config/env'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const commits = await prisma.commit.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(commits)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Error al obtener commits' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Verificación de contraseña de administrador
    if (!body.adminPassword || body.adminPassword !== ENV.ADMIN_PASSWORD) {
      console.error('Admin Password Incorrect')
      return NextResponse.json(
        { error: 'Admin Password Incorrect' },
        { status: 500 }
      )
    }

    // 1. Lógica para múltiples commits (Array)
    if (Array.isArray(body.commits)) {
      const commits = await prisma.commit.createMany({
        data: body.commits.map((item: any) => ({
          hash: item.hash,
          role: item.role,
          company: item.company,
          date: item.date,
          head: item.head ?? false,
          branch: item.branch,
          merge: item.merge ?? false,
          details: item.details
        })),
        skipDuplicates: true
      })

      revalidatePath('/experience')
      return NextResponse.json(commits, { status: 201 })
    }

    // 2. Lógica para un solo commit (Objeto)
    const commit = await prisma.commit.create({
      data: {
        hash: body.hash,
        role: body.role,
        company: body.company,
        date: body.date,
        head: body.head || false,
        branch: body.branch,
        merge: body.merge || false,
        details: body.details
      }
    })

    revalidatePath('/experience')
    return NextResponse.json(commit, { status: 201 })
  } catch (error) {
    console.error('Error al procesar commit(s):', error)
    return NextResponse.json(
      { error: 'Error al crear commit' },
      { status: 500 }
    )
  }
}
