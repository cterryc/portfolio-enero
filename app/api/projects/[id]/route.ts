import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { ENV } from '@/config/env'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const project = await prisma.project.findUnique({
      where: { id: id },
      include: {
        stats: true
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Proyecto no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Error al obtener proyecto' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const project = await prisma.project.update({
      where: { id: id },
      data: {
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

    return NextResponse.json(project)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Error al actualizar proyecto' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  if (!body.adminPassword || body.adminPassword !== ENV.ADMIN_PASSWORD) {
    console.error('Admin Password Incorrect', body.adminPassword)
    return NextResponse.json(
      { error: `Admin Password Incorrect: "${body.adminPassword}"` },
      { status: 500 }
    )
  }

  try {
    await prisma.project.delete({
      where: { id }
    })

    return NextResponse.json({ message: `Proyecto con id ${id} eliminado` })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: `Error al eliminar proyecto con id "${id}"` },
      { status: 500 }
    )
  }
}
