import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const stats = await prisma.projectStat.findMany({
      where: { projectId: id }
    })

    console.log('id 123 =>', id)

    return NextResponse.json(stats)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Error al obtener estadísticas' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json()
    const { id } = await params

    // 1. Si el cuerpo es un Array, usamos createMany
    if (Array.isArray(body)) {
      const stats = await prisma.projectStat.createMany({
        data: body.map((item) => ({
          projectId: id,
          label: item.label,
          val: item.val,
          color: item.color
        })),
        skipDuplicates: true
      })
      return NextResponse.json(stats, { status: 201 })
    }

    // 2. Si es un objeto único, usamos create (comportamiento original)
    const stat = await prisma.projectStat.create({
      data: {
        projectId: id,
        label: body.label,
        val: body.val,
        color: body.color
      }
    })

    return NextResponse.json(stat, { status: 201 })
  } catch (error) {
    console.error('Error al procesar estadísticas:', error)
    return NextResponse.json(
      { error: 'Error al crear estadística(s)' },
      { status: 500 }
    )
  }
}
